

// SmartRecruiters ATS - Plantilla universal



/*


Jobsite (JSON GET) https://api.smartrecruiters.com/v1/companies/ + nombreDeLaEmpresa + /postings/?limit=100&offset=

URL de ejemplo: https://api.smartrecruiters.com/v1/companies/mitie/postings/?limit=100&offset=0





*/

// Extract 

(function() {
 var out = {};
  
  if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.content; 
  
  var returnedJobs = [];  
  for(i in jobs) {
        var job = {};/*init*/
    
      var company = window.location.pathname.split("companies/").pop().split("/postings").shift().trim();
      var dom     = "https://jobs.smartrecruiters.com/" + company +"/"; // Domino del url
   
      job.title    = jobs[i].name;
      job.url      = dom + jobs[i].id;
  
     //Location array "city, state"
       /*--------------------------------------------------*/
          var city    = jobs[i].location.city;
          var state   = jobs[i].location.region;
          var country = jobs[i].location.country.toUpperCase().trim();
          
          var loc = "";
          var array_loc = Array();

          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          if(country) array_loc.push(country);
          
          if(array_loc.length) loc = array_loc.join(", ");

        job.location = loc;
    
    	/*------------------------------------------------------*/
    
    
      if(job.location.indexOf("Barcelona")>-1){job.location = "Barcelona, Spain";}
      

      /*----------DATE-POSTED-------------------------------------*/
             //2020-03-21
            let datum = jobs[i].releasedDate.split("T")[0];
                datum = datum.trim();
   			let cut = "-";
          
            
            let day   =  datum.split(cut)[2];
            let month =  datum.split(cut)[1];
            let year  =  datum.split(cut)[0];
          
           job.dateposted_raw  = month +"/"+  day +"/"+ year;

      /*---------------------------------------------------------*/
 
      job.temp = "MAR-2020";
      
      returnedJobs.push(job);
    }
    
    out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
    return out;
})();


// Pagination

(function() {
    var out = {};
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
   out["pass_it"] = pass_it;
    
    
        if (out["pass_it"]["jobs"] < 100) {
        //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 100;
      
      let company              = window.location.pathname.split("companies/").pop().split("/postings").shift().trim();
      var beforePageVariable   = "https://api.smartrecruiters.com/v1/companies/" + company + "/postings/?limit=100&offset=";
      //var afterPageVariable    = "&_=1584887075565"; 
      
      var url = beforePageVariable + out["pass_it"].cont; // + afterPageVariable;

      window.location.href = url;
      msg(url);
      out["has_next_page"] = true;
    }
    else {
      out["has_next_page"] = false;
    }
  
    out["wait"] = true;
    return out;
    })(); 


    // Job description

    (function() {

  var out = {};
  var job = {};

  var selector  = 'div[itemprop="description"]'; 

  var full_html = $(selector);
  var html_2    = $(selector).text();

  //------------INFO--------------------------------------//
  
  var exp_fr = $('li:contains(expérience)') !== null;
  if(exp_fr){
    
    let x = $('li:contains(expérience)').text().trim();
      if(x.search(/[0-9]/g)>-1){
      job.experienced_required = x;
      }  
    full_html.find("li:contains(expérience)").remove().end().html();
  }
  

  // job.location             = $('').text().trim();
  // job.source_salary        = $('').text().trim();
  // job.source_jobtype       = $('').text().trim();

  // job.experienced_required = $('').text().trim();
 
  // job.source_empname       = $('').text().trim();
  // job.logo                 = $('').attr("src");
  
  /*---------- DATE POSTED----------------------------------
          
      let datum = $("").text().trim(); //.split(":").pop();
          datum = datum.trim(); //.replace(/\,/g,"").trim();

      let cut = "";
          
      let day   =  datum.split(cut)[1];
      let month =  datum.split(cut)[0];
      let year  =  datum.split(cut)[2];
          
      job.dateposted_raw  = month +"/"+ day +"/"+ year;
      //job.dateclosed_raw = month +"/"+ day +"/"+ year;
  /*-------------------------------------------------------*/

     /*
     if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
     job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
     */
  
 //-----------REMOVE SELECTORS--------------------------------------//

    full_html.find('a, input, button').remove().end().html();
    full_html.find('img, div.alert, style, script').remove().end().html();
    full_html.find('form').remove().end().html();
    
    //full_html.find("h1").remove().end().html();

    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();

    full_html.find("p:contains(votre CV)").remove().end().html();
    full_html.find("p:contains(For more details)").remove().end().html();
    full_html.find("p:contains(Your contact person)").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
  

 //-----------------------------------------------------------------// 

  var full_html_text = full_html.text();
  
 

  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
  if(full_html_text.trim().length < 200){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";

  }else{

  var full_html = full_html.html();

   job.html = full_html.trim();

  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);


  job.html = job.html.split("Boîte à questions")[0];
  job.html = job.html.split("Apply")[0];
  job.html = job.html.split("Next step")[0];
 
  job.html = job.html.split("Várjuk jelentkezésed").shift().trim();
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

  //var title = pass_it["job"].title;
  //job.html  = job.html.replace(title,"");

//CLEAN EMOJIS
 job.html = full_html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();

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


