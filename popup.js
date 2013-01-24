document.onkeypress = returnKey;
function returnKey(evt)
{
	if(evt.keyCode == 13)
	{
		//createTab();
		$('#result').empty();
		$('#resultTabCont').empty();
		searchVal($('#searchInput').val());
	}
}


var searchResult=new Array();


function protectParenthesis(string){
	string = string.replace("(", "\\\(", "gi");
	string = string.replace(")", "\\\)", "gi");
	string = string.replace("+", "\\\+", "gi");
	return string;
}

function searchVal(val){

	$("#searchResult").empty();
	$('#result').empty();
	
	val=protectParenthesis(val);
    
    var j=0;
    
    $.ajax({  
		url: 'https://raw.github.com/Fyrd/caniuse/9dd42e925a555c9407f8817c56159b86a4a0e01f/data.json',  
		dataType: 'json',  
		async: false,  
		success: function(json){  
			$.each(json.data, function(i, v) {
			  	if (v.title.search(new RegExp(val,"i")) != -1) {
			  		$('<p class=\"result\" id=\"result'+j+'\">'+v.title+'</p>').appendTo('#searchResult');
			 		searchResult[j]=v;
			 		
			 		var idName="#result"+j;
			 		
			 		$(idName).bind('click', function() {
					 	searchVal(v.title);
					});
					
					j++;
				}
			});
		}  
	}); 
    
    if(j==1)
    	displayResult(searchResult[0]);
}

function displayResult(val){

	$("#searchResult").empty();
	
	var data=val;
	
	createTab();

	$('<h3>'+data.title+'</h3>').appendTo('#result');
	$('<p>'+data.description+'</p>').appendTo('#result');
	$('<a class=\"left\" href=\"'+data.spec+'\" target=\"blank\">Technical</a>').appendTo('#result');
	$('<a class=\"right\" href=\"http://caniuse.com/#search='+data.title+'\" target=\"blank\">See it on caniuse.com</a>').appendTo('#result');
	
	//Browser tab
	setBrowser(data.stats.ie,browser.ie,"ie");
	setBrowser(data.stats.firefox,browser.fire,"fire");
	setBrowser(data.stats.chrome,browser.chrome,"chrome");
	setBrowser(data.stats.safari,browser.safari,"safari");
	setBrowser(data.stats.opera,browser.opera,"opera");
	
	//Mobile tab
	setBrowser(data.stats.ios_saf,mobile.safari,"ios");
	setBrowser(data.stats.android,mobile.android,"ab");
	setBrowser(data.stats.op_mob,mobile.opera,"opm");
	setBrowser(data.stats.bb,mobile.blackberry,"bb");
	setBrowser(data.stats.and_chr,mobile.aC,"ca");
	setBrowser(data.stats.op_mini,mobile.operaMini,"opM");
	setBrowser(data.stats.and_ff,mobile.aF,"fa");	
}

function setBrowser(statElem,element,nameElem){
	setColor(statElem[element.prev],'#'+nameElem+'-prev');
	$('<p class=\"verNum\">'+element.prev+'</p>').appendTo('#'+nameElem+'-prev');
	setColor(statElem[element.curr],'#'+nameElem+'-curr');
	$('<p class=\"verNum\">'+element.curr+'</p>').appendTo('#'+nameElem+'-curr');
	setColor(statElem[element.next],'#'+nameElem+'-next');
	$('<p class=\"verNum\">'+element.next+'</p>').appendTo('#'+nameElem+'-next');
}

function setColor(data,element){
	switch(data){
		case "y":
			$(element).attr("class","green");
			break;
		case "y x":
			$(element).attr("class","greenYellow");
			break;
		case "a":
			$(element).attr("class","orange");
			break;
		case "a x":
			$(element).attr("class","orangeYellow");
			break;
		case "n":
			$(element).attr("class","red");
			break;
		case "p":
			$(element).attr("class","red");
			break;
		case "u":
			$(element).attr("class","blue");
			break;
	}
}

function createTab(){
	$('#resultTabCont').empty();
	$('<div class=\"resultTab\"><h3>Desktop Browsers</h3><table width=\"100%\" class=browser><tr><td></td><td class=\"ie top\">Internet Explorer</td><td class=\"firefox top\">Firefox</td><td class=\"chrome top\">Chrome</td><td class=\"safari top\">Safari</td><td class=\"opera top\">Opera</td><tr><td>previous</td><td id=ie-prev></td><td id=fire-prev></td><td id=chrome-prev></td><td id=safari-prev></td><td id=opera-prev></td><tr><td>current</td><td id=ie-curr></td><td id=fire-curr></td><td id=chrome-curr></td><td id=safari-curr></td><td id=opera-curr></td><tr><td>next</td><td id=ie-next></td><td id=fire-next></td><td id=chrome-next></td><td id=safari-next></td><td id=opera-next></td></table></div><div class=resultTab><h3>Mobile Browsers</h3><table width=\"100%\" class=mobile><tr><td></td><td class=\"iosSaf top\">IOS Safari</td><td class=\"andBrow top\">Android Browser</td><td class=\"bb top\">Blackberry Browser</td><td class=\"opMob top\">Opera mobile</td><td class=\"opMini top\">Opera mini</td><td class=\"andChr top\">Chrome Android</td><td class=\"andff top\">Firefox Android</td><tr><td>previous</td><td id=ios-prev></td><td id=ab-prev></td><td id=bb-prev></td><td id=opm-prev></td><td id=opM-prev></td><td id=ca-prev></td><td id=fa-prev></td><tr><td>current</td><td id=ios-curr></td><td id=ab-curr></td><td id=bb-curr></td><td id=opm-curr></td><td id=opM-curr></td><td id=ca-curr></td><td id=fa-curr></td><tr><td>next</td><td id=ios-next></td><td id=ab-next></td><td id=bb-next></td><td id=opm-next></td><td id=opM-next></td><td id=ca-next></td><td id=fa-next></td></table></div>').appendTo('#resultTabCont');
}
