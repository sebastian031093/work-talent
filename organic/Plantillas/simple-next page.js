(function() {
    var out = {};
    var next_page_selector = "li.next > a"; //selector to identify the next button
    //var last_page_selector = "li.next > "; //selector to identify the last page
    var clickable_elem = document.querySelector(next_page_selector);
  
    //stop condition
    if (!clickable_elem) {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    }
    out.waitFor = ".views-row";
    return out;
})();