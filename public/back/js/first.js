//一进入页面 发送ajax 请求  获取数据

    //声名全局变量
    var currentPage=1;
    var pageSize=5;
   //一进入页面就进行页面的渲染
    render();
 function render(){

     $.ajax({
         type:'get',
         url:'/category/queryTopCategoryPaging',
         data:{
             page:currentPage,
             pageSize:pageSize,
         },
         dataType:"json",
         success:function(info){
             // console.log(info);
             //得到数据  将数据和模版结合
             var htmlStr=template("first_tpl",info);
             //将数据渲染在页面上
             $("tbody").html(htmlStr);
             //分页插件部分 分页页面初始化
           $('#first_fenYe').bootstrapPaginator({
               bootstrapMajorVersion:3,//指定版本号
               currentPage:info.page,//当前页
               totalPages:Math.ceil(info.total/ info.size),//获取总页数
               onPageClicked:function(a, b, c,page){
                   currentPage=page;
                   render();
               }

           })

         }
     })
 }
 // 添加数据部分  点击添加按钮 模态框显示 给添加分类按钮设置点击事件
    $('#addBtn').on("click",function(){
      $("#firstModal").modal("show") ;

    });
 //表单校验 表单验证插件
    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',   // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },

        // 配置字段
        fields: {
            categoryName: {
                // 配置校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: "一级分类名称不能为空"
                    }
                }
            }
        }
    });
    // 4  注册表单校验成功事件, 阻止默认成功的提交, 通过 ajax 进行提交
    $("#form").on("success.form.bv",function(e){
        //阻止表单默认提交
        e.preventDefault();
        //通过ajax 提交
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            dataType:'json',
            success:function(info){
              console.log(info);
              if(info.success){
                  // 模态框隐藏
                  $("#firstModal").modal("hide") ;
                  currentPage=1;
                  render();
              }
            },


        })
    })

