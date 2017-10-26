function onInitSquat() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
    var squatCount = 0;
    var state = 0;
    
    function squatStart() {
    
        var options = { frequency: 100 }; //0.05秒毎に更新
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        
        document.getElementById("squatStart").disabled = "true";
        }
    
    function onSuccess(acceleration) {

        var squatY = Math.abs(acceleration.y / 9.80665);　// Y軸方向加速度の絶対値
        
        if(state == 0 && squatY > 1.25) { //Y方向に加速度1.25以上でカウント1
                state = 1;
                squatCount++
                update();
        }else if(state == 1 && squatY < 0.7) {
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
        squatCount = 0;
        var squatCountList = getSquatList();
        for (var squatCountVariable in squatCountList) {
            if (squatCountList[squatCountVariable].id == time) {
                var squatCountElement = squatCountList[squatCountVariable];
                squatCount = squatCountElement.squcount;
                break;
            }
        }
    }
    
    function update() { //カウントアップ表示
        var str = '0000' + squatCount;
        str = str.substring(str.length - 4, str.length);
        
        var digits = $('.counter-digit');
        for (var i = 0; i < str.length; i++) {
            digits.get(i).src = 'img/no_0' + str[i] + '.png'
        }
        deleteSquat(time);
        addSquat(squatCount);
    }
    
    $('.start-button').on("click", squatStart);
    $('.stop-button').on("click", squatStop);
    $('#squat_back').on("click", squatStop);
    $('.reset-button').on("click", reset);
    load();
    update();
}

document.addEventListener("backbutton",squatStop , false);

function squatStop() {
    if(watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        document.getElementById("squatStart").disabled = "";
    }
}

function addSquat(squatCount) {
    var squatCountList = getSquatList();
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
    
    squatCountList.push({id: time, squcount: squatCount});
    saveSquatList(squatCountList);
}

function getSquatList() {
    var squatCountList = localStorage.getItem(SQUATC);
    if (squatCountList == null) {
        return new Array();
    } else {
        return JSON.parse(squatCountList);
    }
}

function saveSquatList(squatCountList) {
    try {
        localStorage.setItem(SQUATC, JSON.stringify(squatCountList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteSquat(id) {
    var squatCountList = getSquatList();
    for (var squatCountVariable in squatCountList) {
        if (squatCountList[squatCountVariable].id == id) {
            squatCountList.splice(squatCountVariable, 1);
            saveSquatList(squatCountList);
            break;
        }
    }
}