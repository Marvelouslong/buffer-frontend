// 定义一些路由
import UserPage from '../components/HelloWorld.vue';
import home from '../App.vue';

const routes = [
    { path: '/', title: '个人信息', component: home },
    { path: '/user', title: '个人信息', component: UserPage },
]

export default routes;
