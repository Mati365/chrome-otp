import _ from 'lodash';
import types from '../mutations';

const state = {
    secretKeys: []
  , generatedKey: '' // Key has 10s expiration duration
};

const mutations = {
  [types.SECRET_KEYS_LOADED](state, secretKeys) {
    _.assign(state, {
        generatedKey: null
      , secretKeys
    });
  }
  , [types.SECRET_KEYS_UPDATED](state, secretKeys) {
    // prevent using copy of object
    state.secretKeys = _.clone(secretKeys);
  }
  , [types.KEY_GENERATED](state, key) {
    state.generatedKey = key;
  }
  , [types.ADD_ENTRY](state) {
    state.secretKeys.push({
        name: ''
      , key: ''
      , pin: ''
    });
  }
  , [types.REMOVE_ENTRY](state, entry) {
    state.secretKeys = _.without(state.secretKeys, entry);
  }
};

export default {
    state
  , mutations
};