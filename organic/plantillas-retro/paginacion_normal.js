//no pagination
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

//simple nex page
(function() {
  	var out = {};
	var next_page_selector = ""; //selector to identify the next button
	var last_page_selector = ""; //selector to identify the last page
	
    var clickable_elem = document.querySelector(next_page_selector);
  
  	//stop condition
  	if (!document.querySelector(last_page_selector)) {
      	//last page
		out["has_next_page"] = false;
	} else if(clickable_elem){
      	//go to next page
    	clickable_elem.click();
      	out["has_next_page"] = true;
    } else {
      	//try again
    	out["has_next_page"] = true;
    }

  	out.waitFor = "";
  	return out;
})();