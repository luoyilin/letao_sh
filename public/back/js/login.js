$(function () {
    $("#form").bootstrapValidator({
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
                        message:"用户名长度必须在6-12位"
                    }
                }
            }
        }
    })
});