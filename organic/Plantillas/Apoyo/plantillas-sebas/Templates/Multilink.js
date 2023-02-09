//Infinite Pagination
(function () {
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;
  var urls = []; //Declarar urls del multilink
  for (var x of document.querySelectorAll('table[id="CRCareers1_tblPageGroup2"] > tbody > tr > td > a')) {
    urls.push(x.href);
  }
  if (!pass_it["urls"]) {
    out["pass_it"] = {
      "currentUrl": 0,
      "urls": urls
    };
  } else {
    out["pass_it"] = pass_it;
  }
  window.location.href = urls[0];
  out.wait = true;
  return out;
})();
//Pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  if (typeof msg == "undefined") msg = function (x) { return x; };
  out["pass_it"]["currentUrl"] += 1;
  if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
    var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  out.wait = true;
  return out;
})();