// pages/file/index/index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    data: [],
    value: 0,
    options: [{
        text: '高起专',
        value: 0,
        items: [{
            name: '语文',
            id: 100,
          },
          {
            name: '数学(理)',
            id: 200,
          },
          {
            name: '数学(文)',
            id: 300,
          },
          {
            name: '英语',
            id: 400,
          }, {
            name: '理化综合',
            id: 500,
          }, {
            name: '史地综合',
            id: 600,
          }
        ]
      },
      {
        text: '专升本',
        value: 1,
        items: [{
            name: '大学语文',
            id: 1000,
          },
          {
            name: '高数一',
            id: 2000,
          },
          {
            name: '高数二',
            id: 3000,
          },
          {
            name: '大学英语',
            id: 4000,
          }, {
            name: '大学政治',
            id: 5000,
          }, {
            name: '医学综合',
            id: 6000,
          }, {
            name: '教育理论',
            id: 7000,
          },
          {
            name: '民法',
            id: 8000,
          }, {
            name: '艺术概论',
            id: 9000,
          }, {
            name: '生态学',
            id: 10000,
          }
        ]
      }
    ]
  },

  change(index) {
    console.log(index);
    this.value = index.detail;
    this.setData({
      value: this.value
    })
    wx.setStorage({
      data: {
        value: this.value
      },
      key: 'fileValue',
    })
  },

  selected(item) {
    let id = item.currentTarget.dataset["id"]
    console.log("id:" + id);
    wx.navigateTo({
      url: `/pages/file/list/list?id=${id}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.getStorage({
      key: 'fileValue',
      success(res) {
        that.setData({
          value : res.data.value
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