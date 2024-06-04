// 定义一些路由
import Work from '../components/work.vue';
import total from '../components/total.vue';
import Index from "../components/index.vue";
import Input from "../components/input.vue";
const routes = [
    { path: '/',  component: Index },
    { path: '/input',  component: Input },
    { path: '/work',  component: Work },
    { path: '/total',  component: total },
]

export default routes;
