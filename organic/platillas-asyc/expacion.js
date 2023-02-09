(function () {
  var out = {};
  var html_jobs = document.querySelectorAll(".jl");
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("a").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.location = elem.querySelector(".jc").textContent.trim();
    job.source_empname = elem.querySelector(".company").textContent.trim();
    job.reqid = elem.querySelector("a").href.split("=")[1].trim();
    job.temp = "1";
    var full_html = getDescription(job.url);
    var temp = document.createElement("div");
    temp.innerHTML = full_html;
    var desc = temp.querySelector("div.description");
    job.html = desc.innerHTML.trim();
    job.jobdesc = desc.textContent.trim();
    job.html = cleanHTML(job.html);
    job.jobdesc = cleanHTML(job.jobdesc);
    let newExp = newExpansions(job);
    newExp.forEach((newJob) => {
      jobs.push(newJob);
    });
    jobs.push(job);
  }
  out["jobs"] = jobs;
  return out;
})();
function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
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
function newExpansions(job) {
  let job1 = job;
  let newJobs = [];
  let newExpansion = {
    byLocs: ["La Prairie, QC", "Saint-Constant, QC", "Sainte-Catherine, QC"],
    byReqid: [
      {
        reqid: "10015",
        newTitles: [
          "Cariste de nuit",
          "Cariste (Forklift Driver)",
          "Cariste (nuit)",
        ],
      },
      {
        reqid: "10037",
        newTitles: [
          "Chef(fe) d'équipe",
          "Directeur d'équipe",
          "Directeur/Chef d'équipe",
        ],
      },
      {
        reqid: "10010",
        newTitles: ["Day worker", "Labourer (Day)", "Worker (Day)"],
      },
      {
        reqid: "10012",
        newTitles: [
          "Electro-Mechanical Assembly Technician",
          "Electro Mechanical Assembly Technician",
          "Electro Mechanical Manufacturing Technician",
        ],
      },
      {
        reqid: "10009",
        newTitles: [
          "Forklift Driver",
          "Driver (Forklift)",
          "Operator (Forklift)",
        ],
      },
      {
        reqid: "10011",
        newTitles: [
          "Mechanical Technician- Industrial",
          "Mechanic (Industrial)",
          "Industrial Mechanic Technician",
        ],
      },
      {
        reqid: "10003",
        newTitles: [
          "Opérateur de machine (quart de soir)",
          "Opérateur (soir)",
          "Opérateur(trice) de machine (soir)",
        ],
      },
      {
        reqid: "10006",
        newTitles: [
          "Électromécanicien(ne) industriel(le) - soir",
          "Mécanicien(ne) d’entretien industriel (soir)",
          "Électromécanicien(ne)/ Mécanicien(ne) (soir)",
        ],
      },
    ],
  };
  newExpansion.byLocs.forEach((newLoc) => {
    newJobs.push({
      ...job1,
      location: newLoc,
    });
  });
  newExpansion.byReqid.forEach((cExp) => {
    if (cExp.reqid == job1.reqid) {
      newExpansion.byLocs.forEach((newLoc) => {
        cExp.newTitles.forEach((newTitle) => {
          newJobs.push({
            ...job1,
            title: newTitle,
            location: newLoc,
          });
        });
      });
    }
  });
  return newJobs;
}


$expansions = array(
    "titles"=> array($job['title'],"Administraotr","Developer","Engineer","Support Lead","DBA Lead"),
    "locations" => array("Caracas, VE","Maracay, VE","Medellín, CO","Bogotá, CO","Santiago de Chile, CL","Lima, PE")
  );
  foreach($expansions["titles"] as $newTitle){
    foreach($expansions["locations"] as $newLoc){
      $arrayValues = array_values($job);
      $arrayKeys = array_keys($job);
      $joby = array_combine($arrayKeys, $arrayValues);
      $joby["title"] = $newTitle;
      $joby["location"] = $newLoc;
      $multi_jobs[]=$joby;
    }
  }