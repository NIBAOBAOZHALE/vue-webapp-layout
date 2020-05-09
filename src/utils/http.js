class Http {
  constructor() {
    this.baseUrl = 'http://localhost:3001'
    this.baseUrl = process.env.VUE_APP_BASE_URL
    this.xmlhttp = new XMLHttpRequest()
    this.progress = 0
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
    this.xmlhttp.upload.onprogress = function(e) {
      this.progress = e.loaded
      console.log(e.loaded)
    }
  }
}
export default new Http()
