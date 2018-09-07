// /src/components/MessageBox/index.js

import msgboxVue from './boxDefault.vue';
// 定义插件对象
const MyPlugin = {};
// vue的install方法，用于定义vue插件
MyPlugin.install = function(Vue, options) {
	const MessageBoxInstance = Vue.extend(msgboxVue);
	let currentMsg, instance;
	const initInstance = () => {
		// 实例化vue实例
		currentMsg = new MessageBoxInstance();
		let msgBoxEl = currentMsg.$mount().$el;
		document.body.appendChild(msgBoxEl);
	};
	// 在Vue的原型上添加实例方法，以全局调用
	Vue.prototype.$defaultBox = {
		showDefault(options) {
			if(!instance) {
				initInstance();
			}
			if(typeof options === 'string') {
				currentMsg.content = options;
			} else if(typeof options === 'object') {
				Object.assign(currentMsg, options);
			}
			return currentMsg.showDefault();
		}
	};
};
export default MyPlugin;