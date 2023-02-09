//---------------------------------1-----------------Paginacion--------------------------------------------
(function() {
  var out = {};

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function(x) { return x; };
  if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 1,
          "jobs": 0
      };
  } else {
      out["pass_it"] = pass_it;
  }

  if (out["pass_it"]["jobs"] > 9) {
    var url = "" +out["pass_it"].cont;
    out["pass_it"].cont += 1;
    window.location.href = url;
    out["has_next_page"] = true;
    out.wait = 5000;
  } else if(out["pass_it"]["jobs"] < 10){
    out["has_next_page"] = false;
  }



  out.waitFor = 'pre';
  out["wait"] = true;
  return out;
})();
//-----------------------------------------2----------------------------OTRO--------------------------------------------------------
(function() {
  var out = {};

  if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  if (out["pass_it"]["jobs"] == 50) {
    var url = "https://kering.wd3.myworkdayjobs.com/SaintLaurent/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont;
    //https://kering.wd3.myworkdayjobs.com/SaintLaurent/fs/searchPagination/318c8bb6f553100021d223d9780d30be/0?clientRequestID=fc5ddc7d16d944228fd7cb5b5616b4b1
    out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  return out;
})();



(function() {
  var out = {};

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function(x) { return x; };
  out["pass_it"] = pass_it;

  if (out["pass_it"]["cont"] >  out["pass_it"]["limit"]{
      var url = "https://unity.appointgroup.co.uk/api/search?dummy=0.6228052243132902&paginate=true&site=appointhealthcare.co.uk&page=" + out["pass_it"]["cont"];
  out["pass_it"].cont += 1;
  window.location.href = url;
  out["has_next_page"] = true;
  out.wait = 5000;
} else{
 out["has_next_page"] = false;
}



//out.waitFor = 'body';
out["wait"] = true;
return out;
})();