import _ from 'lodash';
import localforage from 'localforage';
import md5 from 'md5';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js/core';

import types from '../mutations';

/**
 * Basic string crypto lib, do not store
 * variables in plain text in localstorage
 */
const crypto = {
    encrypt: (str) => AES.encrypt(str, chrome.runtime.id).toString()
  , decrypt: (str) => AES.decrypt(str, chrome.runtime.id).toString(CryptoJS.enc.Utf8)

  // transform array of plain strings to array of parsed strings
  , each: (func, array) => _.map(array || [], (record) => {
    const obj = {}
        , crypter = crypto[func];
    for(var key in record)
      obj[crypter(key)] = crypter(record[key]);

    return obj;
  })
};

/**
 * todo: Change indexeddb to localstorage in safari
 */

/**
 * Fetch array of secret keys
 * todo: Encryption array of keys in localstorage
 */
export const loadKeysList = ({dispatch}) => {
  localforage
    .getItem('secretKeys')
    .then(_.partial(crypto.each, 'decrypt'))
    .then(_.partial(dispatch, types.SECRET_KEYS_LOADED));
};

/**
 * Update array of secret keys
 * todo: Encryption array of keys in localstorage
 */
export const updateKeysList = ({dispatch}, items) => {
  localforage
    .setItem('secretKeys', crypto.each('encrypt', items))
    .then(_.partial(dispatch, types.SECRET_KEYS_UPDATED, items))
};

export const addEntry = ({dispatch}) => {
  dispatch(types.ADD_ENTRY);
};

export const removeEntry = ({dispatch}, entry) => {
  dispatch(types.REMOVE_ENTRY, entry);
};

export const generateKey = ({dispatch}, secret, pin) => {
  const key = md5(parseInt(new Date().getTime() / 1000).toString().slice(0, -1) + secret + pin).substr(0, 6);
  dispatch(types.KEY_GENERATED, key);
};