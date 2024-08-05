import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";

// PrimeVue Icons
import 'primeicons/primeicons.css';

// PrimeVue CSS
import 'primeflex/primeflex.css';

import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara/accordion';
import Nora from '@primevue/themes/nora/accordion';

import router from './router/index.js'

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import ScrollPanel from 'primevue/scrollpanel';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import DatePicker from 'primevue/datepicker';

const app = createApp(App);

app.use(PrimeVue, {
    unstyled:true,

});

app.use(router)
    .component('pv-iconField',IconField)
    .component('pv-inputIcon',InputIcon)
    .component('pv-checkbox',Checkbox)
    .component('pv-button',Button)
    .component('pv-scrollPanel',ScrollPanel)
    .component('pv-inputText',InputText)
    .component('pv-dialog',Dialog)
    .component('pv-datePicker',DatePicker)

    .mount('#app')
