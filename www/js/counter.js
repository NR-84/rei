document.addEventListener("init", function(event) {
    var page = event.target;
    
    if(page.id === "situp_counter") {
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
            var silist = getSitList();
            for (var si in silist) {
                if (silist[si].id == time) {
                    var memo4 = silist[si];
                    sitUpCount = memo4.sicount;
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
    
    if(page.id === "backextension_counter") {　//　背筋カウント
       
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
            var blist = getBackList();
            for (var b in blist) {
                if (blist[b].id == time) {
                    var memo2 = blist[b];
                    backExtensionCount = memo2.bcount;
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
    
    if(page.id === "squat_counter") {
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
            
        }
        
        if(state == 0 && (acceleration.y / 9.80665) > 0.9) {
                state = 1;
                sitUpCount++
                update();
            }else if(state == 1 && (acceleration.y / 9.80665) < 0.3) {
                state = 0;
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
            var silist = getSquatList();
            for (var squ in squlist) {
                if (silist[squ].id == time) {
                    var memo5 = squlist[squ];
                    squatCount = memo5.squcount;
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

    }
    
     if(page.id === "pushup_counter") {  // 腕立て伏せカウント
           
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
            var plist = getPushList();
            for (var p in plist) {
                if (plist[p].id == time) {
                    var memo3 = plist[p];
                    pushUpCount = memo3.pcount;
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
    var silist = getSitList();
     
    silist.push({id: time, sicount: sitUpCount});
    saveSitList(silist);
}

function getSitList() {
    var silist = localStorage.getItem("sit_list");
    if (silist == null) {
        return new Array();
    } else {
        return JSON.parse(silist);
    }
}

function saveSitList(silist) {
    try {
        localStorage.setItem("sit_list", JSON.stringify(silist));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteSit(id) {
    var silist = getSitList();
    for (var si in silist) {
        if (silist[si].id == id) {
            silist.splice(si, 1);
            saveSitList(silist);
            break; 
        }
    }
}
    
function addBack(backExtensionCount) {
    var blist = getBackList();
     
    blist.push({id: time, bcount: backExtensionCount});
    saveBackList(blist);
}

function getBackList() {
    var blist = localStorage.getItem("bac_list");
    if (blist == null) {
        return new Array();
    } else {
        return JSON.parse(blist);
    }
}

function saveBackList(blist) {
    try {
        localStorage.setItem("bac_list", JSON.stringify(blist));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteBack(id) {
    var blist = getBackList();
    for (var b in blist) {
        if (blist[b].id == id) {
            blist.splice(b, 1);
            saveBackList(blist);
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

function addSquat(sitUpCount) {
    var squlist = getSquatList();
     
    squlist.push({id: time, squcount: squatCount});
    saveSquatList(squlist);
}

function getSquatList() {
    var squlist = localStorage.getItem("squat_list");
    if (squlist == null) {
        return new Array();
    } else {
        return JSON.parse(squlist);
    }
}

function saveSquatList(silist) {
    try {
        localStorage.setItem("squat_list", JSON.stringify(squlist));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteSquat(id) {
    var squlist = getSquatList();
    for (var squ in squlist) {
        if (squlist[squ].id == id) {
            squlist.splice(squ, 1);
            saveSquatList(squlist);
            break; 
        }
    }
}
    
function addPush(pushUpCount) {
    var plist = getPushList();
     
    plist.push({id: time, pcount: pushUpCount});
    savePushList(plist);
}

function getPushList() {
    var plist = localStorage.getItem("pus_list");
    if (plist == null) {
        return new Array();
    } else {
        return JSON.parse(plist);
    }
}

function savePushList(plist) {
    try {
        localStorage.setItem("pus_list", JSON.stringify(plist));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deletePush(id) {
    var plist = getPushList();
    for (var p in plist) {
        if (plist[p].id == id) {
            plist.splice(p, 1);
            savePushList(plist);
            break; 
        }
    }
}
