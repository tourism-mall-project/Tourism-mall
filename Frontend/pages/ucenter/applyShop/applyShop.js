// pages/ucenter/applyShop/applyShop.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['IT', '制造业', '互联网', '网络设备'],
    date: "1992-10-12",
    index: '0',
    images:'',
    facilities:[
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    checkArr: ['中国'],
    detailsaddress:'',
  },
  /**
   * 获取表单数据
   */
  submitData: function (event) {

  },
  // 表单切换
  checkboxChange: function (e) {
    var arr = [];
    e.detail.value.forEach(current => {
      for (var value of this.data.facilities) {
        if (current === value.name) {
          arr.push(value.value);
          break;
        }
      }
    });
    this.setData({ checkArr: arr });
    console.log(arr)
  },
  //上传图片
  aopenActionsheet(){
    let that = this
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          atempFilePaths: tempFilePaths,
        })
      },
    })
  },
  bopenActionsheet() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          btempFilePaths: tempFilePaths,
        })
      },
    })
  },
  copenActionsheet() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          ctempFilePaths: tempFilePaths,
        })
      },
    })
  },
  //定位现在地址
  nowlocation(){
    console.log("111")
    let that = this
    wx.chooseLocation({
      success: function(res) {
        console.log(res, "location")
        console.log(res.name)
        const locat = res.name
        that.setData({
          locat: locat
        })
      },
    })
  },
  /**
 * 获取行业数据
 */
  bindIndustryChange: function (event) {
    this.setData({
      index: event.detail.value
    })

  },
  /**
 * 获取日期数据
 */
  bindDateChange: function (event) {
    this.setData({
      date: event.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.nowlocation();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
})


