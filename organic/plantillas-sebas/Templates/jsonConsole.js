//test en concola
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type (or see below for non wait option)
jQuery.noConflict();

///
(function () {
    var jobs = [];
    var out = {};
    var counter = 0;
    var limit = 0;
    var json;
  
    do {
      //var data = {"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State/Province"},{"name":"city","label":"Town/City"},{"name":"zzreqWorkatHome","label":"Option to Work Remote"},{"name":"payGroupCode","label":"Job Function"},{"name":"zzreqJobType","label":"Job Type"},{"name":"typeOfFulltime","label":"Schedule"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"location","label":"Location"}]},"pagefilter":{"page":counter},"rl":"enUS"};
      $.ajax({
        url: 'https://public-rest33.bullhornstaffing.com/rest-services/17EG1/search/JobOrder?start=' + counter + '&query=(isOpen:1)%20AND%20(isDeleted:0)&fields=id,title,publishedCategory(id,name),address(city,state,countryName),employmentType,dateLastPublished,publicDescription,isOpen,isPublic,isDeleted,publishedZip,salary,salaryUnit&count=30&sort=-dateLastPublished&showTotalMatched=true',//link del json
        headers: {
          "accept": "application/json, text/plain, */*"
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function (result) {
          json = result.data;
          limit = result.total;
          for (var i = 0; i < json.length; i++) {
            var job = {};
            var elem = json[i];
            job.title = elem.title;
            job.location = elem.address.city + ', ' + elem.address.state;
            job.url = 'https://visionairepartners.com/wp-content/plugins/bullhorn-oscp/#/jobs/'+elem.id;
            job.reqid = elem.id;
  
            var html = elem.publicDescription.trim();
            html = cleanHTML(html);
            var tmp = document.createElement('div');
            tmp.innerHTML = html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            
            var date = new Date(elem.dateLastPublished);
            job.dateposted_raw = date.toLocaleDateString("en-US");
            
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_jobtype = elem.positionOfJobtype;
            //job.source_salary = elem.positionOfSalary;         
            //job.source_empname = elem.positionOfEmpname;
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;
  
            job.temp = "96";
            jobs.push(job);
          }
          counter = counter + 30;
        },
        error: function (error) {
          msg(error);
        }
      });
    } while (counter < limit);
  
  
    out["pic"] = true;
    out["jobs"] = jobs;
    return out;
  })();