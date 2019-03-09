// pages/ucenter/applyShop/applyShop.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: '0',
    images: '',
    facilities: [
      { name: '美国', value: '美国' },
      { name: '中国', value: '中国' },
      { name: '巴西', value: '巴西' },
      { name: '日本', value: '日本' },
      { name: '英国', value: '英国' },
      { name: '法国', value: '法国' },
    ],
    checkArr: ['中国'],
    detailsaddress: '',
    // 省市区三级联动初始化
    region: ["省", "市", "区"],
    //多列选择器：
    multiArray: [['行业a', '行业b'], ['a-1', 'a-2']],//二维数组，长度是多少是几列
    multiIndex: [0, 0],
  },
  // 选择地区
  changeRegin(e) {
    this.setData({ 
      region: e.detail.value ,
      index: e.detail.value
    });
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
    this.setData({ 
      checkArr: arr ,
      index: e.detail.value
    });
  },
  //上传图片
  aopenActionsheet() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
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
  nowlocation() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res, "location")
        console.log(res.name)
        const locat = res.name
        that.setData({
          locat: locat
        })
      },
    })
  },
  //行业
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {//第1列
      if (e.detail.value == 0) {//音频
        this.setData({
          multiArray: [['行业a', '行业b'], ['a-1', 'a-2']]
        })
      };
      if (e.detail.value == 1) {//视频
        this.setData({
          multiArray: [['行业a', '行业b'], ['b-1', 'b-2']]
        })
      };
    };
  },
  //
  submitData: function (e) {
    let that = this

    if (e.detail.value.facilities == 0) {
      wx.showModal({
        title: '错误信息',
        content: '店内设施不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.detailed_address == 0) {
      wx.showModal({
        title: '错误信息',
        content: '详细地址不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.upload_logo == 0) {
      wx.showModal({
        title: '错误信息',
        content: 'logo不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.shop_name == 0) {
      wx.showModal({
        title: '错误信息',
        content: '店铺名称不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.name_personcharge == 0) {
      wx.showModal({
        title: '错误信息',
        content: '负责任人名字不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.store_introduction == 0) {
      wx.showModal({
        title: '错误信息',
        content: '门店介绍不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.customer_telephone == 0) {
      wx.showModal({
        title: '错误信息',
        content: '客服电话不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.business_hours == 0) {
      wx.showModal({
        title: '错误信息',
        content: '营业时间不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.business_license == 0) {
      wx.showModal({
        title: '错误信息',
        content: '营业执照不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.doorhead_pictures == 0) {
      wx.showModal({
        title: '错误信息',
        content: '门头图片不能为空',
        showCancel: false
      });
      return false;
    }

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
       
      allValue: e.detail.value
    })
    wx.request({
      url: api.Applyshop,
      data: {
        allValue: e.detail.value,
        name_personcharge: e.detail.value
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("成功")
        console.log(res)
      }
     
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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


