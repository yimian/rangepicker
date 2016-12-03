<style scoped lang='less'>
  .rangepicker {
    float: none;
  }
  .rangepicker-widget {
    position: absolute;
    z-index: 1000;
    border: 1px solid #ccc;
    border-radius: 3px;
    top:35px;
    background-color:#fff;
    .header {
      ul {
        margin-bottom:0px;
      }
      li:first-child a {
        border-left:0;
      }
      li:last-child a {
        border-right:0;
      }
      li.active a {
        border-top:2px solid #009688;
      }
    }
    .options {
      padding:10px;
      .options-btn {
        width:50%;
        padding:4px;
        display:inline-block;
      }
      .btn {
        width:100%;
      }
    }
    .range-picker {
      border-top: 1px solid #ccc;
      padding:14px;
      label {
        position:relative;
        width:100%;
        margin-bottom:4px;
        font-weight: normal;
        line-height:36px;
        .date-picker {
          position:absolute;
          padding-left:32px;
          top:0;
          width:100%;
        }
      }
    }
  }
</style>

<template>
  <div class="rangepicker">
    <input type="text" class="form-control" @click="toggle_range_picker" value="{{ startDate + ' 至 ' + endDate }}">
    <div class="rangepicker-widget" v-show="toggleRangePicker" :style="coordinates">
      <div class="header">
        <ul class="nav nav-tabs nav-justified">
          <li role="presentation" :class="{ 'active': isActive }" @click="switchTab"><a>自然时间</a></li>
          <li role="presentation" :class="{ 'active': !isActive }" @click="switchTab"><a>相对时间</a></li>
        </ul>
      </div>
      <div class="options">
        <div id="absolute-date" :class="{ 'hidden': !isActive }">
          <span class="options-btn" v-for="metric in options.absolute"><button type="button" class="btn btn-default" @click="changeDateRange(metric)">{{ metric.name }}</button></span>
        </div>
        <div id="relative-date" :class="{ 'hidden': isActive }">
          <span class="options-btn" v-for="metric in options.relative"><button type="button" class="btn btn-default" @click="changeDateRange(metric)">{{ metric.name }}</button></span>
        </div>
      </div>
      <div class="range-picker">
        <label for="start-date">开始 <datepicker :min="startMin" :value.sync="startDate" :language="language" :max="startMax"></datepicker></label>
        <label for="end-date">结束 <datepicker :min="endMin" :value.sync="endDate" :language="language" :max="endMax"></datepicker></label>
      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment'
  import datepicker from './datepicker.vue'
  export default {
    props: {
      language: {
        type: String,
        required: false,
        default: 'ch'
      },
      adjustBy: {
        type: String,
        required: false,
        default: 'day',
      },
      hasAdjuster: {
        type: Boolean,
        required: false,
        default: false,
      },
      dateFormat: {
        type: String,
        required: false,
        default: 'YYYY-MM-DD'
      },
      startDate: {
        type: String,
        required: true,
        twoWay: true,
        default: moment().format('YYYY-MM-DD')
      },
      endDate: {
        type: String,
        required: true,
        twoWay: true,
        default: moment().format('YYYY-MM-DD')
      },
      startMin: {
        type: String,
        required: false,
        default: '1970-01-01',
      },
      endMin: {
        type: String,
        required: false,
        default: '1970-01-01'
      },
      startMax: {
        type: String,
        required: false,
        default: moment().format('YYYY-MM-DD')
      },
      endMax: {
        type: String,
        required: false,
        default: moment().format('YYYY-MM-DD')
      },
      absoluteOption: {
        type: Array,
        required: false,
        default: function() {
          return [
          ];
        }
      },
      relativeOption: {
        type: Array,
        required: false,
        default: function() {
          return [
          ];
        }
      }
    },
    data() {
      return {
        toggleRangePicker: false,
        coordinates: {},
        options: {
          absolute: [
            {'name': '今天', 'value': 0, 'unit': 'day', 'type': 'absolute', 'weekFormat': 'isoweek'},
            {'name': '昨天', 'value': 1, 'unit': 'day', 'type': 'absolute', 'weekFormat': 'isoweek'},
            {'name': '本周', 'value': 0, 'unit': 'week', 'type': 'absolute', 'weekFormat': 'isoweek'},
            {'name': '上周', 'value': 1, 'unit': 'week', 'type': 'absolute', 'weekFormat': 'isoweek'},
            {'name': '本月', 'value': 0, 'unit': 'month', 'type': 'absolute', 'weekFormat': 'isoweek'},
          ],
          relative: [
            {'name': '过去7天', 'value': 7, 'unit': 'day', 'type': 'relative', 'weekFormat': 'isoweek'},
            {'name': '过去30天', 'value': 30, 'unit': 'day', 'type': 'relative', 'weekFormat': 'isoweek'},
            {'name': '过去3个月', 'value': 3, 'unit': 'month', 'type': 'relative', 'weekFormat': 'isoweek'},
            {'name': '过去半年', 'value': 0.5, 'unit': 'year', 'type': 'relative', 'weekFormat': 'isoweek'},
          ],
        },
        isActive: true,
      }
    },
    watch: {
      startDate(v) {
        console.log(v);
        this.endMin = this.startDate;
      },
      endDate(v) {
        this.startMax = this.endDate;
      },
    },
    ready() {
      var self = this;
      this.absoluteOption.map(function (option) {
        self.options.absolute.push(option);
      })
      this.relativeOption.map(function (option) {
        self.options.relative.push(option);
      })
      if(this.$el.parentNode.offsetWidth + this.$el.parentNode.offsetLeft - this.$el.offsetLeft <= 300){
          this.coordinates = {right: '10', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
      }else{
          this.coordinates = {left: '10', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
      }
      window.addEventListener('click', this.close)
    },
    beforeDestroy() {
      window.removeEventListener('click', this.close)
    },
    components: { datepicker },
    methods: {
      adjustRangeBy(term) {
        term = term || term in ['day', 'isoweek', 'month', 'quarter', 'year'] ? term : 'day';
        this.startDate = moment(this.startDate).startOf(term).format(this.dateFormat);
        this.endDate = moment(this.endDate).endOf(term).format(this.dateFormat);
        if (moment(this.endDate) > moment()) {
          this.endDate = moment().format(this.dateFormat);
        }
      },
      toggle_range_picker() {
        this.toggleRangePicker = !this.toggleRangePicker;
      },

      switchTab() {
        this.isActive = !this.isActive;
      },

      close(e) {
        // let rangepickerEl = this.$el.getElementsByClassName('rangepicker')[0];
        if(!this.$el.contains(e.target)){
          this.toggleRangePicker = false;
        }
      },

      changeDateRange(metric) {
        if (metric.type === 'absolute') {
          this.startDate = moment().startOf(metric.unit === 'week' ? metric.weekFormat : metric.unit).subtract(metric.value, metric.unit).format(this.dateFormat);
          if (metric.value) {
            this.endDate = moment().subtract(metric.value, metric.unit).endOf(metric.unit === 'week' ? metric.weekFormat : metric.unit).format(this.dateFormat);
          } else {
            this.endDate = moment().format(this.dateFormat);
          }
        } else if (metric.type === 'relative') {
          this.startDate = moment().subtract(metric.value, metric.unit).format(this.dateFormat);
          this.endDate = moment().format(this.dateFormat);
        }
        this.toggle_range_picker();
      }
    },
  }
</script>
