import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import {createWebHistory, createRouter} from 'vue-router';
axios.defaults.baseURL = 'http://localhost:8000/api'

import Dashboard from './components/Dashboard.vue';
import Student from './components/Student.vue';

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path : '/', name : "Dashboard", component : Dashboard},
        {path : '/student', name : "Student", component : Student},
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
app.config.globalProperties.axios = axios
app.config.globalProperties.$url = 'http://localhost:8000'
app.use(VueSweetalert2)