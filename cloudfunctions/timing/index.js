// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }
const db = wx.cloud.database()

exports.main = async (event, context) => {
  db.collection('todos').doc('todo-identifiant-aleatoire').update({
    // data 传入需要局部更新的数据
    data: {
      // 表示将 done 字段置为 true
      done: true
    },
    success: function(res) {
      console.log(res.data)
    }
  })
  return {
    sum: event.a + event.b
  }
}