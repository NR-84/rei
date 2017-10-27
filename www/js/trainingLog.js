function onInitTrainingLog() {
    var sitUpCountList = getSitUpList();
    var backExtensionCountList = getBackExtensionList();
    var squatCountList = getSquatList();
    var pushUpCountList = getPushUpList();
    var d = new Date();
    
    for( var i=0; i<7; i++ ){
        var year2 = d.getFullYear();
        var mon2 = d.getMonth()+1;
        var day2 = d.getDate();
        var countID = year2 + "/" + mon2 + "/" + day2;
        var sitUpCountElement = null;
        var backExtensionCountElement = null;
        var squatCountElement = null;
        var pushUpCountElement = null;
        var sigoal = localStorage.getItem(SITUPG);
        var bgoal = localStorage.getItem(BACKG);
        var squgoal = localStorage.getItem(SQUATG);
        var pgoal = localStorage.getItem(PUSHUPG);
        var sitUpCheck;
        var backExtensionCheck;
        var squatCheck;
        var pushUpCheck;
        
        for (var sitUpCountVariable in sitUpCountList) {
            if (sitUpCountList[sitUpCountVariable].id == countID) {
                var sitUpCountElement = sitUpCountList[sitUpCountVariable];
                break;
            }
        }
        
        for (var backExtensionCountVariable in backExtensionCountList) {
            if (backExtensionCountList[backExtensionCountVariable].id == countID) {
                var backExtensionCountElement = backExtensionCountList[backExtensionCountVariable];
                 break;
             }
        }
        
        for (var squatCountVariable in squatCountList) {
            if (squatCountList[squatCountVariable].id == countID) {
                var squatCountElement = squatCountList[squatCountVariable];
                break;
            }
        }
        
        for (var pushUpCountVariable in pushUpCountList) {
            if (pushUpCountList[pushUpCountVariable].id == countID) {
                var pushUpCountElement = pushUpCountList[pushUpCountVariable];
                break;
            }
        }
        
        if(sitUpCountElement != null) {
            if(sigoal == null || sigoal == ''){
                sitUpCheck = "-";
            } else if(sigoal > sitUpCountElement.sicount) {
                sitUpCheck = "×";
            } else if(sigoal <= sitUpCountElement.sicount) {
                sitUpCheck = "○";
            }
        } else {
            sitUpCheck = "×";
        }
        
        if(backExtensionCountElement != null) {
            if(bgoal == null || bgoal == ''){
                backExtensionCheck = "-";
            } else if(bgoal > backExtensionCountElement.bcount) {
                backExtensionCheck = "×";
            } else if(bgoal <= backExtensionCountElement.bcount) {
                backExtensionCheck = "○";
            }
        } else {
            backExtensionCheck = "×";
        }
        
        if(squatCountElement != null) {
            if(squgoal == null || squgoal == ''){
                squatCheck = "-";
            } else if(squgoal > squatCountElement.squcount) {
                squatCheck = "×";
            } else if(squgoal <= squatCountElement.squcount) {
                squatCheck = "○";
            }
        } else {
            squatCheck = "×";
        }
        
        if(pushUpCountElement != null) {
            if(pgoal == null || pgoal == '') {
                pushUpCheck = "-";
            } else if(pgoal > pushUpCountElement.pcount) {
                pushUpCheck = "×";
            } else if(pgoal <= pushUpCountElement.pcount) {
                pushUpCheck = "○";
            }
        } else {
            pushUpCheck = "×";
        }
        
        var table = document.getElementById("trainingTable");
        var tr = table.insertRow(-1);
        var td1 = tr.insertCell(-1),
            td2 = tr.insertCell(-1),
            td3 = tr.insertCell(-1),
            td4 = tr.insertCell(-1),
            td5 = tr.insertCell(-1);
        var tag1 = countID,
            tag2 = sitUpCheck,
            tag3 = backExtensionCheck,
            tag4 = squatCheck,
            tag5 = pushUpCheck;
            
    
        var row_len = table.rows.length;
    
        td1.innerHTML = tag1;
        td2.innerHTML = tag2;
        td3.innerHTML = tag3;
        td4.innerHTML = tag4;
        td5.innerHTML = tag5;
        
        d.setDate(d.getDate() - 1);
        
    }
}