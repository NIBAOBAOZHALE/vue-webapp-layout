const weChatMiniDesignPage = {
  homePage: undefined,
  name: undefined,
  oprId: undefined,
  pageId: undefined,
  setting: {
    pageTitle: undefined,
    background: '#FFFFFF',
    name: undefined,
    pageTitleEnable: undefined,
    shareText: undefined,
    shareImageUrl: undefined
  },
  miniLayout: [],
  webLayout: []
}

const aliPaytMiniDesignPage = {
  pageID: '',
  merchID: '11',
  channel: 'A',
  name: '',
  templateName: '',
  type: '',
  setting: {
    pageTitle: '',
    background: '#FFFFFF',
    shareTitle: '',
    shareImageUrl: [],
    pageUrl: '',
    templateName: '',
    pageName: ''
  },
  layout: []
}

const weChatMiniDesignBaseConfig = {
  designID: '',
  merchID: '11',
  channel: 'W',
  extConfig: {
    merchStr: '11',
    baseURL: '',
    imgBaseUrl: '',
    theme: '#333333',
    tabEable: true,
    homePage: 'pages/personal/personal',
    tabList: ['pages/home/home', 'pages/personal/personal']
  },
  tabConfig: {
    color: '#999999',
    selectedColor: '#333333',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/home',
        text: '首页',
        iconPath: '/static/img/tab/home_red.png',
        selectedIconPath: '/static/img/tab/home_red_select.png'
      },
      {
        pagePath: 'pages/personal/personal',
        text: '个人中心',
        iconPath: '/static/img/tab/avatar_red.png',
        selectedIconPath: '/static/img/tab/avatar_red_select.png'
      }
    ]
  }
}

const weChatMiniDesignBasics = {
  webConfig: {
    // 基础配置
    config: {
      merchStr: '11',
      baseURL: process.env.VUE_APP_BASE_API,
      imgBaseUrl: process.env.VUE_APP_IMAGE_URL,
      navigatorColor: '',
      titleColor: 0,
      tabsEnable: false,
      homePage: 'pages/home/center',
      title: '',
      theme: '#333333',
      tabsList: [
        {
          pagePath: '',
          text: '',
          iconPath: '',
          selectedIconPath: '',
          Selected: '',
          UnSelected: ''
        },
        {
          pagePath: 'pages/personal/personal',
          text: '个人中心',
          iconPath: '/static/tabBar/avatar_red.png',
          selectedIconPath: '/static/tabBar/avatar_red_select.png',
          Selected: 'icon_home_sel',
          UnSelected: 'icon_home_nor'
        }
      ]
    }
  },
  tabBar: {
    // 微信
    color: '#999999',
    selectedColor: '#333333',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/home',
        text: '首页',
        iconPath: '/static/tabBar//home_red.png',
        selectedIconPath: '/static/tabBar/home_red_select.png'
      },
      {
        pagePath: 'pages/personal/personal',
        text: '个人中心',
        iconPath: '/static/tabBar/avatar_red.png',
        selectedIconPath: '/static/tabBar/avatar_red_select.png'
      }
    ]
  }
}
// 支付宝配置
const aliPayMiniDesignBasics = {
  webConfig: {
    // 基础配置
    config: {
      merchStr: '11',
      baseURL: process.env.VUE_APP_BASE_API,
      imgBaseUrl: process.env.VUE_APP_IMAGE_URL,
      navigatorColor: '',
      titleColor: 0,
      tabsEnable: false,
      homePage: 'pages/home/center',
      title: '',
      theme: '#333333',
      tabsList: [
        {
          pagePath: '',
          text: '',
          iconPath: '',
          selectedIconPath: '',
          Selected: '',
          UnSelected: ''
        },
        {
          pagePath: 'pages/personal/personal',
          text: '个人中心',
          iconPath: '/static/tabBar/avatar_red.png',
          selectedIconPath: '/static/tabBar/avatar_red_select.png',
          Selected: 'icon_home_sel',
          UnSelected: 'icon_home_nor'
        }
      ]
    }
  },
  tabBar: {
    // 支付宝
    textColor: '#999999',
    selectedColor: '#333333',
    backgroundColor: '#FFFFFF',
    // borderStyle: "white",
    items: [
      {
        pagePath: 'pages/home/home',
        text: '主页',
        activeIcon: '/static/tabBar/icon_my_black.png',
        selectedIconPath: '/static/tabBar/icon_my_nor.png'
      },
      {
        pagePath: 'pages/main/ticketMall.index',
        text: '商城',
        activeIcon: '/static/tabBar/icon_more_blue.png',
        selectedIconPath: '/static/tabBar/icon_more_nor.png'
      }
    ]
  }
}

export {
  weChatMiniDesignPage,
  aliPaytMiniDesignPage,
  weChatMiniDesignBaseConfig,
  weChatMiniDesignBasics,
  aliPayMiniDesignBasics
}
