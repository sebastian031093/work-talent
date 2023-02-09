(function() {
    var out = {};
    var job = {};
    var selector = "div#rightcol.col-xs-12.col-sm-6.col-md-8.rightcol";  
    
    /*for(const a of document.querySelectorAll("a, script, style")){
        a.remove();
    }*/
    
    document.querySelectorAll("a, script, style").forEach(item =>{
        item.remove();
    });
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Job Description', true);
    job.html = removeTextAfter(job.html, 'Qualifications', true);
    //job.html = cleanFromPointaToB_false(job.html,"Email This","term career");
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
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
  
  function cleanFromPointaToB_false(text,a,b){
    var a = text.indexOf(a), b = text.indexOf(b);
        if(a >-1 && b >-1){
          let a_b = text.slice(a,b);
          text = text.replace(a_b,"").trim();
        }
    return text;
  }