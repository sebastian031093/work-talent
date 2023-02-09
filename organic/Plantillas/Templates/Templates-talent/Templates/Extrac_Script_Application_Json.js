(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("").textContent.trim();
      job.url = elem.querySelector("").href.trim();
      //job.reqid = elem.querySelector("").textContent.trim()
      //job.location = elem.querySelector("").textContent.trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      
  
      //
      var full_html = getHTML(job.url);
      var div = document.createElement("div");
      div.innerHTML = full_html
  
      if(div.querySelector('script[type="application/ld+json"]')){
        var html = div.querySelector('script[type="application/ld+json"]').textContent.trim().replace("@","");
        var json = JSON.parse(html);
        var date = json.graph[1].datePublished.split("T").shift().split("-");
        job.dateposted_raw = date[1]+"/"+date[2]+"/"+date[0]
      }
  
      job.temp = 1;
      jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  
  function getHTML(url){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false)
    let response = "";
    xhr.onload = () =>{
      if(xhr.status == 200)
        response = xhr.responseText;
    }
    xhr.send();
    return response
  }