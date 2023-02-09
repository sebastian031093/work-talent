


// ADP JSON POST

(function() {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  do {
      var data = {"filters":[{"name":"state","label":"State"},{"name":"city","label":"City"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Full-Time/Part-Time"},{"name":"regTemp","label":"Regular/Seasonal"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"250","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"allAddresses","label":"All Addresses"},{"name":"num","label":"Req Num"}]},"pagefilter":{"page":counter},"rl":"enUS"};
      $.ajax({
          url: 'https://recruiting.adp.com/srccar/public/rest/1/1291013/search/', // URL de ejemplo: https://recruiting.adp.com/srccar/public/rest/1/1223051/search/
          headers: {
              "Content-Type": "application/json;charset=UTF-8"
          },
          type: 'POST',
          data: JSON.stringify(data),
          //dataType: "json",
          async: false,
          success: function(result) {
            json = result.jobs;
            limit = result.pages + 1;
            for (var i = 0; i < json.length; i++) {
              var job = {};

              var title = json[i].ptitle;
              if (title.search(/\(/) > -1) {
                job.title = title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
                job.source_jobtype = title.split(/\(/).pop().split(/\)/).shift().trim();
              }
              else {job.title = title;}
              
              job.reqid = json[i].num;
              job.url = json[i].url;


              job.location = json[i].locationaddress[0];

              if(job.location.length<1){       

                var city   = json[i].city;
                var state  = json[i].state;

                var loc = "";
                var array_loc = Array();

                if(city) array_loc.push(city);
                if(state) array_loc.push(state);



                if(array_loc.length) loc = array_loc.join(", ");
                  job.location = loc.trim();
             }

              job.location = job.location.replace(/[0-9]/g,"").trim();
               

              job.temp = "Dec-23-2020";
              jobs.push(job);
            }
              counter = counter + 1;
          },
          error: function(error) {
              msg(error);
          }
      });
  } while (counter < limit);

  out["jobs"] = jobs;
  return out;
})();


//NO PAGINATION



// JOBDATA

/*
Entrando el una descripción aleatoria. 
Prcedimiento
  1. Inspeccionamos
  2. Seleccionamos el archivo JSON de la descripción. 
  3. Tomamos el enlace: 
  https://recruiting.adp.com/srccar/public/rest/1/115407/job/5000596984106?rl=enUS
  4. Debemos cumplir ese patrón. 
  5. Del URL que extraemos del extract solo tomaremos el ID; var jobid. // var jobid
*/
  
(function() {
var out = {};
var job = {};

  var jobid = pass_it["job"].url.split("&r=").pop();

  var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/115407/job/"+ jobid + "?rl=enUS"; // Patron de URL: "https://recruiting.adp.com/srccar/public/rest/1/1260451/job/" + jobid + "?rl=enUS";
//msg(endpoint);

$.ajax({
url: endpoint,
headers: {
"Content-Type": "application/json;charset=UTF-8"
},
type: 'GET',
async: false,
success: function (result) {
var full_html = "";

for (var i = 0; i < result.fields.length; i++) {
// Ignorar las dos primeras posiciones porque son como basura...
if (result.fields[i].label == 'Job Description' || result.fields[i].label == 'Qualifications') { // Se toma el nombre de los LABEL; se puede observar inspeccionando en 
                                                                                                 // XHR --> Response
full_html += "<h3>" + result.fields[i].label + "</h3><br/>" + result.fields[i].content;
full_html += "<br/>";
}

}

job.html = full_html;
  
  job.html = job.html.split("Agilent Technologies, Inc. is an Equal Employment Opportunity").shift().trim();
  job.html = job.html.split("For more information").shift().trim();
  job.html = job.html.split("About Agilent").shift().trim();

job.html    = cleanHTML(job.html);
job.jobdesc = job.html;  


},
error: function (error) {
msg(error);
}
});

out["job"] = job;
return out;
})();