(function() {
  var out = {};
  var button_more_selector = ".tile-more-results-container > #tile-more-results"; 
  var container_button_more_selector = ".tile-more-results-container";

  if(document.querySelector(container_button_more_selector).getAttribute("style") == "display: none;"){
  	out["has_next_page"] = false;
  }
  else{
  	document.querySelector(button_more_selector).click();
  	out["has_next_page"] = true;
  }

  out["wait"] = true;
  return out;
})();
