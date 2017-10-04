// Page init event

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
  //ons.platform.isAndroid() ? sidemenu.right.setAttribute('animation', 'overlay') : sidemenu.right.setAttribute('animation', 'reveal');

  document.querySelector('#tabbar-page').addEventListener('postchange', function(event) {
    if (event.target.matches('#appTabbar')) {
      event.currentTarget.querySelector('ons-toolbar .center').innerHTML = event.tabItem.getAttribute('label');
    }
    
    
    
  });
});

document.addEventListener("show", function(event) {
    console.log(event.target.id);
    var page = event.target;
    
     if(page.id === "home") {
        
      document.getElementById("nowage").textContent = localStorage.getItem("age");
      
      document.getElementById("pushco").textContent = localStorage.getItem("psu");
      
     }
    
     if(page.id === "training") {
         
      document.getElementById("sit").textContent = localStorage.getItem("sit_up");
     
      document.getElementById("back").textContent = localStorage.getItem("back_ex");
      
      document.getElementById("squ").textContent = localStorage.getItem("squat");
      
      document.getElementById("push").textContent = localStorage.getItem("push_up");
      
     }
    
});

document.addEventListener("init", function(event) {
        var page = event.target;  // initイベントが発生したページ
        
        if(page.id === "app2") {
           
             var count = 0;
    function increment() {
        count++;
        update();
    }
    
    function reset() {
        if (count > 0 && confirm('カウンターをリセットしますか？')) {
            count = 0;
            update(); 
        }
    }
    
    function update() {
        var str = '0000' + count;
        str = str.substring(str.length - 4, str.length);
        
        var digits = $('.counter-digit');
        for (var i = 0; i < str.length; i++) {
            digits.get(i).src = 'img/no_0' + str[i] + '.png'
        }
    }
    
    
        $('.count-button').on("touchend", increment);
        $('.reset-button').on("touchend", reset);
        update();
    
        }
    });
    
document.addEventListener("init", function(event) {
        var page = event.target;  // initイベントが発生したページ
        
        if(page.id === "app4") {
           
             var count2 = 0;
    function increment() {
        count2++;
        update();
    }
    
    function reset() {
        if (count2 > 0 && confirm('正気か？')) {
            localStorage.setItem('psu', count2);
            
            //count2 = 0;
            update(); 
        }
    }
    
    function load() {
        count2 =  localStorage.getItem("psu");   
    }
    
    function update() {
        var str = '0000' + count2;
        str = str.substring(str.length - 4, str.length);
        
        var digits = $('.counter-digit');
        for (var i = 0; i < str.length; i++) {
            digits.get(i).src = 'img/no_0' + str[i] + '.png'
        }
    }
    
    
        $('.count-button').on("touchend", increment);
        $('.reset-button').on("touchend", reset);
        load();
        update();
    
        }
    });


timerID = setInterval('clock()',500); //0.5秒毎にclock()を実行

function clock() {
    document.getElementById("view_clock").innerHTML = getNow();
}

function getNow() {
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
    var you = now.getDay();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
    
    var youbi = new Array("日","月","火","水","木","金","土");

	var s = year + "年" + mon + "月" + day + "日 (" + youbi[you] + ") " + hour + "時" + min + "分" + sec + "秒"; 
	return s;

    };
    
function onButtonClick() {
  
    localStorage.setItem("age", document.getElementById("age").value);
    
    localStorage.setItem("sex", document.getElementById("sex").value);
    
    localStorage.setItem("height", document.getElementById("height").value);
    
    localStorage.setItem("weight", document.getElementById("weight").value);
    
    localStorage.setItem("sit_up", document.getElementById("sit_up").value);
     
    localStorage.setItem("back_ex", document.getElementById("back_ex").value);
    
    localStorage.setItem("squat", document.getElementById("squat").value);
     
    localStorage.setItem("push_up", document.getElementById("push_up").value);
   
}

function onRadioButtonChange() {
      check1 = document.settings.sex1.checked;
      check2 = document.settings.sex2.checked;
      check3 = document.settings.sex3.checked;

      target =document.getElementById("sex");

      if (check1 == true) {
        target.innerHTML = "男性<br/>";
      }
      else if (check2 == true) {
        target.innerHTML = "女性<br/>";
      }
      else if (check3 == true) {
        target.innerHTML = "その他<br/>";
      }
    }
