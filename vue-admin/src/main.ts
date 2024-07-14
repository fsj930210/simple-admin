import { createApp } from 'vue';
import './style.css';
// import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import 'ant-design-vue/dist/reset.css';
import 'virtual:uno.css';
import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(router).use(store).mount('#app');
