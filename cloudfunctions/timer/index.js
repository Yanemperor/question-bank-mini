// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "cloud1-6gxrrp6j10c4b06e"
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("user").where({
      
    }).update({
      data: {
        "freeDownloadTicket" : 3,
        "shareCount" : 3
      },
    })
  } catch (error) {
    console.log(error)
  }
}

