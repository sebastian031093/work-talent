// Before Extract
(function() {
	var out = {};
  	out.waitFor = "div.jobInfo.JobListing span.jobInfoLine.jobTitle"
    return out;
})();


// Extract

(function() {
  var out = {};
     var html_jobs = document.querySelectorAll("div.jobInfo.JobListing");
    
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];

      
      job.title    = elem.querySelector("span.jobInfoLine.jobTitle").textContent.trim();
      job.url      = elem.querySelector("a.JobListing__container").href.trim();
      job.location = elem.querySelector("span.jobInfoLine.jobLocation.JobListing__subTitle").textContent.trim();

      job.location = job.location.split("|").pop().split(" - ").pop().trim();

      job.title = job.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
      
  

      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary  = elem.querySelector("").textContent.trim();

      //job.source_empname     = elem.querySelector("").textContent.trim();
      //job.logo               = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();

      

        job.temp  = "Feb-2020";
        //job.jobid = MD5(job.title+job.location+job.temp);
        

 
     //if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
    //}
    
    } 
  
  out["jobs"]= jobs;
    return out;
})();

// Pagination 




(function() {
    var out = {};
  var next_page_selector = 'a.js-pagination-link-next.pagination-style'; // Selector del next 
  //var last_page_selector = ''; //Selector de la última página
  
    var clickable_elem = document.querySelector(next_page_selector);
  
  var totalJobs   = document.querySelector("div.col-xs-6.pagination-style-box").textContent.split("of").pop().trim();
  var currentJobs = document.querySelector("div.col-xs-6.pagination-style-box").textContent.split("of").shift().split("-")[1].trim();
  
  //console.log(totalJobs);
// console.log(currentJobs);
  
  //msg("\x1b[33m    \x1b[4m " +currentJobs +" jobs of " + totalJobs);
  
  var expected_jobs = document.querySelector(next_page_selector);
  
    //stop condition
    if(currentJobs != totalJobs) {
clickable_elem.click();
    out["has_next_page"] = true;
    } else {
        
      out["has_next_page"] = false;
    }

    //out.waitFor = "td.nowrapRegular";
    return out;
})();


//Description



(function() {
  var out = {};
  var job = {};
  
  var selector = "div.cardContainer.shadow.padding.marginBottom.formGroup.row";
 
  var full_html = $(selector);
  
    //---------INFO-------------------------------------

    var html_2 = $(selector).text(); 

    // job.location           = $("").text().trim();
    // job.source_jobtype     = $("").text().trim();
    // job.source_empname     = $("").text().trim();
    // job.logo               = $("").attr("src");
    // job.source_salary      = $("").text().trim();
    // job.dateclosed_raw     = $("").text().trim();
  
      /*----------DATE-POSTED-----------------------------
          
      var datum = $("").text().trim();
          datum = datum.trim();

          var cut = "";
          
      var day   =  datum.split(cut)[0];
      var month =  datum.split(cut)[1];
      var year  =  datum.split(cut)[2];
          
      job.dateposted_raw  = month +"/"+  day +"/"+ year;

      /*-------------------------------------------------*/

     /*
     if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
     job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
     */
  
 //---------REMOVE---------------------------------------

    full_html.find('a').remove().end().html();
    full_html.find('input, img, button').remove().end().html();
    full_html.find('div.alert').remove().end().html();
    full_html.find('style, script').remove().end().html();

    //full_html.find("h1").remove().end().html();

    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    
    //full_html.find("div#Job.Category-row").remove().end().html();
    //full_html.find("div#Level-row").remove().end().html();
    full_html.find("div[name='local_row']:contains(Level)").remove().end().html();
    //full_html.find("div[name='local_right]").remove().end().html();

 //----------------------------------------------------- 
  

  var full_html_text = full_html.text();

 

  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
  if(full_html_text.trim().length < 200){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";


  }else{

  var full_html = full_html.html();

   job.html = full_html.trim();

  job.html = removeTextBefore(job.html, "Job Summary", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];


  job.html = job.html.replace("Description","<br>Description<br>");
  job.html = job.html.replace("Level","<br>Level<br>");
  job.html = job.html.replace("Job Category","<br>Job Category<br>");
  //job.html = job.html.replace("","");

//CLEAN EMOJIS
//  job.html = full_html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();

  job.html    = cleanHTML(job.html);
  job.jobdesc = job.html;


}
  
  out["job"]  = job;
  return out;
  
   
})();

 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml = text + " " + newHtml;
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

