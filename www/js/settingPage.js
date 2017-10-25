function onShowSetting() {
    document.getElementById("nameInput").value = localStorage.getItem(NAME);
    document.getElementById("ageInput").value = localStorage.getItem(AGE);
    document.getElementById("heightInput").value = localStorage.getItem(HEIGHT);
    
    var radios = document.getElementsByName("sexInput");
    var sexcheck = localStorage.getItem(SEX);
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
    
    document.getElementById("weightGoalInput").value = localStorage.getItem(WEIGHTG);
    document.getElementById("sitUpGoalInput").value = localStorage.getItem(SITUPG);
    document.getElementById("backExtensionGoalInput").value = localStorage.getItem(BACKG);
    document.getElementById("squatGoalInput").value = localStorage.getItem(SQUATG);
    document.getElementById("pushUpGoalInput").value = localStorage.getItem(PUSHUPG);
}

function userSetting() {
    localStorage.setItem(NAME, document.getElementById("nameInput").value);
    localStorage.setItem(AGE, document.getElementById("ageInput").value);
    localStorage.setItem(HEIGHT, document.getElementById("heightInput").value);
    
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
    localStorage.setItem(SEX,sex);
}

function goalSetting() { 
    localStorage.setItem(WEIGHTG, document.getElementById("weightGoalInput").value);
    localStorage.setItem(SITUPG, document.getElementById("sitUpGoalInput").value);
    localStorage.setItem(BACKG, document.getElementById("backExtensionGoalInput").value);
    localStorage.setItem(SQUATG, document.getElementById("squatGoalInput").value);
    localStorage.setItem(PUSHUPG, document.getElementById("pushUpGoalInput").value);
}

function settingDelete() {
    navigator.vibrate(200);
    if (confirm("設定をリセットしますか？")) {
        localStorage.removeItem(NAME);
        localStorage.removeItem(AGE);
        localStorage.removeItem(SEX);
        localStorage.removeItem(HEIGHT);
        localStorage.removeItem(WEIGHTG);
        localStorage.removeItem(SITUPG);
        localStorage.removeItem(BACKG);
        localStorage.removeItem(SQUATG);
        localStorage.removeItem(PUSHUPG);
    }
}

function weightDelete() {
    navigator.vibrate(200);
    if (confirm("体重記録をリセットしますか？")) {
        localStorage.removeItem(WEIGHTR);
    }
}

function countDelete() {
    navigator.vibrate(200);
    if (confirm("トレーニング記録をリセットしますか？")) {
        localStorage.removeItem(SITUPC);
        localStorage.removeItem(BACKC);
        localStorage.removeItem(SQUATC);
        localStorage.removeItem(PUSHUPC);
    }
}

function allDelete() {
    navigator.vibrate(300);
    if (confirm("全てのデータを削除しますか？")) {
        localStorage.clear();
    }
}