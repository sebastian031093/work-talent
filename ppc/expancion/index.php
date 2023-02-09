<?php


$expansions = array(
  "titles" => array("Administraotr", "Developer", "Engineer", "Support Lead", "DBA Lead"),
  "locations" => array("Caracas, VE", "Maracay, VE", "Medellín, CO", "Bogotá, CO", "Santiago de Chile, CL", "Lima, PE")
);


foreach ($expansions["titles"] as $newTitle) {
  foreach ($expansions["locations"] as $newLoc) {
    $arrayValues = array_values($job);
    $arrayKeys = array_keys($job);
    $joby = array_combine($arrayKeys, $arrayValues);
    $joby["title"] = $newTitle;
    $joby["location"] = $newLoc;
    $multi_jobs[] = $joby;
  }
}
