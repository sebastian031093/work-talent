







(function () {
    var out = {};
    var jobsSelector = "header.job-teaser__header";
    var returnedJobs = [];
    var jobs_number = 0;    // número de jobs por página. Jobs amount per page
    var html_jobs = [];

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": jobs_number
        };
    } else {
        out["pass_it"] = pass_it;
    }






///////////////////////

    job.location = job.location.replace(/\s+/gi, ' ');

job.location = job.location.replace(/\w+$/,", $&");  


var partenthesis_content = job.title.replace(/\(.*?\)/m, '$&')

Bridge: http://qa.neuvoo.com/service/get_fgc.php?url=
///////
      job.location = job.location.replace(/\s+/gi, ' ');

// http://qa.neuvoo.com/service/get_fgc.php?url=

      // "Contains"  
      var loc = elem.querySelector('ul.list-items'); //.textContent.trim();
        
      for (const a of loc.querySelectorAll('li')) {
        if (a.textContent.search(/Location/i)>-1){
          job.location = a.querySelector("div.value").textContent.trim(); 

        } 
      }

      
// Buscar un job en específico
flag_active:1 AND link.link_analyzed: ("Link del job")

// No pagination

(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

//IFRAME 

// Colocar debajo de var "out = {};" y arriba de "var html_jobs = document.querySelectorAll("");" 

  /* // To extract from iframe
    var iframe_selector = "";
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll(""); // Loop selector
  */ // The bottom line must be inactivated 


// Set time out function 

setTimeout(function(){


}, 2500);


// Exprected jobs for json`GET

(function() {
  var out = {};
  
    var regex = /\d+/;
  
    if (typeof msg === 'undefined') msg = console.log;
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var expected_jobs_str = json.totalCount;
    var expected_jobs = regex.exec(expected_jobs_str)[0];
  
    out["expected_jobs"] = expected_jobs;

    return out;
})();

 
// Out pic

 out["pic"] = true;


// Click 

(function() {
  var out = {};
   var selector = 'div.search-button.search-vacancies-button';
    document.querySelector(selector).click();
    out["wait"]= 3000;
    return out;
})();

//Click on search button to display jobs
 (function() {
  var out = {};
   var selector = 'div.search-button.search-vacancies-button';
    document.querySelector(selector).click();
    
    return out;
})();


//Wait 

(function() {
var out = {};
//out.waitFor = "";
//out["pic"] = true;
out["wait"]= 200;
return out;
})();

// Wait Iframe


    (function() {
      var out = {};
      out.iframeSelector = "div.gnewtonCareerGroupRowClass div.gnewtonCareerGroupJobTitleClass >a"
      out.iframeWaitFor = "iframe#gnewtonIframe"
      return out;
    })();



//Job fantasma
var job_fantasma = {title:window.location.href};
jobs.push(job_fantasma);
//Se coloca justo antes de: out["jobs"]= jobs;


// Old spider-config
var boo = new Boo(
  {
      /*clientScripts:  [funcpath+'jquery.min.js'],*/
      viewportSize:{
          width:2048, height:1500
      },
      pageSettings:{
        loadImages:  false,
          loadPlugins: false,
          XSSAuditingEnabled: false,
          webSecurityEnabled: false
      },
      verbose:true,
      timeout: 60000/*,
      logLevel: "debug"*/
  }
);
boo.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11");
//boo.out.fast_debug = true;
//boo.out.show_remote_msg = 0;
//boo.out.jobs_per_page = 100;

/*spider-config*/

{
"options": {
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForPageLoadEvent": false,
"waitForResources": false
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}
/////////////

// Load more pagination 

{
"options": {
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForPageLoadEvent": false,
"waitForResources": true
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}


     for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1 && a.textContent.search("related")>-1){
        job.experienced_required = a.textContent;
            if(job.experienced_required.search(/years/)>-1){job.experienced_required = a.textContent.split("years").shift() + "years";}else{
              job.experienced_required = a.textContent.split("year").shift() + "year";}
        
        job.experienced_required = job.experienced_required.replace(/\•/g,"").trim();
      } 
    }

      for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1){
        job.experienced_required = a.textContent;
      } 
    }


      for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1 && a.textContent.search(/related/i)>-1){
        job.experienced_required = a.textContent;
      } 
    }



////////////////
// #1 TITLE  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
//////////////	   

     job.title = job.title.trim().replace(/^\,/,"").trim();

     job.title   = job.title.trim();
     var firstCharTitle = job.title.charAt(0);
     if(firstCharTitle === "-" || firstCharTitle === "," || firstCharTitle === "("){job.title = job.title.slice(1).trim();}

    job.title = job.title.trim();
    let lastCharTitle = job.title.substr(job.title.length -1);
     if(lastCharTitle === "-" || lastCharTitle === "," || lastCharTitle === "(" ){job.title = job.title.slice(0,-1).trim();}



     job.title = job.title.replace("","").trim();
     job.title = job.title.replace("","").trim();


      //if(job.title.indexOf("")>-1){job.title =  "";} 
      //if(job.title.indexOf("")>-1){job.title =  "";} 
      //if(job.title.indexOf("")>-1){job.title =  "";}
      //if(job.title.indexOf("")>-1){job.title =  "";} 

     	job.title = job.title.replace(/[0-9]/g, '');

      job.title = job.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
        
      job.title = job.title.trim().toLowerCase();                            
      job.title = job.title.charAt(0).toUpperCase() + job.title.slice(1);  


      if(typeof job.title == 'undefined' || job.title  === "" || job.title.length < 1) {job.title = "";}

      //Delete entire location from title
      if(job.title.indexOf(job.location)>-1){job.title = job.title.replace(job.location,"");}
             

      //Delete the current city from title                              
      if(job.location.indexOf(",")>-1){
          var city  = job.location.split(",").shift().trim();
          job.title = job.title.replace(city,"");
      }
      
      //Delete the current country from title                              
      if(job.location.indexOf(",")>-1){
          var country = job.location.split(",")[1].trim();
          job.title   = job.title.replace(country,"");
      }

      /*CÓDIGO PARA PONER LA PRIMERA LETRA DE LOS TÍTULOS EN MAYÚSCULA SIN DEJAR LAS OTRAS EN MINÚSCULA*/

     job.title     = job.title.trim();
     var firstChar = job.title.charAt(0);
     job.title = firstChar.toUpperCase() + job.title.slice(1).trim();

     job.title = job.title.trim();
     var firstCharNumber = job.title.charAt(0);
     if(firstCharNumber.search(/[0-9]/g)>-1){job.title = job.title.slice(1).trim();}

         
 

      //split on last comma - title

          if(job.title.indexOf(",")>-1){

            let deleteFromJobTitle = job.title.split(",").pop().trim();
            if(deleteFromJobTitle.search(/[0-9]/g,"")>-1){
              job.title = job.title.replace(deleteFromJobTitle,"").trim();
                let lastChar = job.title.substr(job.title.length -1);
                  if(lastChar === ","){job.title = job.title.slice(0,-1);}
                  }
            }
          


      //split on city 
      if(job.location.indexOf(",")>-1){

        let city = job.location.split(",")[0].trim();
          job.title = job.title.split(city).shift().trim();
            let lastChar = job.title.substr(job.title.length -1);
              if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                job.title = job.title.slice(0,-1).trim();}

      }          

          //split on city 2
  if(job.location.indexOf(",")>-1){
     let city = job.location.split(",")[0].trim();
          var preClean = job.title.split(city).shift().trim();
           if(preClean.length > 10){
               job.title = job.title.split(city).shift().trim();
                  let lastChar = job.title.substr(job.title.length -1);
                    if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                      job.title = job.title.slice(0,-1);}
                    }else{
              job.title = job.title.replace(city,"").trim();
                      }

        }   

// split on city 3

      if(job.location.indexOf(",")>-1){
         let city = job.location.split(",")[0].trim();

              city = city.trim().toLowerCase();                            
              city = city.charAt(0).toUpperCase() + city.slice(1);  


                  var preClean = job.title.split(city).shift().trim();
                   if(preClean.length > 10){
                       job.title = job.title.split(city).shift().trim();
                          let lastChar = job.title.substr(job.title.length -1);
                            if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                              job.title = job.title.slice(0,-1);}
                            }else{
                      job.title = job.title.replace(city,"").trim();
                      }

        } 


    // ELIMINA LOS NÚMEROS DE REFERENCIA A LA IZQUIERDA DEL PRIMER ESPACIO

        var numbers = elem.parentElement.querySelector("td.coljobtitle").textContent.split("-").shift().trim(); 
        if(numbers.length <9 && numbers.search(/[0-9]/)>-1){

            job.title = job.title.replace(numbers,"").trim();

        }


      var nunmbers = .split("-").pop().trim(); 
        if(nunmbers.length <9 && nunmbers.search(/[0-9]/)>-1){

            job.title = job.title.replace(nunmbers,"").trim();

        }

  // split on last comma - si el segmento contiene tal palabra
      if(job.title.indexOf(",")>-1){
     
       let splitOnLastComma = job.title.split(",").pop();
          if(splitOnLastComma.toLowerCase().indexOf("sign")>-1){
            job.title = job.title.replace(splitOnLastComma,"").trim();

              let lastChar = job.title.substr(job.title.length -1);
              if(lastChar === "-" || lastChar === ","){job.title = job.title.slice(0,-1);}
           }
      }


      // split on last hyphen - title
      if(job.title.indexOf("-")>-1){
        let splitOnLastHyphen = job.title.split("-").pop();
           if(splitOnLastHyphen.toLowerCase().indexOf("sign")>-1){

           job.title = job.title.replace(splitOnLastHyphen,"").trim();

              let lastChar = job.title.substr(job.title.length -1);
              if(lastChar === "-" || lastChar === ","){job.title = job.title.slice(0,-1);}
       }
     }


   // Split on first hyphen
     if(job.location.indexOf(" ")>-1){

      let splitOnFirstHyphen = job.location.split(" ").shift().trim();
      if(splitOnFirstHyphen.search("")>-1){

        job.location = job.location.replace(splitOnFirstHyphen,"").trim();

         //  let firstCharTitle = job.location.charAt(0);
         //   if(firstCharTitle === "-"){job.location = job.location.slice(1).trim();}
      }

     }


     if(job.title.indexOf("-")>-1){

      let splitOnLastHyphen = job.title.split("-").pop();
      if(splitOnLastHyphen.search(//gi)>-1){

          job.title = job.title.replace(splitOnLastHyphen,"").trim();
              let lastChar = job.title.substr(job.title.length -1);
              if(lastChar === "-" || lastChar === ","){job.title = job.title.slice(0,-1);}


      }


     }


      //split on last hyphen if contains city 
      if(job.location.indexOf(",")>-1){

        let city = job.location.split(",")[0].trim();
        var splitOnLastHyphen = job.title.split("-").pop().trim();
        
        if(splitOnLastHyphen.indexOf(city)>-1){
        
          job.title = job.title.replace(splitOnLastHyphen,"");
        
        }
    
            let lastChar = job.title.substr(job.title.length -1);
              if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                job.title = job.title.slice(0,-1);}

      }  

          if(job.title.indexOf("(H/F)")>-1){
          job.title = job.title.split("(H/F)").shift() + " (H/F)";
          }
          if(job.title.indexOf("(F/H)")>-1){
          job.title = job.title.split("(F/H)").shift() + " (F/H)";
          }
          if(job.title.indexOf("F/H")>-1 && job.title.indexOf("(")==-1){
          job.title = job.title.split("F/H").shift() + " F/H";
          }
          if(job.title.indexOf("H/F")>-1 && job.title.indexOf("(")==-1){
          job.title = job.title.split("H/F").shift() + " H/F";
          }
      


      // Before: Consultant patrimonial gestion privée - Aix en Provence H/F
      // After: Consultant patrimonial gestion privée - H/F
      if(job.title.indexOf("-")>-1 && job.title.indexOf("H/F")>-1){
        
        var a = job.title.indexOf(" - ");
        var b = job.title.indexOf("H/F");
        var x = job.title.slice(a,b);
        job.title = job.title.replace(x," - ").trim();
      }

       if(job.html.indexOf("-")>-1 && job.html.indexOf("")>-1){
        
        var a = job.html.indexOf("");
        var b = job.html.indexOf("");
        var x = job.html.slice(a,b);
        job.html = job.html.replace(x,"").trim();
      }



      /*
        // En caso de que no exista un selector definido
        <br>
        Experience: 1 Year  
        <br>
        Salary: 50000 $ 
        

      */
      // Se verifica que existan los elementos;
      if(job.html.indexOf("Experience:")>-1 && job.html.indexOf("Salary:")>-1){
        
        var a = job.html.indexOf("Experience:");
        var b = job.html.indexOf("Salary:");
        var x = job.html.slice(a,b);

        job.experienced_required = x; 
      }

 


