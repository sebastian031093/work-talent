job.dateposted_raw  = dateAgo(job.dateposted_raw.replace(/\s+/gi, ' ').trim(), " ", 0, 1);

function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
        var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
        if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g)>-1){nDays = 0;}
        if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
        if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
        if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
        if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
        if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}   
        var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
        var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
        var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
          //Obtengo dia mes y Año
        var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
        var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
        var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
        if (dd < 10){dd ='0'+dd;}
        if (mm < 10){mm ='0'+ mm;}
        dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }