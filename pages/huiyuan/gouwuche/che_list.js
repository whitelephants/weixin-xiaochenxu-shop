// pages/huiyuan/gouwuche/che_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    user_id: "", 
    gwc:[],
    zongfeiyong:0,
  },

  myjia:function(e){
    var that=this;
    console.log("用户id：" + that.data.user_id)

    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_gwc_shuxiugai.asp',
      data: {
        cs_cp_shu: e.currentTarget.dataset.jia,
        cs_gwc_id: e.currentTarget.dataset.gwcid,
        // cs_user_id:586
        cs_user_id:that.data.user_id
      },
      success: function (res2) {
        that.getGWC()
      },
    })
  },

  myjian: function (e) {
    var that = this;
    console.log("用户id：" + that.data.user_id)
    if (e.currentTarget.dataset.jian==0){
      console.log("del");
      wx.showModal({
        title: '确认删除',
        content: '删除后不可恢复',
        success(res){
          if(res.confirm){
            wx.request({
              url: 'http://www.yaoyiwangluo.com/wx_gwc_del.asp',
              data: {
                cs_gwc_id: e.currentTarget.dataset.gwcid,
                // cs_user_id: 586
                cs_user_id:that.data.user_id
              },
              success: function (res2) {
                that.getGWC()
              },
            })
          }else if(res.cancel){
          }
        }
      })
    }else{
      wx.request({
        url: 'http://www.yaoyiwangluo.com/wx_gwc_shuxiugai.asp',
        data: {
          cs_cp_shu: e.currentTarget.dataset.jian,
          cs_gwc_id: e.currentTarget.dataset.gwcid,
          // cs_user_id: 586
          cs_user_id:that.data.user_id
        },
        success: function (res) {
          that.getGWC()
        },
      })
    }
    
  },

  getGWC: function (e) {
    var that = this;
    wx.getStorage({
      key: 'u_id',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
        wx.request({
          url: 'http://www.yaoyiwangluo.com/wx_gwc_list.asp',
          data: {
            // uid: 586
            uid: res.data
          },
          success: function (res2) {
            var a = res2.data;
            for (var i in a) {
              console.log("cp_tupian", a[i].cp_tupian.replace("https", "http"));
              a[i].cp_tupian = a[i].cp_tupian.replace("https", "http")
            }
            that.setData({
              gwc: a
            })
          },
        })

        wx.request({
          url: 'http://www.yaoyiwangluo.com/wx_gwc_feiyong.asp',
          data: {
            // uid: 586
            uid: res.data
          },
          success: function (res2) {
            that.setData({
              zongfeiyong: res2.data
            })
          },
        })
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight,
          winWidth: res.windowWidth
        })
      },
    })

    this.getGWC()

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