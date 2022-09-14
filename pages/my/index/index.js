// pages/my/index/index.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

var authManager = require('../../../common/authManager.js');

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "userInfo": {
      "_openid": ""
    },
    "hasUserInfo": false,
    items: [{
      "name": "下载券",
      "icon": "coupon-o"
    },
    {
      "name": "更多小程序",
      "icon": "apps-o"
    },
    {
      "name": "关于",
      "icon": "user-o"
    }],
  },

  selected(item) {
    let name = item.currentTarget.dataset["name"]
    if (name === "关于") {
      wx.navigateTo({
        url: `/pages/my/about/about`,
      });      
    } else if (name === "下载券") {
      if (!this.hasUserInfo) {
        this.alertLogin()
        return
      }
      wx.navigateTo({
        url: `/pages/my/ticket/index`,
      });
    } else if (name === "更多小程序") {
      wx.navigateTo({
        url: `/pages/my/more/more`,
      });
    }
  },

  alertLogin() {
    Dialog.confirm({
      title: '您好, 需要先登录才能查看！',
      confirmButtonText: '登录'
    })
    .then(() => {
      // on confirm
      this.login()
    })
    .catch(() => {
      // on cancel
    });
  },

  login() {
    if (this.hasUserInfo) {
      return;
    }
    // this.getUserProfile();
    let that = this;
    authManager.login().then(function (userInfo) {
      console.log("AAA", userInfo)
      that.hasUserInfo = true
      that.setData({
        "userInfo" : userInfo,
        "hasUserInfo" : true
      })
      wx.setStorage({
        data: {
          value: userInfo
        },
        key: 'userInfo',
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.hasUserInfo = true;
        that.userInfo = res.data.value;
        that.setData({
          hasUserInfo: true,
          userInfo: res.data.value
        })
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})