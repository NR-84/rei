function onInitWeightGraph() {
    jQuery( function() {
		jQuery . jqplot(
			'weekGraph',
			[
				[ [2 , 5],[4 , 8] ]
			]/*,
            {
            axes:{
                xaxis:{
                    renderer: jQuery . jqplot . DateAxisRenderer
                }
            },
            }*/
		);
	});
    
    var weightRecordList = getWeightList();
    var x = new Date();
        
        for( var i=0; i<7; i++ ){
            var year3 = x.getFullYear();
            var mon3 = x.getMonth()+1;
            var day3 = x.getDate();
            var weightID = year3 + "/" + mon3 + "/" + day3;
            var hizuke;
            var taizyu;
            
            for (var weightRecordVariable in weightRecordList) {
               if (weightRecordList[weightRecordVariable].id == weightID) {
                        var weightRecordElement = weightRecordList[weightRecordVariable];
                        
                        if (weightRecordElement != null) {
                            hizuke = weightRecordElement.id;
                            taizyu = weightRecordElement.weight;
                        } else {
                            hizuke = '';
                            taizyu = '';
                        }
                        break;
                }
            document.getElementById("kakunin").textContent = "[" + hizuke + "," + taizyu + "]";
            
            x.setDate(x.getDate() - 1);
        }
    }
    
}
