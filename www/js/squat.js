function onInitSquat() {
    var squatCount = 0;
    var state = 0;
    
    function squatStart() {
    
        var options = { frequency: 100 }; //0.05秒毎に更新
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        
        document.getElementById("squat_start").disabled = "true";
        }
    
    function onSuccess(acceleration) {
        var element = document.getElementById('accelerometer_squat');
        
        element.innerHTML = 'Y: ' + acceleration.y / 9.8066 ;
    
    if(state == 0 && (acceleration.y / 9.80665) > 1.3) {
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
    
    function reset() {
        navigator.vibrate(200)
        if (squatCount > 0 && confirm("リセットしますか？")) {
            squatCount = 0;
            update();
        }
    }
    
    function load() {
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
    
    function update() {
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
        document.getElementById("squat_start").disabled = "";
    }
}

function addSquat(squatCount) {
    var squatCountList = getSquatList();
     
    squatCountList.push({id: time, squcount: squatCount});
    saveSquatList(squatCountList);
}

function getSquatList() {
    var squatCountList = localStorage.getItem("squatCountKey");
    if (squatCountList == null) {
        return new Array();
    } else {
        return JSON.parse(squatCountList);
    }
}

function saveSquatList(squatCountList) {
    try {
        localStorage.setItem("squatCountKey", JSON.stringify(squatCountList));
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