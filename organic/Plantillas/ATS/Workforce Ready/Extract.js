(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {
      //var data = {};
      $.ajax({
        url : 'https://secure3.entertimeonline.com/ta/rest/ui/recruitment/companies/%7C6138037/job-requisitions?offset=0&ein_id=&_=1629819650635',
        headers: {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US",
          "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        type : 'GET',
        //data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          json = result.job_requisitions;
          //limit = result.positionLimit;
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.title = elem.job_title;
            job.location = elem.location.city+", "+elem.location.state+", "+elem.location.country;
            job.url = elem.positionOfUrl;   
            job.reqid = elem.id;
            job.url= window.location.protocol + "//" + window.location.hostname + window.location.pathname + "?ShowJob="+job.reqid;
            let endpoint = "https://secure3.entertimeonline.com/ta/rest/ui/recruitment/companies/%7C6138037/job-requisitions/"+job.reqid;
            var full_html = getDescription(endpoint);
            let jsonAux = JSON.parse(full_html);
            if(jsonAux.employee_type.name){
                job.source_jobtype = jsonAux.employee_type.name;
            }
            job.html = jsonAux.job_description; 
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);
            //job.dateposted_raw = elem.positionOfDatePosted;
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_jobtype = elem.positionOfJobtype;
            //job.source_salary = elem.positionOfSalary;         
            //job.source_empname = elem.positionOfEmpname;
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;
  
            job.temp = "1";
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
function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    //xhrrequest.setRequestHeader(header, value);
    var response = "";
    xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) { 
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}