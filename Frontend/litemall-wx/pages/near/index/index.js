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
    var test = [{ lat2: 32.012532, lng2: 118.772945, id: "00001"  },
                { lat2: 31.012532, lng2: 118.772945, id: "00002" },
                { lat2: 32.010971, lng2: 118.769235, id: "00003" },
                { lat2: 32.044785, lng2: 118.790991, id: "00004" },]
    this.getIndexData();
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var lat1 = res.latitude
        var lng1 = res.longitude
        var disall = []
        for (var i=0; i<test.length; i++){
          var lat2 = test[i].lat2
          var lng2 = test[i].lng2
          var id = test[i].id
          var disone = that.getDistance(lat1, lng1, lat2, lng2)
          let json = {
            distance: disone,
            id: id,
          }
          var a = '{\"distance\":' + disone + ',' + "\"id\":" +  id + '}'
          disall.push(json);        
        }
        var nears=[];
        for(var j=0; j<disall.length; j++){
          if (disall[j].distance <= 5000.00){
                nears.push(disall[j])
            }else{
            
          } 
        }
        console.log(nears)
      },
      fail: function (res) {
        // console.log(res);
      }
    })
  },
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