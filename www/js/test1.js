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
         
        document.getElementById("user_name").textContent = localStorage.getItem("name");
        document.getElementById("nowage").textContent = "年齢："+localStorage.getItem("age")+"歳";
        document.getElementById("sex_out").textContent = "性別："+localStorage.getItem("sex");
         
        var wlist = getweightlist();
        for (var w in wlist) {
            var memo = wlist[w];
            document.getElementById("wei_out").textContent = memo.weight +"kg";
            var n = memo.weight -localStorage.getItem("weight");
            document.getElementById("g_wei").textContent = "目標まであと"+n.toFixed(2)+"kg";
            var bmi_in = (memo.weight)/(localStorage.getItem("height")*localStorage.getItem("height")*0.0001);
            document.getElementById("bmi_out").textContent = bmi_in.toFixed(2);
         
        }
        
        var blist = getbacklist();
        for (var b in blist) {
            if (blist[b].id == time) {
                var memo2 = blist[b];
                document.getElementById("back_out").textContent = memo2.bcount +"回";
                break;
            }  
        }
        
        var plist = getpushlist();
        for (var p in plist) {
            if (plist[p].id == time) {
                var memo3 = plist[p];
                document.getElementById("push_out").textContent = memo3.pcount +"回";
            }
        }     
    }
    
    if(page.id === "training") {
        
        document.getElementById("sit").textContent = "目標："+localStorage.getItem("sit_up")+"回";
        document.getElementById("back").textContent = "目標："+localStorage.getItem("back_ex")+"回";
        document.getElementById("squ").textContent = "目標："+localStorage.getItem("squat")+"回";
        document.getElementById("push").textContent = "目標："+localStorage.getItem("push_up")+"回";
        }
        
    if(page.id === "setting-page") {
        document.getElementById("name").value = localStorage.getItem("name");
        document.getElementById("age").value = localStorage.getItem("age");
        document.getElementById("height").value = localStorage.getItem("height");
          
        document.getElementById("weight").value = localStorage.getItem("weight");
        document.getElementById("sit_up").value = localStorage.getItem("sit_up");
        document.getElementById("back_ex").value = localStorage.getItem("back_ex");
        document.getElementById("squat").value = localStorage.getItem("squat");
        document.getElementById("push_up").value = localStorage.getItem("push_up");
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
    
function onButtonClick() {
  
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("age", document.getElementById("age").value);
    localStorage.setItem("height", document.getElementById("height").value);
    
    var sex;
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
    localStorage.setItem("sex",sex);
}

function onButtonClick2() {
    
    localStorage.setItem("weight", document.getElementById("weight").value);
    localStorage.setItem("sit_up", document.getElementById("sit_up").value);
    localStorage.setItem("back_ex", document.getElementById("back_ex").value);
    localStorage.setItem("squat", document.getElementById("squat").value);
    localStorage.setItem("push_up", document.getElementById("push_up").value);

    //localStorage.removeItem("bac_list");
    //localStorage.removeItem("pus_list");   
}