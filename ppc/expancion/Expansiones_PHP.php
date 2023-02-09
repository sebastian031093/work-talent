<?php

//Declarar el array super important
$multi_jobs = array();
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
$job['source_jobtype'] = trim((string) $j["job_type"]);
$job['reqid'] = trim((string) $j["job_reference"]);
$job['html'] = (string) $j["body"];
$job['jobdesc'] = strip_tags($job['html']);
$job['temp'] = "1";

// Replace "Array" in variables that include it
foreach ($job as $key => $validate) {
    if (trim($validate) === "Array") {
        $job[$key] = "";
    }
}
//---------------------------------------------//

//////////////////////////////////////////
//////////expancion basica
$multi_jobs[] = $job;

$newExpansions = array(); //Here put your expancions

foreach ($newExpansions as $obj) {
    $jobx = array_combine(array_keys($job), array_values($job));
    $multi_jobs[] = $jobx;
}

///////////////////////////////////////
////////////expancion condiconal 
$multi_jobs[] = $job;

$newExpansions = array(
    "103582-103374-413699945" => array(
        "titles" => array("CDL A Local Truck Driver One", "A Local Truck Driver", "CDL Local Driver"),
        "locations" => array("Greenville, South Carolina, US", "Dallas, Texas, United States", "Dallas,Texas, United States"),
    ),
    "103582-103414-3231216116" => array(
        "titles" => array("CDL A LOCAL TRUCK DRIVER TWO", "CDL A LOCAL TRUCK", 'LOCALTRUCK DRIVER-$5k BONUS'),
        "locations" => array("Columbia, South Carolina, US", "Falls Church, Virginia, US", "Norristown,Pennsylvania, US")
    )
);


foreach ($newExpansions as $reqid => $obj) {
    if ($reqid == $job['reqid']) {
        // printDebug("reqid: {$reqid}");
        foreach ($obj["titles"] as $newTitle) {
            foreach ($obj["locations"] as $newLoc) {
                $jobx = array_combine(array_keys($job), array_values($job));
                $jobx['title'] = $newTitle;
                $jobx['location'] = $newLoc;
                // $jobx['source_location'] = $newLoc;
                $jobx['source_city'] = trim(explode(",", $newLoc)[0]);
                $jobx['source_state'] = trim(explode(",", $newLoc)[1]);
                $jobx['source_country'] = trim(explode(",", $newLoc)[2]);
                $multi_jobs[] = $jobx;
            }
        }
    }
}


foreach ($arrayNewLocations as $location => $newLocations) {
    if (strpos(strtoupper($job['location']), strtoupper($location)) > -1) {
        foreach ($newLocations as $newLocation) {
            $arrayValues = array_values($job);
            $arrayKeys = array_keys($job);
            $joby = array_combine($arrayKeys, $arrayValues);
            $joby['location'] =  $newLocation;
            $dataLocation = explode(",", $newLocation);
            $joby['source_city'] = $dataLocation[0];
            $joby['source_state'] = $dataLocation[1];
            $joby['source_country'] = '';
            $multi_jobs[] = $joby;
        }
    }
}

///php methods

//////////////////////
//////strpos
$mystring = 'abc';
$findme   = 'a';
$pos = strpos($mystring, $findme);

// Note our use of ===.  Simply == would not work as expected
// because the position of 'a' was the 0th (first) character.
if ($pos === false) {
    echo "The string '$findme' was not found in the string '$mystring'";
} else {
    echo "The string '$findme' was found in the string '$mystring'";
    echo " and exists at position $pos";
}

//////////////////////
//////implode
$array = ['lastname', 'email', 'phone'];
var_dump(implode(",", $array)); // string(20) "lastname,email,phone"

// Empty string when using an empty array:
var_dump(implode('hello', [])); // string(0) ""

// The separator is optional:
var_dump(implode(['a', 'b', 'c'])); // string(3) "abc"


//////////////////////
//////explode
// Example 1
$pizza  = "piece1 piece2 piece3 piece4 piece5 piece6";
$pieces = explode(" ", $pizza);
echo $pieces[0]; // piece1
echo $pieces[1]; // piece2

// Example 2
$data = "foo:*:1023:1000::/home/foo:/bin/sh";
list($user, $pass, $uid, $gid, $gecos, $home, $shell) = explode(":", $data);
echo $user; // foo
echo $pass; // *

//////////////////////
//////preg_match
preg_match('/(foo)(bar)(baz)/', 'foobarbaz', $matches, PREG_OFFSET_CAPTURE);
print_r($matches);




$city = trim((string) $j["city"]);
$city = preg_replace('/Flexible \–|Negotiable|including significant flexible working options|\(other locations considered\)|MOBILE WORKER|VARIOUS UK LOCATIONS|VARIOUS LOCATIONS/i', "", $city);
$state = trim((string) $j["state"]);
$state = preg_replace('/Flexible \–|Negotiable|including significant flexible working options|MOBILE WORKER|VARIOUS UK LOCATIONS|VARIOUS LOCATIONS/i', "", $state);
$country = trim((string) $j["country"]);