/////////////////////
//  #2 LOCATION   //----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////

    job.location = job.location.trim().replace(/^\;/,"").trim();

    job.location = job.location.trim();
    let lastChar = job.location.substr(job.location.length -1);
    if(lastChar === "-" || lastChar === "," || lastChar === "(" ){job.location = job.location.slice(0,-1).trim();}

    //Delete first hyphen "-" from location.  
    job.location  = job.location.trim();
    var firstCharLoc = job.location.charAt(0);
    if(firstCharLoc === "-"){job.location = job.location.slice(1).trim();}

    //Delete last hyphen "-" from location. 
    job.location    = job.location.trim();
    var lastCharLoc = job.location.substr(job.location.length -1);
     if(lastCharLoc === "-"){job.location = job.location.slice(0,-1).trim();}

    job.location = job.location.replace("","").trim();
    job.location = job.location.replace("","").trim();

    //if(job.location.indexOf("")>-1){job.location = "";}
    //if(job.location.indexOf("")>-1){job.location = "";}
    //if(job.location.indexOf("")>-1){job.location = "";}
    //if(job.location.indexOf("")>-1){job.location = "";}
    //if(job.location.indexOf("")>-1){job.location = "";}
 
    job.location = job.location.replace(/[0-9]/g, "");
    job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();

    
    job.location = job.location.split("-").reverse().join(", ");                 

      
    job.location = job.location.trim().toLowerCase();                             
    job.location = job.location.charAt(0).toUpperCase() + job.location.slice(1);


    if(typeof job.location == 'undefined' || job.location  === "" || job.location.length < 1) {job.location= "";}


        //split on first comma "," : To remove "streets/postal codes" from location. 
    if(job.location.indexOf(",")>-1){           
       
       let numberOfCommas = job.location.match(/\,/g).length;  
       if(numberOfCommas > 2){ 

          let splitOnFirstCommaLoc = job.location.split(",").shift().trim(); 
              job.location = job.location.replace(splitOnFirstCommaLoc,"").trim();
                          
              let firstCharLoc = job.location.charAt(0);
              if(firstCharLoc === ","){job.location = job.location.slice(1).trim();}
                             
                             }

    }

    //split on last hyphen "-"
    if(job.location.indexOf("-")>-1){

          let deleteFromJobLocation = job.location.split("-").pop().trim();
              job.location = job.location.replace(deleteFromJobLocation,"").trim();

          let lastCharLoc = job.location.substr(job.location.length -1);
           if(lastCharLoc === "-"){job.location = job.location.slice(0,-1);}

    } 

    //split on first comma if contains 
      if(job.location.indexOf(",")>-1){
    
       let splitOnFirstComma = job.location.split(",").shift();
          if(splitOnFirstComma.toLowerCase().indexOf("travel")>-1){
            job.location = job.location.replace(splitOnFirstComma,"").trim();

              let firstCharLoc = job.location.charAt(0);
              if(firstCharLoc === "-"){job.location = job.location.slice(1).trim();}
           }
      }


        // split on first Comma 

          if(job.location.indexOf(",")>-1){
        
          let splitOnFirstCommaLoc = job.location.split(",").shift().trim(); 
              job.location = job.location.replace(splitOnFirstCommaLoc,"").trim();
                          
              let firstCharLoc = job.location.charAt(0);
              if(firstCharLoc === ","){job.location = job.location.slice(1).trim();}
        
        }

             // split on first Comma without condition

          if(job.location.indexOf(",")>-1){
        
          let splitOnFirstCommaLoc = job.location.split(",").shift().trim(); 

          if(splitOnFirstCommaLoc.search(/US-/)>-1){
              job.location = job.location.replace(splitOnFirstCommaLoc,"").trim();
                          
              let firstCharLoc = job.location.charAt(0);
              if(firstCharLoc === ","){job.location = job.location.slice(1).trim();}
           }
        }



      if(job.title.indexOf(",")>-1){
     
       let splitOnLastComma = job.title.split(",").pop();
          if(splitOnLastComma.toLowerCase().indexOf(job.location)>-1){
            job.title = job.title.replace(splitOnLastComma,"").trim();

              let lastChar = job.title.substr(job.title.length -1);
              if(lastChar === "-" || lastChar === ","){job.title = job.title.slice(0,-1);}
           }
      }


     if(job.location.indexOf(" - ")>-1){

      let splitOnFirstHyphen = job.location.split("-").shift().trim();
      //if(splitOnFirstHyphen.search("")>-1){

        job.location = job.location.replace(splitOnFirstHyphen,"").trim();

           let firstCharTitle = job.location.charAt(0);
            if(firstCharTitle === "-"){job.location = job.location.slice(1).trim();}
      //}

     }

    

        //Location array "city, state"

          var city  = elem.querySelector(".direct_joblocation span").textContent;
          var state = elem.querySelector(".direct_joblocation meta").getAttribute("content");
          
          var loc = "";
          var array_loc = Array();

          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          
          if(array_loc.length) loc = array_loc.join(", ");

        job.location = loc;


          //Location array "city, country"

          var city    = elem.querySelector("selectorDeLaCiudad").textContent;
          var country = elem.querySelector("selectorDelPaís").textContent;
          
          var loc = "";
          var array_loc = Array();

          if(city) array_loc.push(city);
          if(country) array_loc.push(country);
          
          if(array_loc.length) loc = array_loc.join(", ");

        job.location = loc;

          //Location array "city, state, country"

          var city    = job.location.split("")[0].trim();
          var state   = job.location.split("")[1].trim();
          var country = job.location.split("")[2].trim();
         
          var loc = "";
          var array_loc = Array();

          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          if(country) array_loc.push(country);
       

          if(array_loc.length) loc = array_loc.join(", ");

        job.location = loc;

        ///////////////

                  if(jobx.location.indexOf(",")>-1){
           
         //Location array "city, state, country"
            
          var commas = jobx.location.match(/\,/g).length;
            
          if(commas >1){  
              var cut = ",";  

              var city    = jobx.location.split(cut)[commas - 2].trim();
              var state   = jobx.location.split(cut)[commas - 1].trim();
              var country = jobx.location.split(cut).pop().trim();

              var loc = "";
              var array_loc = Array();

              if(city) array_loc.push(city);
              if(state) array_loc.push(state);
              if(country) array_loc.push(country);


              if(array_loc.length) loc = array_loc.join(", ");

            jobx.location = loc;
            }
          
          }

