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
        var element = document.getElementById('accelerometer_squat');
        
        element.innerHTML = 'Y: ' + acceleration.y / 9.8066 ;
    
    if(state == 0 && (acceleration.y / 9.80665) > 1.25) { //Y方向に加速度1.25以上でカウント1
            state = 1;
            squatCount++
            update();
        }else if(state == 1 && (acceleration.y / 9.80665) < 0.7) {
            state = 0;
        }
    }
    
    function onError() {
        console.error('Error!');
    }
    
    function reset() { //カウントリセット
        navigator.vibrate(150);
        if (squatCount > 0 && confirm("リセットしますか？")) {
            squatCount = 0;
            update();
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