$multilocation = ",";

--------------------
//filtro empname

$location = trim((String) $j->location); 
$empname = trim((String) $j->company);
if($location!="" && strpos(strtoupper($empname), "SMITHS MEDICAL")===false 
&& strpos(strtoupper($empname), "YOUBAHN")===false 
&& strpos(strtoupper($empname), "YOUBAHN")===false
&& strpos(strtoupper($empname), "PRODICOM")===false){
  
  $job=array();
  $job['temp']=1;
  $job['title'] = (String) $j->title;
  $job['jobdesc'] = (String) $j->description;
  $job['html'] = $job['jobdesc'];
  $job['location'] = $location; 
  $job['url'] = (String) $j->url."?utm_source=neuvoo";
  $job['source_empname'] = $empname;
}

------------------

$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

 

$job=array();
$job['temp']=1;
$job['reqid'] = (String) $j->guid; 
$job['title'] = (String) $j->title; 
$job['url'] = (String) $j->;
$job['html']  = (String) $j->;
$job['jobdesc'] = strip_tags($job["html"]);
$job['location'] = $loc;
//$secondLast = array_slice(explode ( '_', (String) $j->link), -2, 1);
//$job['location'] = $loc; 
//$job['source_jobtype'] = (String) $j->jobtype;
//$job['source_empname'] = (String) $j->company;
//$job['source_apply_email'] = (String) $j->contactemail;
//$job['source_salary'] = (String) $j->salary;
$job['dateposted_raw'] = (String) $j->pubdate;
//$job['client_tag'] = (String) $j->category;


-------------------------------------------------------

$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

 

