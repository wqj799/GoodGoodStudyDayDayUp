toastLog("脚本开始运行");
device.keepScreenOn(3600 * 1000)
sleep(random(500, 1000));
requestScreenCapture();

//获取设备的宽和高
let deviceWidth = device.width;
let deviceHeight = device.height;

//进入要闻
let yaowen = textContains("要闻").findOne();
clickItemInCenter(yaowen);
console.log("进入要闻");
sleep(5000);
//总共看6篇文章
for (let i = 0; i < 6; i++) {
    //截图
    let img = captureScreen();
    let picture = images.read("/sdcard/Pictures/播报.jpg");
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
    console.log("点击新闻");
    sleep(2000);
    for (let m = 0; m < 10; m++) {
        img = captureScreen();
        picture = images.read("/sdcard/Pictures/share.png");
        tmp = images.findImage(img, picture, {threshold:1});
        if (tmp) {
            break;
        } else {
            swipeUp(1);
            sleep(random(500, 1000));
        }
    }
    console.log("到达文章底部");
    toastLog("等待30秒");
    sleep(30000);
    //文章浏览完毕，执行返回
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