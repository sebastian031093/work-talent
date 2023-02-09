<?php
$city = trim((string) $j->city);
$state = trim((string) $j->state);
$country = trim((string) $j->country);
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);
$job=array();
// VARIABLES DE CADA TRABAJO
$job['temp'] = 1;
$job['title'] = (String) $j->title;
$job['html'] = (String) $j->description;
$job['jobdesc'] = strip_tags($job['html']);
$job['location'] = $loc;
$job['source_city'] = $city;
$job['source_state'] = $state;
$job['source_country'] = $country;
$job['source_jobtype'] = (String) $j->jobtype;
$job['url'] = (String) $j->url;
$job['source_empname'] = (String) $j->company;
$job['reqid'] = (String) $j->referencenumber;
?>