$job=array();
$job['temp']=96;
$job['reqid'] = (String) $j->guid; 
$job['title'] = (String) $j->title; 
//$job['html']  = (String) $j->JobDescription;
//$job['jobdesc'] = strip_tags($job["html"]);
$job['location'] = (String) $j->description; 
$job['location'] = explode("- ", $job['location']);
$job['location'] = $job['location'][1].', ' .$job['location'][0];
$job['location'] = ucfirst(strtolower($job['location']));
//$job['source_jobtype'] = (String) $j->jobtype;
$job['url'] = (String) $j->link;
//$job['source_empname'] = (String) $j->company;
//$job['source_apply_email'] = (String) $j->contactemail;
//$job['source_salary'] = (String) $j->salary;
$job['dateposted_raw'] = (String) $j->pubDate;
$job['dateposted_raw'] = explode(', ', $job['dateposted_raw'])[1];
$job['dateposted_raw'] = explode(' 00', $job['dateposted_raw'])[0];
$job['dateposted_raw'] = str_replace('Jan', '1', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Feb', '2', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Mar', '3', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Apr', '4', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('May', '5', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Jun', '6', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Jul', '7', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Aug', '8', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Sep', '9', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Oct', '10', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Nov', '11', $job['dateposted_raw']);
$job['dateposted_raw'] = str_replace('Dic', '12', $job['dateposted_raw']);
$job['dateposted_raw'] = explode(' ', $job['dateposted_raw'])[1] . '/' . explode(' ', $job['dateposted_raw'])[0] . '/' . explode(' ', $job['dateposted_raw'])[2];
//$job['dateclosed_raw'] = (String) $j->orangejobs:applybeforedate;
//$job['client_tag'] = (String) $j->category;

-----------
 

//Métodos básicos de PHP para XML spider

// Eliminar números de la locación
$loc = preg_replace('/[0-9]/i', '', $loc);

// Print

print_r($job['dateposted_raw']."\n");

//Replace

$loc = str_replace("Anywhere, ","", $loc);

//split

if(strpos($job['title'], '–')>-1){
    $htmltmp = explode("–", $job['title']);
    $job['title'] = $htmltmp[0];
  }

if(strpos($job['title'], "/")!== false){
$job['title'] = explode('/', $job['title'])[0];
}


if(strpos($job['location'], '–')>-1){
$htmltmp = explode("–", $job['location']);
$job['location'] = trim((String) $htmltmp[1]) . ", Brasil";
}

// condicional. Si existe la locación "x" la locación es "y". Como funciona el if(job.location.indexOf("")>-1{job.location = "";}) en javaScript 

if(strpos($job['location'], "Attleborough")!==false){$job['location'] = "North Attleborough, MA, United States";}


//  Cuando hay un tag dentro del otro
$job['source_jobtype'] = trim((String) $j->workingTimes->item); 


$city = trim((String) $j->location->city); 

// Filtrado de por fecha

$jobdate = trim((String) $j->date);
$valores = explode(' ', $jobdate);  //SE HACE EXPLODE POR ESPACIO
$jobdate = $valores[2]."/".$valores[1]."/".$valores[3];



// Limpiar etiquetas XML, PHP, HTML
$job['html']  = (String) $j->description;
$job['jobdesc'] = strip_tags($job["html"]);




$desc = trim((string) $j->description);
$desc = explode('stingDondeSeDeseaCortar', $desc)[0];

$job['html']  = $desc;
$job['jobdesc'] = strip_tags($job["html"]);


/////////////////////////////////////////////////////////

// Validación de fecha


$jobdate = trim((String) $j->date);
$valores = explode(' ', $jobdate);  //SE HACE EXPLODE POR ESPACIO
// month/day/year

$month = $valores[2];

if(strpos($month, "Jan")!== false){$month = "01";}
if(strpos($month, "Feb")!== false){$month = "02";}
if(strpos($month, "Mar")!== false){$month = "03";}
if(strpos($month, "Apr")!== false){$month = "04";}
if(strpos($month, "May")!== false){$month = "05";}
if(strpos($month, "Jun")!== false){$month = "06";}
if(strpos($month, "Jul")!== false){$month = "07";}
if(strpos($month, "Aug")!== false){$month = "08";}
if(strpos($month, "Sep")!== false){$month = "09";}
if(strpos($month, "Oct")!== false){$month = "10";}
if(strpos($month, "Nov")!== false){$month = "11";}
if(strpos($month, "Dec")!== false){$month = "12";}

$jobdate = $month."/".$valores[1]."/".$valores[3];


$job['dateposted_raw'] = $jobdate;

print_r($job['dateposted_raw']);



//////////////////////////////////////////

//20.2.2020 a 2/20/2020

$jobdate = trim((String) $j->updated);
$valores = explode('.', $jobdate);
$jobdate = $valores[1]."/".$valores[0]."/".$valores[2];
$job['dateposted_raw'] = $jobdate; 


///////////////////////////////////////

// Plantilla base

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
$job['reqid'] = (String) $j->id; 
$job['title'] = (String) $j->title; 
$job['html']  = (String) $j->description;
$job['jobdesc'] = strip_tags($job["html"]);
$job['location'] = $loc; 
$job['source_jobtype'] = (String) $j->jobtype;
$job['url'] = (String) $j->url;
$job['source_empname'] = (String) $j->company;
$job['source_apply_email'] = (String) $j->contactemail;
$job['source_salary'] = (String) $j->salary;
$job['dateposted_raw'] = (String) $j->date;
$job['client_tag'] = (String) $j->category;

 //print_r($job['dateposted_raw']."\n");

// Plantilla base 2

$city = trim((string) $j->city);
$state = trim((string) $j->state);
$country = trim((string) $j->country);
    
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();

$job['title'] = (String) $j->title; 
$job['url'] = (String) $j->url;
$job['location'] = $loc; 

$job['source_jobtype'] = (String) $j->jobtype;
$job['source_salary'] = (String) $j->salary;

$job['experienced_required'] = (String) $j->experience;

$job['dateposted_raw'] = (String) $j->date;

$job['source_empname'] = (String) $j->company;
$job['source_apply_email'] = (String) $j->contactemail;

$job['html']  = html_entity_decode((String) $j->description);
$job['jobdesc'] = strip_tags($job["html"]);

$job['temp']=1;


 //print_r($job['dateposted_raw']."\n");
//print_r($job);


//////////////////////////////////////////
//Ejemplo
//Si se desea validar un empname: 

$empname = trim((String) $j->{'company_name'});


if(strpos(strtoupper($empname), 'MOMMY JOBS ONLINE')===false){
  
$city = trim((string) $j->city);
$state = trim((string) $j->state);
    
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
$loc = implode(", ", $arrloc);

$loc = str_replace("Anywhere, ","", $loc); //Replace
  
$job=array();
$job['temp'] = 1;
$job['title'] = trim((String) $j->title);
$job['html']  = (String) $j->description;
$job['jobdesc'] = $job['html'];
$job['location'] = $loc;
  
  
  
$job['url'] = trim((String) $j->link);
$job['source_empname'] = $empname;
  

}

///////////////////////////////////////////////
