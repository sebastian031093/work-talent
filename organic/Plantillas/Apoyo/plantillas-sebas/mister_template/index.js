//Taleo Get pagination
(function() {
    var jobs = [];
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
        if (!pass_it["counter"]) {
          out["pass_it"] = {
            counter: 1,
            limit: 0
          };
        } else {
          out["pass_it"] = pass_it;
        }
      //out["pass_it"].counter
      var data = {"multilineEnabled":true,"sortingSelection":{"sortBySelectionParam":"3","ascendingSortingOrder":"false"},"fieldData":{"fields":{"KEYWORD":"","JOB_NUMBER":"","JOB_TITLE":""},"valid":true},"filterSelectionParam":{"searchFilterSelections":[{"id":"POSTING_DATE","selectedValues":[]},{"id":"LOCATION","selectedValues":[]},{"id":"ORGANIZATION","selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]}]},"advancedSearchFiltersSelectionParam":{"searchFilterSelections":[{"id":"ORGANIZATION","selectedValues":[]},{"id":"LOCATION","selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]},{"id":"URGENT_JOB","selectedValues":[]}]},"pageNo":out["pass_it"].counter};
      $.ajax({
        url : 'https://tenet.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=560110087',
        headers: {
              "accept": "application/json, text/javascript, */*; q=0.01",
              "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
              "content-type": "application/json",
              "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "tz": "GMT-05:00",
              "tzname": "America/Bogota",
              "x-requested-with": "XMLHttpRequest"
        },
        type : 'POST',
        data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          //msg(result);
          json = result.requisitionList;
          out["pass_it"].limit = json.length;
          //msg(limit);
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.title = elem.column[0];
            job.location = elem.column[2].replace(/^\["|"]/g,'').split('-').reverse().join().trim();
            job.source_location = elem.column[2].replace(/^\["|"]/g,'').trim();
            job.reqid = elem.contestNo;
            job.url = 'https://tenet.taleo.net/careersection/10000/jobdetail.ftl?job=' + job.reqid;                    
            var posted = elem.column[4];
            job.dateposted_raw  = getDateFormat(posted,' ',1,0,2);
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_jobtype = elem.positionOfJobtype;
            //job.source_salary = elem.positionOfSalary;         
            job.source_empname = elem.column[1];
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;
  
            job.temp = "1";
            jobs.push(job);
            }          
        },
        error: function(error){
          msg(error);
        }
      });    
    out["jobs"]= jobs;
    return out;
  })(); 



function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"");

       if(dateRaw.indexOf(".")>-1){
          var periods = dateRaw.match(/\./g).length;
          if(periods == 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
       }

        let day   = dateRaw.split(cut)[dayPosition].trim(), 
            month = dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

            day = day.replace(/rd|st|th/i,"").trim();    
         if(day < 10 && day.length < 2){day = "0" + day;}
         if(year.length == 2){year = "20" + year;}
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
           //English, Dutch, French
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar|maar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai|mei/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct|okt/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec|déc/i)>-1){month = "12";}
        }
  var datum = month +"/"+  day +"/"+ year;
    return datum;
}


// Pagination 


(function() {
    var out = {};
    out["pass_it"] = pass_it;
    out["pass_it"].counter++;
    msg(out["pass_it"].counter +" <=> "+ out["pass_it"].limit)  
    if(out["pass_it"].limit > 0){
        out["has_next_page"] = true;
    }else {
      out["has_next_page"] = false;          
    }
    return out;
})();