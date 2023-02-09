(function () {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "urls": []                //Colocar las urls
        };
    } else {
        out["pass_it"] = pass_it;
    }
    if (out["pass_it"]["urls"].length > 0) {
        var url = out["pass_it"].urls.shift();
        //msg(url);
        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out.waitFor = '';  // COLOCAR EL SELECTOR A ESPERAR
    return out;
})();