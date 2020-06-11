// pages/huiyuan/shoucang/sx_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoucang: [],
    user_id: ""
  },

  cz:function(){
    var that = this;
    wx.getStorage({
      key: 'u_id',
      success: function (res) {
        console.log(res.data)
        that.setData({
          user_id: res.data
        })

        wx.request({
          url: 'http://www.yaoyiwangluo.com/wx_shoucang_list.asp',
          data: {
            uid: res.data
          },
          success: function (res) {
            var a = res.data;
            for (var i in a) {
              console.log("cp_tupian", a[i].cp_tupian.replace("https", "http"));
              a[i].cp_tupian = a[i].cp_tupian.replace("https", "http")
            }
            console.log("shoucang", res.data);
            that.setData({
              shoucang: a
            })
          }
        })

      },
    })
  },

  mydel:function(e){
    var that=this
    console.log("当前用户id" + that.data.user_id + e.currentTarget.dataset.scid)
    wx.showModal({
      title:'删除确认',
      content:'删除后不可恢复',
      success(res){
        if(res.confirm){
          wx.request({
            url: 'http://www.yaoyiwangluo.com/wx_shoucang_del.asp',
            data: {
              uid: that.data.user_id,
              scid:e.currentTarget.dataset.scid
            },
            success: function (res) {
              console.log("shoucang", res.data);
              that.cz();
            }
          })
        }
        else{
          console.log("no")
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.cz();
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