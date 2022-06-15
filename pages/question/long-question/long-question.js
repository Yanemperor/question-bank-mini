import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

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
    "currentIndexText": 0,
    "total": 0,
    "totalText": 0,
    "correct": 0,
    "show": false,
    "isCloze": false,   // 是否是完形填空
    "isArticle": false, // 是否是阅读理解
    "isDailyConversation": false, // 是否是日常对话
    "titleShow": false,
    "isMakeShow": true,
    "isOverlay": false
  },

  currentIndexChange(index) {
    let current = index.detail.current;
    if (this.isCloze) {
      this.currentIndex = current;
      this.currentIndexText = current + 20;
    } else if (this.isDailyConversation) {
      this.currentIndex = current;
      this.currentIndexText = current + 55;
    } else {
      this.currentIndex = current;
      this.currentIndexText = current;
    }    
    this.setData({
      currentIndex: this.currentIndex,
      currentIndexText: this.currentIndexText,
      typeName : this.choices[current].typeName
    })
  },

  optionSelected(option) {
    let key = option.currentTarget.dataset["key"]
    let choice = option.currentTarget.dataset["choice"]
    let index = option.currentTarget.dataset["index"]
    console.log("key:", key);
    console.log("choice:", choice);
    console.log("index:", index);

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

  titleShowPopup() {
    this.setData({
      titleShow: true
    });
  },
   
  onTitleClose() {
    this.setData({
      titleShow: false
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
    const { json,  paper_id} = options;
    // console.log('json', json);
    const detail = JSON.parse(decodeURIComponent(json));
    this.currentIndex = 0;
    this.correct = 0;
    this.choices = detail;
    this.total = this.choices.length;
    this.paper_id = paper_id;
    this.typeName = this.choices[this.currentIndex].typeName;
    console.log("Name", this.typeName);
    if (this.typeName === "完形填空题") {
      this.isCloze = true;
      this.isArticle = false;
      this.isDailyConversation = false;
    } else if (this.typeName === "阅读理解") {
      this.isCloze = false;
      this.isArticle = true;
      this.isDailyConversation = false;
    } else if (this.typeName === "日常对话题") {
      this.isCloze = false;
      this.isArticle = false;
      this.isDailyConversation = true;
    }
    if (this.isCloze) {
      this.totalText = this.total + 20;
      this.currentIndexText = 20;
    } else if (this.isDailyConversation) {
      this.totalText = this.total + 55;
      this.currentIndexText = 55;
    }else{
      this.totalText = this.total;
      this.currentIndexText = 0;
    }
    this.setData({
      choices: this.choices,
      currentIndex : this.currentIndex,
      currentIndexText : this.currentIndexText,
      total: this.total,
      totalText: this.totalText,
      paper_id: this.paper_id,
      typeName : this.typeName,
      isCloze : this.isCloze,
      isArticle: this.isArticle,
      isDailyConversation: this.isDailyConversation
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
    // wx.reLaunch({
    //   url: `/pages/question/type/question-type?paper_id=${this.paper_id}`,
    // })
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