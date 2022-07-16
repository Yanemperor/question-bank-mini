// pages/my/ticket/index.js
var ticketManager = require('../../../common/ticketManager.js');
var authManager = require('../../../common/authManager.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "userInfo": {
      "_openid": ""
    },
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
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
          userInfo: res.data.value
        })
        console.log(res);
      }
    })
  },

  getUserInfo(userInfo) {
    let that = this
    authManager.isHaveUser(userInfo).then(function (userInfo) {
      console.log("AAA", userInfo)
      that.userInfo = userInfo
      that.setData({
        "userInfo": userInfo,
      })
      wx.setStorage({
        data: {
          value: userInfo
        },
        key: 'userInfo',
      })
    });
  },

  onClick(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    let userInfo = this.userInfo;
    let that = this;
    console.log("onSelect:", userInfo);
    ticketManager.addFreeDownloadTicket(userInfo).then(function (userInfo) {
      console.log("onSelect: 刷新");
      that.getUserInfo(that.userInfo);
    }).catch( err => {
      console.log("BBB", err)
    });
    that.onClose();
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