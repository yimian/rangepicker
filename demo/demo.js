var Vue = require('vue')

var app = new Vue({
  el: "#app",
  components: { demo: require('./demo.vue') },
  data: function() {
    return {
    };
  }
});
