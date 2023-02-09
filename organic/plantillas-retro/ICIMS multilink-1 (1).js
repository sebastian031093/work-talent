//Extract

(function() {
	var out = {};
  	var iframeDocument = document.querySelector("iframe#icims_content_iframe").contentWindow.document;
	var html_jobs = iframeDocument.querySelectorAll("div.iCIMS_JobsTable > div.row");
  	var jobs = [];
	for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var elem = html_jobs[x];
	
        if (elem.querySelector("div.left > span:last-child")) {
            var loc = elem.querySelector("div:first-child > span:last-child").textContent.trim().split(" | ");
        } else {
            var loc = "US";
            loc = loc.split(" | ");
        }
        loc.forEach(function (element){
            var job = {};

            job.title = elem.querySelector("div > a > h2").textContent.trim();
    		job.url = elem.querySelector("div > a").href.trim() + "&mode=job&iis=Neuvoo";
      		job.reqid = elem.querySelector("div.additionalFields > div > dl:last-child > dd").textContent.trim();
            var location = element.split("-");
          	if (location[1] && location[2]) {
          		job.location = location[2] + ", " + location[1] + ", " + location[0];
            } else if (location[0] !== "...") {
            	job.location = location[0];
            } else {
            	job.location = "US";
            }
            job.dateposted_raw = elem.querySelector("div.right > span > span").textContent.replace("(","").trim().split(" ")[0];
            //job.logo = elem.querySelector("").getAttribute("src").trim();
            //job.source_apply_email = elem.querySelector("").textContent.trim();
            //job.source_empname = elem.querySelector("").textContent.trim();
            job.source_jobtype = elem.querySelector("div.additionalFields > div > dl:nth-last-child(3) > dd").textContent.trim();
            //job.source_salary = elem.querySelector("").textContent.trim();
            job.temp = "1";
            jobs.push(job);
        }, elem);
  	} 

    if (html_jobs.length < 1) {
        var obj_ghost = { title: 'ghost' };
        jobs.push(obj_ghost);
    }
  
	out["jobs"]= jobs;
  	return out;
})();





//Pagination

(function() {
    var out = {};
  	var iframeDocument = document.querySelector("iframe#icims_content_iframe").contentWindow.document;
    var next_page_selector = "div.iCIMS_Paginator_Bottom > div > a.glyph:nth-last-child(2)"; //selector to identify the next button
    var last_page_selector = "div.iCIMS_Paginator_Bottom > div > a.glyph.invisible:nth-last-child(2)"; //selector to identify the last page
    var clickable_elem = iframeDocument.querySelector(next_page_selector);

    msg("-----------PAGINATION--------------");
    msg(pass_it);
    msg("-----------/PAGINATION----------------");


    if (!pass_it["urls"]) {
        out["pass_it"] = {
            // Esta variable se usa en el pagination (Cuando los jobs sean > 0 se debe seguir paginando, en caso contrario se debe ir al siguiente link)
            "jobs": 0,
            // Arreglo de URLs
            "urls": [
                "https://gtw-landing.krowdy.com/company/603a9b48b4530010f8cf845c?portales=true",
                "https://gtw-landing.krowdy.com/company/603be775b4530010f8cf9b91?portales=true"
            ],
            "currentUrl": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

    out["pass_it"]["currentUrl"] += 1;
    // Pregunta si la siguiente url existe

    //stop condition
    if (iframeDocument.querySelector(last_page_selector)) {
        //last page
		if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
			var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
			window.location.href = url;
			out["has_next_page"] = true;
		} else {
			out["has_next_page"] = false;
		}
    } else if (clickable_elem) {
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        //try again
        out["has_next_page"] = true;
    }
    out.iframeSelector = "iframe#icims_content_iframe";
    out.iframeWaitFor = "div.iCIMS_JobsTable > div.row";
    return out;
})();





//Job description

(function() {
    var out = {};
    var job = {};
    var selector = "div.iCIMS_JobContent";
    var remove_selectors = [
    	"div.iCIMS_JobsTable",
      	"div.iCIMS_JobOptions",
      	"div.iCIMS_PageFooter",
      	"div.iCIMS_Logo"
    ];
  	var iframeDocument = document.querySelector("iframe#icims_content_iframe").contentWindow.document;
    //var job = pass_it["job"];
    if (iframeDocument.querySelector(selector)) {
        var full_html = iframeDocument.querySelector(selector);
        // remove something from the jobdatata
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;
    
        job.html      = full_html.innerHTML.trim();    
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);
    } else {
        job.html = "";
        job.jobdesc = "";
    }
    out["job"] = job;
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