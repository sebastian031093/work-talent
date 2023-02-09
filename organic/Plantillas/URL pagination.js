(function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 2,
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var clickable_elem = document.querySelector("li.next > a");
    //stop condition
    if (!clickable_elem) {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        window.location.href = `https://www.argo-aviation.de/jobs.html?suchbegriff=&einsatzort=&umkreis=500&search_jobs=1&search_jobs_submit=Suchen&page_c=${out["pass_it"].cont}`;
        out["has_next_page"] = true;
        out["pass_it"].cont++;
    }
    out.waitFor = "a.jobdetail";
    return out;
})();