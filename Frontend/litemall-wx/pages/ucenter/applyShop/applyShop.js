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
      { name: '0', value: '美国0' },
      { name: '1', value: '美国1' },
      { name: '2', value: '美国2' },
      { name: '3', value: '美国3' },
      { name: '4', value: '美国4' },
      { name: '5', value: '美国5' },
    ],
    checkArr: ['中国'],
    detailsaddress: '',
    // 省市区三级联动初始化
    region: ['北京市', '北京市', '东城区'],
    //多列选择器：
    multiArray: [['行业a', '行业b'], ['a-1', 'a-2']],//二维数组，长度是多少是几列
    multiIndex: [0, 0],
  },
  // 选择地区
  changeRegion(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({ 
      region: e.detail.value,
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
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://120.79.250.63:8080/wx/storage/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'session_token': wx.getStorageSync('session_token')
          },
          success: function (res) {
            console.log(res)
            var imgurl = 'http://120.79.250.63:' + JSON.parse(res.data).data.url.split(':')[2]
            console.log(imgurl)
            that.setData({
              "atempFilePaths": imgurl
            });
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  aopenActionsheet() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        console.log(res)
        var tempFilePaths =  res.tempFilePaths
        wx.uploadFile({
          url: 'http://120.79.250.63:8080/wx/storage/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'session_token': wx.getStorageSync('session_token')
          },
          success: function (res) {
            console.log(res)
            var imgurl = 'http://120.79.250.63:' + JSON.parse(res.data).data.url.split(':')[2]
            console.log(imgurl)
            that.setData({
              "atempFilePaths": imgurl
            });
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  bopenActionsheet() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://120.79.250.63:8080/wx/storage/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'session_token': wx.getStorageSync('session_token')
          },
          success: function (res) {
            console.log(res)
            var imgurl = 'http://120.79.250.63:' + JSON.parse(res.data).data.url.split(':')[2]
            console.log(imgurl)
            that.setData({
              "btempFilePaths": imgurl
            });
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  copenActionsheet() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://120.79.250.63:8080/wx/storage/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'session_token': wx.getStorageSync('session_token')
          },
          success: function (res) {
            console.log(res)
            var imgurl = 'http://120.79.250.63:' + JSON.parse(res.data).data.url.split(':')[2]
            console.log(imgurl)
            that.setData({
              "ctempFilePaths": imgurl
            });
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  dopenActionsheet() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://120.79.250.63:8080/wx/storage/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'session_token': wx.getStorageSync('session_token')
          },
          success: function (res) {
            console.log(res)
            var imgurl = 'http://120.79.250.63:' + JSON.parse(res.data).data.url.split(':')[2]
            console.log(imgurl)
            that.setData({
              "dtempFilePaths": imgurl
            });
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
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

    if (e.detail.value.shopFacility == 0) {
      wx.showModal({
        title: '错误信息',
        content: '店内设施不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.address == 0) {
      wx.showModal({
        title: '错误信息',
        content: '详细地址不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.url == 0) {
      wx.showModal({
        title: '错误信息',
        content: 'logo不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.shopname == 0 || e.detail.value.shopname.length < 6) {
      wx.showModal({
        title: '错误信息',
        content: '店铺名称不能为空,或长度不够',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.username == 0) {
      wx.showModal({
        title: '错误信息',
        content: '负责任人名字不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.shopIntroduce == 0) {
      wx.showModal({
        title: '错误信息',
        content: '门店介绍不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.serviceMobile == 0) {
      wx.showModal({
        title: '错误信息',
        content: '客服电话不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.workTime == 0) {
      wx.showModal({
        title: '错误信息',
        content: '营业时间不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.workimgUrl == 0) {
      wx.showModal({
        title: '错误信息',
        content: '营业执照不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.storefrontimgUrl == 0) {
      wx.showModal({
        title: '错误信息',
        content: '门头图片不能为空',
        showCancel: false
      });
      return false;
    }

    if (e.detail.value.password == 0 || e.detail.value.password.length < 5) {
      wx.showModal({
        title: '密码',
        content: '密码不能为空,或长度不够',
        showCancel: false
      });
      return false;
    }

    e.detail.value['region'] = e.detail.value['region'].join('');
    
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      // shop_name: e.detail.value.shop_name,
      allValue: e.detail.value,
    })
    // that.upload(),

    wx.request({
      url: api.Applyshop,
      data: e.detail.value,
        // shop_name: e.detail.value.shop_name,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '提交',
          content: '已提交成功，请等待审核',
          showCancel: false,//是否显示取消按钮
          success: function (res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
            } else {
              //点击确定
              // wx.switchTab({
              //   url: '/pages/ucenter/index/index'
              // });
            }
          },  
        })
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


