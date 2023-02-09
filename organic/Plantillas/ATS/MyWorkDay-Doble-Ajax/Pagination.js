 // PAGINATION ------------------>
 (function () {
    var out = {};
    if (typeof msg == "undefined")
      msg = function (x) {
        return x;
      };
    out["pass_it"] = pass_it;
    if (out["pass_it"].jobs_per_page <= 0) {
      out["has_next_page"] = false;
    } else {
      out["pass_it"].cont += 20;
      out["has_next_page"] = true;
    }
    return out;
  })();