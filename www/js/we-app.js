function onSaveBtn() {
    var text = $("#tweight").val();
    if (text != '') {
        // Save to local storage
        addweight(text);
        // Clear form
        $("#tweight").val("");
        // Initialize top page
        initweightPage();
    }
    $.mobile.changePage("#weight_log2", { reverse: true });
}

///// Initialize top page
function initweightPage() {
    $("#wei").empty();
    
    var list = getweightList();
    for (var i in list) {
        var memo = list[i];
        var d = new Date(memo.time);
        var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        
        $li = $("<li><a href='#' class='show'><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
        $li.data("id", memo.id);
        $li.find("h3").text(date);
        $li.find("p").text(memo.text);
        $("#wei").prepend($li);
    }
    if (list.length == 0) {
        $li = $("<li>No memo found</li>");
        $("#wei").prepend($li);
    }
    $("#wei").listview("refresh");  // Call refresh after manipulating list
}

///// Move to detail page
function onShowLink() {
    var $li = $(this).parent();
    var memoTitle = $li.find("h3").text();
    var memoHtml = $li.find("p").html().replace(/\n/g, "<br>");
    
    $("#ShowPage h1").text(memoTitle);
    $("#ShowPage p").html(memoHtml);
    $.mobile.changePage("#ShowPage");
}

///// Delete memo
function onDeleteLink() {
    if (!confirm("Are you sure to delete this memo?")) {
      return;
    }
    var $li = $(this).parent();
    var id = $li.data("id");
    deleteMemo(id);
    
    initweightPage();
    
    // Return to top
    $.mobile.changePage("#weight_log2", { reverse: true });
}

///// Called when app launch
function onReady() {
    initweightPage();
    $("#set").click(onSaveBtn);
    $("#TopListView").on("click", "a.show", onShowLink);
    $("#TopListView").on("click", "a.delete", onDeleteLink);
}

$(onReady); // on DOMContentLoaded

