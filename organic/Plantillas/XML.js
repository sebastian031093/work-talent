  $title = trim((String) $j->title);
  $city = trim((string) $j->city);
  $state = trim((string) $j->state);
  $country = trim((string) $j->country);


  $arrloc=array();
  if($city) $arrloc[] = $city;
  if($state) $arrloc[] = $state;
  if($country) $arrloc[] = $country;
  $loc = implode(", ", $arrloc);


  $job=array();
  $job['temp'] = "test_04122019";
  $job['title'] = $title;
  $job['html']  = (String) $j->description;
  $job['jobdesc'] = $job['html'];
  $job['location'] = trim($loc);
  $job['location'] = str_replace("false, false,","",$job['location']);
  $job['url'] = trim((String) $j->url);
  // $job['source_empname'] = trim((String) $j->company);
  //$job['logo'] = trim((String) $j->employerLogo);

echo $job['title'] . "\n"; 






  $empname = trim((String) $j->company);
  $exceptions = array();
  $exceptions['empnames'] = 'Moscow Coffee|Quỳnh Hoa'; //Cadena de empnames a excluir
  $aux = explode("|",$exceptions['empnames']); //Explode de la cadena para luego escapar caracteres especiales
  foreach($aux as $e) $exceptions['empnames_quoted'][] = preg_quote($e); //preg_quote coloca barra invertida antes de cada caracter especial
  $exceptions['empnames'] = implode("|",$exceptions['empnames_quoted']);//Volvemos a construir la cadena procesada
  $exceptions['empnamefound'] = preg_match('/('.$exceptions['empnames'].')/ui', $empname);//Match de empnames a excluir: 1 = encontrado; 0 = no encontrado



  if($exceptions['empnamefound']===0){

    $title = trim((String) $j->title);
    $city = trim((string) $j->city);
    $state = trim((string) $j->state);
    $country = trim((string) $j->country);


    $arrloc=array();
    if($city) $arrloc[] = $city;
    if($state) $arrloc[] = $state;
    if($country) $arrloc[] = $country;
    $loc = implode(", ", $arrloc);


    $job=array();
    $job['temp'] = "test_04122019";
    $job['title'] = $title;
    $job['html']  = (String) $j-> description;
    $job['jobdesc'] = $job['html'];
    $job['location'] = trim($loc);
    $job['location'] = str_replace("false, false,","",$job['location']);
    $job['url'] = trim((String) $j->url);
    $job['logo'] = trim((String) $j->image);
    $job['dateposted_raw'] = $date;
    $job['dateclosed_raw'] = $expiry;

    $job['source_empname'] = $empname;





    //print_r ===> imprimir información
    print_r($job);

  }




$city = trim((string) $j->city);
    $state = trim((string) $j->state);
    $country = trim((string) $j->country);

 

    $arrloc=array();
    if($city) $arrloc[] = $city;
    if($state) $arrloc[] = $state;
    if($country) $arrloc[] = $country;
    $loc = implode(", ", $arrloc);

 

    $job=array();
    $job['temp']=1;
    //$job['title'] = (String) $j->title;
    //$job['dateposted_raw'] = (String) $j->date;

 

    /*$dateposted = $j->date;
    $start = strpos($dateposted, ',') + 1;
    $end = strrpos($dateposted, ':') - 5;
    $dateposted = trim(substr($dateposted, $start, $end - $start));
    $date = $dateposted;
    $date = date('d/m/Y', strtotime($date));
    $date = DateTime::createFromFormat('d/m/Y', $date);
    $datesave = $date->format('m/d/Y');
    $job['dateposted_raw'] = $datesave;*/

 

    //$job['html']  = (String) $j->description;
    //$job['jobdesc'] = $job['html'];
    //$job['location'] = $loc;
    //$job['source_jobtype'] = (String) $j->jobtype;
    //$job['url'] = (String) $j->url;
    //$job['source_salary'] = (String) $j->salary;
    //$job['source_empname'] = (String) $j->company;

 

    //print_r($job['dateposted_raw']."\n");




$job['title']=explode ("loonking", $job['title'])[0] ------> SPLIT

implode("", array);        --->es como un JOIN                                                                    strpos($city, "alberta")   --->Index of

str_replace("","",$candena); preg_replace("/gato/i","",$cadena);

foreach($array_loc as $loc)








$dateposted = $j->date;
$start = strpos($dateposted, ',') + 1;
$end = strrpos($dateposted, ':') - 5;
$dateposted = trim(substr($dateposted, $start, $end - $start));
$date = $dateposted;
$date = date('d/m/Y', strtotime($date));
$date = DateTime::createFromFormat('d/m/Y', $date);
$datesave = $date->format('m/d/Y');
$job['dateposted_raw'] = $datesav




$loc = preg_replace('/[0-9]/i', '', $loc);
 






