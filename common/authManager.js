
function stepError(result) {
  if (result && result.message) {
    console.log(result)
  }
};

function login() {
  var start = new Promise(function (resolve, reject) {
    resolve();
  });
  return start.then(getUserProfile).then(getOpenid).then(isHaveUser).catch(stepError); 
};

function getUserProfile() {
  return new Promise(function(resolve, reject) {
    wx.getUserProfile({
      desc: '用于我的页面展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('getUserProfile:', res.userInfo)
        resolve(res.userInfo)
      },
      fail(err) {
        reject(err)
      }
    })
  })  
};

function getOpenid(userInfo) {
  return new Promise(function(resolve, reject) {
    wx.cloud.callFunction({
      name: 'login',
      success: function(res) {
        userInfo._openid = res.result.openid
        console.log('getOpenid:', userInfo)
        resolve(userInfo)
      },
      fail(err) {
        reject(err)
      }
    })
  })
};

function isHaveUser(userInfo) {
  return new Promise(function(resolve, reject) {
    const db = wx.cloud.database()
    db.collection('user').get({
      '_openid': userInfo._openid
    }).then(res => {
      console.log("queryUser", res.data);
      if (res.data == false) {
        console.log("未注册");
        db.collection('user').add({
          data: {
            nickName: userInfo.nickName,
            gender: userInfo.gender,
            language: userInfo.language,
            avatarUrl: userInfo.avatarUrl,
            createTime: Date().toString,
            freeDownloadTicket: 3,  // 免费下载券
            shareCount: 3,         // 获得下载券免费分享次数
            downloadTicket: 0,    // 下载券
          },
          success: function (res) {
            console.log("注册成功:", res);
            resolve(userInfo)
          }, fail(err) {
            reject(err)
          }
        })
      } else {
        console.log("已注册", res.data[0]);    
        resolve(res.data[0])
      }
    }).catch( err => {
      reject(err)
    })
  })
};

function registered() {
  let that = this;
  db.collection('user').add({
    data: {
      nickName: that.userInfo.nickName,
      gender: that.userInfo.gender,
      language: that.userInfo.language,
      avatarUrl: that.userInfo.avatarUrl,
      createTime: Date().toString,
      freeDownloadTicket: 3,  // 免费下载券
      shareCount: 3,         // 获得下载券免费分享次数
      downloadTicket: 0,    // 下载券
    },
    success: function (res) {
      console.log("registered", res);
      that.setData({
        hasUserInfo: true,
        userInfo: that.userInfo,
      });
      wx.setStorage({
        data: {
          value: that.userInfo
        },
        key: 'userInfo',
      })
    }
  })
};

module.exports = {
  login: login,
  getUserProfile: getUserProfile,
  getOpenid: getOpenid,
  isHaveUser: isHaveUser
}