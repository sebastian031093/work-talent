(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    var token;
    //do {
    for (const a of document.querySelectorAll('script')) {
      if (a.textContent.search('"token":"') > -1) {
        token = a.textContent.split('"token":"').pop().split('"').shift().trim();
      }
    }
    var data = {"careerSiteId":20,"careerSitePageId":20,"pageNumber":1,"pageSize":9999,"cultureId":1,"searchText":"","cultureName":"en-US","states":[],"countryCodes":[],"cities":[],"placeID":"","radius":null,"postingsWithinDays":null,"customFieldCheckboxKeys":[],"customFieldDropdowns":[],"customFieldRadios":[]};
    $.ajax({
      url : 'https://eu-fra.api.csod.com/rec-job-search/external/jobs',
      headers: {
        "accept": "application/json; q=1.0, text/*; q=0.8, */*; q=0.1",
        "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
        "authorization": "Bearer " + token,
        "cache-control": "no-cache",
        "content-type": "application/json",
        "csod-accept-language": "en-US",
        "sec-ch-ua": "\"Chromium\";v=\"94\", \" Not A;Brand\";v=\"99\", \"Opera GX\";v=\"80\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      type : 'POST',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        json = result.data.requisitions;
        limit = result.positionLimit;
        for(var i = 0; i<json.length; i++) {
          var job = {};
          var elem = json[i];
          job.title = elem.displayJobTitle;
          job.temp = "1";
          jobs.push(job);
        }
        //counter = counter + 1;
      },
      error: function(error){
        msg(error);
      }
    });
    //} while (counter < limit);
  
    out["jobs"]= jobs;
    return out;
  })();