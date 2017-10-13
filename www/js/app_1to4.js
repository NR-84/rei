var watchID = null;
document.addEventListener("backbutton",app1stop , false);

function app1stop() {
    if(watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        document.getElementById("app1-sta").disabled = "";
    }
}

document.addEventListener("init", function(event) {
    var page = event.target;
    
    if(page.id === "app1") {

        function app1start() {
            var options = { frequency: 50 }; //0.1秒毎に更新
            watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
            
            document.getElementById("app1-sta").disabled = "true";
            }
        

        
        function onSuccess(acceleration) {
            var element = document.getElementById('accelerometer');
        
            element.innerHTML = 'X: ' + acceleration.x + '<br />' +
                                'Y: ' + acceleration.y + '<br />' +
                                'Z: ' + acceleration.z + '<br />';
        }
        
        function onError() {
            console.error('Error!');
        }
        
        $('.start-button').on("click", app1start);
        $('.stop-button').on("click", app1stop);
        $('#app1-bac').on("click", app1stop);
        
    }
  
});


document.addEventListener("init", function(event) {
    var page = event.target;
    
    if(page.id === "app2") {　//　背筋カウント
       
        var count = 0;
        function increment() {
            count++; 
            update();
        }
         
        function reset() {
            navigator.vibrate(200)
            if (count > 0 && confirm("リセットしますか？")) {
                count = 0;
                update();
            }
        }
        
        function load() {
            count = 0;
            var blist = getbacklist();
            for (var b in blist) {
                if (blist[b].id == time) {
                    var memo2 = blist[b];
                    count = memo2.bcount;
                    break;
                }
            }
        }
        
        function update() {
            var str = '0000' + count;
            str = str.substring(str.length - 4, str.length);
            
            var digits = $('.counter-digit');
            for (var i = 0; i < str.length; i++) {
                digits.get(i).src = 'img/no_0' + str[i] + '.png'
            }
            
            deleteback(time);
            addback(count);
        }
        
        $('.count-button').on("touchend", increment);
        $('.reset-button').on("touchend", reset);
        load();
        update();
    
    }
});
    
function addback(count) {
    var blist = getbacklist();
     
    blist.push({id: time, bcount: count});
    savebacklist(blist);
}

function getbacklist() {
    var blist = localStorage.getItem("bac_list");
    if (blist == null) {
        return new Array();
    } else {
        return JSON.parse(blist);
    }
}

function savebacklist(blist) {
    try {
        localStorage.setItem("bac_list", JSON.stringify(blist));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteback(id) {
    var blist = getbacklist();
    for (var b in blist) {
        if (blist[b].id == id) {
            blist.splice(b, 1);
            savebacklist(blist);
            break; 
        }
    }
}

document.addEventListener("init", function(event) {
    var page = event.target;
        
    if(page.id === "app4") {  // 腕立て伏せカウント
           
        var count2 = 0;
        function increment() {
            count2++; 
            update();
        }
         
        function reset() {
            navigator.vibrate(200)
            if (count2 > 0 && confirm("リセットしますか？")) {
                count2 = 0;
                update();
            }
        }
        
        function load() {
            count = 0;
            var plist = getpushlist();
            for (var p in plist) {
                if (plist[p].id == time) {
                    var memo3 = plist[p];
                    count2 = memo3.pcount;
                }
            }
        }
        
        function update() {
            var str = '0000' + count2;
            str = str.substring(str.length - 4, str.length);
            
            var digits = $('.counter-digit');
            for (var i = 0; i < str.length; i++) {
                digits.get(i).src = 'img/no_0' + str[i] + '.png'
            }
            
            deletepush(time);
            addpush(count2);
        }
        
            $('.count-button').on("touchend", increment);
            $('.reset-button').on("touchend", reset);
            load();
            update();
            
    }
});
    
function addpush(count2) {
    var plist = getpushlist();
     
    plist.push({id: time, pcount: count2});
    savepushlist(plist);
}

function getpushlist() {
    var plist = localStorage.getItem("pus_list");
    if (plist == null) {
        return new Array();
    } else {
        return JSON.parse(plist);
    }
}

function savepushlist(plist) {
    try {
        localStorage.setItem("pus_list", JSON.stringify(plist));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deletepush(id) {
    var plist = getpushlist();
    for (var p in plist) {
        if (plist[p].id == id) {
            plist.splice(p, 1);
            savepushlist(plist);
            break; 
        }
    }
}
