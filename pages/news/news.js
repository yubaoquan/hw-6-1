// pages/news/news.js

const categories = [
    { title: '推荐', id: 'top' },
    { title: '国内', id: 'guonei' },
    { title: '国际', id: 'guoji' },
    { title: '娱乐', id: 'yule' },
    { title: '体育', id: 'tiyu' },
    { title: '军事', id: 'junshi' },
    { title: '科技', id: 'keji' },
    { title: '财经', id: 'caijing' },
    { title: '时尚', id: 'shishang' },
    { title: '游戏', id: 'youxi' },
    { title: '汽车', id: 'qiche' },
    { title: '健康', id: 'jiankang' },
];

Page({

    /**
     * 页面的初始数据
     */
    data: {
        category: { id: 'top' },
        categories: categories.map(category => {
            return {
                ...category,
                news: [],
                page: 1,
            }
        }),
        news: Array(20).fill(0).map((item, i) => {
            return {
                title: `这是第${i + 1}条新闻`,
                id: i + 1
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
        console.info('fetch news...', this)
        wx.request({
            url: 'http://v.juhe.cn/toutiao/index',
            data: {
                key: 'dfb93ade00c180409254236a492998bc',
                type: this.data.category.id,
                page: this.data.category.page || 1,
                page_size: 10,
                is_filter: 1,
            },
            success: (res) => {
                console.info('news: ', res.data.result)
                const news = res.data.result?.data.map(item => {
                    const newsItem = {
                        title: item.title,
                        url: encodeURI(item.url),
                        author: item.author_name,
                        date: item.date,
                        imgs: [],
                    };

                    if (item.thumbnail_pic_s) newsItem.imgs.push(item.thumbnail_pic_s);
                    if (item.thumbnail_pic_s02) newsItem.imgs.push(item.thumbnail_pic_s02);
                    if (item.thumbnail_pic_s03) newsItem.imgs.push(item.thumbnail_pic_s03);

                    return newsItem;
                }) || [{
                    title: 'bb机',
                    url: 'https://www.baidu.com',
                    author: '新华社',
                    date: '2020-09-01 11:22:33',
                    imgs: [
                        'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
                        'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
                        'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
                    ]
                }, {
                    title: 'bb机2张图',
                    url: 'https://www.baidu.com',
                    author: '新华社',
                    date: '2020-09-01 11:22:33',
                    imgs: [
                        'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
                        'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
                    ]
                }, {
                    title: 'bb机1张图',
                    url: 'https://www.baidu.com',
                    author: '新华社',
                    date: '2020-09-01 11:22:33',
                    imgs: [
                        'http://wx3.sinaimg.cn/mw600/6f496928ly1gt82pxom24j20iz0cpwgh.jpg',
                    ]
                }];

                const { categories } = this.data;
                const category = categories.find(item => item.id === this.data.category.id);
                console.info(news);
                category.news.push(...news);
                this.setData({ categories, category });
            }
        })
    },
    handleCategoryTap(e) {
        const { id } = e.currentTarget.dataset.category;
        const category = this.data.categories.find(item => item.id === id);
        console.info(category);
        this.setData({ category });
        if (!category.news.length) this.fetchNews();
    },
    handleLikeClick(e) {
        
        wx.showToast({
          title: '喜欢这条',
        })
    }
})