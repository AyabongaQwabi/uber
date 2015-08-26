function templateDocumentsSection(){
	console.log('function execute')
	var docsHtml = $('#docs-html').html();
	console.log(docsHtml)
	var docsTemplate = Handlebars.compile(docsHtml);
	$('#docs-button').click(function(){
		console.log('d clicked')
		var newhtml = docsTemplate();
		$('#tabspace').html(newhtml)
	})
}

function templateFaqsSection(){
	console.log('function execute')
	var questions = [{question:'Client left valuable in car , what do I do',answer:'Complete the left valuables form and drop the valuable at the center'},{question:'Client left valuable in car , what do I do',answer:'Complete the left valuables form and drop the valuable at the center of all peoples places tonight'},{question:'I have an item that was  left valuable in car , what do I do',answer:'Complete the left valuables form and drop of the day at the valuable at the center'},{question:'What if the sun left valuable in car , what do I do',answer:'Complete the left valuables form and drop the valuable at the center'},{question:'Client left valuable in car , what do I do',answer:'Complete the left valuables form and drop the valuable at the center'}]
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

function templateHistorySection(){
	console.log('function execute')
	var HistoryHtml = $('#history-html').html();
	console.log(HistoryHtml)
	var HistoryTemplate = Handlebars.compile(HistoryHtml);
	$('#history-button').click(function(){
		console.log('h clicked')
		var newhtml = HistoryTemplate();
		$('#tabspace').html(newhtml)
	})
}