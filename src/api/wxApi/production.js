import request from '@/utils/request'
import Vue from 'vue'

export function getETicketSnapProdsList(searchStr) {
  let obj
  if (searchStr) {
    obj = {
      channel: 'W',
      shelfType: 'T',
      promoType: 'S',
      merchID: Vue.merchID,
      searchStr: searchStr
    }
  } else {
    obj = {
      channel: 'W',
      shelfType: 'T',
      promoType: 'S',
      merchID: Vue.merchID
    }
  }
  return request({
    url: `ticketShelf/getProdsByType.api`,
    method: 'get',
    params: obj
  })
}

export function getPurchaseETicketList(searchStr) {
  let obj
  if (searchStr) {
    obj = {
      channel: 'W',
      shelfType: 'T',
      promoType: 'G',
      merchID: Vue.merchID,
      searchStr: searchStr
    }
  } else {
    obj = {
      channel: 'W',
      shelfType: 'T',
      promoType: 'G',
      merchID: Vue.merchID
    }
  }
  return request({
    url: `ticketShelf/getProdsByType.api`,
    method: 'get',
    params: obj
  })
}

export function getETicketCenterList(searchStr) {
  let obj
  if (searchStr) {
    obj = {
      channel: 'W',
      shelfType: 'F',
      merchID: Vue.merchID,
      searchStr: searchStr
    }
  } else {
    obj = {
      channel: 'W',
      shelfType: 'F',
      merchID: Vue.merchID
    }
  }

  return request({
    url: 'ticketShelf/getProdsByType.api',
    method: 'get',
    params: obj
  })
}

export function getPointsMallList(searchStr) {
  let obj
  if (searchStr) {
    obj = {
      channel: 'W',
      shelfType: 'P',
      merchID: Vue.merchID,
      searchStr: searchStr
    }
  } else {
    obj = {
      channel: 'W',
      shelfType: 'P',
      merchID: Vue.merchID
    }
  }
  return request({
    url: 'ticketShelf/getProdsByType.api',
    method: 'get',
    params: obj
  })
}

export function getEventInfList(type) {
  const obj = {
    eventSource: type,
    merchID: Vue.merchID
  }
  return request({
    url: 'mini/getEventInfList.api',
    method: 'get',
    params: obj
  })
}
