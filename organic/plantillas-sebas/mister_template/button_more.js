
(function () {
  var out = {};
  // Crea un div para darle altura a la pagina
  var ref = document.querySelector('div[class="job-post-row jb-transition"]'); //Selector que contiene los jobs 
  var newEle = document.createElement('div');
  ref.appendChild(newEle);
  newEle.style.height = '800000px' // para darle altura a la pagina 
  msg(pass_it);
  if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  else 					out["pass_it"] = pass_it;

  out["has_next_page"] = true;
  if(out["pass_it"]["heights"].length > 3){
    var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
    if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
      out["has_next_page"] = false;
  }
  	window.scrollBy(0, document.body.scrollHeight);
  
  out["wait"] = true;
  out["pic"] = true;
  out["html"] = true;
  out["pass_it"]["heights"].push(document.querySelectorAll('div[class="job-post-row jb-transition"]').length);//Selector de los JOBS
  return out;
})();

