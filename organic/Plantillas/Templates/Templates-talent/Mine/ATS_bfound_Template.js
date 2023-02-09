//E
(function() {
    var out = {};
      out.pic = true;
         var html_jobs = document.querySelectorAll("li.vote-item");
      var jobs = [];for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("div.col-sm-10 > h4").textContent.trim().slice(6).trim();
            job.url = elem.getAttribute("data-link").trim();
            job.url = "https://jobs.bfound.net"+job.url;      
        job.location = elem.querySelector("div.vote-info > span").textContent.trim() + ", NZ";
        var date = elem.querySelector("div.vote-info > span:nth-child(2) > span").getAttribute("data-utcdate").trim();
          date = date.split("T")[0];
          date = date.split("-");
          if(date[1].indexOf("Jan") > -1){date[1] = "01";}
          if(date[1].indexOf("Feb") > -1){date[1] = "02";}
          if(date[1].indexOf("Mar") > -1){date[1] = "03";}
          if(date[1].indexOf("Apr") > -1){date[1] = "04";}
          if(date[1].indexOf("May") > -1){date[1] = "05";}
          if(date[1].indexOf("Jun") > -1){date[1] = "06";}
          if(date[1].indexOf("Jul") > -1){date[1] = "07";}
          if(date[1].indexOf("Aug") > -1){date[1] = "08";}
          if(date[1].indexOf("Sep") > -1){date[1] = "09";}
          if(date[1].indexOf("Oct") > -1){date[1] = "10";}
          if(date[1].indexOf("Nov") > -1){date[1] = "11";}
          if(date[1].indexOf("Dec") > -1){date[1] = "12";}
          job.dateclosed_raw = date[1]+"/"+date[2]+"/"+date[0];
     
    
            job.temp = "NOV-03-2020";
        jobs.push(job);
      }
     
    out["jobs"]= jobs;
      return out;
    })();

    
    /////////////////////////////////
    //P
    (function() {
        var out = {};
        var next = document.querySelectorAll("ul.pagination > li").length - 1;
      var next_page_selector = 'ul.pagination > li:nth-child(' + next + '):not([class="disabled"]) > a'; //selector to identify the next button
      //var last_page_selector = ""; //selector to identify the last page
       
      var clickable_elem = document.querySelector(next_page_selector);
    
        //stop condition
        /*if (!document.querySelector(last_page_selector)) {
            //last page
          out["has_next_page"] = false;
      } else */if(clickable_elem){
            //go to next page
          clickable_elem.click();
            out["has_next_page"] = true;
      } else {
            //try again
          out["has_next_page"] = false;
      }
  
        out.waitFor = "li.vote-item div.col-sm-10 > h4";
        return out;
  })();


  ////////////////////////////////////
  //JD
  (function() {var out = {};
var job = {};
var selector = "div.col-md-9";
var remove_selectors = ["div.p-b-m", "div > div > p:first-child", "div > div > ul:first-child"];

//var job = pass_it["job"];
if (document.querySelector("div > div > p:first-child")){
  var text = document.querySelector("div > div > p:first-child").textContent.trim();
  job.source_jobtype = text.split("Type").pop().replace(":","").split("Hours").shift().trim();
  job.source_salary = text.split("Salary").pop().replace(":","").trim();
}
else if (document.querySelector("div > div > ul:first-child")) {
  var text = document.querySelector("div > div > ul:first-child").textContent.trim();
  job.source_jobtype = text.split("Type").pop().replace(":","").split("Hours").shift().trim();
  job.source_salary = text.split("Salary").pop().replace(":","").trim();
}
             
var full_html = document.querySelector(selector);
// remove something from the jobdatata
if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {$(remove_selector).remove();});
if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
if (typeof msg == "undefined") msg = console.log;

for (const a of full_html.querySelectorAll('p')) {
  if (a.textContent.search('@')>-1 | a.textContent.search('www')>-1 | a.textContent.search('http')>-1){
     a.remove();
  } 
}

job.html = full_html.innerHTML.trim();
job.jobdesc = full_html.textContent.trim();

job.html = cleanHTML(job.html);
job.jobdesc = cleanHTML(job.jobdesc);

/*job.html = removeTextBefore(job.html, "", false);
job.jobdesc = removeTextBefore(job.jobdesc, "", false);*/
job.html = removeTextAfter(job.html, "Applications close", true);
job.jobdesc = removeTextAfter(job.jobdesc, "Applications close", true);


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