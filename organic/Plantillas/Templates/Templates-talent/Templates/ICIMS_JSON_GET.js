/* Step Extract */
(function() {
    var jobs = [];
    var out = {};
    var cont = 1;
    var limit;
    do {
      if (typeof msg == "undefined") msg = console.log;
  
      var data = 'pr=' + cont + '&in_iframe=1&schemaId=&o=';
  
      $.ajax({
        // Change Url taking current url until the word "?pr="
        url: 'https://careers-dewberry.icims.com/jobs/search?pr=' + cont + '&in_iframe=1&schemaId=&o=', // 1) url
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "content-type": "text/html;charset=UTF-8" // 2) headers
        },
        type: 'GET', // 3) tipo
        dataType: "html", // 4) data que retorna
        data: data,
        async: false,
        success: function(result) {
          // Result in String is passed to new element html
          var html = document.createElement("html");
          html.innerHTML = result.trim();
  
          // We capture the values
          var html_jobs = html.querySelectorAll("div.iCIMS_JobsTable>div.row");
          // Example "Search Results Page 2 of 5"  | we take value after the word "of"
          limit = Number(html.querySelector('h2.iCIMS_SubHeader_Jobs').textContent.split('of').pop().trim())
          msg('\x1b[45m Limit ' + Number(html.querySelector('h2.iCIMS_SubHeader_Jobs').textContent.split('of').pop().trim()))
  
          for (var x in html_jobs) {
            if (typeof html_jobs[x] == "function") continue;
            if (typeof html_jobs[x] == "number") continue;
            var elem = html_jobs[x];
            var job = {};
  
            job.title = elem.querySelector("a").textContent.trim();
            job.url = elem.querySelector("a").href.trim() + "&mode=job&iis=Neuvoo";        
  
  
            //Extract Reqid 
            for (let item of elem.querySelectorAll('div[role="list"]>dl')) {
              if (item.textContent.search(/ID|Job ID/) > -1) {
                job.reqid = item.textContent.split(' ')[0].trim()
              }
            }
  
            //Extract jobtype
            for (let item of elem.querySelectorAll('div.additional-fields>dl')) {
              if (item.textContent.search(/Employment Type/) > -1) {
                job.source_jobtype = item.textContent.split('Employment Type').pop().trim();
              }
            }
          
            //Extract dateposted if exist in Step "Extract"
            let ifExists =  elem.querySelector('div[class="col-xs-6 header right"]>span:last-child'); // Return True or False}
            if(ifExists){
                job.dateposted_raw = elem.querySelector('div[class="col-xs-6 header right"]>span:last-child').textContent
                                     .split('(').pop().split(' ')[0].trim();
             
            }
            
            //job.dateposted_raw = dateAgo(date, " ", 0,1)
            //job.logo = elem.querySelector("").getAttribute("src").trim();
            //job.source_apply_email = elem.querySelector("").textContent.trim();
            //job.source_empname = elem.querySelector("").textContent.trim();
            //job.source_jobtype = elem.querySelector("").textContent.trim();
            //job.source_salary = elem.querySelector("").textContent.trim();
            job.temp = 1;
            jobs.push(job);
  
          }
          cont++;
        },
        error: function(error) {
          msg(error);
        }
      });
    } while (cont < limit);
  
    out["jobs"] = jobs;
    return out;
  })();
  
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").trim();
  
    let day   =  dateRaw.split(cut)[dayPosition].trim(), 
        month =  dateRaw.split(cut)[monthPosition].trim(), 
        year  = dateRaw.split(cut)[yearPosition].trim();
    // if(day < 10 && day.length < 2){day = "0" + day;} 
  
    if(dateRaw.search(/[a-z]/gi)>-1){ 
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
  }

  /* Step Pagination */
  (function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

/* Step Before Job Description */
(function() {
	var out = {};
  	out.iframeSelector = "#icims_content_iframe" // Selector Iframe
  	out.iframeWaitFor = "div.iCIMS_MainWrapper" // Selector Job Description
    return out;
})();


/* Step Job Description */
(function() {
    var out = {};
    var job = {};
    /* When exists a Iframe */
    var idIframe = "#icims_content_iframe";
    var myIframe = document.querySelector(idIframe).contentWindow.document;
  
    var selector = 'div.iCIMS_MainWrapper'; // Selector Job Description
  
    var remove_selectors = ['a', 'div.alert', "div.iCIMS_JobOptions","div.iCIMS_PageFooter",
                            "div.iCIMS_Navigation","div.iCIMS_Logo",
                            "div.iCIMS_profilePicture","div.container-fluid.iCIMS_JobsTable",
  
  
                           ];
    //var job = pass_it["job"];
  
  
  
    //------------INFO----------------------------------------------------------//
    /* // Para validar la existencia del selector. Si no existe habrá error de selector. 
    var check = document.querySelector('selectorDeLaLocacion') !== null;
    if(check){
      job.location = document.querySelector('selectorDeLaLocacion').textContent.trim();
   }else{
    job.location = ""; // HQ's location
  
  
   }
  */
    /* When exists reqid in Description */
    for (const a of myIframe.querySelectorAll('div[role="list"]>dl')) {
      if (a.textContent.search(/ID|Job ID/)>-1){
        job.reqid = a.querySelector('dd').textContent.trim();     
      } 
    }
  
    /* When exists dateposted from description */
    var ifExists = myIframe.querySelector('div[class="col-xs-6 header right"]>span:last-child'); // Return True or False
    if(ifExists){
      job.dateposted_raw = myIframe.querySelector('div[class="col-xs-6 header right"]>span:last-child').textContent
        .split('(').pop().split(' ')[0].trim();
    }
  
    /* When exists location from description  | ¡This way can change! */
    for (const a of myIframe.querySelectorAll('div[role="list"]>dl')) {
      if (a.textContent.search('# of Openings')>-1){
        job.location = a.nextElementSibling.querySelector('dd').textContent.trim();
        job.location = job.location.split('-').reverse().join(', ').trim(); // Format Correct : "City,State,Country"
      } 
    }
  
    //job.location       = document.querySelector('').textContent.trim();
    // job.source_jobtype = document.querySelector('').textContent.trim();
    // job.source_salary  = document.querySelector('').textContent.trim();
  
    // job.experienced_required = document.querySelector('').textContent.trim();
  
    //--------------------------------------------------------------------------//
  
    var full_html = myIframe.querySelector(selector);
  
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => { if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove(); });
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) { return x };
    if (typeof msg == "undefined") msg = console.log;
  
  
  
    var full_html_text = full_html.textContent;
  
    /*  // E-mail 
      if(full_html_text.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
      job.source_apply_email = full_html_text.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
      */
  
    /*
       for (const a of full_html.querySelectorAll('tr')) {
         if (a.textContent.search('Location:')>-1){
            //job.location = a.textContent.trim();
            //job.source_jobtype = a.textContent.trim();
         } 
       }
  
       */
  
  
    for (const a of full_html.querySelectorAll('p')) {
      if (a.textContent.search(/TITLE|PAY|LOCATION/g)>-1){
        a.remove();
      } 
    }
  
    // TO Remove selectors 
    for (const a of full_html.querySelectorAll('a, img, script')) {
      if (a) {
        a.remove();
      }
    }
  
  
    if (cleanHTML(full_html_text).trim().length < 200) {
      //if(cleanHTML(full_html_text).trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
      msg('\x1b[31m Sorry! :( description not available')
      job.flag_active = 0;
      job.html = "";
      job.jobdesc = "";
  
    } else {
  
      job.html = full_html.innerHTML.trim();
  
      job.html = removeTextBefore(job.html, "text_to_remove_Before", false);
      job.html = removeTextAfter(job.html, "text_to_remove_after", true);
      job.html = removeTextAfter(job.html, "*At this time, Dewberry", true);
      job.html = removeTextAfter(job.html, "*Dewberry is an Equal Opportunity", true);
  
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
  
      //job.html = job.html.split("")[0];
      //job.html = job.html.split("")[0];
      //job.html = job.html.split("")[0];
      //job.html = job.html.split("")[0];
  
      /*
            if(job.html.indexOf("Location")>-1 && job.html.indexOf("Job Description")>-1){
  
              let a = job.html.indexOf("Location");
              let b = job.html.indexOf("Job Description");
              let x = job.html.slice(a,b);
  
              let b_length = "Job Description".lenth;
              job.html = job.html.replace(x + b_length,"").trim();
            }
          */
  
      //job.html = job.html.replace("","");
      //job.html = job.html.replace("","");
      //job.html = job.html.replace("","");
  
      //var title = pass_it["job"].title;
      //job.html  = job.html.replace(title,"");
  
      //CLEAN EMOJIS
      // job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  
  
      job.html = cleanHTML(job.html);
      job.jobdesc = job.html;
    }
  
    out["job"] = job;
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
  
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g, "").trim();
  
    let day = dateRaw.split(cut)[dayPosition],
        month = dateRaw.split(cut)[monthPosition],
        year = dateRaw.split(cut)[yearPosition];
  
    if (dateRaw.search(/[a-z]/gi) > -1) {
      if (month.search(/jan/i) > -1) { month = "01"; }
      if (month.search(/feb/i) > -1) { month = "02"; }
      if (month.search(/mar/i) > -1) { month = "03"; }
      if (month.search(/apr/i) > -1) { month = "04"; }
      if (month.search(/may/i) > -1) { month = "05"; }
      if (month.search(/jun/i) > -1) { month = "06"; }
      if (month.search(/jul/i) > -1) { month = "07"; }
      if (month.search(/aug/i) > -1) { month = "08"; }
      if (month.search(/sep/i) > -1) { month = "09"; }
      if (month.search(/oct/i) > -1) { month = "10"; }
      if (month.search(/nov/i) > -1) { month = "11"; }
      if (month.search(/dec/i) > -1) { month = "12"; }
    }
    var datum = month + "/" + day + "/" + year;
    return datum;
  }