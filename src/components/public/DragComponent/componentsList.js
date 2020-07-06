const componentList = [
  {
    id: '',
    compType: 'VipCard',
    platform: {
      W: true,
      A: true
    },
    baseData: {
      previewImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
      form: 'VipCardForm'
    },
    moduleInfo: {
      moduleImg: require('../../../assets/img/componentIcon/会员卡.png'),
      module: 'baseModule'
    },
    component: {
      type: '会员卡',
      coverImgUrl: '',
      coverImgId: '',
      marginTop: 0, // 上间距
      marginBottom: 0, // 下间距
      marginLeft: 0, // 左间距
      marginRight: 0, // 右间距
      logoType: 1, //1 商户logo，2 用户头像
      nameType: 1, //1 商户名称，2 用户昵称，3 手机号码，4 会员卡号
      borderRadius: true,
      infoItems: [
        {
          name: '余额',
          enable: true,
          code: 'depositCurrent'
        },
        {
          name: '积分',
          enable: true,
          code: 'pointCurrent'
        },
        {
          name: '优惠券',
          enable: true,
          code: 'ticketCount'
        },
        {
          name: '成长值',
          enable: true,
          code: 'growthCurrent'
        }
      ],
      fontColor: undefined
    }
  },
  {
    id: '',
    compType: 'Carousel',
    platform: {
      W: true,
      A: true
    },
    baseData: {
      previewImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
      form: 'CarouselForm'
    },
    moduleInfo: {
      module: 'baseModule',
      moduleImg: require('../../../assets/img/componentIcon/轮播图.png')
    },
    component: {
      type: '轮播图',
      marginTop: 0, // 上间距
      marginBottom: 0, // 下间距
      marginLeft: 0, // 左间距
      marginRight: 0, // 右间距
      height: '340',
      interval: undefined, //轮播间隔
      borderRadius: false, // 圆角
      data: []
    }
  },
  {
    id: '',
    compType: 'Title',
    platform: {
      W: true,
      A: true
    },
    baseData: {
      previewImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
      form: 'Title_form'
    },
    moduleInfo: {
      moduleImg: require('../../../assets/img/componentIcon/标题.png'),
      module: 'baseModule'
    },
    component: {
      type: '标题', // 标题组件
      text: '', // 标题内容
      align: 1, // 显示位置，1-居左，2-居中，3-居右
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0, // 左间距
      marginRight: 0, // 右间距
      fontWeight: 0, // 0 normal,1 bold
      fontSize: 12,
      fontColor: '#000000',
      backgroundColor: '#FFFFFF',
      link: null
    }
  },
  {
    id: '',
    compType: 'PictureAds',
    platform: {
      W: true,
      A: true
    },
    baseData: {
      previewImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
      form: 'PictureAdsForm'
    },
    moduleInfo: {
      moduleImg: require('../../../assets/img/componentIcon/图片.png'),
      module: 'baseModule'
    },
    component: {
      type: '图片', // 标题组件
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0, // 左间距
      marginRight: 0, // 右间距
      link: undefined,
      imageUrl: undefined,
      imageId: undefined,
      borderRadius: false // 圆角
    }
  },
  {
    id: '',
    compType: 'Navigation',
    platform: {
      W: true,
      A: true
    },
    baseData: {
      previewImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
      form: 'NavigationForm'
    },
    moduleInfo: {
      moduleImg: require('../../../assets/img/componentIcon/功能导航.png'),
      module: 'baseModule'
    },
    component: {
      type: '功能导航', // 标题组件
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0, // 左间距
      marginRight: 0, // 右间距
      direction: 0, // 0横向显示 1纵向显示
      rowStyle: 0, // 0多行展示 1横向滑动
      numberOfRowItems: 4, // 单行元素数量
      enableImg: true, // 是否启用导航图片,
      link: '',
      data: [
        {
          title: undefined,
          fontColor: '#000000',
          imageUrl: undefined,
          link: undefined,
          imageId: undefined
        }
      ]
    }
  },

  // {
  //   id: '',
  //   compType: 'PointsMall',
  //   platform: {
  //     W: true,
  //     A: true
  //   },
  //   baseData: {
  //     previewImg:
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
  //     form: 'PointsMallForm'
  //   },
  //   moduleInfo: {
  //     moduleImg: require('../../../assets/img/componentIcon/积分商城.png'),
  //     module: 'marketingModule'
  //   },
  //   component: {
  //     type: '积分商城', // 标题组件
  //
  //     marginTop: 0,
  //     marginBottom: 0,
  //     marginLeft: 0, // 左间距
  //     marginRight: 0, // 右间距
  //     enableTitle: true,
  //     borderRadius: false, // 圆角
  //     data: []
  //   }
  // },
  // {
  //   id: '',
  //   compType: 'ETicketCenter',
  //   platform: {
  //     W: true,
  //     A: true
  //   },
  //   baseData: {
  //     previewImg:
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
  //     form: 'ETicketCenterForm'
  //   },
  //   moduleInfo: {
  //     moduleImg: require('../../../assets/img/componentIcon/领券中心.png'),
  //     module: 'marketingModule'
  //   },
  //   component: {
  //     type: '领券中心', // 标题组件
  //     marginTop: 0,
  //     marginBottom: 0,
  //     marginLeft: 0, // 左间距
  //     marginRight: 0, // 右间距
  //     borderRadius: false, // 圆角
  //     data: [],
  //     enableTitle: true
  //   }
  // },

  // {
  //   id: "",
  //   component: {
  //     type: "关注公众号", //标题组件
  //     module: "baseModule",
  //     marginTop: 0,
  //     marginBottom: 0,
  //     data: []
  //   }
  // },
  // {
  //   id: "",
  //   component: {
  //     type: "图片热点", //标题组件
  //     module: "marketingModule",
  //     marginTop: 0,
  //     marginBottom: 0,
  //     data: []
  //   }
  // },
  // {
  //   id: '',
  //   compType: 'purchaseETicketByBulkPurchase',
  //   platform: {
  //     W: true,
  //     A: true
  //   },
  //   baseData: {
  //     previewImg:
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
  //     form: 'purchaseETicketByBulkPurchaseForm'
  //   },
  //   moduleInfo: {
  //     moduleImg: require('../../../assets/img/componentIcon/电子券拼团.png'),
  //     module: 'marketingModule'
  //   },
  //   component: {
  //     type: '电子券拼团', // 标题组件
  //     text: '电子券拼团', // 标题内容
  //     marginTop: 0,
  //     marginBottom: 0,
  //     marginLeft: 0, // 左间距
  //     marginRight: 0, // 右间距
  //     borderRadius: false, // 圆角
  //     enableTitle: true,
  //
  //     data: []
  //   }
  // },
  // {
  //   id: '',
  //   form: 'ETicketSnapUpForm',
  //   compType: 'ETicketSnapUp',
  //   platform: {
  //     W: true,
  //     A: true
  //   },
  //   baseData: {
  //     previewImg:
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
  //     form: 'ETicketSnapUpForm'
  //   },
  //   moduleInfo: {
  //     moduleImg: require('../../../assets/img/componentIcon/电子券秒杀.png'),
  //     module: 'marketingModule'
  //   },
  //   component: {
  //     type: '电子券秒杀', // 标题组件
  //     marginTop: 0,
  //     enableTitle: true,
  //     marginBottom: 0,
  //     marginLeft: 0, // 左间距
  //     marginRight: 0, // 右间距
  //     data: []
  //   }
  // },
  {
    id: '',
    compType: 'HotSpot',
    platform: {
      W: true,
      A: true
    },
    baseData: {
      previewImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
      form: 'HotSpotForm'
    },
    moduleInfo: {
      module: 'baseModule',
      moduleImg: require('../../../assets/img/componentIcon/图片热点.png')
    },
    component: {
      type: '图片热点', // 组件名字
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0, // 左间距
      marginRight: 0, // 右间距
      borderRadius: false, // 圆角
      data: [
        {
          width: 0.4803,
          height: 0.2334,
          x: 0.0351,
          y: 0.2466,
          url: 'www.baidu.com',
          name: '百度',
          absolute: { width: 232, height: 229, x: 17, y: 242 }
        },
        {
          width: 0.207,
          height: 0.1019,
          x: 0.2753,
          y: 0.0336,
          url: 'www.google.com',
          name: '谷歌',
          absolute: { width: 100, height: 100, x: 133, y: 33 }
        }
      ],
      imageHotSpotUrl: '',
      imageId: ''
    }
  },
  {
    id: '',
    compType: 'RichText',
    platform: {
      W: true,
      A: true
    },
    baseData: {
      previewImg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
      form: 'RichTextForm'
    },
    moduleInfo: {
      moduleImg: require('../../../assets/img/componentIcon/文本.png'),
      module: 'baseModule'
    },
    component: {
      type: '文本', // 标题组件
      text: '', // 标题内容
      align: 1, // 显示位置，1-居左，2-居中，3-居右
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0, // 左间距
      marginRight: 0, // 右间距
      fontWeight: 0, // 0 normal,1 bold
      fontSize: 12,
      fontColor: '#000000',
      backgroundColor: '#FFFFFF'
    }
  }
]

export default componentList