///////////////////
//  #3 JOBTYPE  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
/////////////////

    job.source_jobtype = job.source_jobtype.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();

    // variable "html_2" to be used within jobdata code; the variable is declare at the beggining.

    if(html_2.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
    if(html_2.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
    if(html_2.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
    if(html_2.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}


    if(type.indexOf("CDI")>-1){job.source_jobtype = "CDI";}
    if(type.indexOf("CDD")>-1){job.source_jobtype = "CDD";}
    if(type.toLowerCase().indexOf("stage")>-1){job.source_jobtype =  "Stage";}
    if(type.toLowerCase().indexOf("alternance")>-1){job.source_jobtype =  "Alternance";}

    job.title = job.title.replace(/part time/i,"").trim();
    job.title = job.title.replace(/part-time/i,"").trim();
    job.title = job.title.replace(/full time/i,"").trim();
    job.title = job.title.replace(/full-time/i,"").trim();
    job.title = job.title.replace("()","").trim();

    job.title = job.title.replace(/stage/i,"").trim();
    job.title = job.title.replace(/alternance/i,"").trim();


        job.title = job.title.replace("(CDI)","").trim();
        job.title = job.title.replace("(CDD)","").trim();
        job.title = job.title.replace(/CDI/i,"").trim();
        job.title = job.title.replace(/CDD/i,"").trim();

    //----------Job-Type-Array()-------------------------------------------------------//

        var type   = $("li:contains(Contrat)").text().split(":").pop().trim();
        var temps  = $("li:contains(Temps de travail)").text().split(":").pop().trim();
         
        var jobType = "";
        var array_jobType = Array();

        if(type) array_jobType.push(type);
        if(temps) array_jobType.push(temps);
        if(array_jobType.length) jobType = array_jobType.join(" - ");

    job.source_jobtype = jobType;

    //---------------------------------------------------------------------------------//

////////////////
// #4 SALARY //------------------------------------------------------------------------------------------------------------------------------------------------------------------
//////////////

    if(job.source_salary.indexOf("")>-1){job.source_salary = "";} 

    job.source_salary = job.source_salary.replace(//gi,"");
   
    job.source_salary = job.source_salary.replace("","");
    
    job.source_salary = job.source_salary.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();

    if(job.source_salary.indexOf("")>-1){job.source_salary = job.source_salary.split("")[0];} 

   
    if(typeof job.source_salary == 'undefined' || job.source_salary  === "" || job.source_salary.length < 1) {job.source_salary= "";}


/////////////////
// #5 E-MAIL  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////

 
    //To extract the string that contains email in job descriptions. 
    /*
    if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
    */

//////////////
// #6 URL  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
////////////

window.location.protocol + "//" + window.location.hostname + window.location.pathname

var dom  = window.location.protocol + "//" + window.location.hostname;

var dom = window.location.origin;

var dom_ultipro = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "OpportunityDetail?opportunityId=9370aa57-dc3c-4bb3-9b1f-7f8224737a71";

     window.location.href       returns the href (URL) of the current page
     window.location.hostname   returns the domain name of the web host
     window.location.pathname   returns the path and filename of the current page
     window.location.protocol   returns the web protocol used (http: or https: ) 

(Tomado de https://www.w3schools.com/js/js_window_location.asp, NOV 28, 2019)

   
//////////////////////
// #7 VALIDACIONES //--------------------------------------------------------------------------------------------------------------------------------------------------------//
////////////////////


    if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
    jobs.push(job);
    }


    // To filter one title
    if(job.title.length > 0 && job.location.length > 0 && job.title.indexOf("") == -1 && job.url.length > 0){
    jobs.push(job);
    }

/////////////////
// #8 DATES   //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
///////////////
    
  if(full_html_text2.search(/Jan|Feb|Mar|Apr|May|Jun|Jul|Agu|Sept|Oct|Nov|Dec/) && full_html_text2.indexOf("20")>-1){
    
    full_html_text2 = full_html_text2.replace(/\>/g,"").trim();
    
    let a = full_html_text2.search(/Jan|Feb|Mar|Apr|May|Jun|Jul|Agu|Sept|Oct|Nov|Dec/);
    let b = full_html_text2.indexOf("20");
    let b_length = 4;
    
    let x = full_html_text2.slice(a,b + b_length);
    job.dateposted_raw = x.trim();
  }

    /////////////////////

     var timePosted = elem.querySelector("li.results-posted-at").innerText;
    
      if(timePosted.search(/hour/)>-1){
      
      
              var today   = new Date();
              var current_day   = today.getDate();
              var current_month = (today.getMonth()+1);
              var current_year  = today.getFullYear();

              job.dateposted_raw  = current_month +"/"+  current_day +"/"+ current_year;
      
      }
        
      // DatePostedRaw  

    
      if(timePosted.search(/hour|day|month/i)>-1){
        
           if(timePosted.search(/hour/)>-1){

                  let today   = new Date();
                  let current_day   = today.getDate();
                  let current_month = (today.getMonth()+1);
                  let current_year  = today.getFullYear();

                  job.dateposted_raw  = current_month +"/"+  current_day +"/"+ current_year;

           }
            if(timePosted.search(/day/)>-1){

              var days_ago = timePosted;
                  days_ago = days_ago.replace(/[a-z]/gi,"");
                  days_ago = Number(days_ago);
             }

           if(timePosted.search(/month/)>-1){

            var month_to_days = timePosted.replace(/[a-z]/gi,"");
                month_to_days = Number(month_to_days);
                month_to_days = month_to_days * 30;
               var days_ago = month_to_days;

          }
  

          var currentDate = new Date();

          var day = currentDate.getDate();
          day = day - days_ago;
          currentDate.setDate(day);

          var postedDate = currentDate; // postedDate == fecha actual - los días de publicados 

          var postedDay   = postedDate.getDate();
          var postedMonth = postedDate.getMonth() + 1;
          var postedYear  = postedDate.getFullYear();

          if(postedMonth < 10){postedMonth = "0" + postedMonth;} 
          if(postedDay < 10){postedDay = "0" + postedDay;} 

          job.dateposted_raw  =  postedMonth + "/" + postedDay + "/" + postedYear; // Formato de fecha para indexación. 

  
      }  
    
     /*----------DATE-POSTED-----------------------------*/
          
      var datum = elem.querySelector("").textContent.trim();
          datum = datum.trim();

      var cut = "";
          
      var day   =  datum.split(cut)[0];
      var month =  datum.split(cut)[1];
      var year  =  datum.split(cut)[2];
          
      job.dateposted_raw  = month +"/"+  day +"/"+ year;

      /*-------------------------------------------------*/
 

     //---------Current-date------------------------------*/
      var today   = new Date();
      var current_day   = today.getDate();
      var current_month = (today.getMonth()+1);
      var current_year  = today.getFullYear();
          
      var current_date  = current_month +"/"+  current_day +"/"+ current_year;
     //-----------------------------------------------------*/

      // Validación según cantidad de meses. 

      var date = elem.querySelector("date").textContent.trim();
      if(date.indexOf("months")>-1){
      var months = date.replace(/[a-z]/gi,"").trim();
      if(Number(months) >= 6){job.title = "";}
      }

      
      if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
      }


          // Meses en inglés

          if(month.toLowerCase().indexOf("jan")>-1){month = "1";}
          if(month.toLowerCase().indexOf("feb")>-1){month = "2";}
          if(month.toLowerCase().indexOf("mar")>-1){month = "3";}
          if(month.toLowerCase().indexOf("apr")>-1){month = "4";}
          if(month.toLowerCase().indexOf("may")>-1){month = "5";}
          if(month.toLowerCase().indexOf("jun")>-1){month = "6";}
          if(month.toLowerCase().indexOf("jul")>-1){month = "7";}
          if(month.toLowerCase().indexOf("aug")>-1){month = "8";}
          if(month.toLowerCase().indexOf("sep")>-1){month = "9";}
          if(month.toLowerCase().indexOf("oct")>-1){month = "10";}
          if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
          if(month.toLowerCase().indexOf("dec")>-1){month = "12";}

          // Meses en francés

          if(month.toLowerCase().indexOf("jan")>-1){month = "01";}
          if(month.toLowerCase().indexOf("fév")>-1){month = "02";}
          if(month.toLowerCase().indexOf("mar")>-1){month = "03";}
          if(month.toLowerCase().indexOf("avr")>-1){month = "04";}
          if(month.toLowerCase().indexOf("mai")>-1){month = "05";}
          if(month.toLowerCase().indexOf("juin")>-1){month = "06";}
          if(month.toLowerCase().indexOf("juil")>-1){month = "07";}
          if(month.toLowerCase().indexOf("août")>-1){month = "08";}
          if(month.toLowerCase().indexOf("sep")>-1){month = "09";}
          if(month.toLowerCase().indexOf("oct")>-1){month = "10";}
          if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
          if(month.toLowerCase().indexOf("déc")>-1){month = "12";}
     

          // Meses en nerlandés

          month = month.replace("januari","1");
          month = month.replace("februari","2");
          month = month.replace("maart","3");
          month = month.replace("april","4");
          month = month.replace("mei","5");
          month = month.replace("juni","6");
          month = month.replace("juli","7");
          month = month.replace("augustus","8");
          month = month.replace("september","9");
          month = month.replace("oktober","10");
          month = month.replace("november","11");
          month = month.replace("december","12");

          // Meses en alemán

          month = month.replace("Januar","1");
          month = month.replace("Februar","2");
          month = month.replace("März","3");
          month = month.replace("April","4");
          month = month.replace("Mai","5");
          month = month.replace("Juni","6");
          month = month.replace("Juli","7");
          month = month.replace("August","8");
          month = month.replace("September","9");
          month = month.replace("Oktober","10");
          month = month.replace("November","11");
          month = month.replace("Dezember","12");


          month = month.replace("januar","1");
          month = month.replace("februar","2");
          month = month.replace("märz","3");
          month = month.replace("april","4");
          month = month.replace("mai","5");
          month = month.replace("juni","6");
          month = month.replace("juli","7");
          month = month.replace("august","8");
          month = month.replace("september","9");
          month = month.replace("oktober","10");
          month = month.replace("november","11");
          month = month.replace("dezember","12");


          //La más completa en alemán
          if(month.toLowerCase().indexOf("jan")>-1){month = "1";}
          if(month.toLowerCase().indexOf("feb")>-1){month = "2";}
          if(month.toLowerCase().indexOf("mar")>-1 || if(month.toLowerCase().indexOf("mär")>-1){month = "3";}
          if(month.toLowerCase().indexOf("apr")>-1){month = "4";}
          if(month.toLowerCase().indexOf("mai")>-1){month = "5";}
          if(month.toLowerCase().indexOf("jun")>-1){month = "6";}
          if(month.toLowerCase().indexOf("jul")>-1){month = "7";}
          if(month.toLowerCase().indexOf("aug")>-1){month = "8";}
          if(month.toLowerCase().indexOf("sep")>-1){month = "9";}
          if(month.toLowerCase().indexOf("okt")>-1){month = "10";}
          if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
          if(month.toLowerCase().indexOf("dez")>-1){month = "12";}


          // Meses en PORTUGUÉS

           month = month.replace("Janeiro","1");
           month = month.replace("Fevereiro","2");
           month = month.replace("De março","3"); month = month.replace("março","3");
           month = month.replace("Abril","4");    month = month.replace("Março","3");
           month = month.replace("Maio","5");
           month = month.replace("Junho","6");
           month = month.replace("Julho","7");
           month = month.replace("Agosto","8");
           month = month.replace("Setembro","9");
           month = month.replace("Outubro","10");
           month = month.replace("Novembro","11");
           month = month.replace("Dezembro","12");

           // PHP dates 


           $jobdate = trim((String) $j->date);
$valores = explode(' ', $jobdate);  //SE HACE EXPLODE POR ESPACIO
// month/day/year


$month = $valores[2];

if(strpos($month, "Jan")!== false){$month = "01";}
if(strpos($month, "Feb")!== false){$month = "02";}
if(strpos($month, "Mar")!== false){$month = "03";}
if(strpos($month, "Apr")!== false){$month = "04";}
if(strpos($month, "May")!== false){$month = "05";}
if(strpos($month, "Jun")!== false){$month = "06";}
if(strpos($month, "Jul")!== false){$month = "07";}
if(strpos($month, "Aug")!== false){$month = "08";}
if(strpos($month, "Sep")!== false){$month = "09";}
if(strpos($month, "Oct")!== false){$month = "10";}
if(strpos($month, "Nov")!== false){$month = "11";}
if(strpos($month, "Dec")!== false){$month = "12";}

$jobdate = $month."/".$valores[1]."/".$valores[3];


$job['dateposted_raw'] = $job['title']; //$jobdate;

print_r($job['dateposted_raw']);

/////////////////////
// #8 Descriptions///
////////////////////

 // Job Description
                  
                   var full_html  = json[i].data.description; // Description taken from JSON 
                   var div        = document.createElement("div");
                    div.innerHTML = full_html

                    var remove_selectors = [

                                    "a","style","script","u",
                                    "input",
                                    "div.alert",
                                    "img", "button",
                                     "div.alert"

                                           ]; 


                    var desc = div;
                    // remove something from the jobdatata
                    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                    if(div.querySelector(remove_selector)) div.querySelector(remove_selector).remove();});


                       for (const a of desc.querySelectorAll('button')) {
                        if (a){ 
                          a.remove(); 
                        } 
                      }

                      job.html = desc.innerHTML.trim(); 


                      //job.html = removeTextBefore(job.html, "POSITION SUMMARY", false);
                      //job.html = removeTextBefore(job.html, "Over de vacature", false);
                      //job.html = removeTextBefore(job.html, "", false);


                    job.html = job.html.split("Apply").shift().trim();


                    job.html    = cleanHTML(job.html);
                    job.jobdesc = job.html;



/////////////////
// #9 MAPPING //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
///////////////

        // Departments of france + country

        job.location = job.location.replace(/\(/g, ', ');
        job.location = job.location.replace(/ , /g,", ");
        job.location = job.location.replace(/\)/g, '');


       job.location = job.location.replace("971","Guadeloupe");
       job.location = job.location.replace("972","Martinique");
       job.location = job.location.replace("973","Guyane");
       job.location = job.location.replace("974","La Réunion");

       job.location = job.location.replace("01","Ain, FR");
       job.location = job.location.replace("02","Aisne, FR");
       job.location = job.location.replace("03","Allier, FR");
       job.location = job.location.replace("04","Alpes-de-Haute-Provence, FR");
       job.location = job.location.replace("05","Hautes-Alpes, FR");
       job.location = job.location.replace("06","Alpes-Maritimes, FR");
       job.location = job.location.replace("07","Ardèche, FR");
       job.location = job.location.replace("08","Ardennes, FR");
       job.location = job.location.replace("09","Ariège, FR");

       job.location = job.location.replace("10","Aube, FR");
       job.location = job.location.replace("11","Aude, FR");
       job.location = job.location.replace("12","Aveyron, FR");
       job.location = job.location.replace("13","Bouches-du-Rhône, FR");
       job.location = job.location.replace("14","Calvados, FR");
       job.location = job.location.replace("15","Cantal, FR");
       job.location = job.location.replace("16","Charente, FR"); 
       job.location = job.location.replace("17","Charente-Maritime, FR"); 
       job.location = job.location.replace("18","Cher, FR");
       job.location = job.location.replace("19","Corrèze, FR");

       job.location = job.location.replace("21","Côte-d’Or, FR"); 
       job.location = job.location.replace("22","Côtes-d’Armor, FR"); 
       job.location = job.location.replace("23","Creuse, FR");
       job.location = job.location.replace("24","Dordogne, FR");
       job.location = job.location.replace("25","Doubs, FR");
       job.location = job.location.replace("26","Drôme, FR"); 
       job.location = job.location.replace("27","Eure, FR"); 
       job.location = job.location.replace("28","Eure-et-Loir, FR"); 
       job.location = job.location.replace("29","Finistère, FR"); 
      
       job.location = job.location.replace("30","Gard, FR");
       job.location = job.location.replace("31","Haute-Garonne, FR");  
       job.location = job.location.replace("32","Gers, FR");
       job.location = job.location.replace("33","Gironde, FR");
       job.location = job.location.replace("34","Hérault, FR"); 
       job.location = job.location.replace("35","Ille-et-Vilaine, FR");
       job.location = job.location.replace("36","Indre, FR");
       job.location = job.location.replace("37","Indre-et-Loire, FR"); 
       job.location = job.location.replace("38","Isère, FR");
       job.location = job.location.replace("39","Jura, FR"); 
      
       job.location = job.location.replace("40","Landes, FR");
       job.location = job.location.replace("41","Loir-et-Cher, FR");
       job.location = job.location.replace("42","Loire, FR");
       job.location = job.location.replace("43","Haute-Loire, FR");
       job.location = job.location.replace("44","Loire-Atlantique, FR");
       job.location = job.location.replace("45","Loiret, FR");
       job.location = job.location.replace("46","Lot, FR");
       job.location = job.location.replace("47","Lot-et-Garonne, FR");
       job.location = job.location.replace("48","Lozère, FR");
       job.location = job.location.replace("49","Maine-et-Loire, FR");
      
       job.location = job.location.replace("50","Manche, FR");
       job.location = job.location.replace("51","Marne, FR");
       job.location = job.location.replace("52","Haute-Marne, FR");
       job.location = job.location.replace("53","Mayenne, FR");
       job.location = job.location.replace("54","Meurthe-et-Moselle, FR");
       job.location = job.location.replace("55","Meuse, FR");
       job.location = job.location.replace("56","Morbihan, FR");
       job.location = job.location.replace("57","Moselle, FR");
       job.location = job.location.replace("58","Nièvre, FR");
       job.location = job.location.replace("59","Nord, FR");

       job.location = job.location.replace("60","Oise, FR");
       job.location = job.location.replace("61","Orne, FR");
       job.location = job.location.replace("62","Pas-de-Calais, FR");
       job.location = job.location.replace("63","Puy-de-Dôme, FR");
       job.location = job.location.replace("64","Pyrénées-Atlantiques, FR");
       job.location = job.location.replace("65","Hautes-Pyrénées, FR");
       job.location = job.location.replace("66","Pyrénées-Orientales, FR");
       job.location = job.location.replace("67","Bas-Rhin, FR");
       job.location = job.location.replace("68","Haut-Rhin, FR");
       job.location = job.location.replace("69","Rhône, FR");

       job.location = job.location.replace("70","Haute-Saône, FR");
       job.location = job.location.replace("71","Saône-et-Loire, FR");
       job.location = job.location.replace("72","Sarthe, FR");
       job.location = job.location.replace("73","Savoie, FR");
       job.location = job.location.replace("74","Haute-Savoie, FR");
       job.location = job.location.replace("75","Paris, FR");
       job.location = job.location.replace("76","Seine-Maritime, FR");
       job.location = job.location.replace("77","Seine-et-Marne, FR");
       job.location = job.location.replace("78","Yvelines, FR");
       job.location = job.location.replace("79","Deux-Sèvres, FR");

       job.location = job.location.replace("80","Somme, FR");
       job.location = job.location.replace("81","Tarn, FR");
       job.location = job.location.replace("82","Tarn-et-Garonne, FR");
       job.location = job.location.replace("83","Var, FR");
       job.location = job.location.replace("84","Vaucluse, FR");
       job.location = job.location.replace("85","Vendée, FR");
       job.location = job.location.replace("86","Vienne, FR");
       job.location = job.location.replace("87","Haute-Vienne, FR");
       job.location = job.location.replace("88","Vosges, FR");
       job.location = job.location.replace("89","Yonne, FR");

       job.location = job.location.replace("90","Territoire de Belfort, FR");
       job.location = job.location.replace("91","Essonne, FR");
       job.location = job.location.replace("92","Hauts-de-Seine, FR");
       job.location = job.location.replace("93","Seine-Saint-Denis, FR");
       job.location = job.location.replace("94","Val-de-Marne, FR");
       job.location = job.location.replace("95","Val-d’Oise, FR");


       // Departments of france + country

        state = state.replace(/\(/g, ', ');
        state = state.replace(/ , /g,", ");
        state = state.replace(/\)/g, '');


       state = state.replace("971","Guadeloupe");
       state = state.replace("972","Martinique");
       state = state.replace("973","Guyane");
       state = state.replace("974","La Réunion");

       state = state.replace("01","Ain, FR");
       state = state.replace("02","Aisne, FR");
       state = state.replace("03","Allier, FR");
       state = state.replace("04","Alpes-de-Haute-Provence, FR");
       state = state.replace("05","Hautes-Alpes, FR");
       state = state.replace("06","Alpes-Maritimes, FR");
       state = state.replace("07","Ardèche, FR");
       state = state.replace("08","Ardennes, FR");
       state = state.replace("09","Ariège, FR");

       state = state.replace("10","Aube, FR");
       state = state.replace("11","Aude, FR");
       state = state.replace("12","Aveyron, FR");
       state = state.replace("13","Bouches-du-Rhône, FR");
       state = state.replace("14","Calvados, FR");
       state = state.replace("15","Cantal, FR");
       state = state.replace("16","Charente, FR"); 
       state = state.replace("17","Charente-Maritime, FR"); 
       state = state.replace("18","Cher, FR");
       state = state.replace("19","Corrèze, FR");

       state = state.replace("21","Côte-d’Or, FR"); 
       state = state.replace("22","Côtes-d’Armor, FR"); 
       state = state.replace("23","Creuse, FR");
       state = state.replace("24","Dordogne, FR");
       state = state.replace("25","Doubs, FR");
       state = state.replace("26","Drôme, FR"); 
       state = state.replace("27","Eure, FR"); 
       state = state.replace("28","Eure-et-Loir, FR"); 
       state = job.state.replace("29","Finistère, FR"); 
      
       state = state.replace("30","Gard, FR");
       state = state.replace("31","Haute-Garonne, FR");  
       state = state.replace("32","Gers, FR");
       state = state.replace("33","Gironde, FR");
       state = state.replace("34","Hérault, FR"); 
       state = state.replace("35","Ille-et-Vilaine, FR");
       state = state.replace("36","Indre, FR");
       state = state.replace("37","Indre-et-Loire, FR"); 
       state = state.replace("38","Isère, FR");
       state = state.replace("39","Jura, FR"); 
      
       state = state.replace("40","Landes, FR");
       state = state.replace("41","Loir-et-Cher, FR");
       state = state.replace("42","Loire, FR");
       state = state.replace("43","Haute-Loire, FR");
       state = state.replace("44","Loire-Atlantique, FR");
       state = state.replace("45","Loiret, FR");
       state = state.replace("46","Lot, FR");
       state = state.replace("47","Lot-et-Garonne, FR");
       state = state.replace("48","Lozère, FR");
       state = state.replace("49","Maine-et-Loire, FR");
      
       state = state.replace("50","Manche, FR");
       state = state.replace("51","Marne, FR");
       state = state.replace("52","Haute-Marne, FR");
       state = state.replace("53","Mayenne, FR");
       state = state.replace("54","Meurthe-et-Moselle, FR");
       state = state.replace("55","Meuse, FR");
       state = state.replace("56","Morbihan, FR");
       state = state.replace("57","Moselle, FR");
       state = state.replace("58","Nièvre, FR");
       state = state.replace("59","Nord, FR");

       state = state.replace("60","Oise, FR");
       state = state.replace("61","Orne, FR");
       state = state.replace("62","Pas-de-Calais, FR");
       state = state.replace("63","Puy-de-Dôme, FR");
       state = state.replace("64","Pyrénées-Atlantiques, FR");
       state = state.replace("65","Hautes-Pyrénées, FR");
       state = state.replace("66","Pyrénées-Orientales, FR");
       state = state.replace("67","Bas-Rhin, FR");
       state = state.replace("68","Haut-Rhin, FR");
       state = state.replace("69","Rhône, FR");

       state = state.replace("70","Haute-Saône, FR");
       state = state.replace("71","Saône-et-Loire, FR");
       state = state.replace("72","Sarthe, FR");
       state = state.replace("73","Savoie, FR");
       state = state.replace("74","Haute-Savoie, FR");
       state = state.replace("75","Paris, FR");
       state = state.replace("76","Seine-Maritime, FR");
       state = state.replace("77","Seine-et-Marne, FR");
       state = state.replace("78","Yvelines, FR");
       state = state.replace("79","Deux-Sèvres, FR");

       state = state.replace("80","Somme, FR");
       state = state.replace("81","Tarn, FR");
       state = state.replace("82","Tarn-et-Garonne, FR");
       state = state.replace("83","Var, FR");
       state = state.replace("84","Vaucluse, FR");
       state = state.replace("85","Vendée, FR");
       state = state.replace("86","Vienne, FR");
       state = state.replace("87","Haute-Vienne, FR");
       state = state.replace("88","Vosges, FR");
       state = state.replace("89","Yonne, FR");

       state = state.replace("90","Territoire de Belfort, FR");
       state = state.replace("91","Essonne, FR");
       state = state.replace("92","Hauts-de-Seine, FR");
       state = state.replace("93","Seine-Saint-Denis, FR");
       state = state.replace("94","Val-de-Marne, FR");
       state = state.replace("95","Val-d’Oise, FR");


       //-------------------------------------CANADA----------------------------------------------------------------------------------          

       if(job.location.indexOf("Kamloops")>-1){job.location = "Kamloops, Canada";}
       if(job.location.indexOf("Edmonton")>-1){job.location = "Edmonton, AB, Canada";}
       if(job.location.indexOf("Jansen")>-1){job.location = "Jansen, Canada";}
       if(job.location.indexOf("Prince George")>-1){job.location = "Prince George, Canada";}
       if(job.location.indexOf("Calgary")>-1){job.location = "Calgary, AB, Canada";}
       if(job.location.indexOf("Ft. McMurray")>-1){job.location = "Ft. McMurray, AB, Canada";}
       if(job.location.indexOf("Prince Rupert")>-1){job.location = "Prince Rupert, BC, Canada";}
       if(job.location.indexOf("Hope Bay, Canada")>-1){job.location = "Hope Bay, Ontario, Canada";}

 //-------------------------------------AUSTRALIA----------------------------------------------------------------------------------          

        if(job.location.indexOf("QLD")> 1) { job.location =  job.location.replace("QLD","Queensland"); }
        if(job.location.indexOf("NSW")> 1) { job.location =  job.location.replace("NSW","New South Wales"); }
        if(job.location.indexOf("VIC")> 1) { job.location =  job.location.replace("VIC","Victoria");}
        if(job.location.indexOf("TAS")> 1) { job.location =  job.location.replace("TAS","Tasmania");}
        if(job.location.indexOf("SA") > 1) { job.location =  job.location.replace("SA","South Australia");}
        if(job.location.indexOf("WA") > 1) { job.location =  job.location.replace("WA","Western Australia ");}


//-----------------ESTADOS-UNIDOS----CODIGO ESTADOS 2 LETRAS-----------------------------------------------------------------------

       
        // US STATES - TWO CODE LETTERS TO: "state"
        if(job.location.indexOf("AL") > -1) { job.location =  job.location.replace("AL","Alabama, US"); };
        if(job.location.indexOf("AK") > -1) { job.location =  job.location.replace("AK","Alaska, US"); };
        if(job.location.indexOf("AZ") > -1) { job.location =  job.location.replace("AZ","Arizona, US"); };
        if(job.location.indexOf("AR") > -1) { job.location =  job.location.replace("AR","Arkansas, US"); };
        if(job.location.indexOf("CA") > -1) { job.location =  job.location.replace("CA","California, US"); };
        if(job.location.indexOf("CO") > -1) { job.location =  job.location.replace("CO","Colorado, US"); };
        if(job.location.indexOf("CT") > -1) { job.location =  job.location.replace("CT","Connecticut, US");};
        if(job.location.indexOf("DE") > -1) { job.location =  job.location.replace("DE","Delaware, US"); };
        if(job.location.indexOf("FL") > -1) { job.location =  job.location.replace("FL","Florida, US"); };
        if(job.location.indexOf("GA") > -1) { job.location =  job.location.replace("GA","Georgia, US"); };
        if(job.location.indexOf("HI") > -1) { job.location =  job.location.replace("HI","Hawaii, US"); };
        if(job.location.indexOf("ID") > -1) { job.location =  job.location.replace("ID","Idaho, US"); };
        if(job.location.indexOf("IL") > -1) { job.location =  job.location.replace("IL","llinois, US"); };
        if(job.location.indexOf("IN") > -1) { job.location =  job.location.replace("IN","Indiana, US"); };
        if(job.location.indexOf("IA") > -1) { job.location =  job.location.replace("IA","Iowa, US"); };
        if(job.location.indexOf("KS") > -1) { job.location =  job.location.replace("KS","Kansas, US"); };
        if(job.location.indexOf("KY") > -1) { job.location =  job.location.replace("KY","Kentucky, US"); };
        if(job.location.indexOf("LA") > -1) { job.location =  job.location.replace("LA","Louisiana, US"); };
        if(job.location.indexOf("ME") > -1) { job.location =  job.location.replace("ME","Maine, US"); };
        if(job.location.indexOf("MD") > -1) { job.location =  job.location.replace("MD","Maryland, US"); };
        if(job.location.indexOf("MA") > -1) { job.location =  job.location.replace("MA","Massachusetts, US"); };
        if(job.location.indexOf("MI") > -1) { job.location =  job.location.replace("MI","Míchigan, US");}; 
        if(job.location.indexOf("MN") > -1) { job.location =  job.location.replace("MN","Minnesota, US"); };
        if(job.location.indexOf("MS") > -1) { job.location =  job.location.replace("MS","Mississippi, US"); };
        if(job.location.indexOf("MO") > -1) { job.location =  job.location.replace("MO","Missouri, US"); };
        if(job.location.indexOf("MT") > -1) { job.location =  job.location.replace("MT","Montana, US"); };
        if(job.location.indexOf("NE") > -1) { job.location =  job.location.replace("NE","Nebraska, US"); };
        if(job.location.indexOf("NV") > -1) { job.location =  job.location.replace("NV","Nevada, US"); }
        if(job.location.indexOf("NH") > -1) { job.location =  job.location.replace("NH","New Hampshire, US"); };
        if(job.location.indexOf("NJ") > -1) { job.location =  job.location.replace("NJ","New Jersey, US"); };
        if(job.location.indexOf("NM") > -1) { job.location =  job.location.replace("NM","New Mexico, US"); };
        if(job.location.indexOf("NY") > -1) { job.location =  job.location.replace("NY","New York, US"); };
        if(job.location.indexOf("NC") > -1) { job.location =  job.location.replace("NC","North Carolina, US"); };
        if(job.location.indexOf("ND") > -1) { job.location =  job.location.replace("ND","North Dakota, US"); };
        if(job.location.indexOf("OH") > -1) { job.location =  job.location.replace("OH","Ohio, US");};
        if(job.location.indexOf("OK") > -1) { job.location =  job.location.replace("OK","Oklahoma, US");};
        if(job.location.indexOf("OR") > -1) { job.location =  job.location.replace("OR","Oregon, US"); };
        if(job.location.indexOf("PA") > -1) { job.location =  job.location.replace("PA","Pennsylvania, US"); };
        if(job.location.indexOf("RI") > -1) { job.location =  job.location.replace("RI","Rhode Island, US"); };
        if(job.location.indexOf("SC") > -1) { job.location =  job.location.replace("SC","South Carolina, US"); };
        if(job.location.indexOf("SD") > -1) { job.location =  job.location.replace("SD","South Dakota, US"); };
        if(job.location.indexOf("TN") > -1) { job.location =  job.location.replace("TN","Tennessee, US"); };
        if(job.location.indexOf("TX") > -1) { job.location =  job.location.replace("TX","Texas, US"); };
        if(job.location.indexOf("UT") > -1) { job.location =  job.location.replace("UT","Utah, US"); };
        if(job.location.indexOf("VT") > -1) { job.location =  job.location.replace("VT","Vermont, US"); };
        if(job.location.indexOf("VA") > -1) { job.location =  job.location.replace("VA","Virginia, US"); };
        if(job.location.indexOf("WA") > -1) { job.location =  job.location.replace("WA","Washington, US"); };
        if(job.location.indexOf("WV") > -1) { job.location =  job.location.replace("WV","West Virginia, US"); };
        if(job.location.indexOf("WI") > -1) { job.location =  job.location.replace("WI","Wisconsin, US"); };
        if(job.location.indexOf("WY") > -1) { job.location =  job.location.replace("WY","Wyoming, US"); };

    
                if(job.location.indexOf("AL") > -1) { job.location =  job.location.replace(/AL/g,"Alabama, US"); };
                if(job.location.indexOf("AK") > -1) { job.location =  job.location.replace(/AK/g,"Alaska, US"); };
                if(job.location.indexOf("AZ") > -1) { job.location =  job.location.replace(/AZ/g,"Arizona, US"); };
                if(job.location.indexOf("AR") > -1) { job.location =  job.location.replace(/AR/g,"Arkansas, US"); };
                if(job.location.indexOf("CA") > -1) { job.location =  job.location.replace(/CA/g,"California, US"); };
                if(job.location.indexOf("CO") > -1) { job.location =  job.location.replace(/CO/g,"Colorado, US"); };
                if(job.location.indexOf("CT") > -1) { job.location =  job.location.replace(/CT/g,"Connecticut, US");};
                if(job.location.indexOf("DE") > -1) { job.location =  job.location.replace(/DE/g,"Delaware, US"); };
                if(job.location.indexOf("FL") > -1) { job.location =  job.location.replace(/FL/g,"Florida, US"); };
                if(job.location.indexOf("GA") > -1) { job.location =  job.location.replace(/GA/g,"Georgia, US"); };
                if(job.location.indexOf("HI") > -1) { job.location =  job.location.replace(/HI/g,"Hawaii, US"); };
                if(job.location.indexOf("ID") > -1) { job.location =  job.location.replace(/ID/g,"Idaho, US"); };
                if(job.location.indexOf("IL") > -1) { job.location =  job.location.replace(/IL/g,"llinois, US"); };
                if(job.location.indexOf("IN") > -1) { job.location =  job.location.replace(/IN/g,"Indiana, US"); };
                if(job.location.indexOf("IA") > -1) { job.location =  job.location.replace(/IA/g,"Iowa, US"); };
                if(job.location.indexOf("KS") > -1) { job.location =  job.location.replace(/KS/g,"Kansas, US"); };
                if(job.location.indexOf("KY") > -1) { job.location =  job.location.replace(/KY/g,"Kentucky, US"); };
                if(job.location.indexOf("LA") > -1) { job.location =  job.location.replace(/LA/g,"Louisiana, US"); };
                if(job.location.indexOf("ME") > -1) { job.location =  job.location.replace(/ME/g,"Maine, US"); };
                if(job.location.indexOf("MD") > -1) { job.location =  job.location.replace(/MD/g,"Maryland, US"); };
                if(job.location.indexOf("MA") > -1) { job.location =  job.location.replace(/MA/g,"Massachusetts, US"); };
                if(job.location.indexOf("MI") > -1) { job.location =  job.location.replace(/MI/g,"Míchigan, US");}; 
                if(job.location.indexOf("MN") > -1) { job.location =  job.location.replace(/MN/g,"Minnesota, US"); };
                if(job.location.indexOf("MS") > -1) { job.location =  job.location.replace(/MS/g,"Mississippi, US"); };
                if(job.location.indexOf("MO") > -1) { job.location =  job.location.replace(/MO/g,"Missouri, US"); };
                if(job.location.indexOf("MT") > -1) { job.location =  job.location.replace(/MT/g,"Montana, US"); };
                if(job.location.indexOf("NE") > -1) { job.location =  job.location.replace(/NE/g,"Nebraska, US"); };
                if(job.location.indexOf("NV") > -1) { job.location =  job.location.replace(/NV/g,"Nevada, US"); }
                if(job.location.indexOf("NH") > -1) { job.location =  job.location.replace(/NH/g,"New Hampshire, US"); };
                if(job.location.indexOf("NJ") > -1) { job.location =  job.location.replace(/NJ/g,"New Jersey, US"); };
                if(job.location.indexOf("NM") > -1) { job.location =  job.location.replace(/NM/g,"New Mexico, US"); };
                if(job.location.indexOf("NY") > -1) { job.location =  job.location.replace(/NY/g,"New York, US"); };
                if(job.location.indexOf("NC") > -1) { job.location =  job.location.replace(/NC/g,"North Carolina, US"); };
                if(job.location.indexOf("ND") > -1) { job.location =  job.location.replace(/ND/g,"North Dakota, US"); };
                if(job.location.indexOf("OH") > -1) { job.location =  job.location.replace(/OH/g,"Ohio, US");};
                if(job.location.indexOf("OK") > -1) { job.location =  job.location.replace(/OK/g,"Oklahoma, US");};
                if(job.location.indexOf("OR") > -1) { job.location =  job.location.replace(/OR/g,"Oregon, US"); };
                if(job.location.indexOf("PA") > -1) { job.location =  job.location.replace(/PA/g,"Pennsylvania, US"); };
                if(job.location.indexOf("RI") > -1) { job.location =  job.location.replace(/RI/g,"Rhode Island, US"); };
                if(job.location.indexOf("SC") > -1) { job.location =  job.location.replace(/SC/g,"South Carolina, US"); };
                if(job.location.indexOf("SD") > -1) { job.location =  job.location.replace(/SD/g,"South Dakota, US"); };
                if(job.location.indexOf("TN") > -1) { job.location =  job.location.replace(/TN/g,"Tennessee, US"); };
                if(job.location.indexOf("TX") > -1) { job.location =  job.location.replace(/TX/g,"Texas, US"); };
                if(job.location.indexOf("UT") > -1) { job.location =  job.location.replace(/UT/g,"Utah, US"); };
                if(job.location.indexOf("VT") > -1) { job.location =  job.location.replace(/VT/g,"Vermont, US"); };
                if(job.location.indexOf("VA") > -1) { job.location =  job.location.replace(/VA/g,"Virginia, US"); };
                if(job.location.indexOf("WA") > -1) { job.location =  job.location.replace(/WA/g,"Washington, US"); };
                if(job.location.indexOf("WV") > -1) { job.location =  job.location.replace(/WV/g,"West Virginia, US"); };
                if(job.location.indexOf("WI") > -1) { job.location =  job.location.replace(/WI/g,"Wisconsin, US"); };
                if(job.location.indexOf("WY") > -1) { job.location =  job.location.replace(/WY/g,"Wyoming, US"); };

         // US STATES + COUNTRY
         job.location =  job.location.replace("Alabama", "Alabama, US");
         job.location =  job.location.replace("Alaska", "Alaska, US"); 
         job.location =  job.location.replace("Arizona", "Arizona, US"); 
         job.location =  job.location.replace("Arkansas", "Arkansas, US"); 
         job.location =  job.location.replace("California", "California, US"); 
         job.location =  job.location.replace("Colorado", "Colorado, US"); 
         job.location =  job.location.replace("Connecticut", "Connecticut, US");
         job.location =  job.location.replace("Delaware", "Delaware, US"); 
         job.location =  job.location.replace("Florida", "Florida, US"); 
         job.location =  job.location.replace("Georgia", "Georgia, US");
         job.location =  job.location.replace("Hawaii", "Hawaii, US"); 
         job.location =  job.location.replace("Idaho", "Idaho, US"); 
         job.location =  job.location.replace("llinois", "llinois, US"); 
         job.location =  job.location.replace("Indiana", "Indiana, US"); 
         job.location =  job.location.replace("Iowa", "Iowa, US"); 
         job.location =  job.location.replace("Kansas", "Kansas, US"); 
         job.location =  job.location.replace("Kentucky", "Kentucky, US"); 
         job.location =  job.location.replace("Louisiana", "Louisiana, US"); 
         job.location =  job.location.replace("Maine", "Maine, US"); 
         job.location =  job.location.replace("Maryland", "Maryland, US"); 
         job.location =  job.location.replace("Massachusetts", "Massachusetts, US"); 
         job.location =  job.location.replace("Michigan", "Michigan, US"); 
         job.location =  job.location.replace("Minnesota", "Minnesota, US"); 
         job.location =  job.location.replace("Mississippi", "Mississippi, US"); 
         job.location =  job.location.replace("Missouri", "Missouri, US"); 
         job.location =  job.location.replace("Montana", "Montana, US");
         job.location =  job.location.replace("Nebraska", "Nebraska, US"); 
         job.location =  job.location.replace("Nevada", "Nevada, US");
         job.location =  job.location.replace("New Hampshire", "New Hampshire, US"); 
         job.location =  job.location.replace("New Jersey", "New Jersey, US"); 
         job.location =  job.location.replace("New Mexico", "New Mexico, US"); 
         job.location =  job.location.replace("New York", "New York, US"); 
         job.location =  job.location.replace("North Carolina", "North Carolina, US"); 
         job.location =  job.location.replace("North Dakota", "North Dakota, US"); 
         job.location =  job.location.replace("Ohio", "Ohio, US");
         job.location =  job.location.replace("Oklahoma", "Oklahoma, US");
         job.location =  job.location.replace("Oregon", "Oregon, US"); 
         job.location =  job.location.replace("Pennsylvania", "Pennsylvania, US"); 
         job.location =  job.location.replace("Rhode Island", "Rhode Island, US"); 
         job.location =  job.location.replace("South Carolina", "South Carolina, US");
         job.location =  job.location.replace("South Dakota", "South Dakota, US"); 
         job.location =  job.location.replace("Tennessee", "Tennessee, US"); 
         job.location =  job.location.replace("Texas", "Texas, US"); 
         job.location =  job.location.replace("Utah", "Utah, US"); 
         job.location =  job.location.replace("Vermont", "Vermont, US"); 
         job.location =  job.location.replace("Virginia", "Virginia, US"); 
         job.location =  job.location.replace("West Virginia", "West Virginia, US"); 
         job.location =  job.location.replace("Wisconsin", "Wisconsin, US"); 
         job.location =  job.location.replace("Wyoming", "Wyoming, US"); 
       

       // Cities of California

        //  Ayuda a que el GEO no les haga Mapping como Canada

       if(job.location.indexOf("Los Angeles")>-1){job.location = "Los Angeles, CA, US";}
       if(job.location.indexOf("San Francisco")>-1){job.location = "San Francisco, CA, US";}
       if(job.location.indexOf("San Diego")>-1){job.location = "San Diego, CA, US";}
       if(job.location.indexOf("Sacramento")>-1){job.location = "Sacramento, CA, US";}
       if(job.location.indexOf("San Jose")>-1){job.location = "San Jose, CA, US";}
       if(job.location.indexOf("Fresno")>-1){job.location = "Fresno, CA, US";}
       if(job.location.indexOf("Oakland")>-1){job.location = "Oakland, CA, US";}
       if(job.location.indexOf("Long Beach")>-1){job.location = "Long Beach, CA, US";}
       if(job.location.indexOf("Bakersfield")>-1){job.location = "Bakersfield, CA, US";}
       if(job.location.indexOf("Riverside")>-1){job.location = "Riverside, CA, US";}
       if(job.location.indexOf("Anaheim")>-1){job.location = "Anaheim, CA, US";}
       if(job.location.indexOf("Irvine")>-1){job.location = "Irvine, CA, US";}
       if(job.location.indexOf("Santa Barbara")>-1){job.location = "Santa Barbara, CA, US";}
       if(job.location.indexOf("Stockton")>-1){job.location = "Stockton, CA, US";}
       if(job.location.indexOf("Pasadena")>-1){job.location = "Pasadena, CA, US";}
       if(job.location.indexOf("Santa Monica")>-1){job.location = "Santa Monica, CA, US";}
       if(job.location.indexOf("Palm Springs")>-1){job.location = "Palm Springs, CA, US";}
       if(job.location.indexOf("Monterrey")>-1){job.location = "Monterrey, CA, US";}
       if(job.location.indexOf("Modesto")>-1){job.location = "Modesto, CA, US";}
       if(job.location.indexOf("San Bernardino")>-1){job.location = "San Bernardino, CA, US";}
       if(job.location.indexOf("Beverly Hills")>-1){job.location = "Beverly Hills, CA, US";}
       if(job.location.indexOf("Santa Rosa")>-1){job.location = "Santa Rosa, CA, US";}
       if(job.location.indexOf("Santa Ana")>-1){job.location = "Santa Ana, CA, US";}
       if(job.location.indexOf("Santa Cruz")>-1){job.location = "Santa Cruz, CA, US";}
       if(job.location.indexOf("Freemont")>-1){job.location = "Freemont, CA, US";}
       if(job.location.indexOf("Oxnard")>-1){job.location = "Oxnard, CA, US";}
       if(job.location.indexOf("Pomona")>-1){job.location = "Pomona, CA, US";}
       if(job.location.indexOf("Huntintong Beach")>-1){job.location = "Huntintong Beach, CA, US";}
       if(job.location.indexOf("Malibu")>-1){job.location = "Malibu, CA, US";}
       if(job.location.indexOf("Ventura")>-1){job.location = "Ventura, CA, US";}
       if(job.location.indexOf("Burbank")>-1){job.location = "Burbank, CA, US";}
       if(job.location.indexOf("California City")>-1){job.location = "California City, CA, US";}
       if(job.location.indexOf("Santa Clara")>-1){job.location = "Santa Clara, CA, US";}
       if(job.location.indexOf("Newport Beach")>-1){job.location = "Newport Beach, CA, US";}
       if(job.location.indexOf("Carlsbad")>-1){job.location = "Carlsbad, CA, US";}
       if(job.location.indexOf("Oceanside")>-1){job.location = "Oceanside, CA, US";}
       if(job.location.indexOf("Temecula")>-1){job.location = "Temecula, CA, US";}
       if(job.location.indexOf("San Luis")>-1){job.location = "San Luis, CA, US";}
       if(job.location.indexOf("Sunny Vale")>-1){job.location = "Sunny Vale, CA, US";}
       if(job.location.indexOf("Compton")>-1){job.location = "Compton, CA, US";}
       if(job.location.indexOf("Carmel-by-the-Sea")>-1){job.location = "Carmel-by-the-Sea, CA, US";}
       if(job.location.indexOf("San Mateo")>-1){job.location = "San Mateo, CA, US";}
       if(job.location.indexOf("Laguna Beach")>-1){job.location = "Laguna Beach, CA, US";}
       if(job.location.indexOf("Calabasas")>-1){job.location = "Calabasas, CA, US";}
       if(job.location.indexOf("Cupertino")>-1){job.location = "Cupertino, CA, US";}
       if(job.location.indexOf("Menlo Park")>-1){job.location = "Menlo Park, CA, US";}
       if(job.location.indexOf("Pismo Beach")>-1){job.location = "Pismo Beach, CA, US";}
       if(job.location.indexOf("Solvang")>-1){job.location = "Solvang, CA, US";}
       if(job.location.indexOf("Ridgecrest")>-1){job.location = "Ridgecrest, CA, US";}
       if(job.location.indexOf("La Verne")>-1){job.location = "La Verne, CA, US";}
       if(job.location.indexOf("Mountain View")>-1){job.location = "Mountain View, CA, US";}
       if(job.location.indexOf("Foster City")>-1){job.location = "Foster City, CA, US";}
     

       /*NL*/

      if(job.location.indexOf("Maarheeze")>-1){job.location = "Maarheeze, NL";}
      if(job.location.indexOf("Zuid-Holland")>-1){job.location = "Zuid-Holland, NL";}
      if(job.location.indexOf("Noord-Holland")>-1){job.location = "Noord-Holland, NL";}
      if(job.location.indexOf("Utrecht")>-1){job.location = "Utrecht, NL";}
      if(job.location.indexOf("Zeeland")>-1){job.location = "Zeeland, NL";}
      if(job.location.indexOf("Brabant")>-1){job.location = "Brabant, NL";}
      if(job.location.indexOf("Limburg")>-1){job.location = "Limburg, NL";}
      if(job.location.indexOf("Overijsel")>-1){job.location = "Overijsel, NL";}
      if(job.location.indexOf("Gelderland")>-1){job.location = "Gelderland, NL";}
      if(job.location.indexOf("Flevoland")>-1){job.location = "Flevoland, NL";}
      if(job.location.indexOf("Drenthe")>-1){job.location = "Drenthe, NL";}
      if(job.location.indexOf("Friesland")>-1){job.location = "Friesland, NL";}
      if(job.location.indexOf("Groningen")>-1){job.location = "Groningen, NL";}
      if(job.location.indexOf("Vlaardingen")>-1){job.location = "Vlaardingen, NL";}
      if(job.location.indexOf("Den Haag")>-1){job.location = "Den Haag, NL";}
      if(job.location.indexOf("Amersfoort")>-1){job.location = "Amersfoort, NL";}
      if(job.location.indexOf("Roermond")>-1){job.location = "Roermond, NL";}
      if(job.location.indexOf("Maastricht")>-1){job.location = "Maastricht, NL";}

        /*Locaciones de Gran Bretaña - GB*/

        if(job.location.indexOf("London")>-1){job.location = "London, GB";}
        if(job.location.indexOf("Edinburgh")>-1){job.location = "Edinburgh, Scotland, GB";}
        if(job.location.indexOf("Liverpool")>-1){job.location = "Liverpool, England, GB";}
        if(job.location.indexOf("Bristol")>-1){job.location = "Bristol, England, GB";}
        if(job.location.indexOf("Birmingham")>-1){job.location = "Birmingham, England, GB";}
        if(job.location.indexOf("Glasgow")>-1){job.location = "Glasgow, Scotland, GB";}
        if(job.location.indexOf("Manchester")>-1){job.location = "Manchester, England, GB";}
        if(job.location.indexOf("York")>-1){job.location = "York, England, GB";}
        if(job.location.indexOf("Newcastle upon Tyne")>-1){job.location = "Newcastle upon Tyne, England, GB";}
        if(job.location.indexOf("Oxford")>-1){job.location = "Oxford, England, GB";}
        if(job.location.indexOf("Cardiff")>-1){job.location = "Cardiff, Wales, GB";}
        if(job.location.indexOf("Leeds")>-1){job.location = "Leeds, England, GB";}
        if(job.location.indexOf("Bath")>-1){job.location = "Bath, England, GB";}
        if(job.location.indexOf("Brighton")>-1){job.location = "Brighton, England, GB";}
        if(job.location.indexOf("Sheffield")>-1){job.location = "Sheffield, England, GB";}
        if(job.location.indexOf("Kingston upon Hull")>-1){job.location = "Kingston upon Hull, England, GB";}
        if(job.location.indexOf("Cambridge")>-1){job.location = "Cambridge, England, GB";}
        if(job.location.indexOf("Norwich")>-1){job.location = "Norwich, England, GB";}
        if(job.location.indexOf("Portsmouth")>-1){job.location = "Portsmouth, England, GB";}
        if(job.location.indexOf("Aberdeen")>-1){job.location = "Aberdeen, Scotland, GB";}
        if(job.location.indexOf("Leicester")>-1){job.location = "Leicester, GB";}
        if(job.location.indexOf("Nottingham")>-1){job.location = "Nottingham, England, GB";}
        if(job.location.indexOf("Plymouth")>-1){job.location = "Plymouth, England, GB";}
        if(job.location.indexOf("Coventry")>-1){job.location = "Coventry, England, GB";}
        if(job.location.indexOf("Chester")>-1){job.location = "Chester, England, GB";}
        if(job.location.indexOf("Durham")>-1){job.location = "Durham, England, GB";}
        if(job.location.indexOf("Exeter")>-1){job.location = "Exeter, England, GB";}
        if(job.location.indexOf("Southampton")>-1){job.location = "Southampton, England, GB";}
        if(job.location.indexOf("Peterborough")>-1){job.location = "Peterborough, England, GB";}
        if(job.location.indexOf("Stoke-on-Trent")>-1){job.location = "Stoke-on-Trent, England, GB";}
        if(job.location.indexOf("Lincoln")>-1){job.location = "Lincoln, England, GB";}
        if(job.location.indexOf("Salisbury")>-1){job.location = "Salisbury, England, GB";}
        if(job.location.indexOf("Bradford")>-1){job.location = "Bradford, England, GB";}
        if(job.location.indexOf("Sunderland")>-1){job.location = "Sunderland, England, GB";}
        if(job.location.indexOf("Dundee")>-1){job.location = "Dundee, Scotland, GB";}
        if(job.location.indexOf("Reading")>-1){job.location = "Reading, England, GB";}
        if(job.location.indexOf("Preston")>-1){job.location = "Preston, England, GB";}
        if(job.location.indexOf("Wolverhampton")>-1){job.location = "Wolverhampton, England, GB";}
        if(job.location.indexOf("Greater Manchester")>-1){job.location = "Greater Manchester, England, GB";}
        if(job.location.indexOf("Swansea")>-1){job.location = "Swansea, Swansea, GB";}
        if(job.location.indexOf("Derby")>-1){job.location = "Derby, England, GB";}
        if(job.location.indexOf("Canterbury")>-1){job.location = "Canterbury, England, GB";}
        if(job.location.indexOf("Luton")>-1){job.location = "Luton, England, GB";}
        if(job.location.indexOf("Bournemouth")>-1){job.location = "Bournemouth, England, GB";}
        if(job.location.indexOf("Blackpool")>-1){job.location = "Blackpool, England, GB";}
        if(job.location.indexOf("Gloucester")>-1){job.location = "Gloucester, England, GB";}
        if(job.location.indexOf("City of Westminster")>-1){job.location = "City of Westminster, England, GB";}
        if(job.location.indexOf("Winchester")>-1){job.location = "Winchester, England, GB";}
        if(job.location.indexOf("Carlisle")>-1){job.location = "Carlisle, England, GB";}
        if(job.location.indexOf("Milton Keynes")>-1){job.location = "Milton Keynes, England, GB";}
        if(job.location.indexOf("Bedford")>-1){job.location = "Bedford, GB";}
        if(job.location.indexOf("Colchester")>-1){job.location = "Colchester, GB";}
        if(job.location.indexOf("Ipswich")>-1){job.location = "Ipswich, England, GB";}
        if(job.location.indexOf("Norwich ")>-1){job.location = "Norwich, GB";}
        if(job.location.indexOf("Peterborough")>-1){job.location = "Peterborough, England, GB";}
        if(job.location.indexOf("Dunfermline")>-1){job.location = "Dunfermline, Scotland, GB";}
        if(job.location.indexOf("Basildon")>-1){job.location = "Basildon, England, GB";}
        if(job.location.indexOf("Hampshire")>-1){job.location = "Hampshire, GB";}
        if(job.location.indexOf("Essex")>-1){job.location = "Essex, GB";}
        if(job.location.indexOf("Wellington")>-1){job.location = "Wellington, England, GB";}
        if(job.location.indexOf("Milton")>-1){job.location = "Milton, Cambridgeshire, United Kingdom";}
        if(job.location.indexOf("Wantage")>-1){job.location = "Wantage, England, GB";}
        if(job.location.indexOf("Norfolk")>-1){job.location = "Norfolk, England, GB";}
        if(job.location.indexOf("Peebles")>-1){job.location = "Peebles, Scotland, GB";}
        if(job.location.indexOf("Evesham")>-1){job.location = "Evesham, England, GB";}
        if(job.location.indexOf("Bridgewater")>-1){job.location = "Bridgewater, England, GB";}
        if(job.location.indexOf("Rochester")>-1){job.location = "Rochester, England, GB";}
        if(job.location.indexOf("Burgess Hill")>-1){job.location = "Burgess Hill, England, GB";}
        if(job.location.indexOf("Tilbury Dock")>-1){job.location = "Tilbury Dock, GB";}
        if(job.location.indexOf("Guildford")>-1){job.location = "Guildford, GB";}

    
         // Locaiones de Irlanda

        if(job.location.indexOf("Dublin")>-1){job.location = "Dublin, Ireland";}
        if(job.location.indexOf("Galway")>-1){job.location = "Galway, Ireland";}
        if(job.location.indexOf("Cork")>-1){job.location = "Cork, Ireland";}
        if(job.location.indexOf("Limerick")>-1){job.location = "Limerick, Ireland";}
        if(job.location.indexOf("Waterford")>-1){job.location = "Waterford, Ireland";}
        if(job.location.indexOf("Belfast")>-1){job.location = "Belfast, Northern Ireland";}
        if(job.location.indexOf("Kilkenny")>-1){job.location = "Kilkenny, Ireland";}
        if(job.location.indexOf("Londonderry")>-1){job.location = "Londonderry, Northern Ireland";}
        if(job.location.indexOf("Killarney")>-1){job.location = "Killarney, Ireland";}
        if(job.location.indexOf("Drogheda")>-1){job.location = "Drogheda, Ireland";}
        if(job.location.indexOf("Shannon")>-1){job.location = "Shannon, Ireland";}
        if(job.location.indexOf("Ennis")>-1){job.location = "Ennis, Ireland";}
        if(job.location.indexOf("Westport")>-1){job.location = "Westport, Ireland";}
        if(job.location.indexOf("Kinsale")>-1){job.location = "Kinsale, Ireland";}
        if(job.location.indexOf("Bray")>-1){job.location = "Bray, Ireland";}
        if(job.location.indexOf("Sligo")>-1){job.location = "Sligo, Ireland";}
        if(job.location.indexOf("Dundalk")>-1){job.location = "Dundalk, Ireland";}
        if(job.location.indexOf("Louth")>-1){job.location = "Louth, Ireland";}
        if(job.location.indexOf("Letterkenny")>-1){job.location = "Letterkenny, Ireland";}
        if(job.location.indexOf("Wexford")>-1){job.location = "Wexford, Ireland";}
        if(job.location.indexOf("Navan")>-1){job.location = "Navan, Ireland";}
        if(job.location.indexOf("Cobh")>-1){job.location = "Cobh, Ireland";}
        if(job.location.indexOf("Swords")>-1){job.location = "Swords, Ireland";}
        if(job.location.indexOf("Lisburn")>-1){job.location = "Lisburn, Ireland";}
        if(job.location.indexOf("Armagh")>-1){job.location = "Armagh, Northern Ireland";}
        if(job.location.indexOf("Blarney")>-1){job.location = "Blarney, Ireland";}
        if(job.location.indexOf("Newry")>-1){job.location = "Newry, Northern Ireland";}
        if(job.location.indexOf("Athlone")>-1){job.location = "Athlone, Ireland";}
        if(job.location.indexOf("Tralee")>-1){job.location = "Tralee, Ireland";}
        if(job.location.indexOf("Clonmel")>-1){job.location = "Clonmel, Ireland";}
        if(job.location.indexOf("Naas")>-1){job.location = "Naas, Ireland";}
        if(job.location.indexOf("Cashel")>-1){job.location = "Cashel, Ireland";}
        if(job.location.indexOf("Clifden")>-1){job.location = "Clifden, Ireland";}
        if(job.location.indexOf("Dún Laoghaire")>-1){job.location = "Dún Laoghaire, Ireland";}
        if(job.location.indexOf("Wicklow")>-1){job.location = "Wicklow, Ireland";}
        if(job.location.indexOf("Antrim")>-1){job.location = "Antrim, Northern Ireland";}
        if(job.location.indexOf("Carlow")>-1){job.location = "Carlow, Ireland";}
        if(job.location.indexOf("Greystones")>-1){job.location = "Greystones, Ireland";}
        if(job.location.indexOf("Mullingar")>-1){job.location = "Mullingar, Ireland";}
        if(job.location.indexOf("Adare")>-1){job.location = "Adare, Ireland";}
        if(job.location.indexOf("Portlaoise")>-1){job.location = "Portlaoise, Ireland";}
        if(job.location.indexOf("Tuam")>-1){job.location = "Tuam, Ireland";}
        if(job.location.indexOf("Trim")>-1){job.location = "Trim, Ireland";}
        if(job.location.indexOf("Castlebar")>-1){job.location = "Castlebar, Ireland";}
        if(job.location.indexOf("Ballina")>-1){job.location = "Ballina, Ireland";}
        if(job.location.indexOf("Arklow")>-1){job.location = "Arklow, Ireland";}
        if(job.location.indexOf("Mallow")>-1){job.location = "Mallow, Ireland";}
        if(job.location.indexOf("Tallaght")>-1){job.location = "Tallaght, Ireland";}
        if(job.location.indexOf("Leixlip")>-1){job.location = "Leixlip, Ireland";}
        if(job.location.indexOf("Thurles")>-1){job.location = "Thurles, Ireland";}
     


      // SOME FRANCE LOCATIONS

      if(job.location.indexOf("Lyon")>-1){job.location = "Lyon, FR";}
      if(job.location.indexOf("Bordeaux")>-1){job.location = "Bordeaux, FR";}
      if(job.location.indexOf("Thiais")>-1){job.location = "Thiais, FR";}
      if(job.location.indexOf("Le Chesnay")>-1){job.location = "Le Chesnay, FR";}
      if(job.location.indexOf("Toulouse")>-1){job.location = "Toulouse, FR";}
      if(job.location.indexOf("Paris")>-1){job.location = "Paris, FR";}
      if(job.location.indexOf("Marseille")>-1){job.location = "Marseille, FR";}
      if(job.location.indexOf("Lille")>-1){job.location = "Lille, FR";}
      if(job.location.indexOf("Nice")>-1){job.location = "Nice, FR";}
      if(job.location.indexOf("Rouen")>-1){job.location = "Rouen, FR";}
      if(job.location.indexOf("Montpellier")>-1){job.location = "Montpellier, FR";}



       /*Ciudades  y regiones de alemania*/
      if(job.location.indexOf("Augsburg")>-1){job.location = "Augsburg, DE";}
      if(job.location.indexOf("Bad Homburg")>-1){job.location = "Bad Homburg, DE";}
      if(job.location.indexOf("Bad Kreuznach")>-1){job.location = "Bad Kreuznach, DE";}
      if(job.location.indexOf("Bergisch Gladbach")>-1){job.location = "Bergisch Gladbach, DE";}
      if(job.location.indexOf("Köpenick")>-1){job.location = "Köpenick, Berlin, DE";}
      if(job.location.indexOf("Steglitz")>-1){job.location = "Steglitz, Berlin, DE";}
      if(job.location.indexOf("Spandau")>-1){job.location = "Spandau, Berlin, DE";}
      if(job.location.indexOf("Pankow")>-1){job.location = "Pankow, Berlin, DE";}
      if(job.location.indexOf("Braunschweig")>-1){job.location = "Braunschweig, DE";}
      if(job.location.indexOf("Dessau")>-1){job.location = "Dessau, DE";}
      if(job.location.indexOf("Dinslaken")>-1){job.location = "Dinslaken, DE";}
      if(job.location.indexOf("Dorsten")>-1){job.location = "Dorsten, DE";}
      if(job.location.indexOf("Dortmund")>-1){job.location = "Dortmund, DE";}
      if(job.location.indexOf("Dresden")>-1){job.location = "Dresden, DE";}
      if(job.location.indexOf("Detmold")>-1){job.location = "Detmold, DE";}
      if(job.location.indexOf("Düren")>-1){job.location = "Düren, DE";}
      if(job.location.indexOf("Frankfurt")>-1){job.location = "Frankfurt, DE";}
      if(job.location.indexOf("Dallgow-Döberitz")>-1){job.location = "Dallgow-Döberitz, DE";}
      if(job.location.indexOf("Coburg")>-1){job.location = "Coburg, DE";}
      if(job.location.indexOf("Celle")>-1){job.location = "Celle, DE";}
      if(job.location.indexOf("Bonn")>-1){job.location = "Bonn, DE";}
      if(job.location.indexOf("Bremen")>-1){job.location = "Bremen, DE";}
      if(job.location.indexOf("Bocholt")>-1){job.location = "Bocholt, DE";}
      if(job.location.indexOf("Berlin")>-1){job.location = "Berlin, DE";}
      if(job.location.indexOf("Mannheim")>-1){job.location = "Mannheim, DE";}
      if(job.location.indexOf("Mainz")>-1){job.location = "Mainz, DE";}
      if(job.location.indexOf("München")>-1){job.location = "München, DE";}
      if(job.location.indexOf("Wildau")>-1){job.location = "Wildau, DE";}
      if(job.location.indexOf("Wetzlar")>-1){job.location = "Wetzlar, DE";}
      if(job.location.indexOf("Stuttgart")>-1){job.location = "Stuttgart, DE";}
      if(job.location.indexOf("Unna")>-1){job.location = "Unna, DE";}
      if(job.location.indexOf("St. Pölten")>-1){job.location = "St. Pölten, Austria";}
      if(job.location.indexOf("Schweinfurt")>-1){job.location = "Schweinfurt, DE";}
      if(job.location.indexOf("Saarbrücken")>-1){job.location = "Saarbrücken, DE";}
      if(job.location.indexOf("Rostock")>-1){job.location = "Rostock, DE";}
      if(job.location.indexOf("Landau")>-1){job.location = "Landau, DE";}
      if(job.location.indexOf("Laatzen")>-1){job.location = "Laatzen, DE";}
      if(job.location.indexOf("Koblenz")>-1){job.location = "Koblenz, DE";}
      if(job.location.indexOf("Kiel")>-1){job.location = "Kiel, DE";}
      if(job.location.indexOf("Hildesheim")>-1){job.location = "Hildesheim, DE";}
      if(job.location.indexOf("Hannover")>-1){job.location = "Hannover, DE";}
      if(job.location.indexOf("Hanau")>-1){job.location = "Hanau, DE";}
      if(job.location.indexOf("Hamburg")>-1){job.location = "Hamburg, DE";}
      if(job.location.indexOf("Essen")>-1){job.location = "Essen, DE";}
      if(job.location.indexOf("Leipzig")>-1){job.location = "Leipzig, DE";}
      if(job.location.indexOf("Duisburg")>-1){job.location = "Duisburg, DE";}
      if(job.location.indexOf("Düsseldorf")>-1){job.location = "Düsseldorf, DE";}
      if(job.location.indexOf("Iserlohn")>-1){job.location = "Iserlohn, DE";}
      if(job.location.indexOf("Heilbronn")>-1){job.location = "Heilbronn, DE";}
      if(job.location.indexOf("Gera")>-1){job.location = "Gera, DE";}
      if(job.location.indexOf("Jena")>-1){job.location = "Jena, DE";}
      if(job.location.indexOf("Münster")>-1){job.location = "Münster, DE";}
      if(job.location.indexOf("Mönchengladbach")>-1){job.location = "Mönchengladbach, DE";}
      if(job.location.indexOf("Pforzheim")>-1){job.location = "Pforzheim, DE";}
      if(job.location.indexOf("Siegen")>-1){job.location = "Siegen, DE";}
      if(job.location.indexOf("Köln")>-1){job.location = "Köln, DE";}
      if(job.location.indexOf("Ingolstadt")>-1){job.location = "Ingolstadt, DE";}
      if(job.location.indexOf("Rosenheim")>-1){job.location = "Rosenheim, DE";}
      if(job.location.indexOf("Aachen")>-1){job.location = "Aachen, DE";}
      if(job.location.indexOf("Krefeld")>-1){job.location = "Krefeld, DE";}
      if(job.location.indexOf("Flensburg")>-1){job.location = "Flensburg, DE";}
      if(job.location.indexOf("Herford")>-1){job.location = "Herford, DE";}
      if(job.location.indexOf("Zwickau")>-1){job.location = "Zwickau, DE";}
      if(job.location.indexOf("Halle")>-1){job.location = "Halle, DE";}
      if(job.location.indexOf("Krefeld")>-1){job.location = "Krefeld, DE";}
      if(job.location.indexOf("Neuss")>-1){job.location = "Neuss, DE";}
      if(job.location.indexOf("Brandenburg ")>-1){job.location = "Brandenburg , DE";}
      if(job.location.indexOf("Moers")>-1){job.location = "Moers, DE";}
      if(job.location.indexOf("Bernburg")>-1){job.location = "Bernburg, DE";}
      if(job.location.indexOf("Ulm")>-1){job.location = "Ulm, DE";}
      if(job.location.indexOf("Stade")>-1){job.location = "Stade, DE";}
      if(job.location.indexOf("Rastatt")>-1){job.location = "Rastatt, DE";} 
      if(job.location.indexOf("Oberursel")>-1){job.location = "Oberursel, DE";}
      if(job.location.indexOf("Bruchsal")>-1){job.location = "Bruchsal, DE";}
      if(job.location.indexOf("Dormagen")>-1){job.location = "Dormagen, DE";}
      if(job.location.indexOf("Fürstenfeldbruck")>-1){job.location = "Fürstenfeldbruck, DE";}
      if(job.location.indexOf("Kassel")>-1){job.location = "Kassel, DE";}  
      if(job.location.indexOf("Gotha")>-1){job.location = "Gotha, DE";}
      if(job.location.indexOf("Hameln")>-1){job.location = "Hameln, DE";}
      if(job.location.indexOf("Neuwied")>-1){job.location = "Neuwied, DE";}  
      if(job.location.indexOf("Tübingen")>-1){job.location = "Tübingen, DE";}
      if(job.location.indexOf("Böblingen")>-1){job.location = "Böblingen, DE";}
      if(job.location.indexOf("Mühldorf am Inn")>-1){job.location = "Mühldorf am Inn, DE";}  
      if(job.location.indexOf("Recklinghausen")>-1){job.location = "Recklinghausen, DE";}
      if(job.location.indexOf("Itzehoe")>-1){job.location = "Itzehoe, DE";}
      if(job.location.indexOf("Frechen")>-1){job.location = "Frechen, DE";} 
      if(job.location.indexOf("Mölln")>-1){job.location = "Mölln, DE";}
      if(job.location.indexOf("Nürnberg")>-1){job.location = "Nürnberg, DE";}



      if(title.indexOf("Augsburg")>-1){job.location = "Augsburg, DE";}
      if(title.indexOf("Bad Homburg")>-1){job.location = "Bad Homburg, DE";}
      if(title.indexOf("Bad Kreuznach")>-1){job.location = "Bad Kreuznach, DE";}
      if(title.indexOf("Bergisch Gladbach")>-1){job.location = "Bergisch Gladbach, DE";}
      if(title.indexOf("Köpenick")>-1){job.location = "Köpenick, Berlin, DE";}
      if(title.indexOf("Steglitz")>-1){job.location = "Steglitz, Berlin, DE";}
      if(title.indexOf("Spandau")>-1){job.location = "Spandau, Berlin, DE";}
      if(title.indexOf("Pankow")>-1){job.location = "Pankow, Berlin, DE";}
      if(title.indexOf("Braunschweig")>-1){job.location = "Braunschweig, DE";}
      if(title.indexOf("Dessau")>-1){job.location = "Dessau, DE";}
      if(title.indexOf("Dinslaken")>-1){job.location = "Dinslaken, DE";}
      if(title.indexOf("Dorsten")>-1){job.location = "Dorsten, DE";}
      if(title.indexOf("Dortmund")>-1){job.location = "Dortmund, DE";}
      if(title.indexOf("Dresden")>-1){job.location = "Dresden, DE";}
      if(title.indexOf("Detmold")>-1){job.location = "Detmold, DE";}
      if(title.indexOf("Düren")>-1){job.location = "Düren, DE";}
      if(title.indexOf("Frankfurt")>-1){job.location = "Frankfurt, DE";}
      if(title.indexOf("Dallgow-Döberitz")>-1){job.location = "Dallgow-Döberitz, DE";}
      if(title.indexOf("Coburg")>-1){job.location = "Coburg, DE";}
      if(title.indexOf("Celle")>-1){job.location = "Celle, DE";}
      if(title.indexOf("Bonn")>-1){job.location = "Bonn, DE";}
      if(title.indexOf("Bremen")>-1){job.location = "Bremen, DE";}
      if(title.indexOf("Bocholt")>-1){job.location = "Bocholt, DE";}
      if(title.indexOf("Berlin")>-1){job.location = "Berlin, DE";}
      if(title.indexOf("Mannheim")>-1){job.location = "Mannheim, DE";}
      if(title.indexOf("Mainz")>-1){job.location = "Mainz, DE";}
      if(title.indexOf("München")>-1){job.location = "München, DE";}
      if(title.indexOf("Wildau")>-1){job.location = "Wildau, DE";}
      if(title.indexOf("Wetzlar")>-1){job.location = "Wetzlar, DE";}
      if(title.indexOf("Stuttgart")>-1){job.location = "Stuttgart, DE";}
      if(title.indexOf("Unna")>-1){job.location = "Unna, DE";}
      if(title.indexOf("St. Pölten")>-1){job.location = "St. Pölten, Austria";}
      if(title.indexOf("Schweinfurt")>-1){job.location = "Schweinfurt, DE";}
      if(title.indexOf("Saarbrücken")>-1){job.location = "Saarbrücken, DE";}
      if(title.indexOf("Rostock")>-1){job.location = "Rostock, DE";}
      if(title.indexOf("Landau")>-1){job.location = "Landau, DE";}
      if(title.indexOf("Laatzen")>-1){job.location = "Laatzen, DE";}
      if(title.indexOf("Koblenz")>-1){job.location = "Koblenz, DE";}
      if(title.indexOf("Kiel")>-1){job.location = "Kiel, DE";}
      if(title.indexOf("Hildesheim")>-1){job.location = "Hildesheim, DE";}
      if(title.indexOf("Hannover")>-1){job.location = "Hannover, DE";}
      if(title.indexOf("Hanau")>-1){job.location = "Hanau, DE";}
      if(title.indexOf("Hamburg")>-1){job.location = "Hamburg, DE";}
      if(title.indexOf("Essen")>-1){job.location = "Essen, DE";}
      if(title.indexOf("Leipzig")>-1){job.location = "Leipzig, DE";}
      if(title.indexOf("Duisburg")>-1){job.location = "Duisburg, DE";}
      if(title.indexOf("Düsseldorf")>-1){job.location = "Düsseldorf, DE";}
      if(title.indexOf("Iserlohn")>-1){job.location = "Iserlohn, DE";}
      if(title.indexOf("Heilbronn")>-1){job.location = "Heilbronn, DE";}
      if(title.indexOf("Gera")>-1){job.location = "Gera, DE";}
      if(title.indexOf("Jena")>-1){job.location = "Jena, DE";}
      if(title.indexOf("Münster")>-1){job.location = "Münster, DE";}
      if(title.indexOf("Mönchengladbach")>-1){job.location = "Mönchengladbach, DE";}
      if(title.indexOf("Pforzheim")>-1){job.location = "Pforzheim, DE";}
      if(title.indexOf("Siegen")>-1){job.location = "Siegen, DE";}
      if(title.indexOf("Köln")>-1){job.location = "Köln, DE";}
      if(title.indexOf("Ingolstadt")>-1){job.location = "Ingolstadt, DE";}
      if(title.indexOf("Rosenheim")>-1){job.location = "Rosenheim, DE";}
      if(title.indexOf("Aachen")>-1){job.location = "Aachen, DE";}
      if(title.indexOf("Krefeld")>-1){job.location = "Krefeld, DE";}
      if(title.indexOf("Flensburg")>-1){job.location = "Flensburg, DE";}
      if(title.indexOf("Herford")>-1){job.location = "Herford, DE";}
      if(title.indexOf("Zwickau")>-1){job.location = "Zwickau, DE";}
      if(title.indexOf("Halle")>-1){job.location = "Halle, DE";}
      if(title.indexOf("Krefeld")>-1){job.location = "Krefeld, DE";}
      if(title.indexOf("Neuss")>-1){job.location = "Neuss, DE";}
      if(title.indexOf("Brandenburg ")>-1){job.location = "Brandenburg , DE";}
      if(title.indexOf("Moers")>-1){job.location = "Moers, DE";}
      if(title.indexOf("Bernburg")>-1){job.location = "Bernburg, DE";}
      if(title.indexOf("Ulm")>-1){job.location = "Ulm, DE";}
      if(title.indexOf("Stade")>-1){job.location = "Stade, DE";}
      if(title.indexOf("Rastatt")>-1){job.location = "Rastatt, DE";} 
      if(title.indexOf("Oberursel")>-1){job.location = "Oberursel, DE";}
      if(title.indexOf("Bruchsal")>-1){job.location = "Bruchsal, DE";}
      if(title.indexOf("Dormagen")>-1){job.location = "Dormagen, DE";}
      if(title.indexOf("Fürstenfeldbruck")>-1){job.location = "Fürstenfeldbruck, DE";}
      if(title.indexOf("Kassel")>-1){job.location = "Kassel, DE";}  
      if(title.indexOf("Gotha")>-1){job.location = "Gotha, DE";}
      if(title.indexOf("Hameln")>-1){job.location = "Hameln, DE";}
      if(title.indexOf("Neuwied")>-1){job.location = "Neuwied, DE";}  
      if(title.indexOf("Tübingen")>-1){job.location = "Tübingen, DE";}
      if(title.indexOf("Böblingen")>-1){job.location = "Böblingen, DE";}
      if(title.indexOf("Mühldorf am Inn")>-1){job.location = "Mühldorf am Inn, DE";}  
      if(title.indexOf("Recklinghausen")>-1){job.location = "Recklinghausen, DE";}
      if(title.indexOf("Itzehoe")>-1){job.location = "Itzehoe, DE";}
      if(title.indexOf("Frechen")>-1){job.location = "Frechen, DE";}   
  


  // CH Mapping 

          if(job.location.toUpperCase().indexOf("ZÜRICH")>-1){job.location = "Zürich, CH";}
          if(job.location.toUpperCase().indexOf("USTER")>-1){job.location = "Uster, CH";}
          if(job.location.toUpperCase().indexOf("OERLIKON")>-1){job.location = "Oerlikon, CH";}
          if(job.location.toUpperCase().indexOf("WINTERTHUR")>-1){job.location = "Winterthur, CH";}
          if(job.location.toUpperCase().indexOf("CHUR")>-1){job.location = "Chur, CH";}
        
          if(job.location.toLowerCase().indexOf("bern")>-1){job.location = "Bern, CH";}
          if(job.location.toLowerCase().indexOf("thalwil")>-1){job.location = "Thalwil, CH";}
          if(job.location.toLowerCase().indexOf("fällanden")>-1){job.location = "Fällanden, CH";}
          if(job.location.toLowerCase().indexOf("lausanne")>-1){job.location = "Lausanne, CH";}
          if(job.location.toLowerCase().indexOf("glattzentrum")>-1){job.location = "Glattzentrum, CH";}
          if(job.location.toLowerCase().indexOf("bremgarten")>-1){job.location = "Bremgarten, CH";}
          if(job.location.toLowerCase().indexOf("wettingen")>-1){job.location = "Wettingen, CH";}
          if(job.location.toLowerCase().indexOf("rapperswil")>-1){job.location = "rapperswil, CH";}
          if(job.location.toLowerCase().indexOf("stans")>-1){job.location = "Stans, CH";}
          if(job.location.toLowerCase().indexOf("brig")>-1){job.location = "brig, CH";}

  /////////////////////
  // #10 JOB-DESC   //---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
  ////////////////////

        //-----JOB-DESC--------------------------------//
        
        var full_html = elem.querySelector("");

        job.html    = full_html.innerHTML.trim();    
        job.jobdesc = full_html.textContent.trim();

        var remove_selectors = [];  
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});

        //job.html = job.html.split("")[0];
        //job.html = job.html.split(//i)[0];


        job.html    = cleanHTML(job.html);
        job.jobdesc = job.html;
        //--------------------------------------------//


      // REMOVE TEXT BEFORE - FALSE

        if(job.html.indexOf("Job Description")>-1){
                
                
                job.html = job.html.split("Job Description").pop().trim();
                  
                  job.html = "<strong>Job Description</strong>" + "<br>" + job.html;
                
        }



        //jobdata sin <p> ni <br>


        job.html = job.html.replace(/^(\[url=)?(https?:\/\/)?(www\.|\S+?\.)(\S+?\.)?\S+$\s*/mg, '');
        job.html = job.html.replace(/^(www\.|\S+?\.)(\S+?\.)?\S+$\s*/mg,"");
        job.html = job.html.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
  
        job.html = job.html.replace(/\../g,".");
        job.html = job.html.replace(/•/g,"<br>•");
        job.html = job.html.replace(/:/g,":<br>");
        job.html = job.html.replace(/- /g,"- <br>");
        job.html = job.html.replace(/\! /g,"!<br>");
        job.html = job.html.replace(/\.  /g,".<br>");


 // Description - AJAX CALL -----------------------------------------------------------------------------//
        
          var meineJSON = getDescription();      // se registra el JSON en una variable
          var meineObj  = JSON.parse(meineJSON); // Se parsea el JSON 
                                
                
          //job.source_apply_email = meineObj.email;
                             
           job.html    = meineObj.description;   // Se ontiene el valor que se desea del mismo
           job.html    = cleanHTML(job.html);
           job.jobdesc = job.html;
                  
           /*--------------------------------------------------*/  

         // Llamada de AJAx
                
        function getDescription() {
          var xhrrequest = new XMLHttpRequest();
          xhrrequest.open("GET", link, false); //URL del ajax que trae la información del job

          var response = "";
          xhrrequest.onreadystatechange = function () {
            if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
              //console.log(xhrrequest.responseText);
              response = xhrrequest.responseText;
            }
          };

          xhrrequest.send();
          return response;
        }
  //----------------------------------------------------------------------------------------------// 

 
