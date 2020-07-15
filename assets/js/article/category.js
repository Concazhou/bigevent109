//获取文章分类
function getcategory() {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            var html = template('tpl-list', res);
            $('tbody').html(html)
        }
    });
}
getcategory();

//删除分类
$('body').on('click', '.del', function () {
    var id = $(this).data('id')
    // console.log(id);

    layer.confirm('确认删除？', {
        icon: 3,
        title: '提示'
    }, function (index) {
        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    getcategory();
                }
            }
        });

        layer.close(index);
    });



})

//添加分类
var addIndex
$('.add').click(function () {
    addIndex = layer.open({
        type: 1,
        title: '添加类别',
        content: $('#tpl-add').html(),
        area: ['400px', '300px']
    });
});

$('body').on('submit', '.add-form', function (e) {
    e.preventDefault();

    var data = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                getcategory();
                layer.close(addIndex);
            }
        }
    })
})

//编辑分类
var editIndex;
$('body').on('click', '.edit', function () {

    var d = $(this).data();

    editIndex = layer.open({
        type: 1,
        title: '编辑类别',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px'],
        success: function () {
            //数据回填
            // $('input[name=name]').val(d.name);
            // $('input[name=alias]').val(d.alias);
            // $('input[name=id]').val(d.id);
            var form = layui.form;
            form.val('reedit', d)
        }
    });
})

$('body').on('submit', '.edit-form', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    data[2].name = 'Id';


    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                getcategory();
                layer.close(editIndex);
            }
        }
    })


})