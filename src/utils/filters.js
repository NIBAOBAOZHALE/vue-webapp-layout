import lodash from 'lodash'

export function tabsListFilter(arr) {
  let newArr = []
  for (let item of arr) {
    if (!item.pagePath) {
      continue
    } else if (item.pagePath.miniUri) {
      newArr.push(item.pagePath.miniUri)
    }
  }
  return newArr
}

export function tabBarFilter(arr) {
  let newArr = arr.map(({ pagePath, text, iconPath, selectedIconPath }) => {
    return {
      pagePath: pagePath.miniUri,
      name: text,
      icon: iconPath,
      activeIcon: selectedIconPath
    }
  })

  return newArr
}

export function wxTabBarFilter(arr) {
  let newArrs = arr.map(({ pagePath, text, iconPath, selectedIconPath }) => {
    return {
      pagePath: pagePath.miniUri,
      text: text,
      iconPath: iconPath,
      selectedIconPath: selectedIconPath
    }
  })

  return newArrs
}

export function layoutDataListIdFilter(layout) {
  let newList = [...layout]
  for (let i = 0; i < newList.length; i++) {
    newList[i].id = i
  }
  return newList
}

export function componentDataFilter(array) {
  const obj = {
    VipCard,
    Carousel,
    Title,
    PictureAds,
    Navigation,
    PointsMall,
    ETicketCenter,
    purchaseETicketByBulkPurchase,
    ETicketSnapUp,
    HotSpot,
    RichText
  }
  array = lodash.cloneDeep(array)
  try {
    array.map(item => {
      console.log([item.compType])
      return obj[item.compType](item)
    })
    console.log(array)
    return array
  } catch (e) {
    console.log('遇到错误，返回原始数据')
    console.error(e)
    return array
  }
}

function VipCard(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function Carousel(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function Title(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function PictureAds(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function Navigation(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function PointsMall(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function ETicketCenter(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function purchaseETicketByBulkPurchase(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function ETicketSnapUp(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}

function HotSpot(obj) {
  delete obj.id
  delete obj.baseData
  obj.component.data &&
    obj.component.data.map(item => {
      delete item.absolute
      return item
    })
  return obj
}

function RichText(obj) {
  delete obj.id
  delete obj.baseData
  return obj
}
