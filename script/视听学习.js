toastLog("脚本开始运行");
auto();
device.keepScreenOn(3600 * 1000)
sleep(random(500, 1000));
requestScreenCapture();

//获取设备的宽和高
let deviceWidth = device.width;
let deviceHeight = device.height;
//进入百灵
let bailing = desc("百灵").findOne();
clickItemInCenter(bailing);
console.log("进入百灵");
sleep(5000);
//总共看6篇文章
for (let i = 0; i < 6; i++) {
    //截图
    let img = captureScreen();
    let picture = images.read("/sdcard/脚本/small_share.png");
    let tmp = images.matchTemplate(img, picture, { max: 6 }).sortBy("top");
    if (i != 0) {
        let x1 = tmp.matches[0].point.x;
        let y1 = tmp.matches[0].point.y;
        console.log(tmp.matches[0].point);
        swipe(x1, y1, x1, 150, 500);
        sleep(random(500, 1000));
    }
    //找到第一个新闻，点击进入
    click(deviceWidth / 2, tmp.first().point.y);
    console.log("点击视频");
    toastLog("等待40秒");
    sleep(40000);
    //视频浏览完毕，执行返回
    swipe(50, deviceHeight / 2, deviceWidth - 50, deviceHeight / 2, 500);
    sleep(random(500, 1000));
}
device.cancelKeepingAwake();
toastLog("任务执行完毕");


/**
 * 根据元素点击
 * @param item 元素
 * @param time 点击时间
 */
function clickItemInCenter(item, time) {
    if (time == null) time = 50;
    if (item == null) return;
    let x = item.bounds().centerX();
    let y = item.bounds().centerY();
    press(x, y, time);
}

/**
 * 向上滑动
 */
function swipeUp(n) {
    sleep(200);
    console.log("滑动屏幕");
    let x = parseInt(deviceWidth / 2);
    let duration = 500;
    let y = [parseInt(deviceHeight * 0.75), parseInt(deviceHeight * 0.25)];

    for (let i = 0; i < n; i++) {
        swipe(x, y[0], x, y[1], duration);
    }
}