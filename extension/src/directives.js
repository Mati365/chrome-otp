import Vue from 'vue';

/**
 * Some thumbnails cannot be loaded so
 * directive replace them with placeholder
 */
Vue.directive('placeholder-if-broken', function() {
  this.el.onerror = function(e) {
    this.src = 'https://avatars2.githubusercontent.com/u/8255302?v=3&s=96';
    e.preventDefault();
  };
});

Vue.directive('copy-field', function() {
  this.el.onclick = () => {
    // Select text
    if (document.selection) {
      let range = document.body.createTextRange();
      range.moveToElementText(this.el);
      range.select();
    } else if (window.getSelection) {
      let range = document.createRange();
      range.selectNode(this.el);
      window.getSelection().addRange(range);
    }

    // Copy and alert
    document.execCommand('copy');
  };
});