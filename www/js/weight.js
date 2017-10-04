function getweightList() {
    var list = localStorage.getItem("weight_list");
    if (list == null) {
        return new Array();
    } else {
        return JSON.parse(list);
    }
}

///// Save memo
function saveweightList(list) {
    try {
        localStorage.setItem("weight_list", JSON.stringify(list));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

///// Add memo
function addweight(text) {
  var list = getweightList();
  var time = new Date().getTime();
  list.push({ id: time, time: time, text: text });
  saveweightList(list);
}

///// Delete specified memo
function deleteweight(id) {
    var list = getweightList();
    for (var i in list) {
        if (list[i].id == id) {
            list.splice(i, 1);
            break;  // Quit for loop when found
        }
    }
    saveweightList(list);
}// This is a JavaScript file

