//EXTRACT (JSON GET) (Saca el job description en el extract)
(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {
      var data = {};
      $.ajax({
        url : 'https://straitnz.chillifactor.co.nz/jobs/searchResults?search=0&search_term=&orgId=194',
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        type : 'GET',
        data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          json = result[0];
          limit = result.positionLimit;
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.title = elem.position_title.split("-").shift();
            
            var city    = elem.city;
            var country   = elem.country;
            var loc = "";
            var array_loc = Array();

            if(city) array_loc.push(city);
            if(country) array_loc.push(country);
            if(array_loc.length) loc = array_loc.join(", ");
            job.location = loc;
            
            job.reqid = elem.idproject;
            job.url = "https://recruit.chillifactor.co.nz/jobs/view?id=" + job.reqid + "/Class";                    
            
            job.dateposted_raw = elem.published_date.split("/");
            job.dateposted_raw = job.dateposted_raw[1] + "/" + job.dateposted_raw[0] + "/" + job.dateposted_raw[2];
            
            if(elem.job_type != "empty") job.source_jobtype = elem.job_type;                  
            
            //JOB DESCRIPTION
            job.html      = elem.description;    
            //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
            //job.html = removeTextAfter(job.html, 'Application Instructions', true);
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);
  
            job.temp = "OCT-27-2020";
            jobs.push(job);
          }
          counter = counter + 1;
        },
        error: function(error){
          msg(error);
        }
      });
    } while (counter < limit);
  
    out["jobs"]= jobs;
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

  ////////////////////////////////////////////////////////////////////////////////////////
  //PAGINATION (No pagination)
  (function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();
