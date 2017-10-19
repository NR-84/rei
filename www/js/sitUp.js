function onInitSitUp() {
    var sitUpCount = 0;
    var state = 0;
    
    function sitUpStart() {
    
        var options = { frequency: 50 }; //0.05秒毎に更新
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        
        document.getElementById("situp_start").disabled = "true";
        }
    
    function onSuccess(acceleration) {
        var element = document.getElementById('accelerometer');
        
        element.innerHTML = 'Y: ' + acceleration.y * 90/9.80665 + '<br />';
                            
        if(state == 1 && (acceleration.y * 90/9.80665) > 75) {
            state = 0;
            sitUpCount++
            update();
        }else if(state == 0 && (acceleration.y * 90/9.80665) < 30) {
            state = 1;
        }
    }
    
    function onError() {
        console.error('Error!');
    }
    
    function reset() {
        navigator.vibrate(200)
        if (sitUpCount > 0 && confirm("リセットしますか？")) {
            sitUpCount = 0;
            update();
        }
    }
    
    function load() {
        sitUpCount = 0;
        var sitUpCountList = getSitUpList();
        for (var sitUpCountVariable in sitUpCountList) {
            if (sitUpCountList[sitUpCountVariable].id == time) {
                var sitUpCountElement = sitUpCountList[sitUpCountVariable];
                sitUpCount = sitUpCountElement.sicount;
                break;
            }
        }
    }
    
    function update() {
        var str = '0000' + sitUpCount;
        str = str.substring(str.length - 4, str.length);
        
        var digits = $('.counter-digit');
        for (var i = 0; i < str.length; i++) {
            digits.get(i).src = 'img/no_0' + str[i] + '.png'
        }
        deleteSitUp(time);
        addsitUp(sitUpCount);
    }
    
    $('.start-button').on("click", sitUpStart);
    $('.stop-button').on("click", sitUpStop);
    $('#situp_back').on("click", sitUpStop);
    $('.reset-button').on("click", reset);
    load();
    update();
}

var watchID = null;
document.addEventListener("backbutton",sitUpStop , false);

function sitUpStop() {
    if(watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        document.getElementById("situp_start").disabled = "";
    }
}

function addsitUp(sitUpCount) {
    var sitUpCountList = getSitUpList();
     
    sitUpCountList.push({id: time, sicount: sitUpCount});
    saveSitUpList(sitUpCountList);
}

function getSitUpList() {
    var sitUpCountList = localStorage.getItem("sitUpCountKey");
    if (sitUpCountList == null) {
        return new Array();
    } else {
        return JSON.parse(sitUpCountList);
    }
}

function saveSitUpList(sitUpCountList) {
    try {
        localStorage.setItem("sitUpCountKey", JSON.stringify(sitUpCountList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteSitUp(id) {
    var sitUpCountList = getSitUpList();
    for (var sitUpCountVariable in sitUpCountList) {
        if (sitUpCountList[sitUpCountVariable].id == id) {
            sitUpCountList.splice(sitUpCountVariable, 1);
            saveSitUpList(sitUpCountList);
            break; 
        }
    }
}