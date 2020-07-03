import request from '@/utils/request'

export function releaseWeChatMiniProgram() {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/releaseMini.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        channel: 'W'
      }
    })
      .then(res => {
        if (res.data.flag) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function getWxMiniExperienceQRCode() {
  return request({
    url: 'mini/getWxMiniExperienceQrcode.api',
    method: 'get',
    params: {
      channel: 'W',
      merchID: window.vue.merchID
    }
  })
}

export function getMiniVersionAndAuditStatus() {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/queryMiniVersionAndAuditStatus.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        channel: 'W'
      }
    })
      .then(res => {
        if (res.data.flag) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function addWxTester(userName, wechatID) {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/addWxTester.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        userName: userName,
        wechatID: wechatID
      }
    })
      .then(res => {
        if (res.data.flag) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
