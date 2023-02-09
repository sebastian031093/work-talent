//Before-extract
(function () {
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            cont: 0,
            totalJobs: 0,
            newPage: true,
            jobs: []
        }
    }
    else {
        out["pass_it"] = pass_it;
    }
    if (out["pass_it"].newPage) {
        let container = Array.from(document.querySelectorAll("div[ng-repeat*='vacancy']")); // Main job container    // This will contain all the extracted jobs    
        let jobs = container.reduce((jobsArr, elem) => {
            let job = {};
            job.title = elem.querySelector("h4").textContent.replace(/full time | part time/gi, '').trim();
            var locationSel = elem.querySelector("div[ng-if*='vacancy.location']");
            if (locationSel) {
                job.location = elem.querySelector("div[ng-if*='vacancy.location']").textContent.replace(/-|\//gi, ", ").trim() + ", BR";
            }
            else {
                job.location = "Medianeira, Parana, BR";
            }
            jobsArr.push(job);
            return jobsArr;
        },
            []);
        out["pass_it"].jobs = jobs;
        out["pass_it"].totalJobs = jobs.length;
        container[out["pass_it"].cont].querySelector("a").click();
    }
    else {
        let container = Array.from(document.querySelectorAll("div[ng-repeat*='vacancy']")); // Main job container    
        container[out["pass_it"].cont].querySelector("a").click();
        msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
    }
    out.pic = true;
    out.waitFor = ".vacancy-description";
    return out;
})();
//extract
(function () {
    var out = {};
    var jobs = [];
    var selector = ".vacancy-description";
    out["pass_it"] = pass_it;
    var job = out["pass_it"].jobs[out["pass_it"].cont];
    var remove_selectors = ["a", "script", "style", "input", "button"];
    var full_html = document.querySelector(selector);
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) {
        var detailsSel = full_html.textContent.trim();
        if (detailsSel.search(/ate?é? o dia/gi) > -1) {
            var preDate = detailsSel.split(/ate?é? o di?í?a/gi).pop().replace(/[^\d|\/]/g, "").split("/");
            job.dateposted_raw = preDate.slice(0, 2).reverse().join("/").trim() + "/" + preDate.pop().trim();
        }
        job.html = full_html.innerHTML.trim();
        job.url = window.location.href;
        job.reqid = job.url.split(/vacancyId=/i).pop().split("#").shift().trim();
        job.temp = 96;
        job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www.\S+|https?\S+|\(\d+\)/gi, "");
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);    
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
    }
    else {
        job.flag_active = 0;
    }
    document.querySelector("a#voltar-para-a-lista-de-vagas").click();
    jobs.push(job);
    out["jobs"] = jobs;
    out.wait = true;
    out.html = true;
    out.pic = true;
    return out;
})();
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}
//Pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
        out["pass_it"].nextPage = false;
        out["pass_it"].cont += 1;
        out["has_next_page"] = true;
        msg("Another Job");
    } else {
        var next_page_selector = "a#pagina-next"; //selector to identify the next button      
        var last_page_selector = "a#pagina-next[disabled]"; //selector to identify the last page    
        var clickable_elem = document.querySelector(next_page_selector);
        //stop condition    
        if (document.querySelector(last_page_selector)) {
            //last page      msg("END OF PAGINATION");
            out["has_next_page"] = false;
            out["pass_it"].nextPage = false;
        } else {
            //go to next page      
            msg("Another page");
            out["pass_it"].cont = 0;
            out["pass_it"].totalJobs = 0;
            clickable_elem.click();
            out["has_next_page"] = true;
            out["pass_it"].nextPage = true;
        }
    }
    msg(out["pass_it"].cont);
    out.html = true;
    out.pic = true;
    out.wait = true;
    return out;
})();