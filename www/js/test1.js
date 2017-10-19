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

var now = new Date();
var year = now.getFullYear();
var mon = now.getMonth()+1;
var day = now.getDate();
var week = now.getDay();
var time = year+"/"+mon+"/"+day;
timerID = setInterval('clock()',500);

function clock() {
    document.getElementById("viewClock").innerHTML = getNow();
}

function getNow() {
    var youbi = new Array("日","月","火","水","木","金","土");
    var s = year + "年" + mon + "月" + day + "日 (" + youbi[week] + ") "; 
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
    } else {
        sex = '';
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