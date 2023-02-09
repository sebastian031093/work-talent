(function(){
  	var out = {};

  	msg(pass_it);
  	if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  	else 					out["pass_it"] = pass_it;
  	
  	out["has_next_page"] = true;
  	if(out["pass_it"]["heights"].length > 3){
     	var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
      	if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
          out["has_next_page"] = false;
    }
  	//var body = document.querySelector("#vacancies");
	//document.querySelector('div.scroll').scrollBy(0, document.body.scrollHeight);
 	scrollBy(0, document.body.scrollHeight);
  	out.waitFor = 'jscroll-inner';
  	out["wait"] = true;
  	out["pic"] 	= true;
  	out["html"] = true;
  	out["pass_it"]["heights"].push(document.querySelector('div.scroll').scrollHeight);
  	return out;
})();


