(function() {
  var out = {};
  if (typeof msg == "undefined") msg = function(x) { return x; };
  out["pass_it"] = pass_it;
  if (out["pass_it"].expected_jobs <= (out["pass_it"].cont + 50)) {        
    out["has_next_page"] = false;
  } else if (out["pass_it"].jobs > 0) {
    out["pass_it"].cont += 50;     
    out["has_next_page"] = true;
  }  
  out.waitFor = 'pre';
  out.wait= true;
  return out;
})();