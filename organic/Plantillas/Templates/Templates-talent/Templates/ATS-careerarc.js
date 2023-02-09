//////////////////////////////// BEFORE EXTRACT

(function() {
    var out = {};
    out.waitFor = '.tm3-list-view-results tbody tr';
    out["wait"]= 3000;
    return out;
})();


//////////////////////////////// EXTRACT

(function() {
    var out = {};
    var jobs = [];
    var html_jobs = document.querySelectorAll('.tm3-list-view-results tbody tr'); 

    for (var x in html_jobs) {
        if (typeof html_jobs[x] === "function") continue;
        if (typeof html_jobs[x] === "number") continue;

        var job = {};
        var elem = html_jobs[x];

        job.title = elem.querySelector('.title a').textContent.trim();
      
      	var URL_base = "https://www.careerarc.com/job-listings/";
		var job_id = elem.querySelector('.title a').getAttribute("onclick").split("(").pop().replace(")", "");
      	
        job.url = URL_base + job_id + "/apply?campaign_id=21858&src=12";
        job.reqid = job_id;
        job.location = elem.querySelector('.location').textContent.trim();
      
      	var datePosted = elem.querySelector('.posted-date').textContent.trim();  
      	job.dateposted_raw = getDateFormat(datePosted, " ", 1, 0, 2);
      
        job.temp = "Dic-1-2020";

        //if (job.title.search(/Filter Job/i) > -1) job.title = ""; The offer "Open Application" was filtered
        //if (job.title.length > 0 && job.location.length > 0 && job.url.length > 0) jobs.push(job);
        
        jobs.push(job);
    }
    out["jobs"] = jobs;
    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
          
    var day = dateRaw.split(cut)[dayPosition].trim(), 
        month = dateRaw.split(cut)[monthPosition].trim(), 
        year = dateRaw.split(cut)[yearPosition].trim();

    if (day < 10 && day.length < 2) {day = "0" + day;}

    if (dateRaw.search(/[a-z]/gi) > -1) { 
    	if(month.search(/jan/i)>-1){month = "01";}
    	if(month.search(/feb|fév/i)>-1){month = "02";}
    	if(month.search(/mar/i)>-1){month = "03";}
    	if(month.search(/apr|avr/i)>-1){month = "04";}
    	if(month.search(/may|mai/i)>-1){month = "05";}
    	if(month.search(/jun|juin/i)>-1){month = "06";}
    	if(month.search(/jul|juil/i)>-1){month = "07";}
    	if(month.search(/aug|août/i)>-1){month = "08";}
    	if(month.search(/sep/i)>-1){month = "09";}
    	if(month.search(/oct/i)>-1){month = "10";}
    	if(month.search(/nov/i)>-1){month = "11";}
    	if(month.search(/dec|déc/i)>-1){month = "12";}
    }
    var datum = month +"/"+  day +"/"+ year;
    return datum;
};

//////////////////////////////// PAGINATION

(function() {
    var out = {};
    var next_page_selector = 'a[class="next_page next"]';
   
    var clickable_elem = document.querySelector(next_page_selector);

    if (!document.querySelector(next_page_selector)) {
        out["has_next_page"] = false;
    } else if(clickable_elem){
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = true;
    }

    out.waitFor = next_page_selector;
    out.pic = true;
    out.html = true;
  	out.wait = 3000;
    return out;
})();

//////////////////////////////// INFINITY PAGINATION

(function() {
    var out = {};
    var selector = 'button[aria-label="Open Job List View"]';
    
    document.querySelector(selector).click();
    
    out.wait = 1500;
    out.pic = true;
    return out;
})();

//////////////////////////////// JOBDESCRIPTION

(function() {
    var out = {};
    var job = {};
    var selector = 'div[class="sc-bwCtUz WVZmd"]';
    var remove_selectors = ['a', 'img', 'video', 'button', 'input', 'style', 'javascript', 'script'];
    
    if (document.querySelector(selector)) {
        var full_html = document.querySelector(selector);
        // Remove something from the jobdatata
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(function(e) { 
                if (full_html.querySelector(e)) {
                    var items = full_html.querySelectorAll(e);
                    for (const a of items) {
                        a.remove();
                    }
                }
            });
        }

        var delete_items = document.querySelectorAll('p');
		for (const item of delete_items) {
    		if (item.textContent.search(/@|www./g) > -1) {
        		item.remove();
    		}
		}
        
        if (typeof cleanHTML === "undefined") cleanHTML = function(x){return x};
        if (typeof msg === "undefined") msg = console.log;
        
        job.html = full_html.innerHTML.trim();    
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
  
        //job.html = removeTextBefore(job.html, "JOB DESCRIPTION", false);
        //job.html = removeTextAfter(job.html, "Application Instructions", true);
  
        if (job.jobdesc.length < 120) {
            job.flag_active = 0; 
            job.html= "";  
            job.jobdesc = "";
        }
    } else {
        job.flag_active = 0; 
        job.html = ""; 
        job.jobdesc = '';
    }
    out["job"] = job;
    return out;
})();

function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) 
        newHtml = newHtml.split(text).pop();
    if (!flag) 
        newHtml = "<h3>" + text + "</h3>" + newHtml;
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) 
        newHtml = newHtml.split(text).shift();
    if (!flag) 
        newHtml = newHtml + "<p>" + text + "</p>";    
    return newHtml;
}
