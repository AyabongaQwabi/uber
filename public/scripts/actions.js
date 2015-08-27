function expandThis(id){
	console.log(id)
		id='#'+id
		$(id).parents().eq(3).animate({height:'90%'})
		if($(id).text()=='more'){
			$(id).text('close')
		}
		else{
			$(id).text('more')
		}
		
		$(".panel-group").children().each(function(child){
			child+=1;
			var query = '.panel:nth-of-type('+child+')';
			console.log(query)
			var height_pct = Math.round( 
									    $(query).height() / 
									    $(query).parent().height() * 100
									    );
			
			if(height_pct>25){
			
				$(query).animate({height:'20%'})
				
			}
			console.log('height:'+height_pct+'%\n\n')
		})
		console.log('-----------------------------------------------------------')
}