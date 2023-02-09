<?php

//simple extrac
//printDebug($j);
$city = trim((string) $j["city"]);
$state = trim((string) $j["state"]);
$country = trim((string) $j["country"]);
$arrloc = array();
if ($city) $arrloc[] = $city;
if ($state) $arrloc[] = $state;
if ($country) $arrloc[] = $country;
// Delete positions that includes "Array"
foreach ($arrloc as $key => $validate) {
  if (trim($validate) === "Array") {
    unset($arrloc[$key]);
  }
}
//--------------------------------------//
$loc = implode(", ", $arrloc);
$job = array();
$job['title'] = trim((string) $j["title"]);
$job['url'] = trim((string) $j["url"]);
$job['source_empname'] = trim((string) $j["company"]);
$job['location'] = $loc;
$job['source_location'] = $loc;
$job['source_city'] = $city;
$job['source_state'] = $state;
$job['source_country'] = $country;
$job['source_ppc'] = trim((string) $j["cpc"]); //sponsored
$job['source_salary'] = trim((string) $j["salary"]);
$job['client_tag'] = trim((string) $j["category"]);
$job['source_benefit'] = trim((string) $j["benefit"]);
$job['experience_required'] = trim((string) $j["experience"]);
$job['job_pixel'] = (string) $j["tracking_url"];
$job['source_jobtype'] = trim((string) $j["jobtype"]);
$job['reqid'] = trim((string) $j["referencenumber"]);
$job['logo'] = trim((string) $j["logo"]);
$job['html'] = (string) $j["description"];
$job['jobdesc'] =  tools::stripTags($job['html']); /* strip_tags($job['html']); */
$job['temp'] = "1";
// Replace "Array" in variables that include it
foreach ($job as $key => $validate) {
  if (trim($validate) === "Array") {
    $job[$key] = "";
  }
}
//---------------------------------------------//

$job['html'] = preg_replace('/&lt;/', '<', $job['html']);
$job['html'] = preg_replace('/&gt;/', '>', $job['html']);
$job['html'] = html_entity_decode($job['html'], ENT_QUOTES | ENT_XML1, 'UTF-8');

//////////////////extrac con taga anidas y atributos, reucerda usar el JSON FORMATER

//printDebug($j);
$elemt = $j["PositionProfile"]["PositionDetail"]["PhysicalLocation"]["Area"];
foreach ($elemt as $value) {
  //printDebug($value);
  if ($value["@attributes"]["type"] == "countrycode") {
    $country = trim((string) $value["Value"]);
  }
  if ($value["@attributes"]["type"] == "region") {
    $state = trim((string) $value["Value"]);
  }
  if ($value["@attributes"]["type"] == "municipality") {
    $city = trim((string) $value["Value"]);
  }
}
$arrloc = array();
if ($city) $arrloc[] = $city;
if ($state) $arrloc[] = $state;
if ($country) $arrloc[] = $country;
// Delete positions that includes "Array"
foreach ($arrloc as $key => $validate) {
  if (trim($validate) === "Array") {
    unset($arrloc[$key]);
  }
}
//--------------------------------------//
$loc = implode(", ", $arrloc);
$job = array();
$job['title'] = trim((string) $j["PositionProfile"]["PositionDetail"]["PositionTitle"]);
$job['url'] = trim((string) $j["ExtraTokens"]["kununu"]);
// $job['source_empname'] = trim((String) $j["company"]);
$job['location'] = $loc;
// $job['source_city'] = $city;
// $job['source_state'] = $state;
// $job['source_country'] = $country;
// // $job['source_salary'] = trim((String) $j["salary"]);
// $job['client_tag'] = trim((string) $j["JobCategory"]);
// // $job['source_jobtype'] = trim((String) $j["jobtype"]);
// $job['reqid'] = trim((String) $j["JobId"]);
// $job['html'] = (String) $j["JobDescription"];                                                                                                                                                         
// $job['jobdesc'] = strip_tags($job['html']);
// $job['temp']="1";
// // Replace "Array" in variables that include it
// foreach($job as $key => $validate){
//     if(trim($validate)==="Array"){
//         $job[$key]="";
//     }
// }
// ---------------------------------------------//

//////==================================================================
//////////////////
/////Benefit
$regexBenefit = '/Benefits/m';
if (preg_match($regexBenefit, $job['jobdesc']) === 1) {
  $job['source_benefit'] = end(preg_split($regexBenefit, $job['jobdesc']));
  $job['source_benefit'] = preg_split('/The Perks:s/m', $job['source_benefit'])[0];
  // printDebug($job['reqid'] . " reqid -->" . $job['source_benefit']);
}


////////
////REPLACE SPONSORED
$source_ppc = trim((string) $j["cpc"]);
$source_ppc = str_replace("EURO", "", $source_ppc);
$job['source_ppc'] = trim($source_ppc) * 100;

/////////////////////////////////////////////////////////////////
////////reondeo
$souppc = preg_replace('/[^0-9.,]+/', '',  $j["cpc"]);
if (preg_match('/[.,]+/', $souppc)) {
  $job['source_ppc'] = round($souppc * 100);
} else {
  $job['source_ppc'] =  $souppc;
}

// empty validation
if (!empty((string) $j["cpc"]));


//
$job['html'] = preg_replace('/</i', '<', $job['html']);
$job['html'] = preg_replace('/>/i', '>', $job['html']);
//
$job['html'] = preg_replace('/style=\"[^\\"]*"|face=\"[^\\"]*"|align=\"[^\\"]*"/', '', $job['html']);
$job['html'] = preg_replace('/class=\"[^\\"]*"|font=\"[^\\"]*"|lang=\"[^\\"]*"/', '', $job['html']);
$job['html'] = html_entity_decode($job['html'], ENT_QUOTES | ENT_XML1, 'UTF-8');
