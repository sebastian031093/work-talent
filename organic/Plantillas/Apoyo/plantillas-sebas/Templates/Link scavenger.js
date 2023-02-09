(function () {
    var out = {};
    var linksSelector = "a[id*='cphContent_hrsbCompetitionPositionList_GridView1_lbtnPosition']";
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "urls": [],
            "links": document.querySelectorAll(linksSelector),
            "jobsite": true,
        };
    } else {
        out["pass_it"] = pass_it;
    }
    if (out["pass_it"].cont <= (out["pass_it"].links.length - 1)) {
        if (out["pass_it"].jobsite) {
            out["pass_it"].links[out["pass_it"].cont].click();
            out["pass_it"].jobsite = false;
            out["has_next_page"] = true;
            out.wait = true;
        }
        else {
            var url = window.location.href;
            out["pass_it"].urls.push(url);
            window.history.back();
            out["pass_it"].jobsite = true;
            out["has_next_page"] = true;
            out["pass_it"].cont++;
            out.waitFor = linksSelector;
        }
    }
    else {
        out["has_next_page"] = false;
        window.location.href = out["pass_it"].urls.shift();
    }
    return out;
})();