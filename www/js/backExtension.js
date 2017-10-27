function onInitBackExtension() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
    var backExtensionCount = 0;
    var state = 0;
    
    function backExtensionStart() {
    
        var options = { frequency: 50 }; //0.05秒毎に更新
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        
        document.getElementById("backExtensionStart").disabled = "true";
        }
    
    function onSuccess(acceleration) {
        
        var backExtensionY = Math.abs(acceleration.y * 90/9.80665); // Y軸方向加速度の絶対値
                            
        if(state == 1 && backExtensionY > 60) { // 60°以上でカウント1
            state = 0;
            backExtensionCount++
            update();
        }else if(state == 0 && backExtensionY < 20) {
            state = 1;
        }
    }
    
    function onError() {
        console.error('Error!');
    }
    
    function reset() { //カウントリセット
        if (backExtensionCount > 0) {
            navigator.vibrate(150);
        }
        if (backExtensionCount > 0 && confirm("リセットしますか？")) {
        backExtensionCount = 0;
        update();
        }   
    }
    
    function load() {
        backExtensionCount = 0;
        var backExtensionCountList = getBackExtensionList();
        for (var backExtensionCountVariable in backExtensionCountList) {
            if (backExtensionCountList[backExtensionCountVariable].id == time) {
                var backExtensionCountElement = backExtensionCountList[backExtensionCountVariable];
                backExtensionCount = backExtensionCountElement.bcount;
                break;
            }
        }
    }
    
    function update() {
        var str = '0000' + backExtensionCount;
        str = str.substring(str.length - 4, str.length);

        var time = year+"/"+mon+"/"+day;
        var digits = $('.counter-digit');
        for (var i = 0; i < str.length; i++) {
            digits.get(i).src = 'img/no_0' + str[i] + '.png'
        }
        
        deleteBackExtension(time);
        addBackExtension(backExtensionCount);
    }
    
    $('.start-button').on("click", backExtensionStart);
    $('.stop-button').on("click", backExtensionStop);
    $('#backExtension_back').on("click", backExtensionStop);
    $('.reset-button').on("click", reset);
    load();
    update();    
}

var watchID = null;
document.addEventListener("backbutton",backExtensionStop , false);

function backExtensionStop() {
    if(watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        document.getElementById("backExtensionStart").disabled = "";
    }
}

function addBackExtension(backExtensionCount) {
    var backExtensionCountList = getBackExtensionList();
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
    
    backExtensionCountList.push({id: time, bcount: backExtensionCount});
    saveBackExtensionList(backExtensionCountList);
}

function getBackExtensionList() {
    var backExtensionCountList = localStorage.getItem(BACKC);
    if (backExtensionCountList == null) {
        return new Array();
    } else {
        return JSON.parse(backExtensionCountList);
    }
}

function saveBackExtensionList(backExtensionCountList) {
    try {
        localStorage.setItem(BACKC, JSON.stringify(backExtensionCountList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteBackExtension(id) {
    var backExtensionCountList = getBackExtensionList();
    for (var backExtensionCountVariable in backExtensionCountList) {
        if (backExtensionCountList[backExtensionCountVariable].id == id) {
            backExtensionCountList.splice(backExtensionCountVariable, 1);
            saveBackExtensionList(backExtensionCountList);
            break; 
        }
    }
}