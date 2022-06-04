import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

import BaseMessage from './ui/BaseMessage.vue';

const app = createApp(App);

app.component('base-message', BaseMessage);

app.use(router);
app.use(store);

app.mount('#app');
