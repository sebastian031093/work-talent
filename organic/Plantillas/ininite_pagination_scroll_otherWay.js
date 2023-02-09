(function (){
    var out = {};
    
    if(!pass_it["cont"]) {
        out["pass_it"] ={
          "cont": 0
      };
    }else{
        out["pass_it"] = pass_it;
    }
  
    //var jobs = document.querySelectorAll("div.oracletaleocwsv2-accordion.oracletaleocwsv2-accordion-expandable.clearfix").length;
    out["has_next_page"] = true;

 

    document.querySelector("html").scrollBy(0, document.querySelector("html").scrollHeight)
    
    if(out["pass_it"].cont == document.querySelectorAll("div.oracletaleocwsv2-accordion.oracletaleocwsv2-accordion-expandable.clearfix").length){
        out["has_next_page"] = false;
    }
    out["pass_it"].cont = document.querySelectorAll("div.oracletaleocwsv2-accordion.oracletaleocwsv2-accordion-expandable.clearfix").length;
    out["html"] = true;
    out["pic"] = true;
    out.wait = true;
    out.waitFor = "div.oracletaleocwsv2-accordion.oracletaleocwsv2-accordion-expandable.clearfix  h4.oracletaleocwsv2-head-title > a";

    return out;
  })();
