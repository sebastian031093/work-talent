//---------------------myworkday actualizadooooo------------------------
(function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0,
            //"total_jobs":0,
            "expected_jobs": expected_jobs_str
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var jobs = json.body.children[0].children[0].listItems;
    var returnedJobs = [];
    for (i in jobs) {
        var job = {}; /*init*/
        job.title = jobs[i].title.instances[0].text.split("-")[0];
        if (job.title) {
                job.location = jobs[i].subtitles[1].instances[0].text.split("-").reverse().join(", "); 
                //job.location = jobs[i].subtitles[0].instances[0].text.split("-").reverse().join(", ");
            if (job.location.search(/[R]+[0-9]/) > -1) {
                job.location = jobs[i].subtitles[1].instances[0].text.split("-").reverse().join(", "); //.replace('More...','').trim(); 
            }
        }
        //if (job.location.includes('London')) {job.location=job.location+=''}
        //job.dateposted_raw = jobs[i].subtitles[2].instances[0].text.replace('Posted ','');
        //job.url = "https://wk.wd3.myworkdayjobs.com" + jobs[i].title.commandLink;
        job.url = window.location.protocol + "//" + window.location.hostname + jobs[i].title.commandLink;
        if (job.location) {
            //-----------DESCRIPTION---------
            var json = JSON.parse(getDescription(job.url));
            job.source_jobtype =json.body.children[1].children[1].children[1].imageLabel;
            job.dateposted_raw = json.body.children[1].children[1].children[0].imageLabel.replace("Posted","").trim();  
            job.dateposted_raw  =dateAgo(job.dateposted_raw.replace(/\s+/gi, ' ').trim(), " ",0, 1);
            //job.source_jobtype = json.body.children[1].children[1].children[1].imageLabel;
            job.html = json.openGraphAttributes.description;                    
            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            if (job.html.toLowerCase().indexOf("part time") > -1) { job.source_jobtype = "Part time"; }
            if (job.html.toLowerCase().indexOf("part-time") > -1) { job.source_jobtype = "Part time"; }
            if (job.html.toLowerCase().indexOf("full time") > -1) { job.source_jobtype = "Full time"; }
            if (job.html.toLowerCase().indexOf("full-time") > -1) { job.source_jobtype = "Full time"; }
            job.html = removeTextBefore(job.html, "Key responsibilities:", false);
            job.html = removeTextBefore(job.html, "Responsabilidades", false);
            job.html = removeTextBefore(job.html, "The decision to join a company is a big one", false);
            //job.html=removeTextBefore(job.html, "The decision to join" , false);
            job.html = removeTextAfter(job.html, "Harris is an Equal", true);
            job.html = removeTextAfter(job.html, "asdasdas", true);
            job.html = removeTextAfter(job.html, "Harris is an Equal Opportunity/Affirmative", true);
            job.html = removeTextAfter(job.html, "How to apply If you want to apply", true);
            job.html = removeTextAfter(job.html, "About our business", true);
            job.html = removeTextAfter(job.html, "Company Overview", true);
            job.html = removeTextAfter(job.html, "HOW TO APPLY", true);
            job.html = removeTextAfter(job.html, "How to Apply", true);
            job.html = removeTextAfter(job.html, "George Weston Limited recognizes", true);
            job.html = removeTextAfter(job.html, "George Weston Limited recognizes", true);
 
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);                             
            //----------------------------
            job.temp = 25;
            //msg(job.location)
            if (job.location.indexOf("More") > -1) {
                var json = JSON.parse(getDescription(job.url));
                var array = json.body.children[1].children[0].children;
                for (var i in array) {
                    var jobx = {};
                    jobx.source_jobtype =job.source_jobtype;
                    jobx.dateposted_raw =job.dateposted_raw;
                    if (!jobx.source_jobtype) {
                      if (array[i].iconName == 'JOB_TYPE') {
                        jobx.source_jobtype = array[i].imageLabel;
                      }
                    } 
                    if (!jobx.dateposted_raw) {
                      if (array[i].iconName == 'POSTED_DATE') {
                        jobx.dateposted_raw = array[i].imageLabel.replace("Posted","").trim();
                      }
                    }                                                                                        
                    if (array[i].iconName == 'LOCATION') {
                        jobx.title = job.title;
                        jobx.url = job.url;
                        jobx.location = array[i].imageLabel.replace(/1|2|3|4|5|6|7|8|9|0/gi, "");
                        jobx.location = jobx.location.replace('/', ', ') + "";
                        if (jobx.location.includes('GWL Office')) { jobx.location = "Toronto, Canada" }
                        jobx.temp = job.temp;
                        jobx.html = job.html;
                        jobx.jobdesc = job.jobdesc;                        
                        // msg(jobx)
                        returnedJobs.push(jobx);
                    }
                }
            } else {
                job.location = job.location.replace(/1|2|3|4|5|6|7|8|9|0/gi, ""); + '';
                job.location = job.location.replace('/', ', ') + "";
                if (job.location.includes('GWL Office')) { job.location = "Toronto, Canada" }
                returnedJobs.push(job);
            }
        }
    }
    //msg(jobs);
    //msg(returnedJobs.length);
    out["pass_it"].jobs = returnedJobs.length;
    //out["pass_it"].total_jobs = out["pass_it"].total_jobs + out["pass_it"].jobs;
    out["jobs"] = returnedJobs;
    return out;
})();
function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control", "no-cache");
    xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma", "no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}
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
    
//job.dateposted_raw  =dateAgo(job.dateposted_raw.replace(/\s+/gi, ' ').trim(), " ",0, 1);
function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
        var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
        if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g)>-1){nDays = 0;}
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
        if (mm < 10){mm ='0'+ mm;}
        dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }

//'----PAGINACION
(function() {
    var out = {};
    if (typeof msg == "undefined") msg = function(x) { return x; };
    out["pass_it"] = pass_it;
    if (out["pass_it"].expected_jobs <= (out["pass_it"].cont + 50)) {
        out["has_next_page"] = false;
    } else if (out["pass_it"].jobs > 0) {
        out["pass_it"].cont += 50;
        var url = "https://myview.wd3.myworkdayjobs.com/george_weston/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont;
        //msg(url);
        window.location.href = url;
        out["has_next_page"] = true;
    }
    out.waitFor = 'pre';
    return out;
})();






if(typeof loc != 'undefined'){
    if(loc.indexOf("(")>0){
      job.location = loc.substring(loc.indexOf(""), loc.lastIndexOf("(")).trim();                  
    }else{
      job.location = loc;
    }
  }  
  job.location = job.location.split("More...").join("").split("-").reverse().join(", ");;

  job.title = job.title.replace("( Remote )","");
  job.title = job.title.replace("( remote )","");