// pages/question/choice_question/choice-question.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "choices": [],
    "results": [],
    "paper_id": "",
    "type": "", // 题型 0 选择题
    "currentIndex": 0,
    "total": 0,
    "correct": 0,
    "show": false,
  },

  currentIndexChange(index) {
    let current = index.detail.current;
    this.currentIndex = current;
    this.setData({
      currentIndex: this.currentIndex
    })
  },

  optionSelected(option) {
    let key = option.currentTarget.dataset["key"]
    let choice = option.currentTarget.dataset["choice"]
    let index = option.currentTarget.dataset["index"]
    if (choice.isSelected) {
      return
    }
    if (key === choice.answer.toUpperCase()) {
      choice.options[index].type = 1;
      choice.isAnswer = true;
      this.correct++;
    } else {
      choice.options[index].type = 2;
      choice.isAnswer = false;
    }
    choice.isSelected = true;
    this.choices[this.currentIndex] = choice;
    this.setData({
      choices: this.choices,
      correct: this.correct
    })
  },

  submit() {
    Dialog.confirm({
        title: '是否交卷',
        message: '',
      })
      .then(() => {
        // on confirm
        this.showPopup()
      })
      .catch(() => {
        // on cancel
      });
  },

  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  next() {
    var errorChoices = [];
    for (const key in this.choices) {
      if (Object.hasOwnProperty.call(this.choices, key)) {
        const item = this.choices[key];
        if (!item.isAnswer) {
          item.isSelected = false;
          for (const index in item.options) {
            if (Object.hasOwnProperty.call(item.options, index)) {
              const option = item.options[index];
              option.type = 0;
            }
          }
          errorChoices.push(item);
        }
      }
    }
    let json = JSON.stringify(errorChoices);
    wx.navigateTo({
      url: `/pages/question/choice-question/choice-question?json=${json}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.currentIndex = 0;
    this.correct = 0;
    let json = options.json;
    this.choices = JSON.parse(json);
    this.total = this.choices.length;
    this.paper_id = options.paper_id;
    this.setData({
      choices: this.choices,
      total: this.total,
      paper_id: this.paper_id,
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
    wx.reLaunch({
      url: `/pages/question/type/question-type?paper_id=${this.paper_id}`,
    })
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