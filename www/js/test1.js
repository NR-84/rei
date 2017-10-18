var now = new Date();
var year = now.getFullYear();
var mon = now.getMonth()+1;
var day = now.getDate();
var you = now.getDay();
var time = year+"/"+mon+"/"+day;

window.fn = {};

window.fn.toggleMenu = function () {
    document.getElementById('appSplitter').right.toggle();
};

window.fn.loadView = function (index) {
    document.getElementById('appTabbar').setActiveTab(index);
    document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
    window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
    if (anim) {
        document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
    } else {
        document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
    }
};

ons.ready(function () {
    const sidemenu = document.getElementById('appSplitter');
    
    document.querySelector('#tabbar-page').addEventListener('postchange', function(event) {
        if (event.target.matches('#appTabbar')) {
        event.currentTarget.querySelector('ons-toolbar .center').innerHTML = event.tabItem.getAttribute('label');
        }
    });
});

document.addEventListener("show", function(event) {
    var page = event.target;
    
    if(page.id === "home") {
        
        if (localStorage.getItem("nameKey") == null || localStorage.getItem("nameKey") == '') {
            document.getElementById("userName").textContent = "User name"
        } else {
            document.getElementById("userName").textContent = localStorage.getItem("nameKey");
        }
        
         if (localStorage.getItem("ageKey") == null) {
            document.getElementById("ageOutput").textContent = "年齢未設定"
        } else {
            document.getElementById("ageOutput").textContent = "年齢："+localStorage.getItem("ageKey")+"歳";
        }
        
         if (localStorage.getItem("sexKey") == null) {
            document.getElementById("sexOutput").textContent = "性別未設定"
        } else {
            document.getElementById("sexOutput").textContent = "性別："+localStorage.getItem("sexKey");
        }
        
        var wlist = getWeightList();
        if (localStorage.getItem("wei_list") == null) {
            document.getElementById("weightOutput").textContent = "体重未入力";
        } else {
            for (var w in wlist) {
                var memo = wlist[w];
                document.getElementById("weightOutput").textContent = "体重：" + memo.weight +"kg";
            }
        }
        if (localStorage.getItem("wei_list") && localStorage.getItem("weightKey") != null) {
            for (var w in wlist) {
                var memo = wlist[w];
                var n = memo.weight -localStorage.getItem("weightKey");
                document.getElementById("g_wei").textContent = "目標まであと"+n.toFixed(2)+"kg";
            }
        } else {
            document.getElementById("g_wei").textContent = "目標まであと - kg";
        }
        if (localStorage.getItem("wei_list") && localStorage.getItem("heightKey") != null) {
            for (var w in wlist) {
                var memo = wlist[w];
                var bmi_in = (memo.weight)/(localStorage.getItem("heightKey")*localStorage.getItem("heightKey")*0.0001);
                document.getElementById("bmiOutput").textContent = "BMI：" + bmi_in.toFixed(2);
            }
        } else {
            document.getElementById("bmiOutput").textContent = "BMI：--";
        }
        
       var sitUpCountList = getSitList();
            for (var sitUpCountVariable in sitUpCountList) {
                if (sitUpCountList[sitUpCountVariable].id == time) {
                    var sitUpCountElement = sitUpCountList[sitUpCountVariable];
                document.getElementById("sitUpOutput").textContent = sitUpCountElement.sicount +"回";
                break;
            }  
        }
        
        var blist = getBackList();
        for (var b in blist) {
            if (blist[b].id == time) {
                var memo2 = blist[b];
                document.getElementById("backExtensionOutput").textContent = memo2.bcount +"回";
                break;
            }  
        }
        
        var plist = getPushList();
        for (var p in plist) {
            if (plist[p].id == time) {
                var memo3 = plist[p];
                document.getElementById("pushUpOutput").textContent = memo3.pcount +"回";
                break;
            }
        }     
    }
    
    if(page.id === "training") {
        
        if (localStorage.getItem("sitUpGoalKey") == null) {
        
            document.getElementById("sitUpGoalOutupt").textContent = "目標未設定"
        } else {
        
            document.getElementById("sitUpGoalOutput").textContent = "目標："+localStorage.getItem("sitUpGoalKey")+"回";
        }
        
        if (localStorage.getItem("backExtensionGoalKey") == null) {
            document.getElementById("backExtensionGoalOutput").textContent = "目標未設定"
        } else {
            document.getElementById("backExtensionGoalOutput").textContent = "目標："+localStorage.getItem("backExtensionGoalKey")+"回";
        }
        
        if (localStorage.getItem("squatGoalKey") == null) {
            document.getElementById("squatGoalOutput").textContent = "目標未設定"
        } else {
            document.getElementById("squatGoalOutput").textContent = "目標："+localStorage.getItem("squatGoalKey")+"回";
        }
        
        if (localStorage.getItem("pushUpGoalKey") == null) {
            document.getElementById("pushUpGoalOutput").textContent = "目標未設定"
        } else {
            document.getElementById("pushUpGoalOutput").textContent = "目標："+localStorage.getItem("pushUpGoalKey")+"回";
        }
    }
        
    if(page.id === "setting-page") {
        document.getElementById("nameInput").value = localStorage.getItem("nameKey");
        document.getElementById("ageInput").value = localStorage.getItem("ageKey");
        document.getElementById("heightInput").value = localStorage.getItem("heightKey");
        
        var radios = document.getElementsByName("sexInput");
        var sexcheck = localStorage.getItem("sexKey");
        if (sexcheck != null) {
            for (var i=0; i<radios.length; i++){
                var radio = radios[i];
                if (sexcheck == radio.value) {
                    radio.checked = true;
                    break;
                }
            }
        } else {
            for (var i=0; i<radios.length; i++) {
                var radio = radios[i];
                radio.checked = false;
                break;
            }
        }
        
        document.getElementById("weightGoalInput").value = localStorage.getItem("weightGoalKey");
        document.getElementById("sitUpGoalInput").value = localStorage.getItem("sitUpGoalKey");
        document.getElementById("backExtensionGoalInput").value = localStorage.getItem("backExtensionGoalKey");
        document.getElementById("squatGoalInput").value = localStorage.getItem("squatGoalKey");
        document.getElementById("pushUpGoalInput").value = localStorage.getItem("pushUpGoalKey");
    }
});

