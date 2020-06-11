// pages/chanping/xiangxi.js
const WxParse = require('../../wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    currentTab:0,
    image2:"",
    cp_tupian: "",
    cp_tupian1: "",
    cp_tupian2: "",
    cp_tupian3: "",
    cp_tupian4: "",
    cp_mingcheng: "",
    jiage:"",
    cp_jianjie: "",
    cp_kucun: "",
    xiangou_shuliang: "",
    cp_yixiaoshou: "",
    cp_neirong: "",
    sp_neirong:"",
    user_id:"",
    key2:0,
    cpid:0,

    stars:[0,1,2,3,4],
    normalSrc:'/image/normal.png',
    selectedSrc:'/image/selected.png',

    pl:[],

  },

  switchNav:function(e){
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  huadong: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  select00:function(e){
    var that=this;
    var key=e.currentTarget.dataset.key+1
    console.log("得分"+key)
    that.setData({
      key:key-1,
      key2:key
    })
  },

  pinglun:function(e){
    var that=this;
    if (this.data.user_id.length>0){
      console.log("cpid"+this.data.key2 + this.data.user_id + this.data.cpid +e.detail.value.neirong)
      wx.request({
        url: 'http://www.yaoyiwangluo.com/wx_AddPinLun.asp',
        data: { 
          cpid: this.data.cpid,
          user_id: this.data.user_id,
          xx: this.data.key2,
          pinlun_neirong: e.detail.value.neirong
        },
        success: function (res) {
          console.log(res.data);
        }
      })
    }else{
      console.log("no")
    }
  },

  toShouye: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  toGwc: function () {
    wx.switchTab({
      url: '/pages/huiyuan/gouwuche/che_list',
    })
  },

  jiaGwc: function () {
    var that = this;
    if (this.data.user_id.length > 0) {
      console.log(this.data.user_id + this.data.cpid )
      wx.request({
        url:  'http://www.yaoyiwangluo.com/wx_gwc_add.asp',
        data: {
          cs_cpid: this.data.cpid,
          cs_uid: this.data.user_id,
          cs_cp_mingcheng:that.data.cp_mingcheng,
          cs_jiage:that.data.jiage
        },
        success: function (res) {
          console.log(res.data);
          if(res.data.zt=="yes"){
            wx.showToast({
              title:  '加入购物车成功',
            })
          } else if (res.data.zt == "no"){
            wx.showToast({
              title: '已经在购物车', 
            })
          }
        }
      })
    } else {
      console.log(res.data)
    }
  },

  shoucang: function () {
    var that = this;
    if (this.data.user_id.length > 0) {
      console.log(this.data.user_id + this.data.cpid)
      wx.request({
        url: 'http://www.yaoyiwangluo.com/wx_shoucang_add.asp',
        data: {
          cs_cpid: this.data.cpid,
          cs_uid: this.data.user_id,
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.zt == "yes") {
            wx.showToast({
              title: '收藏成功',
            })
          } else if (res.data.zt == "no") {
            wx.showToast({
              title: '产品已收藏',
            })
          }
        }
      })
    } else {
      console.log(res.data)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log("cpid"+options.cpid+options.cpmc);
    that.setData({
      cpid: options.cpid
    });
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight:res.windowHeight
        })
      },
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_sp_info-a.asp',
      data: { cp_id: options.cpid},
      success: function (res) {
        console.log(res.data);
        that.setData({
          cp_tupian: res.data.cp_tupian,
          cp_tupian1: res.data.cp_tupian1,
          cp_tupian2: res.data.cp_tupian2,
          cp_tupian3: res.data.cp_tupian3,
          cp_tupian4: res.data.cp_tupian4,
          cp_mingcheng: res.data.cp_mingcheng,
          jiage: res.data.jiage,
          cp_jianjie: res.data.cp_jianjie,
          cp_kucun: res.data.cp_kucun,
          xiangou_shuliang: res.data.xiangou_shuliang,
          cp_yixiaoshou: res.data.cp_yixiaoshou,
          image2: [res.data.cp_tupian1, res.data.cp_tupian2, res.data.cp_tupian3, res.data.cp_tupian4]
        })
      }
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_sp_info-b.asp',
      data: { cp_id: options.cpid },
      success: function (res) {
        console.log(res.data);
        var article=res.data;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_Pinlun_list.asp',
      data: { cpid: options.cpid },
      success: function (res) {
        console.log("wx_Pinlun_list",res.data);
        that.setData({
          pl: res.data
        })
      }
    })

    wx.getStorage({
      key: 'u_id',
      success: function(res) {
        that.setData({
          user_id:res.data
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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