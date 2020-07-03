export function ticketTypeResolver(type) {
  const typeHashMap = {
    V: '代金券',
    D: '折扣券',
    P: '礼品券',
    G: '兑换券'
  }
  try {
    return typeHashMap[type]
  } catch (e) {
    return type
  }
}

export function shelfTypeResolver(type) {
  const typeHashMap = {
    P: '积分商城',
    F: '领券中心',
    T: '电子券商城'
  }
  try {
    return typeHashMap[type]
  } catch (e) {
    return type
  }
}
