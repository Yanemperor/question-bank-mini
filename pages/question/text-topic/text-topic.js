// pages/question/text-topic/text-topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "choices": [],
    "results": [],
    "paper_id": "",
    "type": "", // 题型 0 选择题
    "typeName": "",
    "currentIndex": 0,
    "total": 0,
    "correct": 0,
  },

  currentIndexChange(index) {
    let current = index.detail.current;
    this.currentIndex = current;
    this.setData({
      currentIndex: this.currentIndex,
      typeName : this.choices[this.currentIndex].typeName
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { json,  paper_id} = options;
    // console.log('json', json);
    const detail = JSON.parse(decodeURIComponent(json));
    console.log("detail11111", detail);
    this.currentIndex = 0;
    // this.correct = 0;
    // let json = options.json;
    // console.log("JSON:", json);
    this.choices = detail;
    this.total = this.choices.length;
    this.paper_id = paper_id;
    this.typeName = this.choices[this.currentIndex].typeName
    this.setData({
      choices: this.choices,
      total: this.total,
      paper_id: this.paper_id,
      typeName : this.typeName
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