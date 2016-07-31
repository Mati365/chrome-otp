// import localforage from 'localforage';

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/App.vue';
import GeneratorView from './components/GeneratorView.vue';
import SettingsView from './components/SettingsView.vue';

import './directives';

/**
 * Configure router and bootstrap Vue.JS app,
 * please do not insert here any components
 */
(() => {
  Vue.use(VueRouter);

  // Configure router
  let router = new VueRouter;
  router
    .map({
      '/': {
          name: 'generator'
        , component: GeneratorView
      }
      , '/settings': {
          name: 'settings'
        , component: SettingsView
      }
    });
  router.start(App, '#vue-mount');
})();