/////////////////////////////  
// #11 Caracteres-especiales //----------------------------------------------------------------------------------------------------------------------
////////////////////////////

    job.html = job.html.replace(/Ã¡/gi, "á").trim();
    job.html = job.html.replace(/Ã¢/gi, "â").trim();
    job.html = job.html.replace(/Ã£/gi, "ã").trim();
    job.html = job.html.replace(/Ã¨/gi, "è").trim();

    job.html = job.html.replace(/Ã©/gi, "é").trim();


    job.html = job.html.replace(/Ãª/gi, "ê").trim();
    job.html = job.html.replace(/Ã«/gi, "ë").trim();
    job.html = job.html.replace(/Ã¬/gi, "ì").trim();
    job.html = job.html.replace(/Ã/gi, "à").trim();
   
    job.html = job.html.replace(//gi, "í").trim();
    job.html = job.html.replace(/â‚¬/gi, "€").trim();
    job.html = job.html.replace(/â€™/gi, "’").trim();



    // caracteres especiales en francés

     job.title = job.title.replace(/â‚¬/gi, "€").trim();
     job.title = job.title.replace(/â€™/gi, "’").trim();
     job.title = job.title.replace(/Ã¡/gi, "á").trim();
     job.title = job.title.replace(/Ã¢/gi, "â").trim();
     job.title = job.title.replace(/Ã£/gi, "ã").trim();
     job.title = job.title.replace(/Ã¨/gi, "è").trim();
     job.title = job.title.replace(/Ã©/gi, "é").trim();
     job.title = job.title.replace(/Ãª/gi, "ê").trim();
     job.title = job.title.replace(/Ã«/gi, "ë").trim();
     job.title = job.title.replace(/Â«/gi, "«").trim();
     job.title = job.title.replace(/Ã¬/gi, "ì").trim();
     job.title = job.title.replace(/Ã§/gi, "ç").trim();
     job.title = job.title.replace(/Â»/gi, "»").trim();
     job.title = job.title.replace(/Ã»/gi, "û").trim();
     job.title = job.title.replace(/Ã¼/gi, "ü").trim();
     job.title = job.title.replace(/â€“/gi, "–").trim();

     job.html = job.html.replace(/â‚¬/gi, "€").trim();
     job.html = job.html.replace(/â€™/gi, "’").trim();
     job.html = job.html.replace(/Ã¡/gi, "á").trim();
     job.html = job.html.replace(/Ã¢/gi, "â").trim();
     job.html = job.html.replace(/Ã£/gi, "ã").trim();
     job.html = job.html.replace(/Ã¨/gi, "è").trim();
     job.html = job.html.replace(/Ã©/gi, "é").trim();
     job.html = job.html.replace(/Ãª/gi, "ê").trim();
     job.html = job.html.replace(/Ã«/gi, "ë").trim();
     job.html = job.html.replace(/Ã¬/gi, "ì").trim();
     job.html = job.html.replace(/Ã§/gi, "ç").trim();
     job.html = job.html.replace(/Â»/gi, "»").trim();
     job.html = job.html.replace(/Ã»/gi, "û").trim();
     job.html = job.html.replace(/Ã/gi, "à").trim();

      job.location = job.location.replace(/â‚¬/gi, "€").trim();
      job.location = job.location.replace(/â€™/gi, "’").trim();
      job.location = job.location.replace(/Ã¡/gi, "á").trim();
      job.location = job.location.replace(/Ã¢/gi, "â").trim();
      job.location = job.location.replace(/Ã£/gi, "ã").trim();
      job.location = job.location.replace(/Ã¨/gi, "è").trim();
      job.location = job.location.replace(/Ã©/gi, "é").trim();
      job.location = job.location.replace(/Ãª/gi, "ê").trim();
      job.location = job.location.replace(/Ã«/gi, "ë").trim();
      job.location = job.location.replace(/Ã¬/gi, "ì").trim();
      job.location = job.location.replace(/Ã§/gi, "ç").trim();
      job.location = job.location.replace(/Â»/gi, "»").trim();
      job.location = job.location.replace(/Ã»/gi, "û").trim();
      job.location = job.location.replace(/Ã/gi, "à").trim();



      /*Caracteres especiales para Suecia*/
      
      job.title = job.title.replace(/Ã¶/gi,"ö");
      job.title = job.title.replace(/Ã¥/gi,"å");
      job.title = job.title.replace(/Ã–/gi,"Ö");
      job.title = job.title.replace(/Ã¤/gi, "ä");
      job.title = job.title.replace(/Ã¸/gi, "ø");
      job.title = job.title.replace(/Ã¦/gi, "æ");
      job.title = job.title.replace(/Ã…/gi, "Å");


//--------------------------------------------------------

      job.title = job.title.replace('Ã¶','ö');
      job.title = job.title.replace('Ã¥','å');
      job.title = job.title.replace("Ã–","Ö");
      job.title = job.title.replace("Ã„","Ä");
      job.title = job.title.replace("ä"," Ã¤");
      job.title = job.title.replace(/â€/gi, "”").trim();
      job.title = job.title.replace(/â€“/gi, "–").trim();
      job.title = job.title.replace(/â€™/gi, "’").trim();
      job.title = job.title.replace(/â€˜/gi, "‘").trim();
      job.title = job.title.replace(/€¢/gi, "•").trim();


     job.html = job.html.replace(/Ã¶/gi, "ö").trim();
     job.html = job.html.replace(/Ã¥/gi, "å").trim();
     job.html = job.html.replace(/Ã–/gi, "Ö").trim();
     job.html = job.html.replace(/Ã„/gi, "Ä").trim();
     job.html = job.html.replace(/Ã¤/gi, "ä").trim();
     job.html = job.html.replace(/â€/gi, "”").trim();
     job.html = job.html.replace(/â€“/gi, "–").trim();
     job.html = job.html.replace(/â€™/gi, "’").trim();
     job.html = job.html.replace(/â€˜/gi, "‘").trim();
     job.html = job.html.replace(/Â/gi, "").trim();
     job.html = job.html.replace(/-/gi, "-").trim();

     job.html = job.html.replace(/Ã³/gi, "ó").trim();
     job.html = job.html.replace(/Ã¡/gi, "á").trim();
     job.html = job.html.replace(/Ã±/gi, "ñ").trim();
     job.html = job.html.replace(/Ã©/gi, "é").trim();
     job.html = job.html.replace(/Âª/gi, "ª").trim();

         Páginas en Nerlandés

      job.html = job.html.replace(/â‚¬/gi, "€");
      job.html = job.html.replace(/Ã©/gi, "é").trim();
      job.html = job.html.replace(/Ã¯/gi, "ï").trim();
      job.html = job.html.replace(/Ã«/gi, "ë").trim();


      //////////////////////////////////////////////////////////////


                if(job.location.indexOf(",")>-1){ // Removing street
          let commas = job.location.match(/\,/g).length;
            if(commas > 2){removeTextBeforeFirstComma();}
          }
          if(job.location.indexOf(",")>-1){ // Removing street 
          let commas = job.location.match(/\,/g).length;
            if(commas > 2){removeTextBeforeFirstComma();}
          }
          if(job.location.indexOf(",")>-1){ // Removing street 
          let commas = job.location.match(/\,/g).length;
            if(commas > 2){removeTextBeforeFirstComma();}
          }
          if(job.location.indexOf(",")>-1){ // Removing street 
          let commas = job.location.match(/\,/g).length;
            if(commas > 2){removeTextBeforeFirstComma();}
          }

               function removeTextBeforeFirstComma(){

               let splitOnFirstCommaLoc = job.location.split(",").shift().trim(); 
               job.location = job.location.replace(splitOnFirstCommaLoc,"").trim();
               let firstCharLoc = job.location.charAt(0);
               if(firstCharLoc === ","){job.location = job.location.slice(1).trim();}
            }

            ///////////////////////

            function cambiofecha(datePosted, SeparadorC, posicionMes, posicionDia, PosicionAno) {
          datePosted = datePosted.trim();
          var ano= datePosted.split(SeparadorC)[PosicionAno].trim();
          var monthJob = datePosted.split(SeparadorC)[posicionMes].substring(0,3).trim().toLowerCase();
          var dia = datePosted.split(SeparadorC)[posicionDia].trim()
            monthJob = monthJob.replace('jan','01').replace('feb','02').replace('mar','03');
            monthJob = monthJob.replace('apr','04').replace('may','05').replace('jun','06');
            monthJob = monthJob.replace('jul','07').replace('aug','08').replace('sep','09');
            monthJob = monthJob.replace('oct','10').replace('nov','11').replace('dec','12');
            datePosted = monthJob+"/"+dia+"/"+ano;   
      return datePosted;
    } // Stalin


    ////////////////////////////////

    job.location = job.location.replace(/\w+$/,", $&");  

    job.location =job.location.replace(/([A-Z])/g, ' $1');

////////////////////

  var exp_fr = $('li:contains(expérience)') !== null;
  if(exp_fr){
    
    let x = $('li:contains(expérience)').text().trim();
      if(x.search(/[0-9]/g)>-1){
      job.experienced_required = x;
        
        if(x.indexOf(".")>-1){
      
          let a = x.split(".").shift().trim();
          let b = x.split(".").pop().trim();

          if(a.indexOf("expérience")>-1 && a.search(/[0-9]/g)>-1){

            job.experienced_required = a;
            }else{
            job.experienced_required = b;
            }
        }
        
        
      }  
    
  }



  var exp_fr = $('li:contains(expérience)') !== null;
  if(exp_fr){
    
      let x = $('li:contains(expérience)').text().trim();
        if(x.search(/[0-9]/g)>-1){
        job.experienced_required = x;
        } 
    }

///////////////////
  var exp_fr = $('li:contains(expérience)') !== null;
  if(exp_fr){
    
    let x = $('li:contains(expérience)').text().trim();
      if(x.search(/[0-9]/g)>-1){
      job.experienced_required = x;
      }  
    full_html.find("li:contains(expérience)").remove().end().html();
  }
  
  var exp_eng = $('li:contains(experience)') !== null;
  if(exp_eng){
    
    let x = $('li:contains(experience)').text().trim();
      if(x.search(/[0-9]/g)>-1){
      job.experienced_required = x;
      }  
    full_html.find("li:contains(experience)").remove().end().html();
  }
  var exp_sp = $('li:contains(experiencia)') !== null;
  if(exp_sp){
    
    let x = $('li:contains(experiencia)').text().trim();
      if(x.search(/[0-9]/g)>-1){
      job.experienced_required = x;
      }  
    full_html.find("li:contains(experiencia)").remove().end().html();
  }
  var exp_hu = $('li:contains(tapasztalattal)') !== null;
  if(exp_hu){
    
    let x = $('li:contains(tapasztalattal)').text().trim();
      if(x.search(/[0-9]/g)>-1){
      job.experienced_required = x;
      }  
    full_html.find("li:contains(tapasztalattal)").remove().end().html();
  }
////////////////////////////////////////////////////
y aprovecho y por aqui les dejo este que nos elimina todos las etiquetas a, script, input de un html

var links = document.querySelectorAll('a,script,input,button')
links.forEach(elemento => elemento.remove());
///////////////////////////
Muchachos por aca hay otro codigo para remover selectores que contienen algun texto, este me lo compartio Yamel:
let elements = full_html.querySelectorAll('p');
elements.forEach(elemnt => {if(elemnt.textContent.match('Wir freuen uns auf Ihre Bewerbung')) elemnt.remove();});


////////////////

// URL del JSON GET - ATS Smart recruiters 
https://api.smartrecruiters.com/v1/companies/Ubisoft2/postings?limit=100&offset=0

https://api.smartrecruiters.com/v1/companies/nombreDeLaCompañia/postings?limit=100&offset=0

//////////////7

        var title_check = elem.querySelector('h3') !== null; // para chequear que exista 
      
        
          if(title_check){
            job.title = elem.querySelector('h3').textContent;
            }

//////////////////////////
  if(job.html.search(/CV|resume|cover letter|curriculum/gi)>-1){
    if(job.html.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi) > -1){
      job.source_apply_email = job.html.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0];
    }
  }



