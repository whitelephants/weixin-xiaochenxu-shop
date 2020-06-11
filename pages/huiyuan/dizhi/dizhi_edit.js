// pages/huiyuan/dizhi/dizhi_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quyu: [],
    user_id: "",
    dizhi_id: "",
    dzinfo: {},
  },

  baocun: function(e) {
    console.log(e.detail.value)
    if (this.data.user_id.length > 0) {
      wx.request({
        url: 'http://www.yaoyiwangluo.com/wx_dizhi_edit.asp',
        data: {
          cs_uid: this.data.user_id,
          cs_xingming: e.detail.value.xingming,
          cs_shouji: e.detail.value.shouji,
          cs_diqu1: e.detail.value.diqu[0],
          cs_diqu2: e.detail.value.diqu[1],
          cs_diqu3: e.detail.value.diqu[2],
          cs_dizhi: e.detail.value.xiangxi,
          cs_moren: e.detail.value.moren,
          cs_dizhiid: this.data.dizhi_id
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.zt == "yes") {
            wx.showModal({
              title: '录入信息成功',
              content: '点击确认返回列表页面',
              success(res) {
                if (res.confirm) {
                  console.log("点击了确认")
                  wx.navigateTo({
                    url: '/pages/huiyuan/dizhi/dizhi_list',
                  })
                }
              }
            })
          }else{
            wx.showToast({
              title: '录入信息错误，请联系客服',
            })
          }
        }
      })
    } else {

    }
  },

  p1: function(e) {
    var that = this;
    that.setData({
      quyu: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options.dizhiid);
    that.setData({
      dizhi_id: options.dizhiid
    })
    wx.getStorage({
      key: 'u_id',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
        wx.request({
          url: 'http://www.yaoyiwangluo.com/wx_dizhi_info.asp',
          data: {
            cs_uid: res.data,
            cs_dizhiid: options.dizhiid
          },
          success: function(res2) {
            console.log(res2.data);
            that.setData({
              dzinfo: res2.data,
              quyu: [res2.data.diqu1, res2.data.diqu2, res2.data.diqu3]
            })
          }
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