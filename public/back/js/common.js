if ( location.href.indexOf("login.html") === -1 ) {
    // 如果索引为 -1, 说明在地址栏参数中没有 login.html 需要登陆拦截
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        dataType: "json",
        success: function( info ) {
            console.log( info );
            if ( info.error === 400 ) {
                // 当前用户没登陆, 拦截到登陆页
                location.href = "login.html";
            }

            if ( info.success ) {
                // 当前用户已登录, 不需要拦截, 啥事都不用干, 让用户访问页面
                console.log( "当前用户已登陆" );
            }
        }
    });
}



// 进度条插件js 部分
$(document).ajaxStart(function(){
    NProgress.start();
});
//ajaxStop 所有的 ajax 结束调用
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },5000);
});
// 第一个ajax发送时, 开启进度条
$(document).ajaxStart(function() {
    NProgress.start();
});

// 所有的ajax请求完成时调用, 关闭进度条
$(document).ajaxStop(function() {

    // 模拟网络延迟
    setTimeout(function() {
        NProgress.done();
    }, 500)
});


// 公共功能
$(function() {
    // 1. 左侧二级菜单切换显示
    $('.lt_aside .category').click(function() {
        $('.lt_aside .child').stop().slideToggle();
    });

    // 2. 左侧整个侧边栏显示隐藏功能
    $('.header .header_left').click(function() {
        $('.lt_aside').toggleClass("hidemenu");
        $('.lt_main').toggleClass("hidemenu");
        $('.header').toggleClass("hidemenu");
    });


    // 3. 点击头部退出按钮, 显示退出模态框
    $('.header .header_right').click(function() {
        // 显示模态框
        $('#logoutModal').modal("show");
    });

    // 4. 点击模态框中的退出按钮, 需要进行退出操作(ajax)
    $('#logoutBtn').click(function() {

        // 发送ajax请求进行退出操作, 让后台销毁当前用户的登陆状态
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function( info ) {
                console.log( info )
                if ( info.success ) {
                    // 跳转到登录页面
                    location.href = "login.html";
                }
            }
        })

    });
});



