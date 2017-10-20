function onShowSetting() {
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