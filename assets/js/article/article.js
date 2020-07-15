function rederArticle() {
    $.ajax({
        url: '/my/article/list',
        data: {
            pagenum: 1,
            pagesize: 5,
        },
        success: function (res) {
            var html = template('tpl-article', res);
            $('tbody').html(html);
        }
    })
}
rederArticle();