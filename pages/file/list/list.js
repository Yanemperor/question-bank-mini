// pages/file/list/list.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

var authManager = require('../../../common/authManager.js');
var ticketManager = require('../../../common/ticketManager.js');

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    items: [],
    idx: 0,
    index: 0,
    "userInfo": {
      "_openid": ""
    },
    "hasUserInfo": false,
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
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

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  consumeTicket(userInfo) {
    let that = this;
    ticketManager.consumeTicket(userInfo).then(function (userInfo) {
      console.log("AAA", userInfo)
      that.getUserInfo(that.userInfo);
    }).catch( err => {
      console.log("BBB", err)
      Dialog.confirm({
        message: err,
        confirmButtonText: '分享'
      }).then(() => {
        // on confirm
        that.onClick();
      })
      .catch(() => {
        // on cancel
      });
    });
  },
  // 保存
  transmit(item) {
    console.log("transmit", this.userInfo);
    if (this.hasUserInfo) {
      if (this.userInfo.freeDownloadTicket > 0 || this.userInfo.downloadTicket > 0) {
        let that = this;
        let tempFilePath = item.currentTarget.dataset["url"];
        console.log(tempFilePath);
        wx.shareFileMessage({
          filePath: tempFilePath,
          success() {
            console.log("转发成功");
            Toast.clear();
            that.consumeTicket(that.userInfo);
          },
          fail(fail) {
            console.log(fail);
            Toast.clear();
          },
        })
      } else {
        this.consumeTicket(this.userInfo);
      }
    } else {
      Dialog.confirm({
          title: '您好, 保存文件需要先登录！',
          confirmButtonText: '登录'
        })
        .then(() => {
          // on confirm
          wx.switchTab({
            url: '/pages/my/index/index',
          })
        })
        .catch(() => {
          // on cancel
        });
    }
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

  getUserInfo(userInfo) {
    let that = this
    authManager.isHaveUser(userInfo).then(function (userInfo) {
      console.log("AAA", userInfo)
      that.hasUserInfo = true
      that.userInfo = userInfo
      that.setData({
        "userInfo": userInfo,
        "hasUserInfo": true
      })
      wx.setStorage({
        data: {
          value: userInfo
        },
        key: 'userInfo',
      })
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

    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.hasUserInfo = true;
        that.getUserInfo(res.data.value);
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