function onInitBackExtension() {
    var backExtensionCount = 0;
    function increment() {
        backExtensionCount++; 
        update();
    }
     
    function reset() {
        navigator.vibrate(200)
        if (backExtensionCount > 0 && confirm("リセットしますか？")) {
            backExtensionCount = 0;
            update();
        }
    }
    
    function load() {
        backExtensionCount = 0;
        var backExtensionCountList = getBackExtensionList();
        for (var backExtensionCountVariable in backExtensionCountList) {
            if (backExtensionCountList[backExtensionCountVariable].id == time) {
                var backExtensionCountElement = backExtensionCountList[backExtensionCountVariable];
                backExtensionCount = backExtensionCountElement.bcount;
                break;
            }
        }
    }
    
    function update() {
        var str = '0000' + backExtensionCount;
        str = str.substring(str.length - 4, str.length);
        
        var digits = $('.counter-digit');
        for (var i = 0; i < str.length; i++) {
            digits.get(i).src = 'img/no_0' + str[i] + '.png'
        }
        
        deleteBackExtension(time);
        addBackExtension(backExtensionCount);
    }
    
    $('.count-button').on("click", increment);
    $('.reset-button').on("click", reset);
    load();
    update();      
}

function addBackExtension(backExtensionCount) {
    var backExtensionCountList = getBackExtensionList();
     
    backExtensionCountList.push({id: time, bcount: backExtensionCount});
    saveBackExtensionList(backExtensionCountList);
}

function getBackExtensionList() {
    var backExtensionCountList = localStorage.getItem("backExtensionCountKey");
    if (backExtensionCountList == null) {
        return new Array();
    } else {
        return JSON.parse(backExtensionCountList);
    }
}

function saveBackExtensionList(backExtensionCountList) {
    try {
        localStorage.setItem("backExtensionCountKey", JSON.stringify(backExtensionCountList));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

function deleteBackExtension(id) {
    var backExtensionCountList = getBackExtensionList();
    for (var backExtensionCountVariable in backExtensionCountList) {
        if (backExtensionCountList[backExtensionCountVariable].id == id) {
            backExtensionCountList.splice(backExtensionCountVariable, 1);
            saveBackExtensionList(backExtensionCountList);
            break; 
        }
    }
}