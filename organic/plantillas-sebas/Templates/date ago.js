job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 0, 1);
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

/*
HOUR
NOW
TODAY
YESTERDAY
DAYS
WEEK
MONTH
YEAR 
*/

job.dateposted_raw = getDateFormat(job.dateposted_raw, " ", 0, 1, 2);
job.dateclosed_raw = getDateFormat(job.dateclosed_raw, " ", 0, 1, 2);
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
    let day = dateRaw.split(cut)[dayPosition].trim(),
        month = dateRaw.split(cut)[monthPosition].trim(),
        year = dateRaw.split(cut)[yearPosition].trim();
    day = day.replace(/rd|st|th|nd/, "").trim();
    if (day < 10 && day.length < 2) { day = "0" + day; }
    if (dateRaw.search(/[a-z]/gi) > -1) {
        //English, Dutch, French
        if (month.search(/ene|jan|january/i) > -1) { month = "01"; }
        if (month.search(/feb?v?|february|fév/i) > -1) { month = "02"; }
        if (month.search(/mar|march|maar/i) > -1) { month = "03"; }
        if (month.search(/apr|abr|april|avr/i) > -1) { month = "04"; }
        if (month.search(/may|mai|mei/i) > -1) { month = "05"; }
        if (month.search(/jun|june|juin/i) > -1) { month = "06"; }
        if (month.search(/jul|july|juil/i) > -1) { month = "07"; }
        if (month.search(/aug|ago|august|août/i) > -1) { month = "08"; }
        if (month.search(/sep|set|september/i) > -1) { month = "09"; }
        if (month.search(/oct|out|october|okt/i) > -1) { month = "10"; }
        if (month.search(/nov|november/i) > -1) { month = "11"; }
        if (month.search(/dec|dez|december|déc/i) > -1) { month = "12"; }
    }
    var datum = month + "/" + day + "/" + year;
    return datum;
}