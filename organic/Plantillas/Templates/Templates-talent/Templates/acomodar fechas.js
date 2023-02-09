if(elem.querySelector("dl > dd:nth-child(8)")){
	  var date = elem.querySelector("dl > dd:nth-child(8)").textContent.trim().split(' ');
	
      var day = date[0];
      var month = date[1];
      if(month.toLowerCase().indexOf("jan")>-1){month = "1";}
      if(month.toLowerCase().indexOf("fév")>-1){month = "2";}
      if(month.toLowerCase().indexOf("mar")>-1){month = "3";}
      if(month.toLowerCase().indexOf("avr")>-1){month = "4";}
      if(month.toLowerCase().indexOf("mai")>-1){month = "5";}
      if(month.toLowerCase().indexOf("juin")>-1){month = "6";}
      if(month.toLowerCase().indexOf("juil")>-1){month = "7";}
      if(month.toLowerCase().indexOf("août")>-1){month = "8";}
      if(month.toLowerCase().indexOf("sep")>-1){month = "9";}
      if(month.toLowerCase().indexOf("oct")>-1){month = "10";}
      if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
      if(month.toLowerCase().indexOf("déc")>-1){month = "12";}
      var year = date[2];
      job.dateposted_raw = day+'/'+month+'/'+year;
      //job.dateclosed_raw = elem.querySelector("dl > dd:nth-child(8)").textContent.trim();
      
    }

    /////// INGLES ////////
    var day = date[0];
    var month = date[1];
    if(month.toLowerCase().indexOf("jan")>-1){month = "1";}
    if(month.toLowerCase().indexOf("feb")>-1){month = "2";}
    if(month.toLowerCase().indexOf("mar")>-1){month = "3";}
    if(month.toLowerCase().indexOf("apr")>-1){month = "4";}
    if(month.toLowerCase().indexOf("may")>-1){month = "5";}
    if(month.toLowerCase().indexOf("jun")>-1){month = "6";}
    if(month.toLowerCase().indexOf("jul")>-1){month = "7";}
    if(month.toLowerCase().indexOf("aug")>-1){month = "8";}
    if(month.toLowerCase().indexOf("sep")>-1){month = "9";}
    if(month.toLowerCase().indexOf("oct")>-1){month = "10";}
    if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
    if(month.toLowerCase().indexOf("dec")>-1){month = "12";}
    var year = date[2];
    job.dateposted_raw = month+'/'+day+'/'+year;

    ////// ALEMAN ///////
    var day = date[0];
      var month = date[1];
      if(month.toLowerCase().indexOf("jan")>-1){month = "1";}
      if(month.toLowerCase().indexOf("feb")>-1){month = "2";}
      if(month.toLowerCase().indexOf("mär")>-1){month = "3";}
      if(month.toLowerCase().indexOf("apr")>-1){month = "4";}
      if(month.toLowerCase().indexOf("mai")>-1){month = "5";}
      if(month.toLowerCase().indexOf("jun")>-1){month = "6";}
      if(month.toLowerCase().indexOf("jul")>-1){month = "7";}
      if(month.toLowerCase().indexOf("aug")>-1){month = "8";}
      if(month.toLowerCase().indexOf("sep")>-1){month = "9";}
      if(month.toLowerCase().indexOf("okt")>-1){month = "10";}
      if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
      if(month.toLowerCase().indexOf("dez")>-1){month = "12";}
      var year = date[2];
      job.dateposted_raw = month+"/"+day+"/"+year  

    /// DUTCH ////
    var day = date[0];
      var month = date[1];
      if(month.toLowerCase().indexOf("jan")>-1){month = "1";}
      if(month.toLowerCase().indexOf("feb")>-1){month = "2";}
      if(month.toLowerCase().indexOf("maa")>-1){month = "3";}
      if(month.toLowerCase().indexOf("apr")>-1){month = "4";}
      if(month.toLowerCase().indexOf("mei")>-1){month = "5";}
      if(month.toLowerCase().indexOf("jun")>-1){month = "6";}
      if(month.toLowerCase().indexOf("jul")>-1){month = "7";}
      if(month.toLowerCase().indexOf("aug")>-1){month = "8";}
      if(month.toLowerCase().indexOf("sep")>-1){month = "9";}
      if(month.toLowerCase().indexOf("okt")>-1){month = "10";}
      if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
      if(month.toLowerCase().indexOf("dec")>-1){month = "12";}
      var year = date[2];
      job.dateposted_raw = month+"/"+day+"/"+year  