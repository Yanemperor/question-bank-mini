// pages/question/list/question-list.js

const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '大学政治', value: 0 },
      { text: '大学英语', value: 1 }
      // { text: '大学语文', value: 2 },
      // { text: '大学教育理论', value: 3 },
      // { text: '大学艺术概论', value: 4 },
      // { text: '大学民法', value: 5 },
      // { text: '大学生态学', value: 6 }
    ],
    value1: 0,
    items: [],
    data: []
  },

  enquire(e) {
    let that = this
    db.collection('question_list').get({
      success: function(res) {
        that.data = res.data
        console.log(res.data)
        that.setData({
          items : that.data[0].items
        })
      }
    })
  },

  change(index) {
    this.setData({
      items : this.data[index.detail].items
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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