function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('-')
    const t2 = [hour, minute, second].map(formatNumber).join(':')
    // const t3 = [year, month, day, hour, minute, second].map(formatNumber).join('-')
    return `${t1} ${t2}`
}

const selection = ['null', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
export function selectionFn(...args) {
    let arr = ''
    args.forEach(item => {
        arr += selection[item]
    })
    return arr
}

export function selectionIndexFn(str) {
    let arr = []
    let splitArr = str.split('')
    splitArr.forEach((item, index) => {
        const itemIndex = selection.findIndex(ele => ele === item)
        if (itemIndex !== -1) {
            arr.push(itemIndex - 1)
        }
    })
    return arr.sort((a, b) => (a - b))
}
export const cookie = {
    set: function(key, val, time) { // 设置cookie方法
        var date = new Date() // 获取当前时间
        var expiresDays = time // 将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000) // 格式化为cookie识别的时间
        document.cookie = key + '=' + val + ';expires=' + date.toGMTString() + ';path=/'
        // 设置cookie
    },
    get: function(key) { // 获取cookie方法
        /* 获取cookie参数 */
        var getCookie = document.cookie.replace(/[ ]/g, '') // 获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(';') // 将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips // 声明变量tips
        for (var i = 0; i < arrCookie.length; i++) { // 使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split('=') // 将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key === arr[0]) { // 匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1] // 将cookie的值赋给变量tips
                break // 终止for循环遍历
            }
        }
        return tips
    }
}

// url 转 base64 (原理： 利用canvas.toDataURL的API转化成base64)
export function urlToBase64(url) {
    return new Promise((resolve,reject) => {
      let image = new Image()
      image.onload = function() {
        let canvas = document.createElement('canvas')
        canvas.width = this.naturalWidth
        canvas.height = this.naturalHeight
        // 将图片插入画布并开始绘制
        canvas.getContext('2d').drawImage(image, 0, 0)
        // result
        let result = canvas.toDataURL('image/png')
        resolve(result)
      }
      // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
      image.setAttribute("crossOrigin",'Anonymous')
      image.src = url
      // 图片加载失败的错误处理
      image.onerror = () => {
        reject(new Error('urlToBase64 error'))
    }
  },() => {})
}

// base64 转 blob (原理：利用URL.createObjectURL为blob对象创建临时的URL)
export function base64ToBlob ({b64data = '', contentType = '', sliceSize = 512} = {}) {
    return new Promise((resolve, reject) => {
      // 使用 atob() 方法将数据解码
      let byteCharacters = atob(b64data)
      let byteArrays = []
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize)
        let byteNumbers = []
        for (let i = 0; i < slice.length; i++) {
            byteNumbers.push(slice.charCodeAt(i))
        }
        // 8 位无符号整数值的类型化数组。内容将初始化为 0。
        // 如果无法分配请求数目的字节，则将引发异常。
        byteArrays.push(new Uint8Array(byteNumbers))
      }
      let result = new Blob(byteArrays, {
        type: contentType
      })
      result = Object.assign(result,{
        // 这里一定要处理一下 URL.createObjectURL
        preview: URL.createObjectURL(result),
        name: `XXX.png`
      })
      resolve(result)
    })
}
// blob 转 base64 (原理：利用fileReader的readAsDataURL，将blob转为base64)
export function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        resolve(e.target.result)
      }
      // readAsDataURL
      fileReader.readAsDataURL(blob)
      fileReader.onerror = () => {
        reject(new Error('blobToBase64 error'))
      }
    })
}
export function toFormData(obj){
    let formData = new FormData()
    // 利用循环，将值放入同一个名字中，后台获取到的就是一个数组
    for(let key in obj){
      if(obj[key] !== null){
        if(Array.isArray(obj[key]) && obj[key].length){
          obj[key].forEach((item,index) => {
            formData.append(`${key}[${index}]`,JSON.stringify(item))
          })
        }else{
          if(typeof (obj[key]) === 'object'){
            formData.append(key,JSON.stringify(obj[key]))
          }else{
            formData.append(key,obj[key])
          }
        } 
      }
    }
    return formData
}
// 判断数组中是否有重复元素
export function moreLetter(arr) {
  if (!arr) return false;
  if (arr.length === 1) return 1;
  let result = {}
  // 先循环数组，把元素作为key值，元素出现的次数为value值，塞进result对象中
  for(let i = 0; i < arr.length; i++) {
    if (!result[arr[i]]) {
      result[arr[i]] = 1
    } else {
      result[arr[i]]++
    }
  }
 
  let keys = Object.keys(result)
  let maxNum = 0; let maxVal = ''
  // 循环对象，取出value值最大的对应的key值
  for(let i = 0; i < keys.length; i++) {
    if (result[keys[i]] > maxNum) {
      maxNum = result[keys[i]];
      maxVal = keys[i]
    }
  }
  // return maxVal+','+maxNum;
  // 返回的重复次数
  return maxNum;
}

export function onlyKey(length){
  return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}