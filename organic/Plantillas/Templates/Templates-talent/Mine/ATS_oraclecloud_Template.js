//E
(function () {
    var jobs = [];
    var out = {};
    var cont = 0;
    var json;
    
    
    var seguir = true


     do {


    $.ajax({
      url: 'https://ehac.fa.us6.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations&finder=findReqs;siteNumber=CX_1,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BPOSTING_DATES,limit=24,offset=' + cont,                                            // 1) url
      headers: {                                                      
        "accept": "*/*",
        "Content-Type":"application/vnd.oracle.adf.resourcecollection+json"    // 2) headers
      },
      type: 'GET',                                        // 3) tipo
      dataType: "json",                                   // 4) data que retorna
      //data: data,
      async: false,
      success: function (result) {
        msg("\x1b[45m loading jobs...");
        json = result.items[0].requisitionList;
        
        var stop = json;

        
		if(stop.length < 1){
        	seguir = false;
        }
		
        // 5) ruta de los trabajos
        //msg(json.length);
        for (var i = 0; i < json.length; i++) {
          var job = {};
          job.title = json[i].Title;
		  job.title = job.title.split('Store #').shift().trim();

		  
var firstCharTitle = job.title.substr(0, 1);
if(firstCharTitle === "/" || firstCharTitle === "-" || firstCharTitle === "," || firstCharTitle === "(" ){job.title = job.title.slice(1,-1).trim();}

          job.url = "https://ehac.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/requisitions/preview/" + json[i].Id;
          job.location = json[i].PrimaryLocation;
		  job.location.split(',').forEach((elm, idx) =>{
            job.title = job.title.replace(elm, "").trim();
            let lastCharTitle = job.title.substr(job.title.length -1);
            if(lastCharTitle === "/" || lastCharTitle === "-" || lastCharTitle === "," || lastCharTitle === "(" ){job.title = job.title.slice(0,-1).trim();}
          })
          //job.logo = json[i].;
          //job.source_apply_email = json[i].;
          //job.source_empname = json[i].;
          //job.source_jobtype = json[i].;
          //job.source_salary = json[i].;
          job.dateposted_raw = json[i].PostedDate.split("T")[0].split("-").reverse().join("/");
          //job.dateclosed_raw = json[i].;
          /*  var fecha = json[i].
                                fecha = fecha.split(" ")[0].split("-");
                                job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/
          job.temp = 3312;
          jobs.push(job);
        }
         cont += 24;
      },
      error: function (error) {
        msg(error);
      }
    });
     } while (seguir == true);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
  })();

  //////////////////////////////////////////////////
  //No PG
  (function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

////////////////////////////////////////////
//Before JD
(function() {
	var out = {};
  	out.waitFor = "div.details";
    return out;
})();


//////////////////////////////////////////////
//JD
(function() {
    var out = {};
    var job = {};
    var selector =  'div.details';
    //var remove_selectors = [];
    //var job = pass_it["job"];
    if(document.querySelector(selector))
    {
      
      var full_html = document.querySelector(selector);
      // remove something from the jobdatata
      //if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
      
        for (const a of document.querySelectorAll('#contactmail')) {
        if (a.textContent.includes('Employer')){ //can use search or match methods
        job.source_empname = a.textContent.trim().split("Employer:").pop().split('Type').shift(); //another querySelector if needed
        //a.remove(); //if you want to remove this selector
        } 
        }
      for (const a of full_html.querySelectorAll('li')) {
        if (a.textContent.search(/experience|werkervaring|ervaring|esperienza/)>-1 && a.textContent.search(/[0-9]/g)>-1){
          job.experienced_required = a.textContent;
        }
      }
      let links = document.querySelectorAll('a,script,input,button,img')
      links.forEach(elemento => elemento.remove()); 
      
      job.html      = full_html.innerHTML.trim(); 
      
    if(job.html.search(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    job.source_apply_email = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0];
    }
  
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
  
    job.html = job.html.split("FOR SF ONLY")[0];
    job.html = job.html.split("Williams-Sonoma, Inc. is an Equal")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
  
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
  
      job.html      = cleanHTML(job.html);
      var tmp       = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
      job.jobdesc   = cleanHTML(job.jobdesc);
      
   
  
      if (job.html.length < 200) {job.flag_active = 0; job.html="";  job.jobdesc ='';}
    }
    else
    {
        job.flag_active = 0; job.html=""; job.jobdesc ='';
    }
    out["job"] = job;
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