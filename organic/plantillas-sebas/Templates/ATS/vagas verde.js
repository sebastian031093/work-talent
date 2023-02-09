//extract 1
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('div[id="todasVagas"] > ul > li');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.reqid = elem.querySelector('a').href.split('/vagas/v').pop().split('/').shift().trim();
        job.title = elem.querySelector('h2').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.location = elem.querySelector('span[class="vaga-local"]').textContent.trim() + ', BR';
        if (elem.querySelector('span[class="data-publicacao"]').textContent.search('/') > -1) {
            job.dateposted_raw = elem.querySelector('span[class="data-publicacao"]').textContent.trim();
            job.dateposted_raw = job.dateposted_raw.split('/')[1] + '/' + job.dateposted_raw.split('/')[0] + '/' + job.dateposted_raw.split('/')[2];
        } else {
            job.dateposted_raw = elem.querySelector('span[class="data-publicacao"]').textContent.trim();
            job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 1, 2);
        }
        job.temp = 96;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();
function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
    if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
        var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    } else { var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1] };
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g) > -1) { nDays = 0; }
    if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
    if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
    if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
    if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
    if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
    var dateJob = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
    var get_date = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var dd = datePosted.getDate();                //devuelve el numero del dia del mes.
    var mm = datePosted.getMonth() + 1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    dateJob = mm + '/' + dd + '/' + yyyy;
    return dateJob;
}
//extract 2
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('section[id="lista-vagas-de-empresas"] > li');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.reqid = elem.querySelector('a').href.split('/vagas/v').pop().split('/').shift().trim();
        job.title = elem.querySelector('h2').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.location = elem.querySelector('span[class="vaga-local"]').textContent.trim() + ', BR';

        job.temp = 96;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();
//jodata
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];

    var full_html = document.querySelector('div[class="job-tab-content job-description__text texto"]');

    if (full_html) {

        for (const a of document.querySelectorAll('p')) {
            if (a.textContent.search(/HORÁRIO/i) > -1) {
                a.remove();
            }
            if (a.textContent.search('LOCAL') > -1) {
                a.remove();
            }
        }

        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe'];

        if (remove_selectors.length > 0) {
            remove_selectors.forEach(remove_selector => {
                for (const a of full_html.querySelectorAll(remove_selector)) {
                    a.remove();
                }
            });
        }
        if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
        if (typeof msg == "undefined") msg = console.log;

        job.html = full_html.innerHTML.trim();

        job.html = removeTextBefore(job.html, 'Descrição:', false);
        //job.html = removeTextAfter(job.html, '', true);

        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        if (job.jobdesc.length < 50) {
            job.html = " ";
            job.jobdesc = " ";
        }
    } else {
        job.html = " ";
        job.jobdesc = " ";
    }
    out["job"] = job;
    return out;

})();
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}