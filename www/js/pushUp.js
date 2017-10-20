function onInitPushUp() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
    var pushUpCount = 0;
    
    function increment() {
        pushUpCount++; 
        update();
    }
     
    function reset() {
        navigator.vibrate(200)
        if (pushUpCount > 0 && confirm("リセットしますか？")) {
            pushUpCount = 0;
            update();
        }
    }
    
    function load() {
        pushUpCount = 0;
        var pushUpCountList = getPushUpList();
        for (var pushUpCountVariable in pushUpCountList) {
            if (pushUpCountList[pushUpCountVariable].id == time) {
                var pushUpCountElement = pushUpCountList[pushUpCountVariable];
                pushUpCount = pushUpCountElement.pcount;
            }
        }
    }
    
    function update() {
        var str = '0000' + pushUpCount;
        str = str.substring(str.length - 4, str.length);
        
        var digits = $('.counter-digit');
        for (var i = 0; i < str.length; i++) {
            digits.get(i).src = 'img/no_0' + str[i] + '.png'
        }
        
        deletePushUp(time);
        addPushUp(pushUpCount);
    }
    
        $('.count-button').on("click", increment);
        $('.reset-button').on("click", reset);
        load();
        update();
}

function addPushUp(pushUpCount) {
    var pushUpCountList = getPushUpList();
     
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