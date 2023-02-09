{
    "options": {
    "inactivateJQuery": false,
    "ignoreLoadErrors": false,
    "waitForPageLoadEvent": false,
    "waitForResources": true
    },
    "noimage": true,
    "skipResources": false,
    "noUnnecessaryResources": false
    }


//NO PAGINATION
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

//INFINITE PAGINATION
//Con pagination - simple next
(function() {
    var out = {};
  var next_page_selector = ''; //selector to identify the next button
  var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if(clickable_elem){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  } else {
        //try again
      out["has_next_page"] = false;
  }
    //out.waitFor = "";
    return out;
})();


//Con pagination - simple next CON TEXTO
(function() {
    var out = {};
  var next_page_selector = ''; //selector to identify the next button
  var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if(clickable_elem.textContent.search("Load more") > -1){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  } else {
        //try again
      out["has_next_page"] = false;
  }
    out.wait = true;
    return out;
})();


//Con texto
(function() {
  	var out = {};
    var selector = ''; //Button selector
    var partial_text = "";  //Text in the button
  	out["has_next_page"] = false;

    var all_elems = document.querySelectorAll(selector);
    [].forEach.call(all_elems, function(elemento){
        if(out["has_next_page"]) return out;
        if(elemento.textContent.trim().indexOf(partial_text) != -1){
            elemento.click();
            out["has_next_page"] = true;
        }
    });		
	
  	out["wait"] = true;
  	return out;
})();




//EJEMPLO CON TEXTO
(function() {
    var out = {};
  var selector = 'div.offer__load-more > a';
  var partial_text = "Load more";
    out["has_next_page"] = false;

  var all_elems = document.querySelectorAll(selector);
  [].forEach.call(all_elems, function(elemento){
      if(out["has_next_page"]) return out;
      if(elemento.textContent.trim().indexOf(partial_text) != -1){
          elemento.click();
          out["has_next_page"] = true;
      }
  });		
  
    out["wait"] = true;
    return out;
})();