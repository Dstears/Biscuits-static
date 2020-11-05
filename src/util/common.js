export default {
  get (url) {
    const self = this
    return {
      then (fn) {
        self.$http.get('api/' + url).then(res => callBack(res, self, fn))
      }
    }
  },
  post (url, jsonParam) {
    const self = this
    return {
      then (fn) {
        self.$http.post('api/' + url, jsonParam).then(res => callBack(res, self, fn))
      }
    }
  },
  validate (ref, fn) {
    this.$refs[ref].validate((valid) => {
      if (valid) {
        if (typeof fn === 'function') {
          fn()
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  },
  getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  delCookie (name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.getCookie(name)
    if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
  },
  arr2tree (arr, idPropName, pIdProdName, labelPropName) {
    if (!Array.isArray(arr)) { return [] }
    for (let i = 0; i < arr.length; i++) {
      const o = arr[i]
      o.originalId = o.id
      o.originalPId = o.pId
      o.originalLabel = o.label
      o.id = o[idPropName]
      o.label = o[labelPropName]
      o.pId = o[pIdProdName]
    }
    const result = []
    arr.forEach(item => {
      if (item.pId === null || item.pId === '0' || item.pId === 0) {
        result.push(item)
        convertChild(arr, item, item.id)
      }
    })
    return result
  },
  copy (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}
function convertChild (arr, parentItem, parentId) {
  arr.forEach(item => {
    if (item.pId === parentId) {
      parentItem.children = parentItem.children ? parentItem.children : []
      item.parentLabel = parentItem.label
      parentItem.children.push(item)
      convertChild(arr, item, item.id)
    }
  })
}
const callBack = function (res, self, fn) {
  if (res.data.code === '0') {
    if (typeof fn === 'function') {
      fn(res.data)
    }
  } else if (res.data.code === '99') {
    self.$router.push({path: '/Common/login'})
  } else {
    self.$message({
      type: 'error',
      message: res.data.message
    })
  }
}
