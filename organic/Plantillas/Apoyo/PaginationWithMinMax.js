(function() {
    var out = {};
    var next_page_selector = ""; // Selector del next 
    var stop = document.querySelector("").textContent.trim(); //Selector de la última página  
    var clickable_elem = document.querySelector(next_page_selector);
    var min = stop.split("of").shift().split("Page").pop().trim();
    var max = stop.split("of").pop().trim();
    //stop condition
    if (parseInt(min)==parseInt(max)) {
      msg(" NO HE ENCONTRADO MAS PAGINA!! ");
      out["has_next_page"] = false;
    } else {
      msg(" NEW PAGE!! ");
      clickable_elem.click();
      out["has_next_page"] = true;
    }
    out.waitFor = "SELECTOR DE LOS JOBS";
    return out;
  })();