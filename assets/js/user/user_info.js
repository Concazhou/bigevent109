//数据回填
var form = layui.form;

function renderUserinfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                form.val('user', res.data)
            }
        }
    })
};
renderUserinfo();


//更新用户信息
$('form').on('submit', function (e) {
    e.preventDefault();

    var data = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                window.parent.getUserInfo();
            }
        }
    })
})

//重置按钮
$('button:contains("重置")').click(function(e){
// e.preventDefault();
renderUserinfo();
})