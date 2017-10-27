function onShowHomePage() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var lastYear = now.getFullYear()-1;
    var tenDay = now.getDate()-10;
    var time = year+"/"+mon+"/"+day; // 今日
    var lastTime =  lastYear+"/"+mon+"/"+day;　// 1年前
    var tenTime = year+"/"+mon+"/"+tenDay; //10日前

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
    var sit = "0回";
    for (var sitUpCountVariable in sitUpCountList) {
        if (sitUpCountList[sitUpCountVariable].id == time) { //データがあるとき腹筋カウント取得
            var sitUpCountElement = sitUpCountList[sitUpCountVariable];
            
            if (sitUpCountElement != null) {
                sit = sitUpCountElement.sicount +"回";
            }
        }
    }  
    document.getElementById("sitUpOutput").textContent = sit;
    
    var backExtensionCountList = getBackExtensionList();
    var bac = "0回";
    for (var backExtensionCountVariable in backExtensionCountList) {
        if (backExtensionCountList[backExtensionCountVariable].id == time) {　//データがあるとき背筋カウント表示
            var backExtensionCountElement = backExtensionCountList[backExtensionCountVariable];
            
            if (backExtensionCountElement != null) {
                bac = backExtensionCountElement.bcount +"回";
            }
        }
    }  
     document.getElementById("backExtensionOutput").textContent = bac;
    
    var squatCountList = getSquatList();
    var squ = "0回";
    for (var squatCountVariable in squatCountList) {
        if (squatCountList[squatCountVariable].id == time) {　//データがあるときスクワットカウント表示
            var squatCountElement = squatCountList[squatCountVariable];
            
            if (squatCountElement != null) {
                squ = squatCountElement.squcount +"回";
            }
        }
    }
     document.getElementById("squatOutput").textContent = squ;
    
    var pushUpCountList = getPushUpList();
    var pus = "0回";
    for (var pushUpCountVariable in pushUpCountList) {
        if (pushUpCountList[pushUpCountVariable].id == time) {　//データがあるとき腕立てカウント表示
            var pushUpCountElement = pushUpCountList[pushUpCountVariable];
            
            if (pushUpCountElement != null) {
                pus = pushUpCountElement.pcount +"回";
            }
        }
    }
    document.getElementById("pushUpOutput").textContent = pus;
    
    for (var weightRecordVariable in weightRecordList) {
        if (weightRecordList[weightRecordVariable].id == lastTime) {　//1年前のデータ削除
            weightRecordList.splice(weightRecordVariable, 1);
            saveWeightList(weightRecordList);
            break;
        }   
    }
    
    for (var sitUpCountVariable in sitUpCountList) {
        if (sitUpCountList[sitUpCountVariable].id == tenTime) {　//10日前のデータ削除
            sitUpCountList.splice(sitUpCountVariable, 1);
            saveSitUpList(sitUpCountList);
            break; 
        }
    }
    
    for (var backExtensionCountVariable in backExtensionCountList) {
        if (backExtensionCountList[backExtensionCountVariable].id == tenTime) {　//10日前のデータ削除
            backExtensionCountList.splice(backExtensionCountVariable, 1);
            saveBackExtensionList(backExtensionCountList);
            break; 
        }
    }
    
    for (var squatCountVariable in squatCountList) {
        if (squatCountList[squatCountVariable].id == tenTime) {　//10日前のデータ削除
            squatCountList.splice(squatCountVariable, 1);
            saveSquatList(squatCountList);
            break;
        }
    }
    
    for (var pushUpCountVariable in pushUpCountList) {
        if (pushUpCountList[pushUpCountVariable].id == tenTime) {　//10日前のデータ削除
            pushUpCountList.splice(pushUpCountVariable, 1);
            savePushUpList(pushUpCountList);
            break; 
        }
    }
    
    
}

function clock() {
    document.getElementById("viewClock").innerHTML = getNow();
}

timerID = setInterval('clock()',1000); // 1秒おきに時間を取得

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

