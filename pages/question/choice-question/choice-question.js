// pages/question/choice_question/choice-question.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "choices": [],
    "results": [],
    "paper_id": "",
    "type": "",
    "currenIndex": 0
  },

  enquire() {
    let that = this;
    db.collection('answer_questions').where({
      paper_id: this.paper_id,
      type: this.type
    }).get({
      success: function (res) {
        console.log(res.data)
        var results = new Array(res.data.length);
        that.choices = res.data;
        that.setData({
          // results: results,
          choices: that.choices
        })
      }
    });
  },

  optionSelected(option) {
    let key = option.currentTarget.dataset["key"]
    let choice = option.currentTarget.dataset["choice"]
    let index = option.currentTarget.dataset["index"]

    console.log("choice:" + choice.title);

    // var item = this.choices[this.currenIndex];
    // console.log("currenIndex:" + this.currenIndex);
    // console.log("item:" + item);

    if (key === choice.answer.toUpperCase()) {
      choice.options[index].type = 1;
      choice.isAnswer = true;
    }else{
      choice.options[index].type = 2;
      choice.isAnswer = false;
    }
    for (var i=0; i < this.choices.length; i++) 
    {
      var item = this.choices[i];
      if (item._id === choice._id) {
        this.choices[i] = choice;
        this.setData({
          choices : this.choices
        })
        console.log("=="+ item._id + choice._id);
        break;
      }else{
        console.log("!="+item._id + choice._id);
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.paper_id = options.paper_id;
    this.type = options.type;
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