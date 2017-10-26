function onInitPushUp() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
    var pushUpCount = 0;
    var state = 0;
    
    function pushUpStart() {
    
        var options = { frequency: 100 }; //0.05秒毎に更新
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        
        document.getElementById("pushUpStart").disabled = "true";
        }
    
    function onSuccess(acceleration) {
        
        var pushUpZ = Math.abs(acceleration.z / 9.80665);　// Z軸方向加速度の絶対値
        
        if(state == 0 && pushUpZ > 1.15) { //Z方向に加速度1.15以上でカウント1
                state = 1;
                pushUpCount++
                update();
        }else if(state == 1 && pushUpZ < 0.8) {
            state = 0;
        }
    }
    
    function onError() {
        console.error('Error!');
    }
     
    function reset() { //カウントリセット
        if (pushUpCount > 0) {
            navigator.vibrate(150);
            if (confirm("リセットしますか？")) {
            pushUpCount = 0;
            update();
            }
        }   
    }
    
    function load() { //カウントロード
        pushUpCount = 0;
        var pushUpCountList = getPushUpList();
        for (var pushUpCountVariable in pushUpCountList) {
            if (pushUpCountList[pushUpCountVariable].id == time) {
                var pushUpCountElement = pushUpCountList[pushUpCountVariable];
                pushUpCount = pushUpCountElement.pcount;
            }
        }
    }
    
    function update() { //カウントアップ表示
        var str = '0000' + pushUpCount;
        str = str.substring(str.length - 4, str.length);
        
        var digits = $('.counter-digit');
        for (var i = 0; i < str.length; i++) {
            digits.get(i).src = 'img/no_0' + str[i] + '.png'
        }
        
        deletePushUp(time);
        addPushUp(pushUpCount);
    }
    
    $('.start-button').on("click", pushUpStart);
    $('.stop-button').on("click", pushUpStop);
    $('#pushUp_back').on("click", pushUpStop);
    $('.reset-button').on("click", reset);
    load();
    update();
}

document.addEventListener("backbutton",pushUpStop , false);

function pushUpStop() {
    if(watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        document.getElementById("pushUpStart").disabled = "";
    }
}

function addPushUp(pushUpCount) {
    var pushUpCountList = getPushUpList();
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
     
    pushUpCountList.push({id: time, pcount: pushUpCount});
    savePushUpList(pushUpCountList);
}

function getPushUpList() {
    var pushUpCountList = localStorage.getItem("pushUpCountKey");
    if (pushUpCountList == null) {
        return new Array();
    } else {
        return JSON.parse(pushUpCountList);
    }
}

function savePushUpList(pushUpCountList) {
    try {
        localStorage.setItem("pushUpCountKey", JSON.stringify(pushUpCountList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deletePushUp(id) {
    var pushUpCountList = getPushUpList();
    for (var pushUpCountVariable in pushUpCountList) {
        if (pushUpCountList[pushUpCountVariable].id == id) {
            pushUpCountList.splice(pushUpCountVariable, 1);
            savePushUpList(pushUpCountList);
            break; 
        }
    }
}