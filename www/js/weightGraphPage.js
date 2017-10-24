function onInitWeightGraph() {
    var plotID = null;
    
    function makeWeek() {
        try {
            jQuery( function() {
                ChartElements = [];
                
                var weightRecordList = getWeightList();
                var x = new Date();
                var minday;
                var maxweight = 0;
                var minweight = 500;
                
                for( var i=0; i<7; i++ ){　//7回繰り返し
                    var year3 = x.getFullYear();
                    var mon3 = x.getMonth()+1;
                    var day3 = x.getDate();
                    var timeWeight = year3 + "/" + mon3 + "/" + day3;
                    var weightRecordElement = null;
                    var weekDate;
                    var weekWeight;
                    
                    for (var weightRecordVariable in weightRecordList) {
                       if (weightRecordList[weightRecordVariable].id == timeWeight) {
                            weightRecordElement = weightRecordList[weightRecordVariable];
                            
                            if (weightRecordElement != null) { // 値がある場合
                                weekDate = weightRecordElement.id;
                                weekWeight = weightRecordElement.weight;
                                var contents = [weekDate,weekWeight]; // 日付と体重を配列に
                                ChartElements.unshift(contents);　//配列を先頭に追加
                                minday = weekDate; //グラフの日付最小値を指定
                                
                                if (maxweight < weekWeight) { //最も重い体重を代入
                                    maxweight = parseFloat(weekWeight);
                                } else {
                                }
                                if (minweight > weekWeight) {
                                    minweight = parseFloat(weekWeight);
                                } else {
                                }
                            } else {
                            }
                        }
                    }
                    x.setDate(x.getDate() - 1); 
                }
                
                if (plotID != null) {
                    plotID.destroy();
                }
        		plotID = jQuery . jqplot(
        			'makeGraph',[ ChartElements ],
                    {
                        seriesDefaults: {
                            markerOptions: { // マーカーオプション
                                show: false,　// マーカー無し
                            }
                        },
                        axes:{
                            xaxis:{
                                pad: 0,
                                renderer: jQuery . jqplot . DateAxisRenderer, //x軸を時間軸に
                                min: minday,　
                                tickInterval: '1day', //X軸の間隔
                                tickOptions:{
                                    formatString: '%m/%d%n%Y', //x軸の目盛ラベル
                                    mark: 'inside',
                                },
                            },
                            yaxis:{
                                max: maxweight + 0.2, //最大体重+0.2kgをY軸の最大値に
                                min: minweight - 0.2, //最小体重-0.2kgをY軸の最小値に
                                tickOptions:{
                                    mark: 'inside',
                                    markSize: 2,
                                    formatString: '%.1fkg',　//y軸の目盛ラベル
                                },
                            }
                        }
                    }
        		);
            });
        }
        catch(e) {
            
        }
    }
    
    function makeMonth() {
        try {
            jQuery( function() {
                ChartElements = [];
                
                var weightRecordList = getWeightList();
                var x = new Date();
                var minday;
                var maxweight = 0;
                var minweight = 500;
                
                for( var i=0; i<6; i++ ){　//6回繰り返し
                    var year3 = x.getFullYear();
                    var mon3 = x.getMonth()+1;
                    var day3 = x.getDate();
                    var timeWeight = year3 + "/" + mon3 + "/" + day3;
                    var weightRecordElement = null;
                    var weekDate;
                    var weekWeight;
                    
                    for (var weightRecordVariable in weightRecordList) {
                       if (weightRecordList[weightRecordVariable].id == timeWeight) {
                            weightRecordElement = weightRecordList[weightRecordVariable];
                            
                            if (weightRecordElement != null) { // 値がある場合
                                weekDate = weightRecordElement.id;
                                weekWeight = weightRecordElement.weight;
                                var contents = [weekDate,weekWeight]; // 日付と体重を配列に
                                ChartElements.unshift(contents);　//配列を先頭に追加
                                minday = weekDate; //グラフの日付最小値を指定
                                
                                if (maxweight < weekWeight) { //最も重い体重を代入
                                    maxweight = parseFloat(weekWeight);
                                } else {
                                }
                                if (minweight > weekWeight) {
                                    minweight = parseFloat(weekWeight);
                                } else {
                                }
                            } else {
                            }
                        }
                    }
                    x.setDate(x.getDate() - 5); 
                }
                
                if (plotID != null) {
                    plotID.destroy();
                }
            	plotID = jQuery . jqplot(
        			'makeGraph',[ ChartElements ],
                    {
                        seriesDefaults: {
                            markerOptions: { // マーカーオプション
                                show: false,　// マーカー無し
                            }
                        },
                        axes:{
                            xaxis:{
                                pad: 0,
                                renderer: jQuery . jqplot . DateAxisRenderer, //x軸を時間軸に
                                min: minday,　
                                tickInterval: '5 days', //X軸の間隔
                                tickOptions:{
                                    formatString: '%m/%d%n%Y', //x軸の目盛ラベル
                                    mark: 'inside',
                                },
                            },
                            yaxis:{
                                max: maxweight + 0.5, //最大体重+0.5kgをY軸の最大値に
                                min: minweight - 0.5, //最小体重-0.5kgをY軸の最小値に
                                tickOptions:{
                                    mark: 'inside',
                                    markSize: 2,
                                    formatString: '%.1fkg',　//y軸の目盛ラベル
                                },
                            }
                        }
                    }
        		);
            });
        }
        catch(e) {
            
        }
    }
    
    function makeYear() {
         try {
            jQuery( function() {
                ChartElements = [];
                
                var weightRecordList = getWeightList();
                var x = new Date();
                var minday;
                var maxweight = 0;
                var minweight = 500;
                
                for( var i=0; i<12; i++ ){　//6回繰り返し
                    var year3 = x.getFullYear();
                    var mon3 = x.getMonth()+1;
                    var day3 = x.getDate();
                    var timeWeight = year3 + "/" + mon3 + "/" + day3;
                    var weightRecordElement = null;
                    var weekDate;
                    var weekWeight;
                    
                    for (var weightRecordVariable in weightRecordList) {
                       if (weightRecordList[weightRecordVariable].id == timeWeight) {
                            weightRecordElement = weightRecordList[weightRecordVariable];
                            
                            if (weightRecordElement != null) { // 値がある場合
                                weekDate = weightRecordElement.id;
                                weekWeight = weightRecordElement.weight;
                                var contents = [weekDate,weekWeight]; // 日付と体重を配列に
                                ChartElements.unshift(contents);　//配列を先頭に追加
                                minday = weekDate; //グラフの日付最小値を指定
                                
                                if (maxweight < weekWeight) { //最も重い体重を代入
                                    maxweight = parseFloat(weekWeight);
                                } else {
                                }
                                if (minweight > weekWeight) {
                                    minweight = parseFloat(weekWeight);
                                } else {
                                }
                            } else {
                            }
                        }
                    }
                    x.setMonth(x.getMonth() - 1);
                }
                
                if (plotID != null) {
                    plotID.destroy();
                }
                plotID = jQuery . jqplot(
        			'makeGraph',[ ChartElements ],
                    {
                        seriesDefaults: {
                            markerOptions: { // マーカーオプション
                                show: false,　// マーカー無し
                            }
                        },
                        axes:{
                            xaxis:{
                                pad: 0,
                                renderer: jQuery . jqplot . DateAxisRenderer, //x軸を時間軸に
                                min: minday,
                                tickInterval: '2 months', //X軸の間隔
                                tickOptions:{
                                    formatString: '%m月%n%Y', //x軸の目盛ラベル
                                    mark: 'inside',
                                },
                            },
                            yaxis:{
                                max: maxweight + 0.5, //最大体重+0.5kgをY軸の最大値に
                                min: minweight - 0.5, //最小体重-0.5kgをY軸の最小値に
                                tickOptions:{
                                    mark: 'inside',
                                    markSize: 2,
                                    formatString: '%.1fkg',　//y軸の目盛ラベル
                                },
                            }
                        }
                    }
        		);
            });
        }
        catch(e) {
            
        }
    }
    
    makeWeek();
    $('#weekGraph').on("click", makeWeek);
    $('#monthGraph').on("click", makeMonth);
    $('#yearGraph').on("click", makeYear);
}
