import Vue from 'vue';
import Vuex from 'vuex';

import keys from './keys';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {keys}
});