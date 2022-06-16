// pages/file/list/list.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    items: [],
    data: {}
  },

  selected(item) {
    let url = item.currentTarget.dataset["url"]
    console.log("url:" + url);
    this.downloadFile(url);
  },

  downloadFile(url) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
    wx.cloud.downloadFile({
      fileID: url
    }).then(res => {
      console.log(res.tempFilePath)
      wx.openDocument({
        filePath: res.tempFilePath,
        success: function (res) {
          Toast.clear();
          console.log("打开文档成功");
        }
      })
    })
  },

  enquire(e) {
    let that = this;
    db.collection('subjects').where({
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.id = options.id;
    console.log(options.id);
    this.setData({
      id: this.id
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