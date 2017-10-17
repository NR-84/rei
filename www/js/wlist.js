function todayWeight() {
    var wtext = $("#tweight").val();
        
    if (wtext != '') {
        deletWeight(time);
        addWeight(wtext);
        $("#tweight").val("");
    }
}

function addWeight(wtext) {
    var wlist = getWeightList();
     
    wlist.push({id: time, weight: wtext});
    saveWeightList(wlist);
}

function getWeightList() {
    var wlist = localStorage.getItem("wei_list");
    if (wlist == null) {
        return new Array();
    } else {
        return JSON.parse(wlist);
    }
}

function saveWeightList(wlist) {
    try {
        localStorage.setItem("wei_list", JSON.stringify(wlist));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deletWeight(id) {
    var wlist = getWeightList();
    for (var w in wlist) {
        if (wlist[w].id == id) {
            wlist.splice(w, 1);
            saveWeightList(wlist);
            break;
        }       
    }
}

function onReady() {
    $("#todayWeight").click(todayWeight);
}

$(onReady);

document.addEventListener("init", function(event) {
    var page = event.target; 
    if(page.id === "weight_log2") {
        
        var wlist = getWeightList();
        for (var w in wlist) {
            var memo = wlist[w];
            console.log(JSON.stringify(memo,null,'\t'));
            
            var table = document.getElementById("wei_table");
            var tr = table.insertRow(1);
            var td1 = tr.insertCell(-1),
                td2 = tr.insertCell(-1),
                td3 = tr.insertCell(-1);
            var tag1 = memo.id,
                tag2 = memo.weight +"kg",
                tag3 = ((memo.weight)/(localStorage.getItem("height")*localStorage.getItem("height")*0.0001));
            var row_len = table.rows.length;
            
            td1.id = memo.id;
            td1.innerHTML = tag1;
            td2.innerHTML = tag2;
            td3.innerHTML = tag3.toFixed(2);
        }
    }
});