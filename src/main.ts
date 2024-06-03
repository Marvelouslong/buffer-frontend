import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//route
import routes from "./route/route"
import { createRouter, createWebHashHistory} from 'vue-router'

const app = createApp(App)

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

app.use(router)
app.use(ElementPlus)
app.mount('#app')
