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

// ローカルストレージ定数
var NAME = 'namekey';
var AGE = 'ageKey';
var SEX = 'sexKey';
var HEIGHT = 'heightKey';
var WEIGHTG = 'weightGoalKey';
var SITUPG = 'sitUpGoalKey';
var BACKG = 'backExtensionGoalKey';
var SQUATG = 'squatGoalKey';
var PUSHUPG = 'pushUpGoalKey';
var WEIGHTR = 'weightRecordKey';
var SITUPC = 'sitUpCountKey';
var BACKC = 'backExtensionCountKey';
var SQUATC = 'squatCountKey';
var PUSHUPC = 'pushUpCountKey';

// 全データの有無を確認
var start = 0;
if (localStorage.getItem(NAME) != null) {
    start = 1;
} else if (localStorage.getItem(AGE) != null) {
    start = 1;
} else if (localStorage.getItem(SEX) != null) {
    start = 1;
} else if (localStorage.getItem(HEIGHT) != null) {
    start = 1;
} else if (localStorage.getItem(WEIGHTG) != null) {
    start = 1;
} else if (localStorage.getItem(SITUPG) != null) {
    start = 1;
} else if (localStorage.getItem(BACKG) != null) {
    start = 1;
} else if (localStorage.getItem(SQUATG) != null) {
    start = 1;
} else if (localStorage.getItem(PUSHUPG) != null) {
    start = 1;
} else if (localStorage.getItem(WEIGHTR) != null) {
    start = 1;
} else if (localStorage.getItem(SITUPC) != null) {
    start = 1;
} else if (localStorage.getItem(BACKC) != null) {
    start = 1;
} else if (localStorage.getItem(SQUATC) != null) {
    start = 1;
}else if (localStorage.getItem(PUSHUPC) != null) {
    start = 1;
} else {
    start = 0;
}