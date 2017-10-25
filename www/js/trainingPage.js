function onShowTraining() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
    var weightRecordList = getWeightList();
    var weightRecordVariable
    var inWeight = 0;
    
    if (localStorage.getItem(SITUPG) == null || localStorage.getItem(SITUPG) == '') {
        document.getElementById("sitUpGoalOutput").textContent = "目標未設定"
    } else {
        document.getElementById("sitUpGoalOutput").textContent = "目標："+localStorage.getItem(SITUPG)+"回";
    }
    
    if (localStorage.getItem(BACKG) == null || localStorage.getItem(BACKG) == '') {
        document.getElementById("backExtensionGoalOutput").textContent = "目標未設定"
    } else {
        document.getElementById("backExtensionGoalOutput").textContent = "目標："+localStorage.getItem(BACKG)+"回";
    }
    
    if (localStorage.getItem(SQUATG) == null || localStorage.getItem(SQUATG) == '') {
        document.getElementById("squatGoalOutput").textContent = "目標未設定"
    } else {
        document.getElementById("squatGoalOutput").textContent = "目標："+localStorage.getItem(SQUATG)+"回";
    }
    
    if (localStorage.getItem(PUSHUPG) == null || localStorage.getItem(PUSHUPG) == '') {
        document.getElementById("pushUpGoalOutput").textContent = "目標未設定"
    } else {
        document.getElementById("pushUpGoalOutput").textContent = "目標："+localStorage.getItem(PUSHUPG)+"回";
    }
    
    for (var weightRecordVariable in weightRecordList) { //今日の体重未入力の場合アラート
       if (weightRecordList[weightRecordVariable].id == time) {
            inWeight = 1; //今日の体重があれば1を代入
        }   
    }
    if (inWeight == 0 && start == 1) { //今日の体重が入力されていなければアラート
        alert("体重未入力です");
    }
}