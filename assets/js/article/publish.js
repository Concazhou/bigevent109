var form = layui.form;

//获取分类渲染到下拉框
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        var html = template('tpl-category', res);
        $('select[name=cate_id]').html(html);
        form.render('select');
    }
})

//富文本编辑器
initEditor();

//剪裁区
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

$('button:contains("选择封面")').click(function () {
    $('#file').click();
})

$('#file').change(function () {
    var fileObj = this.files[0];
    var url = URL.createObjectURL(fileObj);

    $image.cropper('destroy').attr('src', url).cropper(options);
})


var s = '';
$('button:contains("发布")').click(function(){
    s = '已发布'
})

$('button:contains("存为草稿")').click(function(){
    s = '草稿'
})

$('form').on('submit', function (e) {
    e.preventDefault();

    var data = new FormData(this);

    data.append('state', s);

    data.set('content', tinyMCE.activeEditor.getContent());
    var canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    })

    canvas.toBlob(
        function (blob) {
            data.append('cover_img', blob);

            //遍历data，检查数据
            data.forEach(function (value, key) { //第一个参数  属性值   第二参数  属性名
                console.log(key, value);
            })

            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                data: data,
                processData: false,
                contentType: false,
                success: function (res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                       location.href = '/article/article.html'
                    }
                }
            })
        }
    )


})