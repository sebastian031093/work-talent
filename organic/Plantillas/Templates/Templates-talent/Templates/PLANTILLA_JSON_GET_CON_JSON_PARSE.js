// Before extract (no fue necesario) 

(function() {
var out = {};
out.waitFor = "pre";
out["wait"]= 1000;
return out;
})();


// Extract ----------------------------------------------------------------------------------------------//

(function() {
  var out = {};
  
  if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.data; /*selector que contiene los jobs.  Ej.:  var jobs = json.jobList; */
  
  var returnedJobs = [];  
  for(i in jobs) {
        var job = {};/*init*/
      
    var dom = "https://visionairepartners.com/wp-content/plugins/bullhorn-oscp/#/jobs/"; // Domino del url
    
    
      job.title    = jobs[i].title;
      job.url      = dom + jobs[i].id;
    
      //job.location = jobs[i].locationSelector;
    
     //Location array "city, state"
       /*--------------------------------------------------*/
          var city    = jobs[i].address.city;
          var state   = jobs[i].address.state;
          
          var loc = "";
          var array_loc = Array();

          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          
          if(array_loc.length) loc = array_loc.join(", ");

        job.location = loc;
    
    	/*------------------------------------------------------*/

    
      // Job descripion: 
      //job.html = jobs[i].descriptionSelector;

      job.temp = "APR-2020";
      
      returnedJobs.push(job);
    }
    
    out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
    return out;
})();



// Step #2: Pagination ----------------------------------------------------------------------------------------------//


(function() {
    var out = {};
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
    out["pass_it"] = pass_it;
    
    
    if (out["pass_it"]["jobs"] < 30) { // Número de jobs por página 
        //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 30; // Según lo observado, el jobsite pagina cada 30 jobs; se puede apreciar cada vez que se oprime el button-more en el network.
      
      // Se corta el URL en dos partes. 
      var beforePageVariable = "https://public-rest33.bullhornstaffing.com/rest-services/17EG1/search/JobOrder?start=";
      var afterPageVariable  = "&query=(isOpen:1)%20AND%20(isDeleted:0)&fields=id,title,publishedCategory(id,name),address(city,state,countryName),employmentType,dateLastPublished,publicDescription,isOpen,isPublic,isDeleted,publishedZip,salary,salaryUnit&count=30&sort=-dateLastPublished&showTotalMatched=true"; 
      
      // La variable declarada "cont" cada vez que se ejecute el extract, sumara 30 jobs más. 
      var url = beforePageVariable + out["pass_it"].cont + afterPageVariable;


     
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