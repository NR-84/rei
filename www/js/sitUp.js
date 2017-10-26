function onInitSitUp() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
    var sitUpCount = 0;
    var state = 0;
    
    function sitUpStart() {
    
        var options = { frequency: 50 }; //0.05秒毎に更新
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        
        document.getElementById("sitUpStart").disabled = "true";
        }
    
    function onSuccess(acceleration) {
        
        var sitUpY = Math.abs(acceleration.y * 90/9.80665);　// Y軸方向加速度の絶対値
        
        if(state == 1 && sitUpY > 70) { // 70°以上でカウント1
            state = 0;
            sitUpCount++
            update();
        }else if(state == 0 && sitUpY < 30) {
            state = 1;
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
    
    function load() {　//カウントロード
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
    
    function update() { //カウントアップ表示
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
        document.getElementById("sitUpStart").disabled = "";
    }
}

function addsitUp(sitUpCount) {
    var sitUpCountList = getSitUpList();
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
     
    sitUpCountList.push({id: time, sicount: sitUpCount});
    saveSitUpList(sitUpCountList);
}

function getSitUpList() {
    var sitUpCountList = localStorage.getItem(SITUPC);
    if (sitUpCountList == null) {
        return new Array();
    } else {
        return JSON.parse(sitUpCountList);
    }
}

function saveSitUpList(sitUpCountList) {
    try {
        localStorage.setItem(SITUPC, JSON.stringify(sitUpCountList));
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