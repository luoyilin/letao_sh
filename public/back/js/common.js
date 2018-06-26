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
//
});
//图表
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2018 年注册人数'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["一月","二月","三月","四月","五月","六月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
var myChart = echarts.init(document.getElementById('mains'));
var option = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'阿迪王'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

myChart.setOption(option);

