//-----------------------------------------------------------------DATEAGO------------------------------------------------------
//dateAgo("2 months ago", " ",0,1)
function dateAgo($text, $char_separator, $position_value_DWMY, $position_word_DWMY){
    $numberDWMY = intval(trim(explode($char_separator,$text)[$position_value_DWMY]));
    $dayWeekMonthYear = trim(explode($char_separator, $text)[$position_word_DWMY]);
    $nDays = 0; 
      if((strpos(strtoupper($dayWeekMonthYear), "TODAY") !== FALSE) ||
         (strpos(strtoupper($dayWeekMonthYear), "NOW") !== FALSE)  || 
         (strpos(strtoupper($dayWeekMonthYear), "HOUR") !== FALSE) ){   $nDays=0; }
      if(strpos(strtoupper($dayWeekMonthYear), "YESTERDAY") !== FALSE){ $nDays=1; }
      if(strpos(strtoupper($dayWeekMonthYear), "DAY") !== FALSE){      $nDays=$numberDWMY; }
      if(strpos(strtoupper($dayWeekMonthYear), "WEEK") !== FALSE){      $nDays=$numberDWMY*7; }
      if(strpos(strtoupper($dayWeekMonthYear), "MONTH") !== FALSE){     $nDays=$numberDWMY*30; }
      if(strpos(strtoupper($dayWeekMonthYear), "YEAR") !== FALSE){      $nDays=$numberDWMY*365; }
    $datecreated = mktime(0,0,0,date("m"), date("d")-$nDays, date("Y"));
    $datecreated = date("m/d/Y", $datecreated);
  return $datecreated;
}
//-------------------------------------------------------------------------FORAMTO FECHA-------------------------------------------
  $posted = trim((String) $j["publishDate"]);
  $job['dateposted_raw'] = date("m/d/Y", strtotime($posted));
$closed = trim((String) $j["expiryDate"]);
$job['dateclosed_raw'] = date("m/d/Y", strtotime($closed));
//-------------------------------------------------------------FORMATO FECHA----------------------------------------------------
$originalDate = "Tue, 15 Jun 21 18:20:05 +0300";
//original date is in format YYYY-mm-dd
$timestamp = strtotime($originalDate); 
$newDate = date("m-d-Y", $timestamp );
print_r($newDate);
//--------------------------------------------------------------------FORMATO FECHA------------------------------------------------
$job['dateposted_raw'] = trim((String) $j["date"]);
$job['dateposted_raw'] = strftime("%m/%d/%Y",strtotime($job['dateposted_raw']));