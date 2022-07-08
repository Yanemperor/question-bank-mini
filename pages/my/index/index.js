// pages/my/index/index.js
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
      "name": "关于",
    }],

  },

  selected(item) {
    let name = item.currentTarget.dataset["name"]
    if (name === "关于") {
      wx.navigateTo({
        url: `/pages/my/about/about`,
      });
    }
  },

  login() {
    if (this.hasUserInfo) {
      return;
    }
    this.getUserProfile();
  },

  getUserProfile() {
    let that = this;
    wx.getUserProfile({
      desc: '用于我的页面展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('res:', res)
        that.userInfo = res.userInfo
        that.setData({
          "userInfo" : that.userInfo,
        })
        that.getOpenid();
      }
    })
  },

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log("res", res.result.openid);
        that.userInfo.openid = res.result.openid;
        that.isHaveUser(res.result.openid);
      }
    })
  },

  isHaveUser(openid) {
    let that = this
    db.collection('user').get({
      '_openid': openid
    }).then(res => {
      console.log("queryUser", res.data);
      if (res.data == false) {
        console.log("未注册");
        that.registered();
      } else {
        console.log("已注册");
        let userInfo = res.data[0];
        that.setData({
          "hasUserInfo": true,
        })
        console.log("userInfo", that.userInfo);
        wx.setStorage({
          data: {
            value: userInfo
          },
          key: 'userInfo',
        })
      }
    })
  },

  registered() {
    let that = this;
    db.collection('user').add({
      data: {
        nickName: that.userInfo.nickName,
        gender: that.userInfo.gender,
        language: that.userInfo.language,
        avatarUrl: that.userInfo.avatarUrl,
        createTime: Date().toString,
        freeDownload: 3,
      },
      success: function (res) {
        console.log("registered", res);
        that.setData({
          hasUserInfo: true,
          userInfo: that.userInfo,
        });
        wx.setStorage({
          data: {
            value: that.userInfo
          },
          key: 'userInfo',
        })
      }
    })
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