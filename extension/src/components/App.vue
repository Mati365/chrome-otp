<template lang="jade">
  #page-content
    router-view(keep-alive)
  footer.row
    | otp-generator v.0.1
</template>

<script type="text/ecmascript-6">
  import store from '../vuex/store';

  export default {
      store
    , vuex: {
      getters: {}
      , actions: {}
    }
    , methods: {}
  };
</script>

<style lang="sass" rel="stylesheet/scss">
  @import "../../../node_modules/font-awesome/scss/font-awesome.scss";

  @import "sass/ui.scss";
  @import "sass/const.scss";

  html, body {
    width: 200px;
    height: 200px;
  }
  body {
    margin: 0;
    /* For firefox with broken fonts */
    font-family: Ubuntu, Arial, sans-serif;
    overflow: hidden
  }
  footer {
    display: block !important;
    text-align: center;
    color: rgba(128, 128, 128, 0.4);
  }
</style>
