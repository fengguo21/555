<style scoped lang="less">
	.img_upload {
		position: relative;
		.input_image {
			opacity: 0;
			width: 100%;
			height: 100%;
			position: absolute;
		}
		.uploads {
			width: 100%;
			height: 100%;
		}
	}
</style>
<template>
	<div class="img_upload" :v-loading.body="loading">
		<input ref="imgInput" :disabled="param.length > 4" type="file" @change="previewImg" :class="{'disabled':param.length > 4}" class="input_image" name="photo" >
		<img :src="images" class="uploads">
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	export default {
		name: 'imgUploade',
		data() {
			return {
				size: 0,
				key: '',
				loading: false,
				timer: '',
				prgText: '0.00',
				flag: false
			}
		},
		props: {
			keyName: {
				type: String,
				default: function() {
					return 'intention';
				}
			},
			param: '',
			images: {
				type: String,
				default: function() {
					return '/static/icon/list/photo.png';
				}
			},
			// handPhoto:'',
			// detailsPhoto:'',
			// cargoPhoto:''
		},
		methods: {
			previewImg: function(e) {
				let _self = this;
				let input = e.target;
				if(input.files && input.files[0]) {
					if(input.files[0].size > 3036000) {
						common.$emit('message', '上传图片不可大于3M')
					} else {
						let reader = new FileReader();
						_self.size = input.files[0].size;
						let img = new Image();
						let imgl = new Image();
						reader.onload = function(e) {
							if(input.files[0].size > 204800) { //图片大于200kb则压缩
								img.src = e.target.result;
								img.onload = function() {
									imgl.src = '../../../static/images/watermark.png';
									imgl.onload = function() {
										_self.image = _self.compress(img, imgl);
										_self.upload(_self.image);

									}
								}
							} else {
								img.src = e.target.result;
								img.onload = function() {
									imgl.src = '../../../static/images/watermark.png';
									imgl.onload = function() {
										_self.image = _self.compress(img, imgl);
										_self.upload(_self.image);
									}
								}
							}
						}
						reader.readAsDataURL(input.files[0]);
						return 1;
					}
				}
			},
			compress: function(img, imgl) {
				let _self = this;
				let initSize = img.src.length;
				let width = img.width;
				let height = img.height;
				let w = width / 9;
				let h = w / 3.6;
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext('2d');
				let ratio;
				if((ratio = width * height / 300000) > 1) {
					ratio = Math.sqrt(ratio);
					width /= ratio;
					height /= ratio;
				} else {
					ratio = 1;
				}
				canvas.width = width;
				canvas.height = height;
				let ww = (width - w) / 2;
				let wh = (height - h) / 2;
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, width, height);
				ctx.globalAlpha = 0.5;
				ctx.beginPath();
				ctx.drawImage(imgl, ww, wh, w, h);
				ctx.closePath();
				ctx.save();

				let ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 1);
				if(ndata.length > 2500000) {
					ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 2500000 / ndata.length);
				}

				function newBlob(data, datatype) {
					var out
					try {
						out = new Blob([data], {
							type: datatype
						})
					} catch(e) {
						window.BlobBuilder = window.BlobBuilder ||
							window.WebKitBlobBuilder ||
							window.MozBlobBuilder ||
							window.MSBlobBuilder
						if(e.name == 'TypeError' && window.BlobBuilder) {
							var bb = new BlobBuilder()
							bb.append(data)
							out = bb.getBlob(datatype)
						} else if(e.name == 'InvalidStateError') {
							out = new Blob([data], {
								type: datatype
							})
						} else {
							throw new Error('Your browser does not support Blob & BlobBuilder!')
						}
					}
					return out
				}

				function dataURL2Blob(dataURI) {
					var byteStr
					var intArray
					var ab
					var i
					var mimetype
					var parts
					parts = dataURI.split(',')
					parts[1] = parts[1].replace(/\s/g, '')
					if(~parts[0].indexOf('base64')) {
						byteStr = atob(parts[1])
					} else {
						byteStr = decodeURIComponent(parts[1])
					}
					ab = new ArrayBuffer(byteStr.length)
					intArray = new Uint8Array(ab)
					for(i = 0; i < byteStr.length; i++) {
						intArray[i] = byteStr.charCodeAt(i)
					}
					mimetype = parts[0].split(':')[1].split(';')[0]
					return new newBlob(ab, mimetype)
				}
				var compressedImageBlob = dataURL2Blob(ndata)
				_self.size = compressedImageBlob.size; // 压缩图像文件的大小  
				canvas.width = canvas.height = 0;
				return ndata;
			},
			upload: function(file) {
				common.$emit('show-load');
				file = file.split(',')[1];
				let _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'filesService',
					biz_method: 'getQiNiuToken',
					biz_param: {
						bucketName: _self.keyName
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.getQiniuToken(url, body, function(res) {

					if(res.code == '1c01') {
						var timestamp = new Date().getTime();
						var pic = file;
						var url = 'http://upload.qiniu.com' + '/putb64/' + _self.size+ '/sadfsadfsd.xls';
						var xhr = new XMLHttpRequest();

						xhr.onreadystatechange = function() {
							_self.loading = false;
							console.log(xhr.readyState)
							if(xhr.readyState == 4) {
								let response = JSON.parse(xhr.response);
								if(response.key) {
									_self.key = response.key;
									_self.$emit("postUrl", {
										url: res.biz_result.url + '/' + _self.key
									});
									clearInterval(_self.timer);
									_self.$refs.imgInput.value = '';
									_self.flag = false;
								} else {
									_self.loading = false;
									clearInterval(_self.timer);
									_self.$refs.imgInput.value = '';
									_self.flag = false;
								}
							}
						}
						xhr.open("POST", url, true);
						xhr.setRequestHeader("Content-Type", "application/octet-stream");
						xhr.setRequestHeader("Authorization", "UpToken " + res.biz_result.token);
						_self.flag = true;
						xhr.upload.onprogress = function(ev) {
							clearInterval(_self.timer);
							var precent = parseInt(10000 * ev.loaded / ev.total) / 100;
							_self.prgText = precent;
							_self.timer = setInterval(function() {
								if(ev.lengthComputable) {
									var precent = parseInt(10000 * ev.loaded / ev.total) / 100;
									_self.prgText = precent;
								}
							}, 100);
						};
						xhr.send(pic);
						common.$emit('close-load');
					} else {
						common.$emit('close-load');
						common.$emit('message', '图片上传失败');
						_self.image = "/static/images/default_image.png";
					}
				}, function(err) {
					_self.image = "/static/images/default_image.png";
					common.$emit('close-load');
					common.$emit('message', '图片上传失败');
					console.log(err);
				})
			},

		}
	}
</script>