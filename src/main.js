import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueI18n from "vue-i18n";
import ElementUI from "element-ui";
import { inject } from "@vercel/analytics";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import { locales } from "./localization";

// Vercel analytics
inject();

Vue.use(PiniaVuePlugin);
Vue.use(VueI18n);
Vue.use(ElementUI, { locale });

const i18n = new VueI18n({
  locale: "tr", // set locale
  messages: locales, // set locale messages
});
const pinia = createPinia();

new Vue({
  render: (h) => h(App),
  pinia,
  i18n,
}).$mount("#app");
