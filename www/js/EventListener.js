document.addEventListener("init", function(event) {
    var page = event.target;
    
    if(page.id === "sitUpCounter") { // 腹筋カウント
    
        onInitSitUp();
        
    } else if(page.id === "backExtensionCounter") {　// 背筋カウント
    
        onInitBackExtension();
        
    } else if(page.id === "squatCounter") {  // スクワットカウント
    
        onInitSquat();
        
    } else if(page.id === "pushUpCounter") {  // 腕立て伏せカウント
    
        onInitPushUp();
        
    } else if(page.id === "trainingLog") {  // トレーニング達成度記録
    
        onInitTrainingLog();
        
    } else if(page.id === "weightGraph") {  // 日々の体重変化グラフ
        
        onInitWeightGraph();
        
    } else if(page.id === "weightRecord") {  // 日々の体重変化記録
    
        onInitWeightList();
        
    } 
    
});

document.addEventListener("show", function(event) {
    var page = event.target;
    
    if(page.id === "home") {
        
        onShowHomePage();
         
    } else if(page.id === "setting-page") {
        
        onShowSetting();
        
    }  else if(page.id === "training") {
        
        onShowTraining();
        
    }
});