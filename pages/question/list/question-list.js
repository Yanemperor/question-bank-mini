// pages/question/list/question-list.js

const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    items: [],
    data: []
  },

  enquire(e) {
    let that = this
    db.collection('question_list').where({
      _id: that.id
    }).get({
      success: function (res) {
        console.log("res" + JSON.stringify(res.data[0].items));
        let items = res.data[0].items
        that.items = items;
        that.setData({
          items: items
        })
      }
    });
  },

  selected(item) {
    let id = item.currentTarget.dataset["id"]
    wx.navigateTo({
      url: `/pages/question/type/question-type?paper_id=${id}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.id = options.id;
    this.setData({
      id: this.id
    })
    this.enquire()
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