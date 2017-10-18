document.addEventListener("init", function(event) {
    var page = event.target;
    
    if(page.id === "sitUpCounter") {
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
            var sitUpCountList = getSitList();
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
            deleteSit(time);
            addSit(sitUpCount);
        }
        
        $('.start-button').on("click", sitUpStart);
        $('.stop-button').on("click", sitUpStop);
        $('#situp_back').on("click", sitUpStop);
        $('.reset-button').on("click", reset);
        load();
        update();
    }
    
    if(page.id === "backExtensionCounter") {　//　背筋カウント
       
        var backExtensionCount = 0;
        function increment() {
            backExtensionCount++; 
            update();
        }
         
        function reset() {
            navigator.vibrate(200)
            if (backExtensionCount > 0 && confirm("リセットしますか？")) {
                backExtensionCount = 0;
                update();
            }
        }
        
        function load() {
            backExtensionCount = 0;
            var backExtensionCountList = getBackList();
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
            
            var digits = $('.counter-digit');
            for (var i = 0; i < str.length; i++) {
                digits.get(i).src = 'img/no_0' + str[i] + '.png'
            }
            
            deleteBack(time);
            addBack(backExtensionCount);
        }
        
        $('.count-button').on("click", increment);
        $('.reset-button').on("click", reset);
        load();
        update();
    
    }
    
    if(page.id === "squatCounter") {
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
    
     if(page.id === "pushUpCounter") {  // 腕立て伏せカウント
           
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
            var pushUpCountList = getPushList();
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
            
            deletePush(time);
            addPush(pushUpCount);
        }
        
            $('.count-button').on("click", increment);
            $('.reset-button').on("click", reset);
            load();
            update();
            
    }
});

var watchID = null;
document.addEventListener("backbutton",sitUpStop , false);

function sitUpStop() {
    if(watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        document.getElementById("situp_start").disabled = "";
    }
}

function addSit(sitUpCount) {
    var sitUpCountList = getSitList();
     
    sitUpCountList.push({id: time, sicount: sitUpCount});
    saveSitList(sitUpCountList);
}

function getSitList() {
    var sitUpCountList = localStorage.getItem("sitUpCountKey");
    if (sitUpCountList == null) {
        return new Array();
    } else {
        return JSON.parse(sitUpCountList);
    }
}

function saveSitList(sitUpCountList) {
    try {
        localStorage.setItem("sitUpCountKey", JSON.stringify(sitUpCountList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteSit(id) {
    var sitUpCountList = getSitList();
    for (var si in sitUpCountList) {
        if (sitUpCountList[si].id == id) {
            sitUpCountList.splice(si, 1);
            saveSitList(sitUpCountList);
            break; 
        }
    }
}
    
function addBack(backExtensionCount) {
    var backExtensionCountList = getBackList();
     
    backExtensionCountList.push({id: time, bcount: backExtensionCount});
    saveBackList(backExtensionCountList);
}

function getBackList() {
    var backExtensionCountList = localStorage.getItem("backExtensionCountKey");
    if (backExtensionCountList == null) {
        return new Array();
    } else {
        return JSON.parse(backExtensionCountList);
    }
}

function saveBackList(backExtensionCountList) {
    try {
        localStorage.setItem("backExtensionCountKey", JSON.stringify(backExtensionCountList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteBack(id) {
    var backExtensionCountList = getBackList();
    for (var b in backExtensionCountList) {
        if (backExtensionCountList[b].id == id) {
            backExtensionCountList.splice(b, 1);
            saveBackList(backExtensionCountList);
            break; 
        }
    }
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
    for (var squ in squatCountList) {
        if (squatCountList[squ].id == id) {
            squatCountList.splice(squ, 1);
            saveSquatList(squatCountList);
            break; 
        }
    }
}
    
function addPush(pushUpCount) {
    var pushUpCountList = getPushList();
     
    pushUpCountList.push({id: time, pcount: pushUpCount});
    savePushList(pushUpCountList);
}

function getPushList() {
    var pushUpCountList = localStorage.getItem("pushUpCountKey");
    if (pushUpCountList == null) {
        return new Array();
    } else {
        return JSON.parse(pushUpCountList);
    }
}

function savePushList(pushUpCountList) {
    try {
        localStorage.setItem("pushUpCountKey", JSON.stringify(pushUpCountList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deletePush(id) {
    var pushUpCountList = getPushList();
    for (var p in pushUpCountList) {
        if (pushUpCountList[p].id == id) {
            pushUpCountList.splice(p, 1);
            savePushList(pushUpCountList);
            break; 
        }
    }
}
