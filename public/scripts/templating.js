function templateDocumentsSection(id){

	console.log('function execute')
	var docsHtml = $('#docs-html').html();
	console.log(docsHtml)
	var docsTemplate = Handlebars.compile(docsHtml);
	$('#docs-button').click(function(){
		$.get('/drivers/documents/:'+id,function(data){
			console.log('d clicked')
			var newhtml = docsTemplate({Documents:data});
			$('#tabspace').html(newhtml)
		})
		
	})
}

function templateFaqsSection(){
	console.log('function execute')
	var questions = [{num:1,question:'Client left valuable in car , what do I do',answer:'Complete the left valuables form and drop the valuable at the center'},{question:'Do I need to have a radio to be an UBER driver ?',answer:'No you do not really need a radio to be anuber driver '},{question:'I was robbed by a client ',answer:'Though it may be rare it does happen . Follow the followung procudure to resolve this issue'},{question:'Passenger left messy stuff in my car ?',answer:'We all hate it when our customers puke or leave dirty substances on our cars .This can be resolved by following..'},{question:'Client left valuable in car , what do I do',answer:'Complete the left valuables form and drop the valuable at the center'}]
	var faqsHtml = $('#faqs-html').html();
	var faqsTemplate = Handlebars.compile(faqsHtml);
	var newhtml = faqsTemplate({Questions:questions});
	$('#tabspace').html(newhtml)
	$('#faqs-button').click(function(){
		console.log('f clicked')
		newhtml = faqsTemplate({Questions:questions});
		$('#tabspace').html(newhtml)
	})
}

function templateHistorySection(id){
	


	console.log('function execute')
	var HistoryHtml = $('#history-html').html();
	console.log(HistoryHtml)
	var HistoryTemplate = Handlebars.compile(HistoryHtml);
	$('#history-button').click(function(){
		$.get('/drivers/issues/:'+id,function(data){
			console.log('d clicked'+data)
			var newhtml = HistoryTemplate({issues:data});
			$('#tabspace').html(newhtml)
		})
		
	})

}




