class Http {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
    this.xmlhttp = new XMLHttpRequest()
  }
  //   执行ajax
  runAjax(methods, api, params) {
    return new Promise((resolve, reject) => {
      this[`${methods}`](api, params)
      this.xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          return resolve(this.responseText)
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
    let url = ''
    for (let i in params) {
      url += `${i}=${params[i]}&`
    }
    return url.slice(0, url.length - 1)
  }
  // post请求
  post(api, params) {
    let { xmlhttp, getReqUrl, baseUrl } = this
    xmlhttp.open('POST', baseUrl + api)
    // 暂时只支持上传formData
    xmlhttp.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    )
    xmlhttp.send(getReqUrl(params))
  }
}
export default new Http()
