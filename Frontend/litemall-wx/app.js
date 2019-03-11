var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./utils/user.js');

App({
  // onLoad: function (options) {
  //   // 页面初始化 options为页面跳转所带来的参数
  //   // 页面渲染完成
  // },
  // onLaunch: function() {
  //   const updateManager = wx.getUpdateManager();
  //   wx.getUpdateManager().onUpdateReady(function() {
  //     wx.showModal({
  //       title: '更新提示',
  //       content: '新版本已经准备好，是否重启应用？',
  //       success: function(res) {
  //         if (res.confirm) {
  //           // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
  //           updateManager.applyUpdate()
  //         }
  //       }
  //     })
  //   })
  // },
  // onShow: function(options) {
  //   user.checkLogin().then(res => {
  //     this.globalData.hasLogin = true;
  //   }).catch(() => {
  //     this.globalData.hasLogin = false;
  //   });
  // },
  // globalData: {
  //   hasLogin: false
  // }
  onLaunch: function () {
    console.log('App Launch')
  },
  getToken: function () {
    return wx.getStorageSync('token')
  },
  getOpenid: function () {
    return wx.getStorageSync('openid')
  },
  getWechatUsername: function () {
    return wx.getStorageSync('wechatUsername')
  },
  getWechatFaceUrl: function () {
    return wx.getStorageSync('wechatFaceUrl')
  },
  getDate: function () {
    var date = new Date()
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  },
  onShow: function () {
    var that = this;
    //微信登录
    wx.login({
      success: function (res) {
        var js_code = res.code
        wx.request({
          url: that.globalData.backendUrl + "getOpenIdAndSessionKey",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            "jsCode": js_code
          },
          method: 'GET',
          success: function (res) {
            //从后端获取认证信息
            if (res.statusCode == 200) {
              if (!res.data.errcode) {
                /*console.log(res)*/
                var openid = res.data.openId;
                wx.setStorageSync("openid", openid);
                var sessionKey = res.data.sessionKey;
                wx.setStorageSync("sessionKey", sessionKey);
                var token = res.data.token;
                wx.setStorageSync("token", token);
                //获取个人微信号信息
                wx.getUserInfo({
                  success: function (data) {
                    /*console.info('个人微信号信息', data)*/
                    wx.setStorageSync("wechatUsername", data.userInfo.nickName);
                    wx.setStorageSync("wechatFaceUrl", data.userInfo.avatarUrl)
                    wx.request({
                      url: that.globalData.backendUrl + "loginMyUser",
                      header: {
                        'Authorization': 'Bearer ' + that.getToken(),
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: {
                        openid: that.getOpenid(),
                        username: that.getWechatUsername(),
                        faceWxUrl: that.getWechatFaceUrl()
                      },
                      method: 'GET',
                      success: (res) => {
                        if (res.statusCode == 200) {
                          //登录成功，显示小程序主页
                        } else {
                          wx.showModal({
                            title: '登录失败',
                            content: '获取token失败',
                            showCancel: false
                          })
                        }
                      },
                      fail: (res) => {
                        wx.hideLoading()
                        wx.showModal({
                          title: '连接服务器失败',
                          content: res.errMsg,
                          showCancel: false,
                          success: (res) => {
                            that.onShow()
                          }
                        })
                      }
                    })
                  },
                  fail: function (failData) {
                    console.log("用户拒绝授权");
                    wx.redirectTo({
                      url: '/pages/login/login',
                    })
                  }
                });
              } else {
                wx.showModal({
                  title: '获取openid失败',
                  content: '请检查appid和secret',
                  showCancel: false
                })
              }
            } else {
              console.log(res)
              wx.showModal({
                title: '获取openid失败',
                content: res.data.status + ' ' + res.data.error,
                showCancel: false
              })
            }
          },
          fail: function (res) {
            wx.hideLoading()
            wx.showModal({
              title: '连接服务器失败',
              content: res.errMsg,
              showCancel: false,
              success: (res) => {
                wx.showLoading({
                  title: '载入中',
                })
                that.onShow()
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log("用户登录失败")
      }
    })
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    openid: "",
    sessionKey: "",
    wechatUsername: "",
    token: "",
    defaultPic: 'http://junrongcenter.oss-cn-beijing.aliyuncs.com/default/default-pic.png',
    backendUrl: "https://junrongcenter.com:3389/",//used
    testUrl: "http://10.107.30.176:8080/JRQ.Backend/",
    picUrl: "https://www.junrongcenter.com/"//used
    //backendUrl: "http://localhost:3389/",
    //picUrl: "http://localhost:8000/",
    //picUrl: "http://localhost/libs/"//xulei
  }
})