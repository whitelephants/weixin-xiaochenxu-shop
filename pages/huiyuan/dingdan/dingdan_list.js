// pages/chanping/xiangxi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    currentTab: 0,
    ddcps:[],
    user_id:"",
  },

  switchNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  huadong: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.windowHeight
        })
      },
    })

    wx.getStorage({
      key: 'u_id',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
        wx.request({
          url: 'http://www.yaoyiwangluo.com/wx_dingdan_list.asp',
          data: {
            cs_uid: 586
            // cs_uid: res.data
          },
          success: function (res2) {            
            console.log(res.data);
            that.setData({
              ddcps: res2.data,
              
            })
          }
        })
      },
    })
    

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_sp_info-b.asp',
      data: {
        cp_id: options.cpid
      },
      success: function(res) {
        console.log(res.data);
        var article = res.data;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_Pinlun_list.asp',
      data: {
        cpid: options.cpid
      },
      success: function(res) {
        console.log("wx_Pinlun_list", res.data);
        that.setData({
          pl: res.data
        })
      }
    })

    wx.getStorage({
      key: 'u_id',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})