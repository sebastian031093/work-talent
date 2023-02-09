    // DatePostedRaw  

    var timePosted = elem.querySelector("li.results-posted-at").innerText;
    
    
    if(timePosted.search(/hour/)>-1){

      let today   = new Date(),
          current_day   = today.getDate(),
          current_month = (today.getMonth()+1),
          current_year  = today.getFullYear();

      job.dateposted_raw  = current_month +"/"+  current_day +"/"+ current_year;
    }

    if(timePosted.search(/month|day/i)>-1){
        
  
            if(timePosted.search(/day/)>-1){

              var days_ago = timePosted;
                  days_ago = days_ago.replace(/[a-z]/gi,"");
                  days_ago = Number(days_ago);
             }

           if(timePosted.search(/month/)>-1){

            var month_to_days = timePosted.replace(/[a-z]/gi,"");
                month_to_days = Number(month_to_days);
                month_to_days = month_to_days * 30;
               var days_ago = month_to_days;

          }
          var currentDate = new Date();

          var day = currentDate.getDate();
              day = day - days_ago;
          currentDate.setDate(day);

          var postedDate = currentDate; // postedDate == fecha actual - los días de publicados 

          var postedDay   = postedDate.getDate(),
              postedMonth = postedDate.getMonth() + 1,
              postedYear  = postedDate.getFullYear();

          if(postedMonth < 10){postedMonth = "0" + postedMonth;} 
          if(postedDay < 10){postedDay = "0" + postedDay;} 

          job.dateposted_raw  =  postedMonth + "/" + postedDay + "/" + postedYear; // Formato de fecha para indexación. 
    }  



    // Date closed raw

      var timeToExpire = elem.querySelector("div.cardFooterLeft div.contentText.jsContentText p").innerText;
    
    
    if(timeToExpire.search(/hour/)>-1){

      let today   = new Date(),
          current_day   = today.getDate(),
          current_month = (today.getMonth()+1),
          current_year  = today.getFullYear();

      job.dateclosed_raw  = current_month +"/"+  current_day +"/"+ current_year;
    }

    if(timeToExpire.search(/month|day|week/i)>-1){

          if(timeToExpire.search(/week/)>-1){

            var week_to_days = timeToExpire.replace(/[a-z]/gi,"");
                week_to_days = Number(week_to_days);
                week_to_days = week_to_days * 7;
                var days_Left = week_to_days;

          }
        
  
            if(timeToExpire.search(/day/)>-1){

              var days_Left = timeToExpire;
                  days_Left = days_Left.replace(/[a-z]/gi,"");
                  days_Left = Number(days_Left);
             }

           if(timeToExpire.search(/month/)>-1){

            var month_to_days = timeToExpire.replace(/[a-z]/gi,"");
                month_to_days = Number(month_to_days);
                month_to_days = month_to_days * 30;
                var days_Left = month_to_days;

          }

          var currentDate = new Date();

          var day = currentDate.getDate();
              day = day + days_Left;
          currentDate.setDate(day);

          var closedDate = currentDate; // closedDate == fecha actual + los días de publicados 

          var closedDay   = closedDate.getDate(),
              closedMonth = closedDate.getMonth() + 1,
              closedYear  = closedDate.getFullYear();

          if(closedMonth < 10 && closedMonth.length <2){closedMonth = "0" + closedMonth;} 
          if(closedDay < 10 && closedDay.length <2){closedDay = "0" + closedDay;} 

          job.dateclosed_raw  =  closedMonth + "/" + closedDay + "/" + closedYear; // Formato de fecha para indexación. 
    }  
