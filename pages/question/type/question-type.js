// pages/question/type/question-type.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "paper_id": "",
    "items": [],
    "choices": [], // 选择题, 词汇与结构题
    "all": [],
    "texts": [], // 写作题
    "phonetics": [], // 发音题
    "cloze": [], // 完形填空
    "readingComprehension": [], // 阅读理解
    "dailyConversation": [] // 日常对话题
  },
  // items: ["发音题", "词汇与结构题", "完形填空", "阅读理解", "日常对话题", "写作题"]

  async loadData() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
    // 1.获取数据总数
    let count = await db.collection('answer_questions').where({
      paper_id: this.paper_id
    }).count();
    count = count.total;
    let all = [];
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection('answer_questions').where({
        paper_id: this.paper_id
      }).skip(i).get();
      all = all.concat(list.data);
      Toast.clear();
    }
    this.all = all;
    if (this.paper_id.includes("top_up_political")) {
      this.political(all);
    } else if (this.paper_id.includes("top_up_english")) {
      this.english(all);
    } else if (this.paper_id.includes("top_up_language")) {
      this.language(all);
    } else {
      this.political(all);
    }
    
    // console.log("返回的结果", this.all);
  },

  language(all) {
    var choices = [];
    var texts = [];
    for (const key in all) {
      if (Object.hasOwnProperty.call(all, key)) {
        const item = all[key];
        if (item.type === "1") {
          choices.push(item);
        }else{
          texts.push(item);
        }
      }
    }
    this.choices = choices;
    this.texts = texts;
  },

  political(all) {
    var choices = [];
    var texts = [];
    for (const key in all) {
      if (Object.hasOwnProperty.call(all, key)) {
        const item = all[key];
        if (item.type === "1") {
          choices.push(item);
        }else{
          texts.push(item);
        }
      }
    }
    this.choices = choices;
    this.texts = texts;
  },

  // "texts": [], // 写作题
  //   "phonetics": [], // 发音题
  //   "cloze": [], // 完形填空
  //   "readingComprehension": [], // 阅读理解
  //   "dailyConversation": [] // 日常对话题
  english(all) {
    var phonetics = [];
    var choices = [];
    var texts = [];
    var cloze = [];
    var readingComprehension = [];
    var dailyConversation = [];
    for (const key in all) {
      if (Object.hasOwnProperty.call(all, key)) {
        const item = all[key];
        if (item.type === "1") {
          choices.push(item);
        }else if (item.type === "11") {
          phonetics.push(item);
        }else if (item.type === "12") {
          choices.push(item);
        }else if (item.type === "13") {
          cloze.push(item);
        }else if (item.type === "14") {
          readingComprehension.push(item);
        }else if (item.type === "15") {
          dailyConversation.push(item);
        }else if (item.type === "16") {
          texts.push(item);
        }
      }
    }
    this.phonetics = phonetics;
    this.choices = choices;
    this.cloze = cloze;
    this.readingComprehension = readingComprehension;
    this.dailyConversation = dailyConversation;
    this.texts = texts;
    console.log("all:", all);

  },

  enquire() {
    if (this.paper_id.includes("top_up_political")) {
      this.setData({
        items: ["选择题", "非选择题"]
      });
    } else if (this.paper_id.includes("top_up_english")) {
      this.setData({
        items: ["发音题", "词汇与结构题", "完形填空", "阅读理解", "日常对话题", "写作题"]
      });
    } else if (this.paper_id.includes("top_up_language")) {
      this.setData({
        items: ["选择题", "阅读题"]
      });
    } else {
      this.setData({
        items: ["选择题", "非选择题"]
      });
    }
    this.loadData();
  },

  selected(option) {
    let name = option.currentTarget.dataset["name"]
    if (name === "选择题") {
      var json = JSON.stringify(this.choices);
      wx.navigateTo({
        url: `/pages/question/choice-question/choice-question?json=${encodeURIComponent(json)}&paper_id=${this.paper_id}`,
      });
    } else if (name === "发音题") {
      var json = JSON.stringify(this.phonetics);
      wx.navigateTo({
        url: `/pages/question/choice-question/choice-question?json=${encodeURIComponent(json)}&paper_id=${this.paper_id}`,
      });
    }else if (name === "词汇与结构题") {
      var json = JSON.stringify(this.choices);
      wx.navigateTo({
        url: `/pages/question/choice-question/choice-question?json=${encodeURIComponent(json)}&paper_id=${this.paper_id}`,
      });
    }else if (name === "完形填空") {
      var json = JSON.stringify(this.cloze);
      wx.navigateTo({
        url: `/pages/question/long-question/long-question?json=${encodeURIComponent(json)}&paper_id=${this.paper_id}`,
      });
    }else if (name === "阅读理解") {
      var json = JSON.stringify(this.readingComprehension);
      wx.navigateTo({
        url: `/pages/question/long-question/long-question?json=${encodeURIComponent(json)}&paper_id=${this.paper_id}`,
      });
    }else if (name === "日常对话题") {
      var json = JSON.stringify(this.dailyConversation);
      wx.navigateTo({
        url: `/pages/question/long-question/long-question?json=${encodeURIComponent(json)}&paper_id=${this.paper_id}`,
      });
    } else {
      var json = JSON.stringify(this.texts);
      wx.navigateTo({
        url: `/pages/question/write-topic/write-topic?json=${encodeURIComponent(json)}&paper_id=${this.paper_id}`,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.paper_id = options.paper_id;
    this.setData({
      paper_id: this.paper_id
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