//
$(function(){
var currentPage=1;
var pageSize=5;
//   声明变量, 标记当前选中的用户
    var currentId;
    var isDelete;
render();
    function render(){

        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info) ;
                var htmlstr = template("tpl",info);
                $("tbody").html(htmlstr);
                //分页插件部分的内容
                $("#fenYe").bootstrapPaginator({
                    //    确定版本号
                    bootstrapMajorVersion:3,
                    //    总共有多少页
                    totalPages:Math.ceil(info.total /info.size),
                    // 当前第几页
                    currentPage:info.page,
                    //配置按钮的点击事件
                    onPageClicked(a,b,c,page){
                        // console.log(page);
                        currentPage=page;
                        render();

                    }

                })
            }
        })

    }
    //启用、禁用功能 点击按钮弹出模态框
    //事件委托 给父盒子设置点击事件 小盒子触发事件
    $("tbody").on("click",".btn",function(){

        $('#userModal').modal("show");
        //点击的时候将当前选中的用户 ID  记录在全局 currentId中
        currentId=$(this).parent().data("id");

        // console.log(currentId);     获取当点击按钮的ID
        // 点击禁用按钮, 让用户变成禁用状态, 让 isDelete变成 0 => 将来传给后台就传 0
        isDelete=$(this).hasClass("btn-danger") ?0:1;


    });
    // updata-user请求
    // 3  给确定按钮设置点击事件 点击确定按钮  需要根据 id 和 isDelete 发送 ajax 请求, 修改用户状态 让模态框隐藏
    $("#submitBtn").on("click",function(){
        console.log(1);

        $.ajax({
            type:'post',
            url:'/user/updateUser' ,
            data:{
                id:currentId,
                isDelete:isDelete
            } ,
            dataType:'json',
            success:function(info){
                   console.log(info)  ;
                   // 关闭模态框
                      $('#userModal').modal("hide");
                      render();


            }
        })
    })
     console.log($("#submitBtn")); 

});
