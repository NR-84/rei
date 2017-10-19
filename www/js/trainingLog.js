function onInitTrainingLog() {
    var sitUpCountList = getSitUpList();
    var backExtensionCountList = getBackExtensionList();
    var pushUpCountList = getPushUpList();
    var d = new Date();
    
    for( var i=0; i<7; i++ ){
        var year2 = d.getFullYear();
        var mon2 = d.getMonth()+1;
        var day2 = d.getDate();
        var time2 = year2 + "/" + mon2 + "/" + day2;
        var backExtensionCountElement = null;
        var pushUpCountElement = null;
        var sitUpCountElement = null;
        var sigoal = localStorage.getItem("sitUpGoalKey");
        var bgoal = localStorage.getItem("backExtensionGoalKey");
        var squgoal = localStorage.getItem("squatGoalKey");
        var pgoal = localStorage.getItem("pushUpGoalKey");
        var sitUpCheck;
        var backExtensionCheck;
        var pushUpCheck;
        
        for (var sitUpCountVariable in sitUpCountList) {
            if (sitUpCountList[sitUpCountVariable].id == time2) {
                var sitUpCountElement = sitUpCountList[sitUpCountVariable];
                break;
            }
        }
        
        for (var backExtensionCountVariable in backExtensionCountList) {
            if (backExtensionCountList[backExtensionCountVariable].id == time2) {
                var backExtensionCountElement = backExtensionCountList[backExtensionCountVariable];
                 break;
             }
        }
        
        for (var pushUpCountVariable in pushUpCountList) {
            if (pushUpCountList[pushUpCountVariable].id == time2) {
                var pushUpCountElement = pushUpCountList[pushUpCountVariable];
                break;
            }
        }
        
        if(sitUpCountElement != null) {
            if(sigoal == null){
                sitUpCheck = "-";
            } else if(sigoal > sitUpCountElement.sicount) {
                sitUpCheck = "×";
            } else if(sigoal <= sitUpCountElement.sicount) {
                sitUpCheck = "○";
            }
        } else {
            sitUpCheck = "-";
        }
        
        if(backExtensionCountElement != null) {
            if(bgoal == null){
                backExtensionCheck = "-";
            } else if(bgoal > backExtensionCountElement.bcount) {
                backExtensionCheck = "×";
            } else if(bgoal <= backExtensionCountElement.bcount) {
                backExtensionCheck = "○";
            }
        } else {
            backExtensionCheck = "-";
        }
        
        if(pushUpCountElement != null) {
            if(pgoal == null) {
                pushUpCheck = "-";
            } else if(pgoal > pushUpCountElement.pcount) {
                pushUpCheck = "×";
            } else if(pgoal <= pushUpCountElement.pcount) {
                pushUpCheck = "○";
            }
        } else {
            pushUpCheck = "-";
        }
        
        var table = document.getElementById("tra_table");
        var tr = table.insertRow(-1);
        var td1 = tr.insertCell(-1),
            td2 = tr.insertCell(-1),
            td3 = tr.insertCell(-1),
            td4 = tr.insertCell(-1),
            td5 = tr.insertCell(-1);
        var tag1 = time2,
            tag2 = "",
            tag3 = "",
            tag4 = "○",
            tag5 = "";
            
        if(sitUpCountElement != null) {
            tag2 = sitUpCheck;
        }
        
        if(backExtensionCountElement != null) {
            tag3 = backExtensionCheck;
        }
        
        if(pushUpCountElement != null) {
            tag5 = pushUpCheck;
        }
    
        var row_len = table.rows.length;
    
        td1.innerHTML = tag1;
        td2.innerHTML = tag2;
        td3.innerHTML = tag3;
        td4.innerHTML = tag4;
        td5.innerHTML = tag5;
        
        d.setDate(d.getDate() - 1);
        
    }
}