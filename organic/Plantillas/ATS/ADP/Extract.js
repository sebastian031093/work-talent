(function() {
    var jobs = [];
    var out = {};
    var counter = 10;
    var limit = 0;
    var json;
    do {
      $.ajax({
        url : 'https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=64ea5388-8419-4795-bac5-3adcc6042ea9&timeStamp=1636556418847&lang=en_US&ccId=19000101_000001&locale=en_US&$top='+counter,
        headers: {
          "accept": "*/*",
          "accept-language": "en_US",
          "content-type": "application/json",
          "locale": "en_US",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-forwarded-host": "workforcenow.adp.com",
          "x-requested-with": "XMLHttpRequest"
        },
        type : 'GET',
        dataType: "json",
        async : false,
        success : function(result){
          json = result.jobRequisitions;
          limit = result.meta.totalNumber;
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.id = elem.customFieldGroup.stringFields[0].stringValue;
            job.title = elem.requisitionTitle;
            job.title = job.title.replace(/\([^)]*\)/g, "").replace(/[.*+?^${}()|[\]\\]/g, "").trim();
            job.title = job.title.replace(/part time|full time|part-time|full-time|H\/F/gi, '').trim();
            job.url = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=64ea5388-8419-4795-bac5-3adcc6042ea9&ccId=19000101_000001&jobId="+job.id+"&lang=en_US&source=LI";                    
            job.dateposted_raw = elem.postDate.split("T")[0];
            job.dateposted_raw = job.dateposted_raw.split("-")[1] + "/" + job.dateposted_raw.split("-")[2] + "/" + job.dateposted_raw.split("-")[0];
            if(elem.workLevelCode){
              if(elem.workLevelCode.shortName){
                job.source_jobtype = elem.workLevelCode.shortName;
              }
            }
            job.temp = "1";
            for(const item of elem.requisitionLocations){
              var jobw = {...job};
              jobw.location = item.nameCode.shortName;
              jobs.push(jobw); // Multi-location jobs
            }
  
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_salary = elem.positionOfSalary;         
            //job.source_empname = elem.positionOfEmpname;
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;
  
            
          }
          counter = counter + 10;
        },
        error: function(error){
          msg(error);
        }
      });
    } while (jobs.length < limit);
  
    out["jobs"]= jobs;
    return out;
  })();