function onShowTraining() {
    if (localStorage.getItem("sitUpGoalKey") == null || localStorage.getItem("sitUpGoalKey") == '') {
        document.getElementById("sitUpGoalOutput").textContent = "目標未設定"
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