(function() {
    var out = {};  
  
    var selector = 'a[title="Go to the next page"]'//"#requisitionListInterface\\.pagerDivID4085\\.Next";
    var elemclick = document.querySelector(selector)
    
    var boo = document.querySelector(selector).getAttribute("aria-disabled")=="false"?true:false
  
    if(boo){
      elemclick.click()
      out["has_next_page"] = true;
      msg("PAGINANDO....")
    }else{
      out["has_next_page"] = false;
      
    }
  
    out.waitFor = "tr.ftlcopy.ftlrow";
    out.wait = true;
    return out;
})();
