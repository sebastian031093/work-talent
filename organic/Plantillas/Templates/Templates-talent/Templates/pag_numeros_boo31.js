(function () {
    var out = {};
    var selector = "ul.pagination > li > a";  // selector donde esta la paginacion

  if (typeof pass_it == "undefined") pass_it = {};
    
  if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1
        };
    } else {
        out["pass_it"] = pass_it;
    }

  out["has_next_page"] = false;
  out["pass_it"].cont += 1;
      	
        var all_elems = document.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento){
            if(elemento.textContent.trim() == out["pass_it"].cont){                
              	//msg("click!!!!!"+elemento.textContent.trim());
                elemento.click();
              	out["has_next_page"] = true;
            }
        });  

    //out.waitFor = '';
    return out;
})();