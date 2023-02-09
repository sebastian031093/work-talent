(function() {
  	var out = {};
  	var total = document.querySelectorAll('tr.menu3 > td > a').length + document.querySelectorAll('tr.menu3 > td > span').length;
    
  	if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };

    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 2,
      };
    } else {
      out["pass_it"] = pass_it;
    }
  	
    var next_page_selector = 'tr.menu3 > td > a:nth-child(' + out.pass_it["cont"] + ')';
    var clickable_elem = document.querySelector(next_page_selector);
    var last_page_selector = 'tr.menu3 > td > span:nth-child(' + total + ')'; //selector to identify the last page

    //stop condition
    if (document.querySelector(last_page_selector)) {
        //last page
        out["has_next_page"] = false;
    } else if(clickable_elem){
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
      	out.pass_it["cont"]++;
    }/* else {
        //try again
        out["has_next_page"] = true;
    }*/

  	out.waitFor = "";
  	return out;
})();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
//Con URL y # de jobs
(function() {
  var out = {};
  
  if(typeof pass_it == "undefined") pass_it = {};
if(typeof msg == "undefined") msg = function(x){return x;};

  if (!pass_it["cont"]) {
      out["pass_it"] = {
    "cont": 1,
    "jobs": 0
  };
} else {
  out["pass_it"] = pass_it;
}
  if (out["pass_it"]["jobs"] > 2) { 
  
  //url, cambia según el JSON
    
  var url = "https://www.avans.nl/over-avans/werken-bij-avans/vacatures?page="+out["pass_it"].cont+"&size=5";
  out["pass_it"].cont += 1;
  window.location.href = url;
  out["has_next_page"] = true;
} else {
      out["has_next_page"] = false;
}

  return out;
})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
//Con URL y selector de job totales
(function() {
  var out = {};
 
  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function (x) { return x; };

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 20,
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var textPaginador = iframeDocument.querySelector("div.icims-ui-pagination-location").textContent.trim();

  var max = textPaginador.split("/").pop().trim();
  var min = textPaginador.split("/").shift().split("To").pop().trim();

  if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
    msg(min + " - " + max);
    var nuevaUrl = "https://salesandservice-hunterengineering.icims.com/jobs/search?ics_offset=" + out["pass_it"].cont;
    out["pass_it"].cont = out["pass_it"].cont + 20;
    window.location.href = nuevaUrl;
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  //out["pic"] = true;
  //out.wait = 1;
  out.iframeSelector = iframe_selector;
  //out.iframeWaitFor = "body > div.iCIMS_MainWrapper.iCIMS_ListingsPage > ul";
  return out;
})();