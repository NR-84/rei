function todayweight() {
    var wtext = $("#tweight").val();
    if (wtext != '') {
        addweight(wtext);
        $("#tweight").val("");
    }
}

function addweight(wtext) {
    var wlist = getweightlist();
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
     
    wlist.push({id: time, weight: wtext});
    saveweightlist(wlist);
}

function getweightlist() {
    var wlist = localStorage.getItem("wei_list");
    if (wlist == null) {
        return new Array();
    } else {
        return JSON.parse(wlist);
    }
}

function saveweightlist(wlist) {
    try {
        localStorage.setItem("wei_list", JSON.stringify(wlist));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deletweight(id) {
    var wlist = getweightlist();
    for (var w in wlist) {
        if (wlist[w].id == id) {
            wlist.splice(w, 1);
            break;
        }
        
    }
    saveweightlist(wlist);
    var table = document.getElementById("wei_table");
    alert(w);
    alert((wei_table.rows.length) -2 );
    var rows = table.deleteRow(((wei_table.rows.length) -1 ) - parseInt(w)); 
}

function ondeletlink(id) {
    if (!confirm("Are you sure to delete?")) {
        return;
    }
    
   deletweight(id);
}

function onReady() {
    $("#todayweight").click(todayweight);
}

$(onReady);

document.addEventListener("show", function(event) {
        var page = event.target; 
        
        if(page.id === "weight_log2") {
            
            var wlist = getweightlist();
            for (var w in wlist) {
                var memo = wlist[w];
                console.log(JSON.stringify(memo,null,'\t'));
                
                var table = document.getElementById("wei_table");
                
                var tr = table.insertRow(1);
            
                var td1 = tr.insertCell(-1),
                    td2 = tr.insertCell(-1),
                    td3 = tr.insertCell(-1),
                    td4 = tr.insertCell(-1);
                    
                    
                var delbo = '<input type="button" value="行削除" onclick="ondeletlink(' + "'" + memo.id + "'"  + ')" />';
                var tag1 = memo.time,
                    tag2 = memo.weight +"kg",
                    tag3 = ((memo.weight)/(localStorage.getItem("height")*localStorage.getItem("height")*0.0001));
            
                var row_len = table.rows.length;
                
                td1.id = memo.id;
            
                td1.innerHTML = tag1;
                td2.innerHTML = tag2;
                td3.innerHTML = tag3.toFixed(2);
                td4.innerHTML = delbo;
                
            }
   
        }
});