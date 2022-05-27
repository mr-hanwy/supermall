import Toast from "./Toast";

const obj = {
  install(Vue) {
    // 创建组件构造器
    const ToastConstructor = Vue.extend(Toast);

    // 根据组件构造器，创建组件对象
    const toast = new ToastConstructor();

    // 将组件对象挂载到 DOM 元素中
    toast.$mount(document.createElement('div'));

    // 将组件中的 DOM 元素添加到 body 标签内
    document.body.appendChild(toast.$el);

    // 将组件对象设置为全局对象，便于后期使用
    Vue.prototype.$toast = toast;
  }
};

export default obj;
