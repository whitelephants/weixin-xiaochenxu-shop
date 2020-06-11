// pages/a/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ad_img2:"",
    jieguo: true,
    image: "",
    image2: "",
    xinxis:"",
    zuixins:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wxshop/100-guanggao-tupiandizhi.html',
      success:function(res){
        console.log(res.data);
        self.setData({
          ad_img2: res.data
        })
      }
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wxshop/100-guanggao-xianshi.html',
      success: function (res) {
        console.log(res.data);
        if(res.data=="yes"){
          self.setData({
            jieguo: true
          })
        } else if (res.data == "no"){
          self.setData({
            jieguo: false
          })
        }
      }
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wxshop/100-lunbotupian.html',
      success: function (res) {
        console.log(res.data);
        self.setData({
          image: res.data
        })
      }
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wxshop/100-lunbotupian-link.html',
      success: function (res) {
        console.log(res.data);
        self.setData({
          image2: res.data
        })
      }
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_news_list.asp',
      success: function (res) {
        console.log(res.data);
        self.setData({
          xinxis: res.data
        })
      }
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_CpList_top4.asp',
      success: function (res) {
        var a = res.data;
        for (var i in a){
          console.log("cp_tupian", a[i].cp_tupian.replace("https", "http"));
          a[i].cp_tupian=a[i].cp_tupian.replace("https", "http")
        }
        self.setData({
          zuixins: a
        })
      }
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