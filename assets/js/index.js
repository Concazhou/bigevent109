//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                // console.log(res);
                var name = res.data.nickname || res.data.username;
                $('.username').html('&nbsp;&nbsp;' + name);
                //设置头像
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('text-avatar').hide();
                } else {
                    var Firstword = name.substr(0, 1).toUpperCase();
                    console.log(Firstword);
                    $('.text-avatar').text(Firstword).css('display', 'inline-block');
                    $('.layui-nav-img').hide();
                }
            }
        },
    })
};
getUserInfo();

//退出功能
$('#logout').click(function () {
    layer.confirm('确定提出吗', function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html'
        layer.close(index)
    })
})