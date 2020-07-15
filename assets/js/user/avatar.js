//初始化剪裁插件   实现基础的剪裁效果
var img = $('#image')
//设置剪裁插件的配置项
var options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 创建裁剪区域
img.cropper(options)


//点击上传选择图片
$('button:contains("上传")').click(function () {
    $('#file').click();
})

//文件域的内容发生改变，更换剪裁区的图片
$('#file').change(function () {
    var fileObj = this.files[0]; //文件对象
    var url = URL.createObjectURL(fileObj) //得到一个临时的URL  可以得到我们选择的图片
    //更换剪裁区的图片，需要先销毁剪裁区
    img.cropper('destroy');
    img.attr('src', url);
    img.cropper(options);
})

// 点击确定剪裁并更新头像
$('button:contains("确定")').click(function () {
    var canvas = img.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
    })
    var img_bs64 = canvas.toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: img_bs64
        },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                window.parent.getUserInfo();
            }
        }
    })
})