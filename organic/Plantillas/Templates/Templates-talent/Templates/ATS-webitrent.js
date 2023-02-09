////////////////////////////// EXTRACT

(function() {
    const out = {};
    const jobs = [];
    const html_jobs = document.querySelectorAll('tbody[role="list"] table[role="listitem"]'); 

    for (let x in html_jobs) {
        if (typeof html_jobs[x] === "function") continue;
        if (typeof html_jobs[x] === "number") continue;

        const job = {};
        const elem = html_jobs[x];

        job.title = elem.querySelector('.theader a').textContent.trim();
      
        let url = elem.querySelector('.theader a').href.split("USESSION=").shift().trim();
      	let url_path = "&WVID=4917991Hc0&LANG=USA"; // Segun cada jobsite varia este código
      	job.url = url + url_path;	
      
      	const searching = elem.querySelectorAll('.job-search-summary');
      
      	for (let i of searching) {
        	if (i.textContent.indexOf("Job reference") > -1) {
            	job.reqid = i.textContent.trim();
      			job.reqid  = job.reqid.replace(/Job reference|:/g, "").trim(); 
            }
        }
      
      	for (let i of searching) {
        	if (i.textContent.indexOf("Location") > -1) {
        		job.location = i.textContent.trim();
      			job.location = job.location.replace(/Location|:/g, "").trim(); 
            }
        }
      
      	if (!job.location) job.location = "Rugby, UK";
      
        for (let i of searching) {
        	if (i.textContent.indexOf("Contract Type") > -1) {
        		job.source_jobtype = i.textContent.trim();
      			job.source_jobtype = job.source_jobtype.replace(/Contract Type|:/g, "").trim();
            }
        }
      
        for (let i of searching) {
        	if (i.textContent.indexOf("Salary") > -1) {
        		job.source_salary = i.textContent.trim();
      			job.source_salary = job.source_salary.replace(/Salary|:/g, "").trim(); 
            }
        }
      
      	for (let i of searching) {
        	if (i.textContent.indexOf("Application closing date") > -1) {
       			let dateClosed = i.textContent.replace(/Application closing date|:/g, "").trim();
        		job.dateclosed_raw = getDateFormat(dateClosed, "/", 1, 0, 2);   
            }
        }
      
        job.temp = "Febr-10-2021";

        //if (job.title.search(/Filter Job/i) > -1) job.title = ""; The offer "Open Application" was filtered
        //if (job.title.length > 0 && job.location.length > 0 && job.url.length > 0) jobs.push(job);
        
        jobs.push(job);
    }
    out["jobs"] = jobs;
    return out;
})();

function getDateFormat(date, cut, dp, mp, yp) {
  	date = date.toLowerCase();  
    date = date.replace(/\,|\.|rd|st|th|nd/g,"").trim();
  
    let day = date.split(cut)[dp].trim(), 
        month = date.split(cut)[mp].trim(), 
        year = date.split(cut)[yp].trim();

    if (day < 10 && day.length < 2) day = "0" + day;
    if (month < 10 && month.length < 2) month = "0" + month;
    if (year.length === 2) year = "20" + year;
 
    if (date.search(/[a-z]/gi) > -1) { 
        //English, Dutch, French
        if (month.search(/jan/i) > -1) month = "01";
        if (month.search(/feb|fév/i) > -1) month = "02";
        if (month.search(/mar|maar/i) > -1) month = "03";
        if (month.search(/apr|avr/i) > -1) month = "04";
        if (month.search(/may|mai|mei/i) > -1) month = "05";
        if (month.search(/jun|juin/i) > -1) month = "06";
        if (month.search(/jul|juil/i) > -1) month = "07";
        if (month.search(/aug|août/i) > -1) month = "08";
        if (month.search(/sep/i)>-1) month = "09";
        if (month.search(/oct|okt/i) > -1) month = "10";
        if (month.search(/nov/i) > -1) month = "11";
        if (month.search(/dec|déc/i) > -1) month = "12";
    }
    let datum = month + "/" + day + "/" + year;
    return datum;
}

////////////////////////////// PAGINATION

(function() {
    const out = {};
    const next_page_selector = '.next-link'; 
   
    let clickable_elem = document.querySelector(next_page_selector);

    if (!document.querySelector(next_page_selector)) {
        out["has_next_page"] = false;
    } else if(clickable_elem){
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = true;
    }

    out.waitFor = next_page_selector;
    //out.pic=true;
    //out.html=true;
    return out;
})();

////////////////////////////// INFINITY PAGINATION

(function() {
    const out = {};
    const selector = 'input[value="Search"]'; 
    
    document.querySelector(selector).click();
    
    out["wait"]= 1500;
    out["pic"] = true;
    return out;
})();

////////////////////////////// JOBDESCRIPTION

(function() {
    const out = {};
    const job = {};
    const selector = '.job-description dl';
    const remove_selectors = ['a', 'img', 'video', 'button', 'input', 'style', 'javascript', 'script'];
    
    if (document.querySelector(selector)) {
        if (typeof cleanHTML === "undefined") cleanHTML = function(x){return x};
        if (typeof msg === "undefined") msg = console.log;

        const full_html = document.querySelector(selector);
        // Remove something from the jobdatata
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(elem => { 
                if (full_html.querySelector(elem)) {
                    let items = full_html.querySelectorAll(elem);
                    for (const a of items) {
                        a.remove();
                    }
                }
            });
        }
        /*
        const delete_items = document.querySelectorAll('p');
		for (const item of delete_items) {
    		if (item.textContent.search(/@|www.|https:|http:|.com/g) > -1) {
        		item.remove();
    		}
		}
        */
        
        job.html = full_html.innerHTML.trim();    
        job.html = cleanHTML(job.html);

        let tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        const clean_strings = [];

        if (clean_strings.length > 0) {
    		clean_strings.forEach(elem => { 
        		job.html = job.html.replace(elem, "");
    		});
		}
        
        //job.html = removeTextBefore(job.html, "JOB DESCRIPTION", true);
        //job.html = removeTextAfter(job.html, "Application Instructions", true);
        
        if (job.jobdesc.length < 120) {
            job.flag_active = 0; 
            job.html= "";  
            job.jobdesc = "";
        }
    } else {
        job.flag_active = 0; 
        job.html = ""; 
        job.jobdesc = "";
    }
    out["job"] = job;
    return out;
})();

function removeTextBefore(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) 
        newHtml = newHtml.split(text).pop();
    if (!flag) 
        newHtml = "<h3>" + text + "</h3>" + newHtml;
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) 
        newHtml = newHtml.split(text).shift();
    if (!flag) 
        newHtml = newHtml + "<p>" + text + "</p>";    
    return newHtml;
}
