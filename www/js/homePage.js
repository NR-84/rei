function onShowHomePage() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;

    if (localStorage.getItem(NAME) == null || localStorage.getItem(NAME) == '') { //データがあるときローカルストレージ内名前取得
        document.getElementById("userName").textContent = "User name"
    } else {
        document.getElementById("userName").textContent = localStorage.getItem(NAME);
    }
    
     if (localStorage.getItem(AGE) == null || localStorage.getItem(AGE) == '') { //データがあるときローカルストレージ内年齢取得
        document.getElementById("ageOutput").textContent = "年齢未設定"
    } else {
        document.getElementById("ageOutput").textContent = "年齢："+localStorage.getItem(AGE)+"歳";
    }
    
     if (localStorage.getItem(SEX) == null || localStorage.getItem(SEX) == '') { //データがあるときローカルストレージ内性別取得
        document.getElementById("sexOutput").textContent = "性別未設定"
    } else {
        document.getElementById("sexOutput").textContent = "性別："+localStorage.getItem(SEX);
    }
    
    var weightRecordList = getWeightList();
    var taizyu = "体重未入力";
    var inWeight = 0;
    for (var weightRecordVariable in weightRecordList) {
               if (weightRecordList[weightRecordVariable].id == time) { //データがあるときローカルストレージ内体重取得
                        var weightRecordElement = weightRecordList[weightRecordVariable];
                        
                        if (weightRecordElement != null) {
                            taizyu = "体重：" + weightRecordElement.weight +"kg";
                            var inWeight = 1;
                        }
               }
    }
    if (inWeight == 0 && start == 1) { //今日の体重が入力されていなければアラート
        alert("体重未入力です");
    }
    document.getElementById("weightOutput").textContent = taizyu;

    if (localStorage.getItem("weightRecordKey") != null && localStorage.getItem(WEIGHTG) != null) {　// データがあるとき体重の目標値までの差を計算
       for (var weightRecordVariable in weightRecordList) {
        var weightRecordElement = weightRecordList[weightRecordVariable];
            var n = weightRecordElement.weight -localStorage.getItem(WEIGHTG);
            document.getElementById("weightGoalOutput").textContent = "目標まであと"+n.toFixed(2)+"kg";
        }
    } else if (localStorage.getItem(WEIGHTG) == '') {
        document.getElementById("weightGoalOutput").textContent = "目標まであと - kg";
    } else {
         document.getElementById("weightGoalOutput").textContent = "目標まであと - kg";
    }
    if (localStorage.getItem(HEIGHT) == '') {
        document.getElementById("bmiOutput").textContent = "BMI：--";
    } else if (localStorage.getItem("weightRecordKey") != null && localStorage.getItem(HEIGHT) != null) {
        for (var weightRecordVariable in weightRecordList) {
        var weightRecordElement = weightRecordList[weightRecordVariable];
            var bmi_in = (weightRecordElement.weight)/(localStorage.getItem(HEIGHT)*localStorage.getItem(HEIGHT)*0.0001);
            document.getElementById("bmiOutput").textContent = "BMI：" + bmi_in.toFixed(2);
        }
    } else {
        document.getElementById("bmiOutput").textContent = "BMI：--";
    }
    
    var sitUpCountList = getSitUpList();
    if (localStorage.getItem(SITUPC) == null || localStorage.getItem(SITUPC) == '') {　//データがあるとき腹筋カウント表示
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
    if (localStorage.getItem(BACKC) == null || localStorage.getItem(BACKC) == '') {　//データがあるとき背筋カウント表示
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
    
    var squatCountList = getSquatList();
    if (localStorage.getItem(SQUATC) == null || localStorage.getItem(SQUATC) == '') {　//データがあるときスクワットカウント表示
        document.getElementById("squatOutput").textContent = "0回";
    } else {
        for (var squatCountVariable in squatCountList) {
            if (squatCountList[squatCountVariable].id == time) {
                var squatCountElement = squatCountList[squatCountVariable];
            document.getElementById("squatOutput").textContent = squatCountElement.squcount +"回";
            break;
            }
        }
    }
    
    var pushUpCountList = getPushUpList();
    if (localStorage.getItem(PUSHUPC) == null || localStorage.getItem(PUSHUPC) == '') {　//データがあるとき腕立てカウント表示
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

