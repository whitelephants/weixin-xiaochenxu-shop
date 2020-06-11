// pages/huiyuan/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str_u_login:"",
    str_u_id: "",
    str_u_name: "",
  },

  toReg:function(){
    wx.navigateTo({
      url: '/pages/huiyuan/zhanghao/reg',
    })
  },

  getWxInfo:function(){
    var myid='';
    var mynicheng='';
    var mytouxiang='';

    wx.getUserInfo({
      success:function(res){
        console.log(res.userInfo);
        mynicheng = res.userInfo.nickname;
        mytouxiang = res.userInfo.avatarUrl;
      }
    })
    wx.login({
      success(res){
        console.log("res.code:"+res.code)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid:'wx3f11406c1e8a89d2',
            secret:'4a0b87cb366c76443430937b309756ba',
            js_code:res.code,
            grant_type:'authorization_code'
          },
          method:"GET",
          success:function(res){
            console.log(res.data.openid);
            myid = res.data.openid;

            wx.request({
              url: 'http://www.yaoyiwangluo.com/wx_check_reg_yonghu-weixin.asp',
              data: {
                wx_openid: myid,
                wx_nicheng: mynicheng,
                wx_touxiang: mytouxiang,
              },
              success: function (res) {
                console.log(res.data);
                
                wx.setStorage({
                  key: 'u_login',
                  data: 'yes',
                }); wx.setStorage({
                  key: 'u_id',
                  data: res.data.uid,
                }); wx.setStorage({
                  key: 'u_name',
                  data: mynicheng,
                  success: function () {
                    wx.navigateTo({
                      url: '/pages/huiyuan/index2',
                    })
                  }
                })
              }
            })
          }
        })
      }
    })

    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    var that = this;

    wx.getStorage({
      key: 'u_id',
      success: function (res) {
        that.setData({ str_u_id: res.data })
      },
    })

    wx.getStorage({
      key: 'u_name',
      success: function (res) {
        that.setData({ str_u_name: res.data })
      },
    })

    wx.getStorage({
      key: 'u_login',
      success: function (res) {
        that.setData({ str_u_login: res.data });
        console.log("denglu=" + res.data)
        if (res.data == "yes") {
          wx.navigateTo({
            url: '/pages/huiyuan/index2',
          })
        }
      },
    })
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