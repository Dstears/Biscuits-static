<template>
<div>
  <loading v-if="loading"/>
  <div v-if="isTodayDone !== true">
    <el-card>
      <el-form
        ref="today"
        :model="today"
        label-width="80px"
      >
        <el-form-item label="是否进步">
          <el-radio v-model="today.hasProgress" :label="1">进步了！很棒</el-radio>
          <el-radio v-model="today.hasProgress" :label="0">没进步，有点可惜</el-radio>
        </el-form-item>
        <el-form-item label="进步内容" v-if="today.hasProgress === 1"  prop="progressDetail" :rules="[{ validator: checkProgressDetail, trigger: 'change' }]">
          <el-input type="textarea" v-model="today.progressDetail"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="onSubmit">保存</el-button>
          <el-button size="mini"  @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <div
    v-for="(i,index) in diaries"
    :key="index">
  <el-card style="margin-top: 5px">
    <el-form
      disabled
      :ref="'last'+index"
      :model="diaries[index]"
      label-width="80px"
      >
      <el-form-item label="日期">
        <span>{{diaries[index].createDate}}</span>
      </el-form-item>
      <el-form-item label="是否进步">
        <span v-if="diaries[index].hasProgress === 1" style="color:greenyellow">进步了！很棒</span>
        <span v-if="diaries[index].hasProgress === 0">没进步，有点可惜</span>
      </el-form-item>
      <el-form-item label="进步内容" v-if="diaries[index].hasProgress === 1">
        <el-input type="textarea" v-model="diaries[index].progressDetail"/>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
  <div v-if="arriveEnd" style="text-align: center;margin-top: 5px">
    <span>已经没有啦</span>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      diaries: [],
      today: {
        progressDetail: null,
        hasProgress: 1
      },
      page: 1,
      arriveEnd: false,
      isTodayDone: true
    }
  },
  mounted () {
    const _this = this
    window.addEventListener('scroll', function () {
      const scr = document.documentElement.scrollTop || document.body.scrollTop // 向上滚动的那一部分高度
      const clientHeight = document.documentElement.clientHeight // 屏幕高度也就是当前设备静态下你所看到的视觉高度
      const scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight // 整个网页的实际高度，兼容Pc端
      if (scr + clientHeight + 10 >= scrHeight) {
        if (!_this.arriveEnd) {
          _this.page = _this.page + 1
          _this.query()
        }
      }
    })
    this.init()
  },
  methods: {
    init () {
      this.$get('progress/countTodayDiary').then(res => {
        this.isTodayDone = res.data !== 0
      })

      this.query()
    },
    onSubmit () {
      this.loading = true
      this.validate('today', () => {
        this.$post('progress/saveTodayDiary', this.today).then(res => {
          this.init()
          this.loading = false
        })
      })
    },
    reset () {
      this.today = {
        progressDetail: null,
        hasProgress: 1
      }
    },
    query () {
      this.$post('progress/listDiary', {page: this.page, size: 3}).then(res => {
        res.data.forEach(i => {
          this.diaries.push(i)
        })
        this.arriveEnd = res.data.length === 0
      })
    },
    checkProgressDetail (rule, value, callback) {
      if (this.today.hasProgress === 1 && (!this.today.progressDetail || this.today.progressDetail === '')) {
        return callback(new Error('到底进步了什么呢'))
      }
      return callback()
    }
  }
}
</script>

<style scoped>

</style>