$arrloc = array();
if ($city) $arrloc[] = $city;
if ($state) $arrloc[] = $state;
if ($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job = array();
$job['title'] = trim((string) $j["title"]);
$job['url'] = trim((string) $j["url"]);
$job['source_empname'] = trim((string) $j["company"]);
$job['source_location'] = $loc;
$job['location'] = $loc;
$job['source_city'] = $city;
$job['source_state'] = $state;
$job['source_country'] = $country;
$job['location'] = str_replace(' or ', ', United Kingdom / ', $job['location']);
$multilocation = "/";
$job['client_tag'] = trim((string) $j["category"]);
$job['experience_required'] = trim((string) $j["experience"]);
$source_ppc = trim((string) $j["sponsored"]);
$source_ppc = str_replace("sponsored", "", $source_ppc);
$job['source_ppc'] = $source_ppc * 100;
$job['html'] = (string) $j["description"];
$job['html'] = explode(". ", $job['html']);
$job['html'] = implode(".<br>", $job['html']);
$job['html'] = array_shift(explode('Contact Us', $job['html']));
$job['html'] = array_shift(explode('If you are interested', $job['html']));
$job['html'] = array_shift(explode('If you are interested in these roles', $job['html']));

$job['jobdesc'] = strip_tags($job['html']);

$job['temp'] = 2;
//print_r($job);

$job['reqid'] = trim((string) $j["referencenumber"]);

$job['jobid'] = md5($job['title'] . $job['source_location'] . $job['location'] . $job['source_empname'] . $job['jobdesc'] . $job['source_ppc'] . $job['temp'] . $job['reqid']);




//other data for create expacion
$dataJobs = array(
    array('empname' => 'DISH', 'location' => 'Phoenix', 'titles' => array("Inside Sales - Associate Account Executive", "Inside Sales - Customer Retention - Associate Account Executive"), 'new_locations' => array("Gilbert, Arizona, United States", "Mesa Arizona, United States", "Tempe, Arizona, United States", "Chandler, Arizona, United States", "Chandler Heights, Arizona,United States", "Queen Creek, Arizona,United States", "Apache Junction, Arizona,United States", "Paradise Valley, Arizona,United States", "Fountain Hills, Arizona,United States", "Sacaton, Arizona,United States")),
    array('empname' => 'DISH', 'location' => 'Tulsa', 'titles' => array("Inside Sales - Associate Account Executive", "Inside Sales - Customer Retention - Associate Account Executive"), 'new_locations' => array("Owasso", "Catoosa, Oklahoma, United States", "Sperry, Oklahoma, United States", "Claremore, Oklahoma, United States", "Jenks, Oklahoma, United States", "Broken Arrow, Oklahoma, United States", "Collinsville, Oklahoma, United States", "Oakhurst, Oklahoma, United States", "Inola, Oklahoma, United States", "Bixby, Oklahoma, United States", "Gregory, Oklahoma, United States", "Oologah, Oklahoma, United States", "Vera, Oklahoma, United States", "Collinsville, Oklahoma, United States")),
    array('empname' => 'DISH', 'location' => 'Roseland', 'titles' => array("Inside Sales - Associate Account Executive", "Inside Sales - Customer Retention - Associate Account Executive"), 'new_locations' => array("Little Falls, New Jersey, United States", "Paterson, New Jersey, United States", "Cedar Grove, New Jersey, United States", "Wayne, New Jersey, United States", "Clifton, New Jersey, United States", "Haledon, New Jersey, United States", "Fairfield, New Jersey, United States", "Lincoln Park, New Jersey, United States", "Caldwell, New Jersey, United States", "Pequannock, New Jersey, United States", "Verona, New Jersey, United States", "Hawthorne, New Jersey, United States", "Elmwood Park, New Jersey, United States", "Fair Lawn, New Jersey, United Statess", "Passaic, New Jersey, United States", "Garfield, New Jersey, United States", "Essex Fells, New Jersey, United States", "Montclair, New Jersey, United Statess", "Glen Rock, New Jersey, United States", "Nutley, New Jersey, United States", "Glen Ridge, New Jersey, United States", "Pine Brook, New Jersey, United States", "Saddle Brook, New Jersey, United States", "Montville, New Jersey, United States")),
    array('empname' => 'DISH', 'location' => 'El Paso', 'titles' => array("Bilingual Inside Sales - Associate Account Executive", "Bilingual Customer Retention - Associate Account Executive"), 'new_locations' => array("San Elzario, Texas, United States", "Clint, Texas, United States", "Fabens, Texas, United States", "Tornillo, Texas, United States", "Fort Bliss, Texas, United States")),
);



foreach($dataJobs as $job_) {
    if ($job['source_empname'] === $job_['empname']) {
        if (strpos(trim($job['location']), $job_['location']) !== false) {
            foreach($job_['titles'] as $titles) {
                if (strpos(trim($job['title']), $titles) !== false) {
                    foreach($job_['new_locations'] as $new_location) {
                        $arrayValues = array_values($job);
                        $arrayKeys = array_keys($job);
                        $jobp = array_combine($arrayKeys, $arrayValues);
                        $jobp['location'] = $new_location;
                        $multi_jobs[] = $jobp;
                    }
                }
            }
        }
    }
}