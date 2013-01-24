var browser={
	"ie":{},
	"fire":{},
	"chrome":{},
	"safari":{},
	"opera":{}
}

var mobile={
	"safari":{},
	"operaMini":{},
	"opera":{},
	"android":{},
	"blackberry":{},
	"aC":{},
	"aF":{},
}

function loadVersion(dbname){

	var returnVal={};
	
	$.getJSON('https://raw.github.com/Fyrd/caniuse/9dd42e925a555c9407f8817c56159b86a4a0e01f/data.json', function(data) {
		var dataLength=data.agents[dbname].versions.length-3;
		
		returnVal.prev=data.agents[dbname].versions[dataLength-1];		
		returnVal.curr=data.agents[dbname].versions[dataLength];
		returnVal.next=data.agents[dbname].versions[dataLength+1];
		if(returnVal.prev==null){
			returnVal.prev="";
		}
		if(returnVal.curr==null){
			returnVal.curr="";
		}
		if(returnVal.next==null){
			returnVal.next="";
		}
	});
	
	return returnVal;
}

browser.ie=loadVersion("ie");
browser.fire=loadVersion("firefox");
browser.chrome=loadVersion("chrome");
browser.safari=loadVersion("safari");
browser.opera=loadVersion("opera");

mobile.safari=loadVersion("ios_saf");
mobile.operaMini=loadVersion("op_mini");
mobile.opera=loadVersion("op_mob");
mobile.android=loadVersion("android");
mobile.blackberry=loadVersion("bb");
mobile.aC=loadVersion("and_chr");
mobile.aF=loadVersion("and_ff");





