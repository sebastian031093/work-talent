

(function() {
  	var out = {};
	var next_page_selector = ''; // Selector del next 
	var last_page_selector = ''; //Selector de la última página
 	
    var clickable_elem = document.querySelector(next_page_selector);
  
  	//stop condition
  	if (document.querySelector(last_page_selector)) {
		out["has_next_page"] = false;
    } else {
      	clickable_elem.click();
    	out["has_next_page"] = true;
    }

  	//out.waitFor = "";
  	return out;
})();

//////////////////////////////////////////////////////////////////////////



(function() {
    var out = {};
  var next_page_selector = 'div.show-more a'; // Selector del next 
  //var last_page_selector = ''; //Selector de la última página
  
    var clickable_elem = document.querySelector(next_page_selector);
  
  
  var current_number_of_jobs = document.querySelector(".show-more").nextElementSibling.querySelector("span#displayed-count").textContent.trim();
  var total_number_of_jobs   = document.querySelector(".show-more").nextElementSibling.textContent.split("of").pop().replace(/[a-z]/gi,"").trim(); 
  
  msg(current_number_of_jobs);
  msg(total_number_of_jobs);
  
    //stop condition
    if (current_number_of_jobs == total_number_of_jobs) {
    out["has_next_page"] = false;
    } else {
        clickable_elem.click();
      out["has_next_page"] = true;
    }

    out.waitFor = "div.show-more a";
    return out;
})();