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
    idx: 0,
    index: 0    
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  transmit(item) {
    let tempFilePath = item.currentTarget.dataset["url"];
    console.log(tempFilePath);
    wx.shareFileMessage({
      filePath: tempFilePath,
      success() {
        console.log("转发成功");
        Toast.clear();
      },
      fail(fail) {
        console.log(fail);
        Toast.clear();
      },
    })
    // this.downloadFileTransmit(url);
  },

  downloadFileTransmit(url) {
    
  },

  selected(item) {
    let url = item.currentTarget.dataset["url"]
    let index = item.currentTarget.dataset["index"]
    let idx = item.currentTarget.dataset["idx"]
    console.log("url:" + url);
    console.log("index:" + index);
    console.log("idx:" + idx);
    this.downloadFile(url, idx, index);
  },

  downloadFile(url, idx, index) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
    wx.cloud.downloadFile({
      fileID: url
    }).then(res => {
      console.log(res.tempFilePath)
      this.items[idx].items[index].tempFilePath = res.tempFilePath;
      console.log(this.items);
      this.setData({
        items: this.items
      })
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