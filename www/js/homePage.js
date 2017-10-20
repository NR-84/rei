function onShowHomePage() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;

    if (localStorage.getItem("nameKey") == null || localStorage.getItem("nameKey") == '') {
        document.getElementById("userName").textContent = "User name"
    } else {
        document.getElementById("userName").textContent = localStorage.getItem("nameKey");
    }
    
     if (localStorage.getItem("ageKey") == null || localStorage.getItem("ageKey") == '') {
        document.getElementById("ageOutput").textContent = "年齢未設定"
    } else {
        document.getElementById("ageOutput").textContent = "年齢："+localStorage.getItem("ageKey")+"歳";
    }
    
     if (localStorage.getItem("sexKey") == null || localStorage.getItem("sexKey") == '') {
        document.getElementById("sexOutput").textContent = "性別未設定"
    } else {
        document.getElementById("sexOutput").textContent = "性別："+localStorage.getItem("sexKey");
    }
    
    var weightRecordList = getWeightList();
    if (localStorage.getItem("weightRecordKey") == null || localStorage.getItem("weightRecordKey") == '') {
        document.getElementById("weightOutput").textContent = "体重未入力";
    } else {
        for (var weightRecordVariable in weightRecordList) {
        var weightRecordElement = weightRecordList[weightRecordVariable];
            document.getElementById("weightOutput").textContent = "体重：" + weightRecordElement.weight +"kg";
        }
    }
    if (localStorage.getItem("weightRecordKey") != null && localStorage.getItem("weightGoalKey") != null) {
       for (var weightRecordVariable in weightRecordList) {
        var weightRecordElement = weightRecordList[weightRecordVariable];
            var n = weightRecordElement.weight -localStorage.getItem("weightGoalKey");
            document.getElementById("weightGoalOutput").textContent = "目標まであと"+n.toFixed(2)+"kg";
        }
    } else if (localStorage.getItem("weightGoalKey") == '') {
        document.getElementById("weightGoalOutput").textContent = "目標まであと - kg";
    } else {
         document.getElementById("weightGoalOutput").textContent = "目標まであと - kg";
    }
    if (localStorage.getItem("heightKey") == '') {
        document.getElementById("bmiOutput").textContent = "BMI：--";
    } else if (localStorage.getItem("weightRecordKey") != null && localStorage.getItem("heightKey") != null) {
        for (var weightRecordVariable in weightRecordList) {
        var weightRecordElement = weightRecordList[weightRecordVariable];
            var bmi_in = (weightRecordElement.weight)/(localStorage.getItem("heightKey")*localStorage.getItem("heightKey")*0.0001);
            document.getElementById("bmiOutput").textContent = "BMI：" + bmi_in.toFixed(2);
        }
    } else {
        document.getElementById("bmiOutput").textContent = "BMI：--";
    }
    
    var sitUpCountList = getSitUpList();
    if (localStorage.getItem("sitUpCountKey") == null || localStorage.getItem("sitUpCountKey") == '') {
        document.getElementById("sitUpOutput").textContent = "0回";
    } else {
        for (var sitUpCountVariable in sitUpCountList) {
            if (sitUpCountList[sitUpCountVariable].id == time) {
                var sitUpCountElement = sitUpCountList[sitUpCountVariable];
            document.getElementById("sitUpOutput").textContent = sitUpCountElement.sicount +"回";
            break;
            }
        }  
    }
    
    var backExtensionCountList = getBackExtensionList();
    if (localStorage.getItem("backExtensionCountKey") == null || localStorage.getItem("backExtensionCountKey") == '') {
        document.getElementById("backExtensionOutput").textContent = "0回";
    } else {
        for (var backExtensionCountVariable in backExtensionCountList) {
            if (backExtensionCountList[backExtensionCountVariable].id == time) {
                var backExtensionCountElement = backExtensionCountList[backExtensionCountVariable];
            document.getElementById("backExtensionOutput").textContent = backExtensionCountElement.bcount +"回";
            break;
            }
        }  
    }
    
    var pushUpCountList = getPushUpList();
    if (localStorage.getItem("backExtensionCountKey") == null || localStorage.getItem("backExtensionCountKey") == '') {
        document.getElementById("pushUpOutput").textContent = "0回";
    } else {
        for (var pushUpCountVariable in pushUpCountList) {
            if (pushUpCountList[pushUpCountVariable].id == time) {
                var pushUpCountElement = pushUpCountList[pushUpCountVariable];
            document.getElementById("pushUpOutput").textContent = pushUpCountElement.pcount +"回";
            break;
            }
        }
    }
}

function clock() {
    document.getElementById("viewClock").innerHTML = getNow();
}

timerID = setInterval('clock()',500); // 0.5秒おきに時間を取得

function getNow() {
    var nowTime = new Date();
    var nowYear = nowTime.getFullYear();
    var nowMon = nowTime.getMonth()+1;
    var nowDay = nowTime.getDate();
    var nowWeek = nowTime.getDay();

    var youbi = new Array("日","月","火","水","木","金","土");
    var setNowTime = nowYear + "年" + nowMon + "月" + nowDay + "日 (" + youbi[nowWeek] + ") ";
    return setNowTime;
       
}

