function onInitWeightList() {
    var weightRecordList = getWeightList();
    for (var weightRecordVariable in weightRecordList) {
        var weightRecordElement = weightRecordList[weightRecordVariable];
        
        var table = document.getElementById("weightTable");
        var tr = table.insertRow(1);
        var td1 = tr.insertCell(-1),
            td2 = tr.insertCell(-1),
            td3 = tr.insertCell(-1);
        var tag1 = weightRecordElement.id,
            tag2 = weightRecordElement.weight +"kg",
            tag3;
        var row_len = table.rows.length;
        
         if (localStorage.getItem(HEIGHT) == null || localStorage.getItem(HEIGHT) == '') {
             tag3 = "-";
         } else {
             var bmiCalculation = ((weightRecordElement.weight)/(localStorage.getItem(HEIGHT)*localStorage.getItem(HEIGHT)*0.0001));
             tag3 = bmiCalculation.toFixed(2);
         }
        
        td1.id = weightRecordElement.id;
        td1.innerHTML = tag1;
        td2.innerHTML = tag2;
        td3.innerHTML = tag3;
    }  
}

function todayWeight() {
    var wtext = $("#tweight").val();
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;   
    if (wtext != '') {
        deletWeight(time);
        addWeight(wtext);
        $("#tweight").val("");
    }
}

function addWeight(wtext) {
    var weightRecordList = getWeightList();
    var now = new Date();
    var year = now.getFullYear();
    var mon = now.getMonth()+1;
    var day = now.getDate();
    var time = year+"/"+mon+"/"+day;
     
    weightRecordList.push({id: time, weight: wtext});
    saveWeightList(weightRecordList);
}

function getWeightList() {
    var weightRecordList = localStorage.getItem(WEIGHTR);
    if (weightRecordList == null) {
        return new Array();
    } else {
        return JSON.parse(weightRecordList);
    }
}

function saveWeightList(weightRecordList) {
    try {
        localStorage.setItem(WEIGHTR, JSON.stringify(weightRecordList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deletWeight(id) {
    var weightRecordList = getWeightList();
    for (var weightRecordVariable in weightRecordList) {
        if (weightRecordList[weightRecordVariable].id == id) {
            weightRecordList.splice(weightRecordVariable, 1);
            saveWeightList(weightRecordList);
            break;
        }   
    }
}