<template lang="jade">
  .entries
    .entries__key(v-for='key in secretKeys')
      .row.row--form
        label Name:
        input(v-model='key.name')

      .row.row--form
        label Secret:
        input(v-model='key.key')

      .row.row--form
        label PIN (optional):
        input(v-model='key.pin')

      .row
        button.pull-right(@click='removeEntry(key)')
          i.fa.fa-fw.fa-trash

  .row.row--toolbar-entry
    button(@click='addEntry')
      i.fa.fa-fw.fa-plus
      | Add entry
    button(@click='save')
      i.fa.fa-fw.fa-save
      | Save
</template>

<script type="text/ecmascript-6">
  import * as keysActions from '../vuex/keys/actions';

  export default {
      name: 'Settings'
    , vuex: {
        getters: {
          secretKeys: ({keys}) => keys.secretKeys
        }
      , actions: keysActions
    }
    , methods: {
      save() {
        this.updateKeysList(this.secretKeys);
        this.$router.go('/');
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss">
  .entries {
    height: 200px;
    overflow-y: scroll;

    &__key {
      &:not(:first-child) {
        border-top: 1px solid rgba(128, 128, 128, 0.5);
        padding-top: 5px;
        margin-top: 5px;
      }
    }
  }
  .row--toolbar-entry > button {
    margin-right: 5px;
  }
</style>