variable = variable.substring(variable.indexOf(“desde donde lo quiero picar”), variable.indexOf(“hasta donde lo quiero picar”));

var x = job.html.substring(job.html.indexOf(""), job.html.indexOf(""));
job.html  = job.html.replace(x,"").trim();

//////////////////////////////////////////////////////////////////////
Multilocation. 

1. Se corta en el primer separador, por ejemplo: "|"
2. Se crea una variable registrando el valor de la locación como "location"
3. A partir de dicha variable se hace el multilocation. 
    Así el método join no afecta el resto de las locaciones. 

//////////////77

if(job.title.includes("Design Consultant") == true){job.title = "Design Consultant";}

includes() 

The includes() method determines whether a string contains the characters of a specified string.

This method returns true if the string contains the characters, and false if not.

Note: The includes() method is case sensitive.

https://www.w3schools.com/jsref/jsref_includes.asp

if(job.title.includes("Design Consultant") == true){job.title = "Design Consultant";}

/////////////
out.waitFor = 'li.is-active > a[href*="page="]'+(pass_it.page+1);

//este waitFor me sirvió para esperar que la siguiente página esté con clase is-active
//////////////////////////





/////////////////

split("&selected_lang","1").pop().trim();

////////////

var jq = document.createElement('script');
jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
jQuery.noConflict();
// ... give time for script to load, then type (or see below for non wait option)




