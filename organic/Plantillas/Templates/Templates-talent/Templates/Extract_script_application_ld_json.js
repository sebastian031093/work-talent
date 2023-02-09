// Step: Jobdata
if(document.querySelector('script[type="application/ld+json"]')){
    // Extract text on the script
    var html = document.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
    // convert text to json
    var json = JSON.parse(html);
    /*var html = document.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"").replace(/\=\"/gi,"='").replace(/\"\>/gi,"'>");
    var json = JSON.parse(html);*/
    var date = json.graph[1].datePublished.split("T").shift().split("-");
    job.dateposted_raw = date[1]+"/"+date[2]+"/"+date[0];
  }