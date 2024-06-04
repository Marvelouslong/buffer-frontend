import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//route
import routes from "./route/route"
import * as VueRouter from 'vue-router';

const app = createApp(App)

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

app.use(router)
app.use(ElementPlus)
app.mount('#app')
