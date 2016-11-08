forked from `https://github.com/showonne/vue-datepicker`
# rangepicker

> rangepicker component for Vue.js, support Vue.js 1.x.

##Usage

####use with single `.vue` file:
refer to: demo/demo.html

```html
<template>
    <div>
        <rangepicker :start-date.sync="startDate" :end-date.sync="endDate"></rangepicker>
    </div>
</template>

<script>
    import rangepicker from 'path/to/rangepicker.vue'
    export default {
        data() {
            return {
                startDate: '',
                endDate: '',
            }
        },
        components: { rangepicker }
    }
</script>
```

####use in browser:
refer to demo/index.html

```html
//index.html
<html>
    <script src="path/to/vue.js"></script>
    <script src="path/to/datepicker.js"></script>
    <body>
        <div id="app">
          <div class="date-picker">
            <label for="">选择时间：</label>
            <rangepicker v-ref:rangepicker :start-date.sync="startDate" :end-date.sync="endDate" :language="language" :absolute-option="absoluteOption"></rangepicker>
          </div>
        </div>
        <script>
          var app = new Vue({
            el: '#app',
            data: {
              language: 'ch',
              startDate: '',
              endDate: '',
              absoluteOption: [
                  {'name': '上月', 'value': 1, 'unit': 'month', 'type': 'absolute', 'weekFormat': 'isoweek'},
                  {'name': '本季度', 'value': 0, 'unit': 'quarter', 'type': 'absolute', 'weekFormat': 'isoweek'}
              ]
            },
            components: { rangepicker }
          })
        </script>
    </body>
</html>
```

> if you want to adjust date range by day/isoweek/month/quarter/year, add ref to component, call ref's function adjustRangeBy:
```
$vm.$refs.rangepicker.adjustRangeBy('isoweek')
```
