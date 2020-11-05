<template>
<div>
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
        <el-date-picker
          v-model="diaries[index].createDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否进步">
        <el-radio v-model="diaries[index].hasProgress" :label="1">进步了！很棒</el-radio>
        <el-radio v-model="diaries[index].hasProgress" :label="0">没进步，有点可惜</el-radio>
      </el-form-item>
      <el-form-item label="进步原因">
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
      diaries: [],
      page: 1,
      arriveEnd: false
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

    this.query()
  },
  methods: {
    query () {
      this.$post('progress/listDiary', {page: this.page, size: 3}).then(res => {
        res.data.forEach(i => {
          this.diaries.push(i)
        })
        this.arriveEnd = res.data.length === 0
      })
    }
  }
}
</script>

<style scoped>

</style>