function TLCtoCountry(loc){
loc = loc.replace("AFG","Afghanistan");
loc = loc.replace("ALA","Aland Islands");
loc = loc.replace("ALB","Albania");
loc = loc.replace("DZA","Algeria");
loc = loc.replace("ASM","American Samoa");
loc = loc.replace("AND","Andorra");
loc = loc.replace("AGO","Angola");
loc = loc.replace("AIA","Anguilla");
loc = loc.replace("ATA","Antarctica");
loc = loc.replace("ATG","Antigua and Barbuda");
loc = loc.replace("ARG","Argentina");
loc = loc.replace("ARM","Armenia");
loc = loc.replace("ABW","Aruba");
loc = loc.replace("AUS","Australia");
loc = loc.replace("AUT","Austria");
loc = loc.replace("AZE","Azerbaijan");
loc = loc.replace("BHS","Bahamas");
loc = loc.replace("BHR","Bahrain");
loc = loc.replace("BGD","Bangladesh");
loc = loc.replace("BRB","Barbados");
loc = loc.replace("BLR","Belarus");
loc = loc.replace("BEL","Belgium");
loc = loc.replace("BLZ","Belize");
loc = loc.replace("BEN","Benin");
loc = loc.replace("BMU","Bermuda");
loc = loc.replace("BTN","Bhutan");
loc = loc.replace("BOL","Bolivia");
loc = loc.replace("BES","Bonaire, Saint Eustatius and Saba");
loc = loc.replace("BIH","Bosnia and Herzegovina");
loc = loc.replace("BWA","Botswana");
loc = loc.replace("BVT","Bouvet Island");
loc = loc.replace("BRA","Brazil");
loc = loc.replace("IOT","British Indian Ocean Territory");
loc = loc.replace("VGB","British Virgin Islands");
loc = loc.replace("BRN","Brunei");
loc = loc.replace("BGR","Bulgaria");
loc = loc.replace("BFA","Burkina Faso");
loc = loc.replace("BDI","Burundi");
loc = loc.replace("KHM","Cambodia");
loc = loc.replace("CMR","Cameroon");
loc = loc.replace("CAN","Canada");
loc = loc.replace("CPV","Cape Verde");
loc = loc.replace("CYM","Cayman Islands");
loc = loc.replace("CAF","Central African Republic");
loc = loc.replace("TCD","Chad");
loc = loc.replace("CHL","Chile");
loc = loc.replace("CHN","China");
loc = loc.replace("CXR","Christmas Island");
loc = loc.replace("CCK","Cocos Islands");
loc = loc.replace("COL","Colombia");
loc = loc.replace("COM","Comoros");
loc = loc.replace("COK","Cook Islands");
loc = loc.replace("CRI","Costa Rica");
loc = loc.replace("HRV","Croatia");
loc = loc.replace("CUB","Cuba");
loc = loc.replace("CUW","Curacao");
loc = loc.replace("CYP","Cyprus");
loc = loc.replace("CZE","Czech Republic");
loc = loc.replace("COD","Democratic Republic of the Congo");
loc = loc.replace("DNK","Denmark");
loc = loc.replace("DJI","Djibouti");
loc = loc.replace("DMA","Dominica");
loc = loc.replace("DOM","Dominican Republic");
loc = loc.replace("TLS","East Timor");
loc = loc.replace("ECU","Ecuador");
loc = loc.replace("EGY","Egypt");
loc = loc.replace("SLV","El Salvador");
loc = loc.replace("GNQ","Equatorial Guinea");
loc = loc.replace("ERI","Eritrea");
loc = loc.replace("EST","Estonia");
loc = loc.replace("ETH","Ethiopia");
loc = loc.replace("FLK","Falkland Islands");
loc = loc.replace("FRO","Faroe Islands");
loc = loc.replace("FJI","Fiji");
loc = loc.replace("FIN","Finland");
loc = loc.replace("FRA","France");
loc = loc.replace("GUF","French Guiana");
loc = loc.replace("PYF","French Polynesia");
loc = loc.replace("ATF","French Southern Territories");
loc = loc.replace("GAB","Gabon");
loc = loc.replace("GMB","Gambia");
loc = loc.replace("GEO","Georgia");
loc = loc.replace("DEU","Germany");
loc = loc.replace("GHA","Ghana");
loc = loc.replace("GIB","Gibraltar");
loc = loc.replace("GRC","Greece");
loc = loc.replace("GRL","Greenland");
loc = loc.replace("GRD","Grenada");
loc = loc.replace("GLP","Guadeloupe");
loc = loc.replace("GUM","Guam");
loc = loc.replace("GTM","Guatemala");
loc = loc.replace("GGY","Guernsey");
loc = loc.replace("GIN","Guinea");
loc = loc.replace("GNB","Guinea-Bissau");
loc = loc.replace("GUY","Guyana");
loc = loc.replace("HTI","Haiti");
loc = loc.replace("HMD","Heard Island and McDonald Islands");
loc = loc.replace("HND","Honduras");
loc = loc.replace("HKG","Hong Kong");
loc = loc.replace("HUN","Hungary");
loc = loc.replace("ISL","Iceland");
loc = loc.replace("IND","India");
loc = loc.replace("IDN","Indonesia");
loc = loc.replace("IRN","Iran");
loc = loc.replace("IRQ","Iraq");
loc = loc.replace("IRL","Ireland");
loc = loc.replace("IMN","Isle of Man");
loc = loc.replace("ISR","Israel");
loc = loc.replace("ITA","Italy");
loc = loc.replace("CIV","Ivory Coast");
loc = loc.replace("JAM","Jamaica");
loc = loc.replace("JPN","Japan");
loc = loc.replace("JEY","Jersey");
loc = loc.replace("JOR","Jordan");
loc = loc.replace("KAZ","Kazakhstan");
loc = loc.replace("KEN","Kenya");
loc = loc.replace("KIR","Kiribati");
loc = loc.replace("XKX","Kosovo");
loc = loc.replace("KWT","Kuwait");
loc = loc.replace("KGZ","Kyrgyzstan");
loc = loc.replace("LAO","Laos");
loc = loc.replace("LVA","Latvia");
loc = loc.replace("LBN","Lebanon");
loc = loc.replace("LSO","Lesotho");
loc = loc.replace("LBR","Liberia");
loc = loc.replace("LBY","Libya");
loc = loc.replace("LIE","Liechtenstein");
loc = loc.replace("LTU","Lithuania");
loc = loc.replace("LUX","Luxembourg");
loc = loc.replace("MAC","Macao");
loc = loc.replace("MKD","Macedonia");
loc = loc.replace("MDG","Madagascar");
loc = loc.replace("MWI","Malawi");
loc = loc.replace("MYS","Malaysia");
loc = loc.replace("MDV","Maldives");
loc = loc.replace("MLI","Mali");
loc = loc.replace("MLT","Malta");
loc = loc.replace("MHL","Marshall Islands");
loc = loc.replace("MTQ","Martinique");
loc = loc.replace("MRT","Mauritania");
loc = loc.replace("MUS","Mauritius");
loc = loc.replace("MYT","Mayotte");
loc = loc.replace("MEX","Mexico");
loc = loc.replace("FSM","Micronesia");
loc = loc.replace("MDA","Moldova");
loc = loc.replace("MCO","Monaco");
loc = loc.replace("MNG","Mongolia");
loc = loc.replace("MNE","Montenegro");
loc = loc.replace("MSR","Montserrat");
loc = loc.replace("MAR","Morocco");
loc = loc.replace("MOZ","Mozambique");
loc = loc.replace("MMR","Myanmar");
loc = loc.replace("NAM","Namibia");
loc = loc.replace("NRU","Nauru");
loc = loc.replace("NPL","Nepal");
loc = loc.replace("NLD","Netherlands");
loc = loc.replace("ANT","Netherlands Antilles");
loc = loc.replace("NCL","New Caledonia");
loc = loc.replace("NZL","New Zealand");
loc = loc.replace("NIC","Nicaragua");
loc = loc.replace("NER","Niger");
loc = loc.replace("NGA","Nigeria");
loc = loc.replace("NIU","Niue");
loc = loc.replace("NFK","Norfolk Island");
loc = loc.replace("PRK","North Korea");
loc = loc.replace("MNP","Northern Mariana Islands");
loc = loc.replace("NOR","Norway");
loc = loc.replace("OMN","Oman");
loc = loc.replace("PAK","Pakistan");
loc = loc.replace("PLW","Palau");
loc = loc.replace("PSE","Palestinian Territory");
loc = loc.replace("PAN","Panama");
loc = loc.replace("PNG","Papua New Guinea");
loc = loc.replace("PRY","Paraguay");
loc = loc.replace("PER","Peru");
loc = loc.replace("PHL","Philippines");
loc = loc.replace("PCN","Pitcairn");
loc = loc.replace("POL","Poland");
loc = loc.replace("PRT","Portugal");
loc = loc.replace("PRI","Puerto Rico");
loc = loc.replace("QAT","Qatar");
loc = loc.replace("COG","Republic of the Congo");
loc = loc.replace("REU","Reunion");
loc = loc.replace("ROU","Romania");
loc = loc.replace("RUS","Russia");
loc = loc.replace("RWA","Rwanda");
loc = loc.replace("BLM","Saint Barthelemy");
loc = loc.replace("SHN","Saint Helena");
loc = loc.replace("KNA","Saint Kitts and Nevis");
loc = loc.replace("LCA","Saint Lucia");
loc = loc.replace("MAF","Saint Martin");
loc = loc.replace("SPM","Saint Pierre and Miquelon");
loc = loc.replace("VCT","Saint Vincent and the Grenadines");
loc = loc.replace("WSM","Samoa");
loc = loc.replace("SMR","San Marino");
loc = loc.replace("STP","Sao Tome and Principe");
loc = loc.replace("SAU","Saudi Arabia ");
loc = loc.replace("SEN","Senegal");
loc = loc.replace("SRB","Serbia");
loc = loc.replace("SCG","Serbia and Montenegro");
loc = loc.replace("SYC","Seychelles");
loc = loc.replace("SLE","Sierra Leone");
loc = loc.replace("SGP","Singapore");
loc = loc.replace("SXM","Sint Maarten");
loc = loc.replace("SVK","Slovakia");
loc = loc.replace("SVN","Slovenia");
loc = loc.replace("SLB","Solomon Islands");
loc = loc.replace("SOM","Somalia");
loc = loc.replace("ZAF","South Africa");
loc = loc.replace("SGS","South Georgia and the South Sandwich Islands");
loc = loc.replace("KOR","South Korea");
loc = loc.replace("SSD","South Sudan");
loc = loc.replace("ESP","Spain");
loc = loc.replace("LKA","Sri Lanka");
loc = loc.replace("SDN","Sudan");
loc = loc.replace("SUR","Suriname");
loc = loc.replace("SJM","Svalbard and Jan Mayen");
loc = loc.replace("SWZ","Swaziland");
loc = loc.replace("SWE","Sweden");
loc = loc.replace("CHE","Switzerland");
loc = loc.replace("SYR","Syria");
loc = loc.replace("TWN","Taiwan");
loc = loc.replace("TJK","Tajikistan");
loc = loc.replace("TZA","Tanzania");
loc = loc.replace("THA","Thailand");
loc = loc.replace("TGO","Togo");
loc = loc.replace("TKL","Tokelau");
loc = loc.replace("TON","Tonga");
loc = loc.replace("TTO","Trinidad and Tobago");
loc = loc.replace("TUN","Tunisia");
loc = loc.replace("TUR","Turkey");
loc = loc.replace("TKM","Turkmenistan");
loc = loc.replace("TCA","Turks and Caicos Islands");
loc = loc.replace("TUV","Tuvalu");
loc = loc.replace("VIR","U.S. Virgin Islands");
loc = loc.replace("UGA","Uganda");
loc = loc.replace("UKR","Ukraine");
loc = loc.replace("ARE","United Arab Emirates");
loc = loc.replace("GBR","United Kingdom");
loc = loc.replace("USA","United States");
loc = loc.replace("UMI","United States Minor Outlying Islands");
loc = loc.replace("URY","Uruguay");
loc = loc.replace("UZB","Uzbekistan");
loc = loc.replace("VUT","Vanuatu");
loc = loc.replace("VAT","Vatican");
loc = loc.replace("VEN","Venezuela");
loc = loc.replace("VNM","Vietnam");
loc = loc.replace("WLF","Wallis and Futuna");
loc = loc.replace("ESH","Western Sahara");
loc = loc.replace("YEM","Yemen");
loc = loc.replace("ZMB","Zambia");
loc = loc.replace("ZWE","Zimbabwe");

return loc;

}


  