<template lang="jade">
  .row.row--select
    select.col-9.col--select(v-model='otpEntry')
      option(v-for='key in secretKeys', v-bind:value='key') {{* key.name }}

    button.col-2.col-1--offset.col--select(v-link='"settings"')
      i.fa.fa-cog

  .row.row--form
    label.row--form__label PIN:
    input.row--form__input(type='password', v-model='pin')

  #otp-key(v-copy-field)
    .progress(v-el:progress)
    .key {{ generatedKey }}

</template>

<script type="text/ecmascript-6">
  import ProgressBar from 'progressbar.js';

  import * as keysActions from '../vuex/keys/actions';

  export default {
      name: 'Generator'
    , data: () => {
      return {
          otpEntry: null
        , pin: ''
        , progress: null
      }
    }
    , vuex: {
        getters: {
            secretKeys: ({keys}) => keys.secretKeys
          , generatedKey: ({keys}) => keys.generatedKey
        }
      , actions: keysActions
    }
    , methods: {
      generate() {
        this.otpEntry && this.pin && this.generateKey(this.otpEntry.key, this.pin);
      }
    }
    , watch: {
      secretKeys(val) {
        if(val && !val.length)
          this.$router.go('/settings');
        else {
          this.otpEntry = this.otpEntry || val[0];
          this.generate();
        }
      }
      , otpEntry(val) {
        if(val) {
          this.pin = val.pin;
          this.generate();
        }
      }
      , pin() {
        this.generate();
      }
      , generatedKey(val, oldVal) {
        if(val && val !== oldVal) {
          this.progress.stop();
          this.progress.set(0.0);
          this.progress.animate(1.0);

          this.timeout && clearTimeout(this.timeout);
          this.timeout = setTimeout(this.generate.bind(this), 10000);
        }
      }
    }
    , route: {
      activate() {
        this.pin = '';
        this.otpEntry = null;

        this.loadKeysList();
      }
    }
    , ready() {
      this.progress = new ProgressBar.Circle(this.$els.progress, {
          color: '#C40233'
        , trailColor: '#EEE'
        , trailWidth: 1
        , duration: 10 * 1000 // 10s
        , strokeWidth: 4
      });
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  @import 'sass/const.scss';

  #otp-key {
    position: relative;
    width: 100%;
    text-align: center;
    margin: 15px 0 10px;

    & > .progress {
      width: 150px;
      height: 150px;
      margin: 0 auto;
    }
    & > .key {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      letter-spacing: 2px;
      font-weight: 600;
      font-size: 20px;

      &:hover {
        background-color: $primary-color;
        color: white;
        cursor: pointer;
      }
    }
  }

  .row--select {
    height: 100%;

    @at-root {
      .col--select {
        height: 24px;
      }
    }
  }

  .row--form {
    &__label {
      font-weight: 500;
      margin-bottom: 5px;
    }
    &__input {
      width: 100%;
    }
  }

  .row--checkbox {
    line-height: 17px;
  }
</style>