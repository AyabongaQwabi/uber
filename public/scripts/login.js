$(document).ready(function(){
	$('input').keypress(function(){
		$(this).css({padding:'1.5%',background:'lightgrey'})
	})
	$('#done').click(function(){
		alert('done')
		if(!validate("#username")){}
		else if(!validate("#pass")){}		
		else{$('form').submit()}
		
	})
	$('#register').click(function(){
		window.location.href='/register'
	})
})



function validate(div){
		if($(div).val()==''){

			popUp("Please Fill In All Fields")
			$(div).css({background:'tomato'})
			return false
		}
		else{
			return true
		}
}



function popUp(popUpText){

	jQuery('<div>',{
		    id:'popUp',
		    style:'z-index:50000;font-size:3vw;font-weight:900;border:2px solid black;box-shadow:1px 1px 30px 5px black;padding:5%;position:absolute;background:rgba(255,165,0,0.9);width:auto;height:auto;margin:auto;top:30%;left:30%;color:black;',
		    text:popUpText
	}).appendTo('body');

	setTimeout(function(){
		$('#popUp').fadeOut(500);
		setTimeout(function(){
			$('#popUp').remove();
		},2000)

	},800)
}




function loginUser(name,pass){

	$.post('/login',{username:name,password:pass},function(data){
		
			if(data.correct==false){
				failure();
			}
			
			
		
	})

}

function success(){
	popUp("Succesful Login!")
	$('input').val('')
}

function failure(){
	popUp("Incorrect Details !")
	$('input').val('')
}