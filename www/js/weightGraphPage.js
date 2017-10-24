function onInitWeightGraph() {
    try {
        jQuery( function() {
            ChartElements = [];
            
            var weightRecordList = getWeightList();
            var x = new Date();
            var zikuyou = '';
            var minday;
            var maxweight = 0;
            var minweight = 500;
            
            for( var i=0; i<7; i++ ){　//7回繰り返し
                var year3 = x.getFullYear();
                var mon3 = x.getMonth()+1;
                var day3 = x.getDate();
                var timeWeight = year3 + "/" + mon3 + "/" + day3;
                var weightRecordElement = null;
                var hizuke;
                var taizyu;
                
                for (var weightRecordVariable in weightRecordList) {
                   if (weightRecordList[weightRecordVariable].id == timeWeight) {
                        weightRecordElement = weightRecordList[weightRecordVariable];
                        
                        if (weightRecordElement != null) { // 値がある場合
                            hizuke = weightRecordElement.id;
                            taizyu = weightRecordElement.weight;
                            var contents = [hizuke,taizyu]; // 日付と体重を配列に
                            ChartElements.unshift(contents);　//配列を先頭に追加
                            minday = hizuke; //グラフの日付最小値を指定
                            
                            if (maxweight < taizyu) { //最も重い体重を代入
                                maxweight = parseFloat(taizyu);
                            } else if (minweight > taizyu) {
                                minweight = parseFloat(taizyu);
                            }
                        } else {
                        }
                    }
                }
                x.setDate(x.getDate() - 1); 
            }
     
    		jQuery . jqplot(
    			'weekGraph',[ ChartElements ],
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
