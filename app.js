import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    wx.cloud.init({
      env: "cloud1-6gxrrp6j10c4b06e",
      traceUser: true
    })
  },
  onShow: function () {
    updateManager();
  },
});
