document.addEventListener("init", function(event) {
    var page = event.target;
    
    if(page.id === "sitUpCounter") { // 腹筋カウント
    
        onInitSitUp();
        
    } else if(page.id === "backExtensionCounter") {　// 背筋カウント
    
        onInitBackExtension();
        
    } else if(page.id === "squatCounter") {  // スクワットカウント
    
        onInitSquat();
        
    } else if(page.id === "pushUpCounter") {  // 腕立て伏せカウント
    
        onInitPushUp();
        
    } else if(page.id === "tra_log") {  // トレーニング達成度記録
    
        onInitTrainingLog();
        
    } else if(page.id === "weightRecord") {  // 日々の体重変化記録
    
        onInitWeightList() ;
        
    }
    
});

document.addEventListener("show", function(event) {
    var page = event.target;
    
    if(page.id === "home") {
        
        onShowHomePage();
         
    }
    
    else if(page.id === "training") {
        
        if (localStorage.getItem("sitUpGoalKey") == null || localStorage.getItem("sitUpGoalKey") == '') {
            document.getElementById("sitUpGoalOutpt").textContent = "目標未設定"
        } else {
            document.getElementById("sitUpGoalOutput").textContent = "目標："+localStorage.getItem("sitUpGoalKey")+"回";
        }
        
        if (localStorage.getItem("backExtensionGoalKey") == null || localStorage.getItem("backExtensionGoalKey") == '') {
            document.getElementById("backExtensionGoalOutput").textContent = "目標未設定"
        } else {
            document.getElementById("backExtensionGoalOutput").textContent = "目標："+localStorage.getItem("backExtensionGoalKey")+"回";
        }
        
        if (localStorage.getItem("squatGoalKey") == null || localStorage.getItem("squatGoalKey") == '') {
            document.getElementById("squatGoalOutput").textContent = "目標未設定"
        } else {
            document.getElementById("squatGoalOutput").textContent = "目標："+localStorage.getItem("squatGoalKey")+"回";
        }
        
        if (localStorage.getItem("pushUpGoalKey") == null || localStorage.getItem("pushUpGoalKey") == '') {
            document.getElementById("pushUpGoalOutput").textContent = "目標未設定"
        } else {
            document.getElementById("pushUpGoalOutput").textContent = "目標："+localStorage.getItem("pushUpGoalKey")+"回";
        }
    }
        
    else if(page.id === "setting-page") {
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