// pages/question/type/question-type.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "paper_id": "",
    "items": [],
    "choices": [],
  },

  enquire() {
    console.log("VVVVVVV" + this.paper_id)
    if (this.paper_id.includes("political")) {
      this.setData({
        items: ["选择题", "非选择题"]
      });
    }
    let that = this;
    db.collection('answer_questions').where({
      paper_id: this.paper_id
    }).get({
      success: function (res) {
        console.log(res.data)
        that.choices = res.data;
      }
    });
  },

  selected(item) {
    var json = JSON.stringify(this.choices);
    wx.navigateTo({
      // url: `/pages/question/choice-question/choice-question?paper_id=${this.paper_id}&type=${type}`,
      url: `/pages/question/choice-question/choice-question?json=${json}&paper_id=${this.paper_id}`,
    });
  },

  filter(data) {
    console.log("data:" + data);
    var elements = [];
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (element.type === "0") {
          elements.push(element);
        }
      }
    }
    this.choices = elements;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.paper_id = options.paper_id;
    this.setData({
      paper_id : this.paper_id
    })
    this.enquire();
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