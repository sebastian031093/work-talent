(function() {
    var out = {};
    //var selectorscroll = 'BARRA DE DESPLAZAMIENTO para hacer scroll';
    var selectorjobs = 'div.opportunity';     //selector de los jobs
    msg(pass_it);
    if (!pass_it["jobs_lengths"]) out["pass_it"] = { "jobs_lengths": [] };
    else out["pass_it"] = pass_it;
    out["has_next_page"] = true;
    if (out["pass_it"]["jobs_lengths"].length > 3) {
        var last_three_jobs = out["pass_it"]["jobs_lengths"].slice(-3);
        if (last_three_jobs[0] == last_three_jobs[1] && last_three_jobs[1] == last_three_jobs[2])
            out["has_next_page"] = false;
    }
    var next_page_selector = "span.h5 > a#LoadMoreJobs";
    var clickable_elem = document.querySelector(next_page_selector);  
    
  	if(out["has_next_page"]){
      clickable_elem.click();
    }
  	//if(clickable_elem)clickable_elem.click();        
    //window.scrollBy(0, document.body.scrollHeight);   //ESTO SOLO FUNCIONA CUANDO EL SCROLL ES A TODA LA PÃGINA (BODY)
    //document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight)
    out["wait"] = true;
    out["pic"] = true;  
    out.waitFor = 'div.job-listing.card.simple';  
    out["pass_it"]["jobs_lengths"].push(document.querySelectorAll(selectorjobs).length);
    return out;
})();