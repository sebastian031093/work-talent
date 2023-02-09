

/////////////////Paginacion

(function() {
  	var out = {};
  
	var next_page_selector = 'li > a[data-action="next"]'; // Selector del next 
	//var last_page_selector = ""; //Selector de la última página
  
  	if (typeof pass_it == "undefined") pass_it = {};
         if (!pass_it["urls"]) {
         out["pass_it"] = {

             "urls": ["https://",
                     "https://",
                     "https://",
                     "https://",
                     "https://",
                     "https://",
                     "https://,
                     "https://"]                //Colocar las urls
         };
     } else {
         out["pass_it"] = pass_it;
     }
 	
    var clickable_elem = document.querySelector(next_page_selector);
  
  	//stop condition
  	if (!document.querySelector(next_page_selector)) {
		out["has_next_page"] = false;     
      		msg("ENTRAAA EN FALSO");	
      
      		if (out["pass_it"]["urls"].length > 0) {
                    var url = out["pass_it"].urls.shift();
                        //msg(url);
              		msg("PERO TIENE URL");	
                    window.location.href = url;
                    out["has_next_page"] = true;
            }
               
    } else {
      msg("clickkk");	
      	clickable_elem.click();
    	  out["has_next_page"] = true;

    }
	out["wait"] = true;
  	//out["pic"] = true;
  	//out.waitFor = "a.item.hasImage";
  	return out;
})();

////////////////////////////////////

// Cuando el botón tiene ">" y desaparece


(function() {
  	var out = {};
  
	var next_page_selector = 'dir-pagination-controls li:last-child a[ng-click]:last-child'; // Selector del next 
	//var last_page_selector = ""; //Selector de la última página
  
  
  
  	if (typeof pass_it == "undefined") pass_it = {};
         if (!pass_it["urls"]) {
         out["pass_it"] = {

             "urls": ["https://wecan.education.wisc.edu/#/Employer/3201/Vacancies/2"]                //Colocar las urls
         };
     } else {
         out["pass_it"] = pass_it;
     }
 	
    var clickable_elem = document.querySelector(next_page_selector);
  
  	//stop condition
  	if (!document.querySelector('dir-pagination-controls li:last-child a[ng-click]:last-child').innerText.includes("›") !== false) {
		out["has_next_page"] = false;     
      		msg("ENTRAAA EN FALSO");	
      
      		if (out["pass_it"]["urls"].length > 0) {
                    var url = out["pass_it"].urls.shift();
                        //msg(url);
              		msg("PERO TIENE URL");	
                    window.location.href = url;
                    out["has_next_page"] = true;
            }
               
    } else{
  
            msg("Click");	
              clickable_elem.click();
                out["has_next_page"] = true;
        
      }
	out["wait"] = true;
  	out["pic"] = true;
  	//out.waitFor = "a.item.hasImage";
  	return out;
})();




