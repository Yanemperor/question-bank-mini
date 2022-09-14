function stepError(result) {
  if (result && result.message) {
    console.log(result)
  }
};

function addFreeDownloadTicket(userInfo) {
  return new Promise(function (resolve, reject) {
    if (userInfo.shareCount > 0) {
      console.log("免费下载券+1");
      let count = userInfo.freeDownloadTicket + 1
      let shareCount = userInfo.shareCount - 1
      console.log("count:", userInfo.freeDownloadTicket);
      const db = wx.cloud.database()
      db.collection("user").where({
        "_openid": userInfo.openid
      }).update({
        data: {
          "freeDownloadTicket": count,
          "shareCount": shareCount
        },
        success: function (res) {
          console.log("freeDownloadTicket:", res)
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    } else {
      console.log("分享到三次了");
      reject("分享了3次")
    }
  })
}

function addDownloadTicket(userInfo) {
  return new Promise(function (resolve, reject) {
    let count = userInfo.downloadTicket + 10
    const db = wx.cloud.database()
    db.collection("user").where({
      "_openid": userInfo.openid
    }).update({
      data: {
        "downloadTicket": count
      },
      success: function (res) {
        console.log("downloadTicket:", res)
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function searchDownloadTicket(userInfo) {
  return new Promise(function (resolve, reject) {
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: userInfo.openid
    }).get({
      success: function (res) {
        console.log("res" + JSON.stringify(res.data[0].items));
        resolve(res.data[0])
      },
      fail(err) {
        reject(err)
      }
    });
  })
}

function consumeTicket(userInfo) {
  return new Promise(function (resolve, reject) {
    if (userInfo.freeDownloadTicket > 0) {
      console.log("免费下载券-1");
      let count = userInfo.freeDownloadTicket - 1
      const db = wx.cloud.database()
      db.collection("user").where({
        "_openid": userInfo.openid
      }).update({
        data: {
          "freeDownloadTicket": count
        },
        success: function (res) {
          console.log("freeDownloadTicket:", res)
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    } else if (userInfo.downloadTicket > 0) {
      console.log("下载券-1");
      let count = userInfo.downloadTicket - 1
      const db = wx.cloud.database()
      db.collection("user").where({
        "_openid": userInfo.openid
      }).update({
        data: {
          "downloadTicket": count
        },
        success: function (res) {
          console.log("downloadTicket:", res)
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    } else {
      console.log("没有下载券");
      reject("您没有下载券了，观看视频可获得10张下载券，分享分享好友可以获得一张下载券")
    }
  })
};

module.exports = {
  consumeTicket: consumeTicket,
  addFreeDownloadTicket: addFreeDownloadTicket,
  addDownloadTicket: addDownloadTicket,
  searchDownloadTicket: searchDownloadTicket
}