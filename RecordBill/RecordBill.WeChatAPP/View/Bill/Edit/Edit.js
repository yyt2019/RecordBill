// View/Bill/Edit/Edit.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bill: {},
    billCategories: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBillCategoryList(options.id);
  },
  /**
   * 获得列表
   */
  getBillCategoryList: function(id) {
    var data = {
      "Token": app.globalData.token
    };
    var success = result => {
      this.setData({
        billCategories: result.Data
      });
      this.getBillInfo(id);
    };
    app.sendPost(app.routing.billCategory.getBillCategories, data, success);
  },
  getBillInfo: function (id) {
    var data = {
      "id": id
    };
    var success = result => {
      this.setData({
        bill: result.Data
      });
    };
    app.sendGet(app.routing.bill.getBillInfo, data, success);
  },
  /**
   * 绑定类型更改
   */
  bindBillCategoryChange: function(e) {
    var index = parseInt(e.detail.value);
    var billCategory = this.data.billCategories[index];
    this.setData({
      "bill.Category": billCategory.Name
    });
  },
  /**
   * 绑定时间更改
   */
  bindDateChange: function(e) {
    var values = e.detail.value.split("-");
    var dt = app.setLocalTime(new Date(values[0], parseInt(values[1]) - 1, values[2]));
    var dtStr = app.dateTimeFormat(dt, "yyyy/MM/dd");
    this.setData({
      "bill.RecordDate": dt,
      "bill.RecordDateStr": dtStr
    });
  },
  /**
   * 金额输入
   */
  inputAmount: function(e) {
    this.data.bill.Amount = e.detail.value;
  },
  /**
   * 内容输入
   */
  inputContents: function(e) {
    this.data.bill.Contents = e.detail.value;
  },
  /**
   * 保存
   */
  save: function() {
    if (!this.data.bill.RecordDate) {
      wx.showModal({
        content: '请选择账单日期',
        showCancel: false
      });
      return;
    }
    if (!this.data.bill.Category) {
      wx.showModal({
        content: '请选择账单类型',
        showCancel: false
      });
      return;
    }
    if (this.data.bill.Amount == null || this.data.bill.Amount == undefined || this.data.bill.Amount < 0) {
      console.log(this.data.bill.Amount);
      wx.showModal({
        content: '请填写正确的账单金额',
        showCancel: false
      });
      return;
    }
    if (!this.data.bill.Contents) {
      wx.showModal({
        content: '请填写账单内容',
        showCancel: false
      });
      return;
    }
    var url = app.routing.bill.editBill;
    var data = {
      "ID": this.data.bill.ID,
      "Token": app.globalData.token,
      "Contents": this.data.bill.Contents,
      "Amount": this.data.bill.Amount,
      "RecordDate": this.data.bill.RecordDate,
      "Category": this.data.bill.Category,
    };
    var success = result => {
      wx.showToast({
        title: result.Message,
        icon: 'success',
        duration: 1000,
        success: res => {
          setTimeout(() => {
            wx.navigateBack({
              delta:1
            });
          }, 1000);
        }
      });
    };
    app.sendPost(url, data, success);
  }
})