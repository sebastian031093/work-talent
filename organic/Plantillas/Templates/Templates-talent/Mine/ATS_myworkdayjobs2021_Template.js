// Nota: solo se debe colocar el enlace del JSON GET en el spider info hasta el número del cliente o "clientRequestID="
// con su número incluído

// ATS myworkdayjobs - Multi-location AJAX 
{
    "options": {
    "inactivateJQuery": false,
    "ignoreLoadErrors": false,
    "waitForPageLoadEvent": true,
    "waitForResources": false
    },
    "noimage": true,
    "skipResources": false,
    "noUnnecessaryResources": false
    }
    
    /* Expected jobs */
    (function() {
        var out = {};
        
          var regex = /\d+/;
        
          if (typeof msg === 'undefined') msg = console.log;
        
          var element = document.querySelector("pre").textContent;
          var json = JSON.parse(element);
          var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;
      
          var expected_jobs = regex.exec(expected_jobs_str)[0];
        
          out["expected_jobs"] = expected_jobs;
      
          return out;
      })();
      
      /* Before extract*/
      (function() {
        var out = {};
         try{      
           var element = document.querySelector("pre").textContent;
           if(!element){
            out["has_next_page"] = false;
           }
          //msg(element);
           var json = JSON.parse(element);
           var jobs = json.body.children[0].children[0].listItems;
           out["json"] = jobs;
         }catch(error){
            out["wait"] = 500;
           
         }
        
          return out;
    })();
    
    /* Extract */
    (function() {
        var out = {};   
        if(typeof pass_it == "undefined") pass_it = {}; 
        if (!pass_it["cont"]) {
          out["pass_it"] = {
            "cont": 50,
            "jobs": 0
          };
        } else {
          out["pass_it"] = pass_it;
        }
      
        var element = document.querySelector("pre").textContent;
        var json = JSON.parse(element);
        var jobs = json.body.children[0].children[0].listItems; //json.body.children[1].children[0].listItems;
      
        var returnedJobs = [];  
        for(var j in jobs) {
          var job = {};      
          job.title = jobs[j].title.instances[0].text;
          job.url   = window.location.protocol + "//" + window.location.hostname + jobs[j].title.commandLink;
          var dateposted = jobs[j].subtitles[2].instances[0].text.replace(/Posted|Ago/ig,'').trim();
          job.dateposted_raw = dateAgo(dateposted, ' ', 0, 1);
          job.temp = "2020";
          if (job.title.length > 1){
            var json_desc = JSON.parse(getDescription(job.url));
            var array = json_desc.body.children[1].children[0].children;
      
            for(var i in array){
              if(array[i].iconName == 'LOCATION'){
                var jobx = {};          
                jobx.title    = job.title;
                jobx.url      = job.url; 
                jobx.location = array[i].imageLabel;     
                jobx.dateposted_raw = job.dateposted_raw;
                jobx.temp      = job.temp;   
                //msg(jobx)
                if(jobx.title.indexOf('Open application') > -1) {jobx.title = '';}
                if(jobx.title.length > 0){
                  returnedJobs.push(jobx);
                }
                // returnedJobs.push(jobx);
              }
            }
          }
      
        }
        //    msg(jobs);
        //    msg(returnedJobs.length);
      
        out["pass_it"]["jobs"] = returnedJobs.length;
        out["jobs"]= returnedJobs;
        return out;
      })();
      
      function getDescription(url) {
        var xhrrequest = new XMLHttpRequest();
        xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
        xhrrequest.setRequestHeader("Accept","application/json,application/xml");
        xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
        xhrrequest.setRequestHeader("Cache-Control","no-cache");
        xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhrrequest.setRequestHeader("Pragma","no-cache");
        var response = "";
        xhrrequest.onreadystatechange = function() {
          if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
          {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
          }
        };
        xhrrequest.send(); 
        return response;
      }
      //Function convert ago to date
      function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
        var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
        if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
          var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
          }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
        var date_Now = new Date();  //declaro un objeto tipo fecha
        var nDays = 0;
        if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
        if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
        if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
        if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
        if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
        if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
        var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
        var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
        var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
        //Obtengo dia mes y Año
        var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
        var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
        var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
        if (dd < 10){dd ='0'+dd;}
        if (mm<10){mm ='0'+ mm;}
        dateJob= mm +'/'+dd+'/'+yyyy;
        return dateJob;
      }
      
      /* Pagination*/
      (function() {
        var out = {};
        if(typeof pass_it == "undefined") pass_it = {};
        if(typeof msg == "undefined") msg = function(x){return x;};
      
        if (!pass_it["cont"]) {
          out["pass_it"] = {
            "cont": 50,
            "jobs": 0
          };
        } else {
          out["pass_it"] = pass_it;
        }
      
        var meineJSON = getDescription();   // se registra el JSON en una variable
        var meineObj  = JSON.parse(meineJSON); // Se parsea el JSON 
        // meineObj  = meineObj;              // Se ontiene el valor que se desea del mismo
      
        var expected = meineObj.body.children[0].facetContainer.paginationCount.value;
      
        var lastPageNumber = expected;
        lastPageNumber = Number(lastPageNumber);
        lastPageNumber = lastPageNumber/50;
        lastPageNumber = lastPageNumber.toFixed(0);
        lastPageNumber = lastPageNumber * 50;
      
        var dom             = window.location.protocol + "//" + window.location.hostname; 
        var pagConstant     = window.location.pathname.split("be/").shift() + "be/"; 
        var clientRequestID = window.location.href.split("clientRequestID=").pop().trim();
      
        var url = dom + pagConstant  + out["pass_it"].cont + "?clientRequestID=" + clientRequestID;
      
        msg(lastPageNumber);
        // msg("be/" + lastPageNumber);
      
        if (out["pass_it"]["jobs"] > 0 && url.indexOf("be/" + lastPageNumber)==-1) {
          out["pass_it"].cont += 50;
          window.location.href = url;
          out["has_next_page"] = true;
        } else {
          out["has_next_page"] = false;
        }
        return out;
      })();
      
      function getDescription(url) {
        var xhrrequest = new XMLHttpRequest();
        xhrrequest.open("GET", window.location.origin + window.location.pathname.split("/fs").shift().trim() + "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/0", false); //URL del ajax que trae la información del job
      
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
       
       /* Description*/
       
    (function() {
        var out = {};
        var job = {};
        
        var selector = ".GWTCKEditor-Disabled:eq(1)";
       
        var full_html = $(selector);
        
          
          //---------INFO-------------------------------------
      
           var html_2 = $("#workdayApplicationFrame").text(); 
       
          
          if(html_2.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
          if(html_2.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
          if(html_2.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
          if(html_2.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}
          /*
          if(html_2.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){
          if(html_2.search(/CV|resume|cover letter|apply|curriculum/gi)>-1){
           job.source_apply_email = job.html_2.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0]; }
          */
        
      
      
          //job.location       = $("").text().trim();
          //job.source_jobtype = $("").text().trim();
      
          //job.source_empname = $("").text().trim();
          //job.logo           = $("").attr("src");
      
          //job.source_salary  = $("").text().trim();
      
      
      
            /*----------DATE-POSTED----------------------------
                
            var datum = $("").text().trim();
           
            var cut   = "";
      
            var day   =  datum.split(cut)[0];
            var month =  datum.split(cut)[1];
            var year  =  datum.split(cut)[2];
                
            job.dateposted_raw  = month +"/"+  day +"/"+ year;
      
            /*-------------------------------------------------*/
      
           
        
       //---------REMOVE---------------------------------------
          full_html.find("div[id^=labeledImage]").remove().end().html();
          full_html.find("li:has(button)").remove().end().html();
          full_html.find('a').remove().end().html();
          full_html.find('style, script').remove().end().html();
          full_html.find('input, img, button').remove().end().html();
          full_html.find('div.alert, form').remove().end().html();
         
          full_html.find("h1").remove().end().html();
      
          full_html.find("footer").remove().end().html();
          full_html.find("li:has(svg)").remove().end().html();
          full_html.find("ul.WGYM.WIYM, .wd-player-media").remove().end().html();
          //
          
      
         // full_html.find("li:first").remove().end().html();
          //full_html.find("").remove().end().html();
      
          //full_html.find("p:contains()").remove().end().html();
          //full_html.find("p:contains()").remove().end().html();
          //full_html.find("p:contains()").remove().end().html();
          //full_html.find("p:contains()").remove().end().html();
      
       //----------------------------------------------------- 
        
        var full_html = full_html.html();
        
         job.html     = full_html.trim();
       
        job.html = removeTextBefore(job.html, "Position Summary", false);
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextBefore(job.html, "", false);
        
        //job.html = removeTextAfter(job.html, "", false);
        //job.html = removeTextAfter(job.html, "", false);
        //job.html = removeTextAfter(job.html, "", false);
        //job.html = removeTextAfter(job.html, "", false);
        
        //job.html = job.html.split("")[0];
        //job.html = job.html.split("")[0];
        //job.html = job.html.split("")[0];
        //job.html = job.html.split("")[0];
      
        //job.html = job.html.replace("","");
        //job.html = job.html.replace("","");
        //job.html = job.html.replace("","");
        //job.html = job.html.replace("","");
        
      
      
      
        //CLEAN EMOJIS
        //job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
        
      
        job.html      = cleanHTML(job.html);
        job.jobdesc   = job.html;
        
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






      //Sacar fecha 
      var dateJobtype = Array.from(document.querySelectorAll("div[id *=promptOption-gwt-uid-"))
.map(item => item.textContent)
.filter(item => item.search(/posted|(part|full|vol|deel)(\_|\-|\s)?(time|tijd)/ig) > -1);
if(dateJobtype.length > 0) {
  for(let i = 0; i < dateJobtype.length; i++) {
      if (dateJobtype[i].search(/posted/gi) > -1) var dateRaw = dateJobtype[i].replace(/\+|posted|ago/gi, "").trim();
      if (dateRaw && dateRaw.search(/today|yesterday/gi) === -1) {
        job.dateposted_raw = dateAgo(dateRaw," ", 0, 1);
      }
      else if (dateRaw.search(/today/gi) > -1) {
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var year = now.getFullYear();
        job.dateposted_raw = month + "/"+ day + "/" + year;
      }
      else if (dateRaw.search(/yesterday/gi) > -1) {
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate() - 1;
        var year = now.getFullYear();
        job.dateposted_raw = month + "/"+ day + "/" + year;
      }
      if (dateJobtype[i].search(/(part|full|vol|deel)(\_|\-|\s)?(time|tijd)/ig) > -1) job.source_jobtype = dateJobtype[i]; 
  }
}
// Date ago function, put it at the end of the file...
function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY){  
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
        if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR|HORAS|NOW|VANDAAG|UUR/g)>-1){nDays = 0;}
        if (dayWeekMonthYear.toUpperCase().search(/YESTERDAY|AYER|GISTEREN/)>-1) {nDays = 1;}
        if (dayWeekMonthYear.toUpperCase().search(/DAYS|DIAS|DAGEN|DAY|DIA|DAG/)>-1){nDays = numberDWMY;}
        if (dayWeekMonthYear.toUpperCase().search(/WEEKS|SEMANAS|WEKEN|WEEK|SEMANA/)>-1){nDays = numberDWMY * 7;}
        if (dayWeekMonthYear.toUpperCase().search(/MONTH|MESES|MAANDEN|MAAD|MES|MONTHS/)>-1){nDays = numberDWMY * 30;}
        if (dayWeekMonthYear.toUpperCase().search(/YEAR|AÑOS|JAAR|AÑO|YEARS/)>-1){nDays = numberDWMY * 365;}
        var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
        var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
        var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
        //Obtengo dia mes y año
        var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
        var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
        var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
        if (dd < 10){dd ='0'+dd;} // dd<10?'0'+dd:dd;
        if (mm<10){mm ='0'+ mm;} //mm<10?'0'+mm:mm;  
        dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }