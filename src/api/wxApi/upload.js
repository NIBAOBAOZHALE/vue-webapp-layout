import request from '@/utils/request'

export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    request({
      url: 'common/uploadImg.api',
      method: 'post',
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        if (res.data.flag) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(() => {})
  })
}
