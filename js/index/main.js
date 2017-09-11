/**
 * Created by Administrator on 2017/8/9.
 */
//main.js
var canvas,stage,container,images = {}, sound = {},txt, bg, winWid = document.documentElement.clientWidth, winHei = document.documentElement.clientHeight;

function canvasInit() {
    canvas = document.createElement('canvas');
    canvas.id = 'mainView';
    canvas.setAttribute('width', winWid);
    canvas.setAttribute('height',winHei);

    document.documentElement.appendChild(canvas);

    stage = new createjs.Stage(canvas);//获取舞台
    container = new createjs.Container();//新建容器
    stage.addChild(container);//将容器放在舞台上
    createjs.Touch.enable(stage);//使移动端支持createjs的鼠标事件
    /**
     * 预加载类
     */
    var loader = new createjs.LoadQueue(false);//这里一共可以是3个参数 第一个是是否用XHR模式加载 第二个是基础路径  第三个是跨域
    // 关键！----设置并发数
    loader.setMaxConnections(100);
    // 关键！---一定要将其设置为 true, 否则不起作用。
    loader.maintainScriptOrder=true;
    //注意加载音频文件需要调用如下代码行
    createjs.Sound.alternateExtensions=["wav"];
    loader.installPlugin(createjs.Sound);
    createjs.WebAudioPlugin.playEmptySound();
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("progress",progressHandler);
    loader.addEventListener("complete",completeHandler);
    loader.loadManifest([
        {src:"../images/index/big.jpg", id:"big"},
        {src:"../images/index/s.jpg", id:"small"},
        {src:"../images/index/s1.png", id:'s1'},
        {src:"../images/index/s2.png", id:'s2'},
        {src:"../images/index/s3.png", id:'s3'},
        {src:"../images/index/s4.png", id:'s4'},
        {src:"../images/index/s5.png", id:'s5'},
        {src:"../images/index/s6.png", id:'s6'},
        {src:"../images/index/m1.png", id:'m1'},
        {src:"../images/index/m2.png", id:'m2'},
        {src:"../images/index/h.png", id:'h'},
        {src:"../images/index/people.png", id:'people'},
        {src:"../images/index/phone.png", id:'phone'},
        {src:"../music/dida.wav",id:'dida'},
        {src:"../music/jiaobu.wav",id:'jiaobu'},
        {src:"../music/deng.wav",id:'deng'},
        {src:"../music/ai.wav",id:'ai'},
        {src:"../music/msg.wav",id:'msg'},
    ]);

    //createjs.Sound.on("fileload", handleSoundLoad);
    //createjs.Sound.registerSounds( sound, '../music/');

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stageBreakHandler);

}
function playMusic(src){
    createjs.Sound.alternateExtensions=["wav"];
    createjs.Sound.registerSound('../music/'+src+'.wav');
     createjs.Sound.addEventListener("fileload", playSound);
    function playSound(e){
        //createjs.Sound.play(e.src);
        sound[src] = e.src;
        console.log(sound)
    }
}
function handleFileLoad(evt) {
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
    if (evt.item.type == "sound" && evt.item.ext == 'wav') {
        createjs.Sound.registerSound('../music/'+evt.item.id+'.wav');
    }

    //这是单个文件加载完成的事件，把它保存到一个地方之后可以直接拿来创建对象
    txt = new createjs.Text('加载进度',"16px Times","#fff");
    txt.x = winWid/2 - 30 ;                   //改变txt  X的坐标（在canvas中距离 左侧 的坐标）
    txt.y = winHei/2 - 45 ;                   //改变txt  Y的坐标（在canvas中距离 顶部 的坐标）
    container.addChild(txt); //完成之后需要添加到stage中才能正常显示
}
function progressHandler(event)
{
    //这里可以写加载进度 event.progress
    console.log(event.progress)

    container.removeChild(bg);
    bg = new createjs.Shape();
    var bgGraphics = bg.graphics;
    bgGraphics.beginFill('#fff');
    bgGraphics.drawRect( winWid/2 - 100, winHei/2 - 10, 200*event.progress, 20);
    container.addChild(bg);

}
function completeHandler(event)
{
    //container.removeChild(txt);
    //txt = new createjs.Text('加载进度',"16px Times","#000000");
    //txt.x = winWid/2 - 30 ;                   //改变txt  X的坐标（在canvas中距离 左侧 的坐标）
    //txt.y = winHei/2 - 45 ;                   //改变txt  Y的坐标（在canvas中距离 顶部 的坐标）
    //container.addChild(txt); //完成之后需要添加到stage中才能正常显示
    container.removeChild(txt);
    //这是单个文件加载完成的事件，把它保存到一个地方之后可以直接拿来创建对象
    txt = new createjs.Text('点击屏幕任何地方开始吧',"16px Times","#fff");
    txt.x = winWid/2 - 90 ;                   //改变txt  X的坐标（在canvas中距离 左侧 的坐标）
    txt.y = winHei/2 - 75 ;                   //改变txt  Y的坐标（在canvas中距离 顶部 的坐标）
    container.addChild(txt); //完成之后需要添加到stage中才能正常显示

    //全部加载完成
    event.currentTarget.removeEventListener("fileload",handleFileLoad);
    event.currentTarget.removeEventListener("progress",progressHandler);
    event.currentTarget.removeEventListener("complete",completeHandler);

   //点击开始
    canvas.addEventListener('touchstart',function(){
        container.removeChild(txt);
        container.removeChild(bg);

        //播放钟声 TODO
        //playMusic('dida');
        createjs.Sound.play('dida');
        var sJpg = new createjs.Bitmap(images.small);
        var s1Jpg = new createjs.Bitmap(images.s1);
        var s2Jpg = new createjs.Bitmap(images.s2);

        var sArr = [];
        sArr[0] = new createjs.Bitmap(images.s3);
        sArr[1] = new createjs.Bitmap(images.s4);
        sArr[2] = new createjs.Bitmap(images.s5);
        sArr[3] = new createjs.Bitmap(images.s6);

        var m1Jpg = new createjs.Bitmap(images.m1);
        var m2Jpg = new createjs.Bitmap(images.m2);
        var hJpg = new createjs.Bitmap(images.h);

        getImgWH(sJpg);

        getImgWH(sArr[0]);
        getImgWH(m1Jpg);
        getImgWH(hJpg);

        /*setTimeout(function(){
         container.removeChild(timeJpg);
         getImgWH(time2Jpg);
         },1000)*/

        //秒针动画
        var sTime = 0;
        var sTimer = setInterval(function(){
            container.removeChild(sArr[sTime]);
            sTime ++
            getImgWH(sArr[sTime]);
            if(sTime == 3){
                container.removeChild(m1Jpg);
                getImgWH(m2Jpg);
                clearInterval(sTimer);
            }
        },1000)

        setTimeout(function(){
            var bigJpg = new createjs.Bitmap(images.big);
            //获取图片大小
            var bigWid = bigJpg.image.naturalWidth, bigHei = bigJpg.image.naturalHeight;
            //改变图片尺寸
            //当图片尺寸大于16:9的话，放大撑满高，反之，撑满宽，剩下的自适应
            var scale = ( bigWid / winWid ) < ( bigHei / winHei) ? ( bigWid / winWid ) : ( bigHei / winHei ) ;
            bigJpg.scaleX = 1.15;
            bigJpg.scaleY = 1.15;
            //改变图片位置
            bigJpg.x = (winWid - bigWid * 1.15) / 2;
            bigJpg.y = (winHei - bigHei * 1.15) / 2;
            container.addChild(bigJpg);
            //播放脚步声 TODO
            //playMusic('jiaobu');
            createjs.Sound.play('jiaobu');
            createjs.Tween.get(bigJpg).to({
                scaleX: 1/scale,
                scaleY: 1/scale,
                x : (winWid - bigWid / scale) / 2,
                y : (winHei - bigHei / scale ) / 2
            },5000)
            setTimeout(function(){
                setTimeout(function(){
                    var people = new createjs.Bitmap(images.people);
                    getImgWH(people,.61,function(){
                        people.alpha = 0
                    })
                    //播放关灯声
                    //playMusic('deng');
                    createjs.Sound.play('deng');
                    setTimeout(function(){
                        createjs.Tween.get(people).to({
                            alpha : 1
                        },1000).call(function(){
                            //叹气
                            //playMusic('ai');
                            createjs.Sound.play('ai');
                            setTimeout(function(){
                                //短信提醒
                                //playMusic('msg');
                                createjs.Sound.play('msg');
                                var phone = new createjs.Bitmap(images.phone);
                                setTimeout(function(){

                                    var shape=new createjs.Shape();
                                    var graphics=shape.graphics;
                                    graphics.beginFill('rgba(0,0,0,0.3)');
                                    graphics.drawRect(0,0,winWid,winHei);
                                    container.addChild(shape);

                                    getImgWH(phone,.6,function(){
                                        phone.x = winWid + phone.image.naturalWidth * phone.scaleX;
                                        phone.y = winHei + phone.image.naturalHeight * phone.scaleY;
                                        phone.alpha = 0;
                                    })

                                    createjs.Tween.get(phone).to({
                                        x : winWid - phone.image.naturalWidth * phone.scaleX,
                                        y : winHei - phone.image.naturalHeight * phone.scaleY,
                                        alpha : 1
                                    },500)
                                    setTimeout(function(){
                                        phone.addEventListener("click",function(){
                                            window.location.href = 'page.html';
                                        })
                                    },500)
                                },500)
                            },2000)
                        })
                    },1000)
                })
            },5000);
        },4000)
    })
}
function stageBreakHandler(event)
{
    stage.update();
}

function getImgWH(img , ratio, fn){
    var imgWid = img.image.naturalWidth, imgHei = img.image.naturalHeight;
    var imgScale = ( imgWid / winWid ) < ( imgHei / winHei) ? ( imgWid / winWid ) : ( imgHei / winHei ) ;
    //改变图片大小
    var ratio = ratio ? ratio : 1;
    img.scaleX = ratio /imgScale;
    img.scaleY = ratio /imgScale;
    //改变图片位置
    img.x = (winWid - imgWid * ratio / imgScale) / 2;
    img.y = (winHei - imgHei * ratio / imgScale) / 2;
    fn?fn():'';
    container.addChild(img);
}