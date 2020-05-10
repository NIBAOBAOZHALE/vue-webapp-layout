class Http {
  constructor(
    {
      url = '',
      method = 'get',
      data = {},
      async = true,
      success,
      error,
      progress,
      headers = {}
    },
    time = 5000
  ) {
    this.baseUrl = process.env.VUE_APP_BASE_URL
    this.xmlhttp = new XMLHttpRequest()
    this.option = { url, data, success, error, progress, headers, time }
  }
  start() {
    this.checkOption()
  }
  // 配置校验
  checkOption() {
    let { url, header, time, data } = this.option
    if (typeof url !== 'string' || url === '') {
      throw new Error('url必须是不为空的字符串')
    }
    if (typeof header !== 'object') {
      throw new Error('请求头必须以键值对的形式传入')
    }
    if (typeof data !== 'object') {
      throw new Error('参数必须以键值对的形式传入')
    }
    if (typeof time !== 'number') {
      throw new Error('超时时间必须为number类型')
    }
  }

  //   执行ajax
  runAjax(methods, api, params) {
    return new Promise((resolve, reject) => {
      this[`${methods}`](api, params)
      this.xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(this.responseText)
          } else {
            reject('请求异常')
          }
        }
      }
    })
  }
  //   get请求
  get(api, params) {
    let { xmlhttp, getReqUrl, baseUrl } = this
    xmlhttp.open(
      'GET',
      `${baseUrl}${api}${params ? '?' : ''}${getReqUrl(params)}`,
      true
    )
    xmlhttp.send()
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
  // post请求
  post(api, params) {
    let { xmlhttp, getReqUrl, baseUrl } = this
    xmlhttp.open('POST', baseUrl + api)
    // 暂时只支持上传formData
    params = getReqUrl(params)
    if (params.constructor.name !== 'FormData') {
      // 没有上传文件的时候设置content-type
      xmlhttp.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )
    }
    this.handleProgress()
    xmlhttp.send(params)
  }
  //上传事件进度条
  handleProgress() {
    this.xmlhttp.upload.addEventListener('progress', function(e) {
      this.progress = e.loaded
      console.log(e.loaded)
    })
  }
}
export default new Http()
