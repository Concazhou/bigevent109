var form = layui.form;

form.verify({
    //三个密码框都验证了长度
    len: [/^\S{6,12}$/, '密码长度为6-12位非空白'],

    //新密码不能与原密码相同（确认密码框使用这个规则）

    dif: function (val) {
        var oldPwd = $('.oldPwd').val();
        if (oldPwd === val) {
            return '新密码不能与原密码相同'
        }
    },

    same: function (val) {
        var newPwd = $('.newPwd').val();
        if (newPwd != val) {
            return '两次新密码不一致，请重试'
        }
    }
});

$('form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.post('/my/updatepwd', data, function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
            //修改成功清空输入框
            $('form')[0].reset();
        }
    })
})