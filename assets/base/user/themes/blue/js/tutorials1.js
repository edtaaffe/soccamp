/*--
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

//does cookie exist
function cookieExists(sname){
value_or_null = (document.cookie.match(/^(?:.*;)?\s*sname\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]

return value_or_null;

}


 function switchoffTuts(){
  
	 createCookie('stuts,off,30')
	 
 }

function switchonTuts(){
  
	 createCookie('stuts,on,30')
	 
 }

stuts ===cookieExists('tuts');
 if(stuts == null){
	 createCookie('stuts,on,30')
	 stuts = 'on';
 } else{
	 stuts = 'off';
 }

 
 */
 /*------------------------------------------------------------------------------*/
 

function showhelp(){
    var hlp = document.getElementById("help");
    
    if( hlp.style.display ==='inline-block'){
    	hlp.style.display ='none';
    }else
    {
     hlp.style.display ='inline-block'
    }
}

function shuthelp(){
    var hlp = document.getElementById("help");
    hlp.style.display ='none';
}

function switch_help(faq_id) {
	var articles = document.getElementsByClassName("lists_help_articles");
	for (var i = 0; i < articles.length; i++) {
	    articles[i].style.display ='none';
	}	

	if(faq_id) {
		var article_div = document.getElementById(faq_id);

		if(article_div) {
			article_div.style.display ='block';	
		}   
	}
	
}
