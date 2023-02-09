//EXTRACT
(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = Number(document.querySelector("span.pagination-total-pages").textContent.trim().split("of").pop().trim());
    var json;
    do {
    var data = {};
    
    $.ajax({
      url : 'https://maryhavenjobs.chsli.org/search-jobs/results?ActiveFacetID=0&CurrentPage=' + counter + '&RecordsPerPage=15&Distance=50&RadiusUnitType=0&Keywords=&Location=&ShowRadius=False&IsPagination=True&CustomFacetName=&FacetTerm=&FacetType=0&SearchResultsModuleName=Search+Results&SearchFiltersModuleName=Search+Filters&SortCriteria=0&SortDirection=0&SearchType=5&PostalCode=&fc=&fl=&fcf=&afc=&afl=&afcf=',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      type : 'GET',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
          
        json = result.results;
  
        var div = document.createElement("div");
        div.innerHTML = json;
        var html_jobs = div.querySelectorAll("#search-results-list > ul li");
  
        //limit = result.positionLimit;
        for(var i = 0; i<html_jobs.length; i++) {
          var job = {};
          var elem = html_jobs[i];
          job.title = elem.querySelector("a h2").textContent.trim();
          //	if(job.title != 'SPONTANEOUS APPLICATION'){
          job.url = elem.querySelector("a").href.trim();
          job.reqid = job.url.split("/")[7];
          // elem.querySelector("header div label").remove();
          job.location = elem.querySelector("a span.job-location").textContent.trim();
          if(elem.querySelector("a span.job-shift") != null) {
            job.source_jobtype = elem.querySelector("a span.job-shift").textContent.trim();
          }                 
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
        msg(counter);
      },
      error: function(error){
        msg(error);
      }
    });
    } while (counter <= limit);
  
    out["jobs"]= jobs;
    return out;
  })();