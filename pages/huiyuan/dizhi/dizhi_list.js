// pages/huiyuan/dizhi/dizhi_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    dizhis:[],
    user_id:0,
  },

  tianjia:function(){
    wx.navigateTo({
      url: '/pages/huiyuan/dizhi/dizhi_add',
    })
  },

  cz:function(){
    var that = this;
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_dizhi_list.asp',
      data: {
        cs_uid:  that.data.user_id
      },
      success: function (res2) {
        console.log(res2.data);
        that.setData({
          dizhis: res2.data
        })
      }
    })
  },

  xiugai: function (e) {
    wx.navigateTo({
      url: '/pages/huiyuan/dizhi/dizhi_edit?dizhiid='+ e.currentTarget.dataset.dizhiid
    })
  },

  setMoren: function (e) {
    var that = this;
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_dizhi_moren.asp',
      data: {
        cs_uid: that.data.user_id,
        cs_dizhiid: e.currentTarget.dataset.dizhiid
      },
      success: function (res2) {
        console.log("删除" + res2.data)
        that.cz()
      }
    })
  },

  mydel: function (e) {
    var that=this;
    console.log(that.data.user_id+e.currentTarget.dataset.dizhiid)
    wx.showModal({
      title: '删除确认',
      content: '删除后不可恢复',
      success(res){
        if(res.confirm){
          wx.request({
            url: 'http://www.yaoyiwangluo.com/wx_dizhi_del.asp',
            data:{
              cs_uid: that.data.user_id,
              cs_dizhiid: e.currentTarget.dataset.dizhiid
            },
            success:function(res2){
              console.log("删除"+res2.data)
              that.cz()
            }
          })
        }else{
          console.log("取消")
        }
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
          winHeight:res.windowHeight
        })
      },
    })

    wx.getStorage({
      key: 'u_id',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
        that.cz()
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