import request from '@/utils/request'
import { wxTabBarFilter } from '@/utils/filters'
import Vue from 'vue'

export function saveWeChatMiniBasicConfig(id = '', { ...obj }) {
  obj.tabBar.selectedColor = obj.webConfig.config.theme
  // obj.tabBar.backgroundColor = obj.webConfig.config.navigatorColor;
  obj.tabBar.list = wxTabBarFilter(
    JSON.parse(JSON.stringify(obj.webConfig.config.tabsList))
  )
  // obj.tabBar.list = tabBarListFilter(obj.tabBar.list)
  obj['ext'] = JSON.parse(JSON.stringify(obj.webConfig))
  obj.ext.config.tabsList = wxTabBarFilter(obj.ext.config.tabsList)
  if (!obj.ext.config.tabsEnable) {
    miniDesign.tabConfig = null
  }
  let miniDesign = {
    designID: id,
    merchID: window.vue.merchID,
    channel: 'W',
    extConfig: { ext: obj.ext, webConfig: obj.webConfig },
    tabConfig: obj.tabBar
  }
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/saveMiniBasicConfig.api',
      method: 'post',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: miniDesign
    })
      .then(res => {
        if (res.data.flag) {
          resolve(res)
        } else reject(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getWeChatMiniBasicConfig() {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/getMiniBasicConfig.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        channel: 'W'
      }
    })
      .then(res => {
        console.error(res)
        if (res.data.flag) {
          if (res.data.miniDesign) {
            let data = res.data.miniDesign
            const ext = JSON.parse(data.extConfig)
            let tabBar = {}
            if (Vue.isJSON(data.tabConfig)) {
              tabBar = JSON.parse(data.tabConfig)
            } else {
              tabBar = {}
            }
            resolve({ data, ext, tabBar })
          } else {
            resolve('newBasicConfig')
          }
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function saveWeChatMiniPageConfig(id = '', type, obj) {
  return request({
    url: 'mini/saveMiniPage.api',
    method: 'post',
    data: {
      pageID: id,
      merchID: window.vue.merchID,
      channel: 'W',
      name: obj.name,
      type: type,
      setting: obj.setting,
      layout: obj.layout,
      apply: 'N'
    }
  })
}

export function getWeChatMiniPageList(type) {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/getMiniPageTemplateList.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        channel: 'W',
        pageType: type
      }
    })
      .then(res => {
        if (res.data.flag) {
          console.error('模板数据')
          console.error(res)
          let data = res.data.merchDesignPageList
          for (let item of data) {
            for (let key in item) {
              if (key === 'layout') {
                let arr = JSON.parse(item.layout)
                item[key] = arr
              }
              if (key === 'setting') {
                let object = JSON.parse(item.setting)
                item[key] = object
              }
            }
          }
          const object = {
            res: res,
            data: data
          }
          resolve(object)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getWeChatTemplateList(type) {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/getMiniPageTemplateList.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        channel: 'W',
        pageType: type
      }
    })
      .then(res => {
        if (res.data.flag) {
          console.error('模板数据')
          console.error(res)
          let data = res.data.templateList
          for (let item of data) {
            for (let key in item) {
              if (key === 'layout') {
                let arr = JSON.parse(item.layout)
                item[key] = arr
              }
              if (key === 'setting') {
                let object = JSON.parse(item.setting)
                item[key] = object
              }
            }
          }
          const object = {
            res: res,
            data: data
          }
          resolve(object)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getWeChatMiniTemplateByPageID(id) {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/getMiniTemplateByPageID.api',
      method: 'get',
      params: {
        pageID: id
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

export function removeWeChatMiniPage(id) {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/deleteMiniPage.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        pageID: id
      }
    })
      .then(res => {
        // console.log(res)
        if (res.data.flag) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
}

export function removeWeChatMiniTemplate(id) {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/delMiniTemplate.api',
      method: 'get',
      params: {
        pageID: id
      }
    })
      .then(res => {
        // console.log(res)
        if (res.data.flag) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
}

/* 获取链接 */
export function getLinks() {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/chooseLink.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        channel: 'W'
      }
    })
      .then(res => {
        const data = res.data
        const headUrl = data.headUrl
        for (let obj of data.webList) {
          if (obj.webUri) {
            delete obj['miniUri']
            obj['webUri'] = headUrl + obj['webUri']
          }
        }

        for (let obj of data.miniList) {
          if (obj.webUri) {
            delete obj['webUri']
          }
        }
        console.log(data)
        resolve(data)
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
}

/* 获取小程序内部链接 */
export function getWeChatMiniInternalLinks() {
  console.log(new Vue())
  console.log(Vue)
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/chooseLink.api',
      method: 'get',
      params: {
        merchID: window.vue.merchID,
        channel: 'W',
        tabSelect: 'Y'
      }
    })
      .then(res => {
        if (res.data.flag) {
          const data = res.data

          // for (let obj of data.webList) {
          //   if (obj.webUri) {
          //     delete obj["miniUri"];
          //     obj["webUri"] = headUrl + obj["webUri"];
          //   }
          // }
          for (let obj of data.miniList) {
            if (obj.webUri) {
              delete obj['webUri']
            }
          }
          console.log(data.miniList)
          resolve(data)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
}

export function saveVipHomePageConfig(id = '', obj) {
  let index = 0
  for (let item of obj.layout) {
    if (item.comp == 'memberShipCard') {
      let memberShipCard = item
      obj.layout.splice(index, 1)
      obj.layout.unshift(memberShipCard)
      break
    }
    index = index + 1
  }
  console.log(obj.layout)
  return request({
    url: 'mini/saveMiniPage.api',
    method: 'post',
    data: {
      pageID: id,
      merchID: window.vue.merchID,
      channel: 'W',
      name: obj.name,
      type: 'M',
      setting: obj.setting,
      layout: obj.layout,
      apply: 'N'
    }
  })
}

export function saveWeChatMiniTemplate(id = '', obj) {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/saveMiniTemplate.api',
      method: 'post',
      data: {
        pageID: id,
        merchID: window.vue.merchID,
        channel: 'W',
        name: obj.name,
        setting: obj.setting,
        layout: obj.layout,
        apply: 'N'
      }
    })
      .then(res => {
        if (res.data.flag && !res.data.msg) {
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

export function applyWeChatMiniTemplate(id, obj) {
  return new Promise((resolve, reject) => {
    request({
      url: 'mini/saveMiniTemplate.api',
      method: 'post',
      data: {
        pageID: id,
        merchID: window.vue.merchID,
        channel: 'W',
        name: obj.name,
        setting: obj.setting,
        layout: obj.layout,
        apply: 'Y'
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

export function applyWeChatMiniPage(id = '', type, obj) {
  return request({
    url: 'mini/saveMiniPage.api',
    method: 'post',
    data: {
      pageID: id,
      merchID: window.vue.merchID,
      channel: 'W',
      name: obj.name,
      type: type,
      setting: obj.setting,
      layout: obj.layout,
      apply: 'Y'
    }
  })
}
