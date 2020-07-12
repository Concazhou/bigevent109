//切换登录和注册盒子
$('#goto-re').click(function(){
    $('#login').hide().next().show();
})

$('#goto-lo').click(function(){
    $('#login').show().next().hide();
})