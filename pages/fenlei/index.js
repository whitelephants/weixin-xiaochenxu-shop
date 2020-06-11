// pages/fenlei/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    winWidth:0,
    zuixins: "",
    navList:[],
    curNav:0,
  },

  selectNav:function(event){
    var that =this;
    var id=event.target.dataset.id;
    console.log(id);
    that.setData({curNav:id})
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_fenlei_chanpin.asp',
      data:{
        int_lxid1:id
      },
      success:function(res){
        that.setData({zuixins:res.data})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight:res.windowHeight,
          winWidth:res.windowWidth
        })
      },
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_CpList_top4.asp',
      success: function (res) {
        console.log(res.data);
        that.setData({
          zuixins: res.data
        })
      }
    })

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_fenlei.asp',
      success: function (res) {
        console.log(res.data);
        that.setData({
          navList: res.data
        })
      }
    })

    var id = 387;
    that.setData({ curNav: id })
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_fenlei_chanpin.asp',
      data: {
        int_lxid1: id
      },
      success: function (res) {
        that.setData({ zuixins: res.data })
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