// pages/near/pindex/pindex.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotGoods: [],
  },
  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          hotGoods: res.data.hotGoodsList,          
        });
        // console.log(res)
      }
    });
  },
  // 计算经纬度
  getDistance(lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;    
    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137; //米
    var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
    distance = distance.toFixed(2)
    console.log(distance + '米')
    // if (distance > 1000){
    //   distance = Math.round(distance / 1000);
    // }
    return distance;
  },

  /**
   * 生命周期函数--监听页面加载a
   */
  onLoad: function (options) {
    this.getIndexData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '正在刷新',
      duration: 1000,
      mask: true,  
      icon: 'success',  
      success: function () { },
      fail: function () { },   
      complete: function () { }   
    })
    this.getIndexData();
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var lat11 = res.latitude
        var lng11 = res.longitude
      },
      fail: function (res) {
        console.log(res);
      }
    })
    let lat1 = 32.060255
    let lng1 = 118.796877
    let lat2 = 32.012532
    let lng2 = 118.772945
    this.getDistance(lat1, lng1, lat2, lng2)
  },
  // 12700247.813747514
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})