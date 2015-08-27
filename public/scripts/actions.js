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

function postissue(){
	
	$('#postIssue').animate({width:'63%',paddingLeft: '3%'})
}
function closeissue(){
	$('#postIssue').animate({width:'0%',paddingLeft: '0%'})
}
function sendissue(){
		var issuename = $('#issue_name').val();
		var issudesc = $('#issue_description').val();
		data ={issue_name:issuename,issue:issudesc}
		$.post('/driver/issue/post',data,function(){
			popUp('POSTED')
		})
}

function popUp(popUpText){

	jQuery('<div>',{
		    id:'popUp',
		    style:'z-index:50000;font-size:3vw;font-weight:900;border:2px solid black;box-shadow:1px 1px 30px 10px #09091A;padding:5%;position:absolute;background:#09091A;width:auto;height:auto;margin:auto;top:30%;left:30%;color:white;',
		    text:popUpText
	}).appendTo('body');

	setTimeout(function(){
		$('#popUp').fadeOut(500);
		setTimeout(function(){
			$('#popUp').remove();
		},2000)

	},800)
}