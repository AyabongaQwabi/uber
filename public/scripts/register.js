$(document).ready(function(){
	$('input').keypress(function(){
		$(this).css({background:'white'})
	})
	$('#done').click(function(){
		alert('done')
		if(!hasData("#name")){
			popUp("Please Fill In All Fields")
			$("#name").css({background:'tomato'})
		}
		else if(!hasData("#username")){
			popUp("Please Fill In All Fields")
			$("#username").css({background:'tomato'})
		}		
		else if(!hasData("#surname")){
			popUp("Please Fill In All Fields")
			$("#surname").css({background:'tomato'})
		}			
		else if(!hasData("#id_no")){
			popUp("Please Fill In All Fields")
			$("#id_no").css({background:'tomato'})
		}	
		else if(!hasData("#licence")){
			popUp("Please Fill In All Fields")
			$("#licence").css({background:'tomato'})
		}		
		else if(!hasData("#city")){
			popUp("Please Fill In All Fields")
			$("#city").css({background:'tomato'})
		}	
		else if(!hasData("#email")){
			popUp("Please Fill In All Fields")
			$("#email").css({background:'tomato'})
		}
		else if(!hasData("#password")){
			popUp("Please Fill In All Fields")
			$("#password").css({background:'tomato'})
		}		
		else if(!hasData("#password_confirm")){
			popUp("Please Fill In All Fields")
			$("password_confirm").css({background:'tomato'})
		}
		else{
		 	
			if($('#password').val() == $('#password_confirm').val()){
				$('form').submit();
				
			}
			else{
				popUp('Your Passwords do not Match')
		    }	
		 }
		
	})
	$('#cancel').click(function(){
		window.location.href='/login'
	})
})



function hasData(div){
		if($(div).val()==''){			
			return false
		}
		else{
			return true
		}
}



function popUp(popUpText){

	jQuery('<div>',{
		    id:'popUp',
		    style:'z-index:50000;font-size:3vw;font-weight:900;border:2px solid black;box-shadow:1px 1px 30px 5px black;padding:5%;position:absolute;background:black;width:auto;height:auto;margin:auto;top:30%;left:30%;color:white;',
		    text:popUpText
	}).appendTo('body');

	setTimeout(function(){
		$('#popUp').fadeOut(500);
		setTimeout(function(){
			$('#popUp').remove();
		},2000)

	},800)
}




function addUser(name,pass){

	$.post('/register',{username:name,password:pass},function(){
		success();
	})

}

function success(){
	popUp("Succesful Registration !")
	$('input').val('')
}