timerID = setInterval('clock()',500);

function clock() {
    document.getElementById("view_clock").innerHTML = getNow();
}

function getNow() {
    var youbi = new Array("日","月","火","水","木","金","土");
    var s = year + "年" + mon + "月" + day + "日 (" + youbi[you] + ") "; 
    return s;
    };
    
function userSetting() {
  
    localStorage.setItem("nameKey", document.getElementById("nameInput").value);
    localStorage.setItem("ageKey", document.getElementById("ageInput").value);
    localStorage.setItem("heightKey", document.getElementById("heightInput").value);
    
    var sex = null;
    check1 = document.settings.sex1.checked;
    check2 = document.settings.sex2.checked;
    check3 = document.settings.sex3.checked;
      
    if (check1 == true) {
        sex = "男性";
    } else if (check2 == true) {
        sex = "女性";
    } else if (check3 == true) {
        sex = "その他";
    }
    localStorage.setItem("sexKey",sex);
}

function goalSetting() {
    
    localStorage.setItem("weightGoalKey", document.getElementById("weightGoalInput").value);
    localStorage.setItem("sitUpGoalKey", document.getElementById("sitUpGoalInput").value);
    localStorage.setItem("backExtensionGoalKey", document.getElementById("backExtensionGoalInput").value);
    localStorage.setItem("squatGoalKey", document.getElementById("squatGoalInput").value);
    localStorage.setItem("pushUpGoalKey", document.getElementById("pushUpGoalInput").value);

}

function allDelete() {
    if (confirm("リセットしますか？")) {
        localStorage.clear();
    }
}