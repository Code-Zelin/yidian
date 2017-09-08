/**
 * Created by Administrator on 2017/8/17.
 */
var _hmt = _hmt || [];
(function(){
    var winWidth = document.documentElement.clientWidth;
    var rem = winWidth / 15;
    document.documentElement.style.fontSize = rem + 'px';

    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?3fec7836e29be3451dc286bfc2d9c3f3";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})()