document.addEventListener("init", function(event) {
    var page = event.target;
        
    if(page.id === "tra_log") {
        
        var silist = getSitList();
        var blist = getBackList();
        var plist = getPushList();
        var d = new Date();
        
        for( var i=0; i<7; i++ ){
            var year = d.getFullYear();
            var mon = d.getMonth()+1;
            var day = d.getDate();
            var time = year+"/"+mon+"/"+day;
            var memo2 = null;
            var memo3 = null;
            var memo4 = null;
            var sigoal = localStorage.getItem("sitUpGoalKey");
            var bgoal = localStorage.getItem("backExtensionGoalKey");
            var squgoal = localStorage.getItem("squatGoalKey");
            var pgoal = localStorage.getItem("pushUpGoalKey");
            var siox;
            var box;
            var pox;
            
            for (var si in silist) {
                if (silist[si].id == time) {
                    var memo4 = silist[si];
                    break;
                }
            }
            
            for (var b in blist) {
                 if (blist[b].id == time) {
                     var memo2 = blist[b];
                     break;
                 }
            }
            
            for (var p in plist) {
                if (plist[p].id == time) {
                    var memo3 = plist[p];
                    break;
                }
            }
            
            if(memo4 != null) {
                if(sigoal == null){
                    siox = "-";
                } else if(sigoal > memo4.sicount) {
                    siox = "×";
                } else if(sigoal <= memo4.sicount) {
                    siox = "○";
                }
            } else {
                siox = "-";
            }
            
            if(memo2 != null) {
                if(bgoal == null){
                    box = "-";
                } else if(bgoal > memo2.bcount) {
                    box = "×";
                } else if(bgoal <= memo2.bcount) {
                    box = "○";
                }
            } else {
                box = "-";
            }
            
            if(memo3 != null) {
                if(pgoal == null) {
                    pox = "-";
                } else if(pgoal > memo3.pcount) {
                    pox = "×";
                } else if(pgoal <= memo3.pcount) {
                    pox = "○";
                }
            } else {
                pox = "-";
            }
            
            var table = document.getElementById("tra_table");
            var tr = table.insertRow(-1);
            var td1 = tr.insertCell(-1),
                td2 = tr.insertCell(-1),
                td3 = tr.insertCell(-1),
                td4 = tr.insertCell(-1),
                td5 = tr.insertCell(-1);
            var tag1 = time,
                tag2 = "",
                tag3 = "",
                tag4 = "○",
                tag5 = "";
                
            if(memo4 != null) {
                tag2 = siox;
            }
            
            if(memo2 != null) {
                tag3 = box;
            }
            
            if(memo3 != null) {
                tag5 = pox;
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
    
});