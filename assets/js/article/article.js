var laypage = layui.laypage;
var layuiform = layui.form;

//获取文章
var data = {
    pagenum: 1,
    pagesize: 2
}

function rederArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            var html = template('tpl-article', res);
            $('tbody').html(html);

            renderPage(res.total);
        }
    })
}
rederArticle();


// 分页
function renderPage(t) {
    laypage.render({
        elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
        count: t, //数据总条数
        limit: data.pagesize, //每页显示度多少条
        curr: data.pagenum, //当前页
        limits: [2, 3, 5, 7],
        layout: ['limit', 'prev', 'page', 'next', 'skip', 'count'],
        jump: function (obj, first) {
            if (first === undefined) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                rederArticle();
            }
        }
    });
}

//获取所有分类
$.ajax({
    url: '/may/article/cates',
    success: function (res) {
        var html = template('tpl-category', res);
        $('#category').html(html);
        form.render('select');
    }
})


//完成筛选
$('#search').on('submit', function (e) {
    e.preventDefault();
    var id = $('#category').val();
    var state = $('#state').val();

    data.cate_id = id;
    data.state = state;

    //重置pagenum
    data.pagenum = 1;

    rederArticle();
})


//定义过滤器
template.defaults.imports.formDate = function (val) {
    var d = new Date(val);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    return year + '-' + month + '-' + day + '-' + h + ':' + m + ':' + s;
}