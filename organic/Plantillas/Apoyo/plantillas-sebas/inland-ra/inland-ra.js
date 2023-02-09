//----------before------------
(function() {
let out = {};
if (typeof pass_it == "undefined") pass_it = {};
if (!pass_it["cont"]) {
  out["pass_it"] = {
      cont: 0,
      totalJobs: 0,
      jobs: []
    }
}
else {
  out["pass_it"] = pass_it;
}
let container = Array.from(document.querySelectorAll(".vacancy-container")); // Main job container
msg(container.length);
if (out["pass_it"].totalJobs === 0) {
  let jobs = [];// This will contain all the extracted jobs
for(let i = 0; i < container.length; i++){
  let job = {};
  var elem = container[i];
  job.title = elem.querySelector('h2').textContent.trim();
  job.url = window.location.href.trim();
  job.location = elem.querySelector('.map-button').textContent.trim();
  job.reqid = elem.querySelector("div > div > span").textContent.trim();
  job.source_jobtype = elem.querySelector("div > div:nth-child(2)").textContent.trim();
  job.source_salary = elem.querySelector("div:nth-child(5) > div ").textContent.trim();
  if (!job.location) {
    job.location = "London, GB";
  }
  job.temp = 1;
  jobs.push(job);
} 
out["pass_it"].jobs = jobs;
out["pass_it"].totalJobs = jobs.length;
container[out["pass_it"].cont].click();
}
else {
container[out["pass_it"].cont].click();
msg("Clicked Job = "  + out["pass_it"].jobs[out["pass_it"].cont].title);
} 
out.waitFor ="div[data-bind=\"html: postingDescription\"]";
return out;
})();
//--------------extract--------
(function() {
var out = {};
var jobs = [];
var selector = "div[data-bind=\"html: postingDescription\"]";
out["pass_it"] = pass_it;
var job = out["pass_it"].jobs[out["pass_it"].cont];
//var remove_selectors = ["a","script","style","input","button"];
//var job = pass_it["job"];
var full_html = document.querySelector(selector);
// remove something from the jobdatata
if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
if (typeof msg == "undefined") msg = console.log;
if (full_html) {
  job.html      = full_html.innerHTML.trim();
  var emailRegex = /[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}/i;
  if (job.html.search(emailRegex) > -1) job.source_apply_email = job.html.match(emailRegex)[0].trim();
  job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|https?:\/\/\S+|loading.?.?.?/gi, "");
  //job.html = removeTextBefore(job.html, 'Descrição', false);
  job.html = removeTextAfter(job.html, ' Apply today', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc); 
}
else {
    job.title += " => Invalid job";
    job.url = "";
    job.html = "";
    job.jobdesc= "";  
}     
window.location.href = "https://thevine.wshgroup.co.uk/portal.php?site=applicantPortal&page=vacanciesPortico&filter=LEAD";
jobs.push(job);
out["jobs"] = jobs;
out.waitFor = ".vacancy-container";
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
//paginacion
(function() {
  var out = {};
out["pass_it"] = pass_it;
if (out["pass_it"].cont < (out["pass_it"].totalJobs -1)) {
  out["pass_it"].nextPage = false;
  out["pass_it"].cont += 1;
  out["has_next_page"] = true;
  msg("Another Job");
}
  //stop condition
else {
  var next_page_selector = "a#pagina-next"; //selector to identify the next button
    var last_page_selector = "a#pagina-next[disabled]"; //selector to identify the last page
  var clickable_elem = document.querySelector(next_page_selector);
  //stop condition
  if (!clickable_elem) {
      //last page
    msg("PAGINATION's END");
      out["has_next_page"] = false;
    } else {
      //go to next page
    msg("Another page");
      out["pass_it"].cont = 0;
      out["pass_it"].totalJobs = 0;
        clickable_elem.click();
      out["has_next_page"] = true;
  }
}
  msg(out["pass_it"].cont);
  out.html = true;
  out.pic = true;
  out.wait = true;
  return out;
})();