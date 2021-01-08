function aidaori(){
    var aidaoriarr=new Array("0405","0512","0918","1213");
    var mydate = new Date();
    var str = "";// + mydate.getFullYear();
    var mm = mydate.getMonth()+1;
    if(mydate.getMonth()>9){
      str += mm;
    }else{
      str += "0" + mm;
    }
    if(mydate.getDate()>9){
      str += mydate.getDate();
    }else{
      str += "0" + mydate.getDate();
    }
    if(aidaoriarr.indexOf(str)>-1){
        return 1;
    }else{
        return 0;
    }
}

if(aidaori()){
    $("html").css({
        "filter":"gray !important",
        "filter":"progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)",
        "filter":"grayscale(100%)",
        "-webkit-filter":"grayscale(100%)",
        "-moz-filter":"grayscale(100%)",
        "-ms-filter":"grayscale(100%)",
        "-o-filter":"grayscale(100%)" 
    });
    Snackbar.show({
        pos: 'bottom-center',
        text: '🕯 今日自动全站变灰哀悼',
        textColor: '#D3D3D3',
        actionText: '知道了♥',
        actionTextColor: '#696969',
        duration: '7000',
    });
}

// 可爱的Title
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '(つェ⊂) 我藏好了哦~~';
        clearTimeout(titleTime);
    } else {
        document.title = '(*´∇｀*) 被你发现啦~~' + OriginTitle;
        titleTime = setTimeout(function() {
            document.title = OriginTitle;
        }, 2000);
    }
});

if((location.href==="https://ccknbc.github.io/home/"))
    {
        Snackbar.show({
                pos: 'top-center',
                text: '🔔 您当前访问的是 <a href="http://www.ccknbc.cc"><font color="#4CAF50"> 主页 </font></a> - <font color="#8fbc8f">Github</font> 镜像站</a>',
                actionText: '🚀<a href="http://www.ccknbc.cc"><b>跳转</b></a>',
                duration: '15000',       
            });
}


if((location.href==="https://ccknbc.gitlab.io/home/"))
{
    Snackbar.show({
            pos: 'top-center',
            text: '🔔 您当前访问的是 <a href="http://www.ccknbc.cc"><font color="#4CAF50"> 主页 </font></a> - <font color="#8fbc8f">Gitlab</font> 镜像站</a>',
            actionText: '🚀<a href="http://www.ccknbc.cc"><b>跳转</b></a>',
            duration: '15000',
        });
}

if((location.href==="https://ccknbc.gitee.io/home/"))
{
    Snackbar.show({
            pos: 'top-center',
            text: '🔔 您当前访问的是 <a href="http://www.ccknbc.cc"><font color="#4CAF50"> 主页 </font></a> - <font color="#8fbc8f"> Gitee</font> 镜像站</a>',
            actionText: '🚀<a href="http://www.ccknbc.cc"><b>跳转</b></a>',
            duration: '15000',  
        });
}

if((location.href==="https://home-ccknbc.netlify.app/"))
{
    Snackbar.show({
            pos: 'top-center',
            text: '🔔 您当前访问的是 <a href="http://www.ccknbc.cc"><font color="#4CAF50"> 主页 </font></a> - <font color="#8fbc8f">Netlify</font> 镜像站</a>',
            actionText: '🚀<a href="http://www.ccknbc.cc"><b>跳转</b></a>',
            duration: '15000',
        });
}

if((location.href==="https://ccknbc.vercel.app/"))
{
    Snackbar.show({
            pos: 'top-center',
            text: '🔔 您当前访问的是 <a href="http://www.ccknbc.cc"><font color="#4CAF50"> 主页 </font></a> - <font color="#8fbc8f">Vercel</font> 镜像站</a>',
            actionText: '🚀<a href="http://www.ccknbc.cc"><b>跳转</b></a>',
            duration: '15000',  
        });
}