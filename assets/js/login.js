//切换登录和注册盒子
$('#goto-re').click(function () {
    $('#login').hide().next().show();
})

$('#goto-lo').click(function () {
    $('#login').show().next().hide();
})

//完成注册功能
$('#register form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: 'http://www.liulongbin.top:3007/api/reguser',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                //注册成功，显示登录盒子，隐藏注册盒子
                $('#login').show().next().hide();
            }
        }
    })
})

//表单验证
var form = layui.form;

form.verify({
    // 自定义  函数
    // len:function(val){
    //     //val形参表示使用此验证个规则的输入框的值
    //     if(!/^\S{6,12}$/.test(val)){//如果不满足   6-12位 非空白
    //      return '密码格式不对，请重新输入（密码6~12位，不能有空格）'
    //     }
    // }

    //自定义 数组   len:[正则表达式，'验证不通过时提示的信息']
    len: [/^\S{6,12}$/, '密码格式不对，请重新设置（6~12位非空白）'],

    //验证重复密码和密码框内容是否一致
    same: function (val) {
        var pwd = $('#repwd').val();
        if (pwd != val) {
            return '两次密码不一致';
        }
    }
})