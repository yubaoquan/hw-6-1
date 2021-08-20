// pages/news/news.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        news: Array(20).fill(0).map((item, i) => {
            return {
                title: `这是第${i + 1}条新闻`
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.info('news page load')
        this.fetchNews()
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
        console.info('下拉刷新');
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.info('触底了')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    fetchNews() {
        console.info('fetch news...')
        wx.request({
            url: 'http://v.juhe.cn/toutiao/index',
            data: {
                key: 'dfb93ade00c180409254236a492998bc'
            },
            success(res) {
                console.info('news: ', res.data.result)
            }
        })
    }
})