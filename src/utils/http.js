class Http {
  constructor({
    url = '',
    method = 'get',
    data = {},
    resolve,
    reject,
    progress,
    time = 5000
  }) {
    this.baseUrl = process.env.VUE_APP_BASE_URL
    this.xmlhttp = new XMLHttpRequest()
    this.option = { url, data, resolve, reject, progress, time, method }
    this.start()
  }

  start() {
    this.checkOption()
    this.initOption()
    this.open()
    this.setHeader()
    this.send()
    this.responseData()
  }

  // 配置校验
  checkOption() {
    let { url, time, method, reject, resolve, progress } = this.option
    if (typeof url !== 'string' || url === '') {
      throw new Error('url必须是不为空的字符串')
    }
    if (typeof time !== 'number') {
      throw new Error('超时时间必须为number类型')
    }
    if (typeof method !== 'string') {
      throw new Error('请求方法必须是符合规范的字符串')
    }
    if (
      typeof reject !== 'function' ||
      typeof resolve !== 'function' ||
      typeof progress !== 'function'
    ) {
      throw new Error('reject,resolve,progress都应该为函数')
    }
  }

  // 处理各项配置
  initOption() {
    let { method, data } = this.option
    method = method.toUpperCase() //方法转换为大写
    data = this.getReqUrl(data) //处理参数
    this.option = { data, method, ...this.option }
  }

  // 建立连接
  open() {
    let { data, method, url, progress } = this.option
    if (method === 'GET') {
      this.xmlhttp.open(
        'GET',
        `${this.baseUrl}${url}${data ? '?' : ''}${data}`,
        true
      )
    } else {
      this.xmlhttp.open('POST', this.baseUrl + url, true)
    }
    this.xmlhttp.upload.addEventListener('progress', e => {
      progress(e)
    })
  }

  // 设置请求头
  setHeader() {
    if (this.option.data.constructor.name !== 'FormData') {
      // 没有上传文件的时候设置content-type
      this.xmlhttp.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )
    }
  }

  send() {
    let { method, data, time, reject } = this.option
    if (method === 'GET') {
      this.xmlhttp.send()
    } else {
      this.xmlhttp.send(data)
    }
    this.timeout = setTimeout(() => {
      reject('请求超时')
    }, time)
  }

  responseData() {
    let { resolve, reject } = this.option
    let { timeout } = this
    this.xmlhttp.onload = function() {
      if ((this.status >= 200 && this.status < 300) || this.status === 304) {
        clearTimeout(timeout)
        resolve(this.responseText)
      } else {
        clearTimeout(timeout)
        reject('请求异常')
      }
    }
  }

  //   获取请求参数
  getReqUrl(params) {
    if (params) {
      if (params.constructor.name === 'FormData') {
        return params
      } else {
        let url = ''
        for (let i in params) {
          url += `${i}=${params[i]}&`
        }
        return url.slice(0, url.length - 1)
      }
    } else {
      return ''
    }
  }
}

export function ajax({ url, method, data, progress, time }) {
  return new Promise((resolve, reject) => {
    return new Http({ url, method, data, resolve, reject, progress, time })
  })
}
