
//表单提交中验证用户名和密码不能为空
$(function () {
    $("#form").bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //指定提交的数据
        fields:{
            username:{
                validators:{
                    // 配置非空校验
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    //长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名长度必须在2-6位"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password:{
                validators:{
                    // 配置非空校验
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    //长度校验
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度必须在6-12位"
                    },
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        }
    })
});
// 表单校验成功 组织默认提交使用ajax 提交
$("#form").on("success.form.bv",function(e){
    //阻止表单默认提交
    e.preventDefault();
    // console.log($('#form').serialize());
    //使用ajax 提交
    $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function (info) {

            console.log(info);
            if (info.success) {
                // alert("登录成功");
                location.href="index.html";
            }
            if(info.error===1000){
                $("#form").data("bootstrapValidator").updateStatus("username",'INVALID',"callback");
            }
            if(info.error===1001){
                $("#form").data("bootstrapValidator").updateStatus("password",'INVALID',"callback");
            }

        }
    })
    //重置表单
    $(".reset").on("click",function(){
        $("#form").data("bootstrapValidator").resetForm();
    })
});
