// pages/my/index/index.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "userInfo": {},
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
    if (this.hasUserInfo == true) {
      return;
    }
    console.log("开始登录");
    wx.getUserProfile({
      desc: '用于我的页面展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('res:', res)
        let userInfo = res.userInfo;
        wx.cloud.callFunction({
          name: 'login',
          complete: res => {
            console.log('callFunction test result: ', res.result.openid)
            db.collection('user').doc('todo-identifiant-aleatoire').set({
              data: {
                // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                openid: res.result.openid,
                nickName: userInfo.nickName,
                gender: userInfo.gender,
                language: userInfo.language,
                avatarUrl: userInfo.avatarUrl,
                createTime: Date().toString,
                freeDownload: 3,
              },
              success: function (res) {
                console.log(res)
                that.setData({
                  hasUserInfo : true,
                  userInfo : res.data.value
                });
                wx.setStorage({
                  data: {
                    value: userInfo
                  },
                  key: 'userInfo',
                })
              }
            })
          }
        })
      }
    })
  },

  // db.collection('user').add({
  //   // data 字段表示需新增的 JSON 数据
  //   data: {
  //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
  //     openid: res.result.openid,
  //     nickName: userInfo.nickName,
  //     gender: userInfo.gender,
  //     language: userInfo.language,
  //     avatarUrl: userInfo.avatarUrl,
  //     createTime: Date().toString,
  //   },
  //   success: function(res) {
  //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
  //     console.log(res)
  //     this.userInfo = userInfo;
  //     this.setData({
  //       userInfo: userInfo,
  //       hasUserInfo: true
  //     })
  //     wx.setStorage({
  //       data: {
  //         value: this.value
  //       },
  //       key: 'indexValue',
  //     })
  //   }
  // })

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
          hasUserInfo : true,
          userInfo : res.data.value
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