function Locacion(Locate) {
    var location = Locate;
    if (Locate.indexOf("AL") > -1) { location = Locate.replace("AL", "Alabama, US"); };
    if (Locate.indexOf("AK") > -1) { location = Locate.replace("AK", "Alaska, US"); };
    if (Locate.indexOf("AZ") > -1) { location = Locate.replace("AZ", "Arizona, US"); };
    if (Locate.indexOf("AR") > -1) { location = Locate.replace("AR", "Arkansas, US"); };
    if (Locate.indexOf("CA") > -1) { location = Locate.replace("CA", "California, US"); };
    if (Locate.indexOf("CO") > -1) { location = Locate.replace("CO", "Colorado, US"); };
    if (Locate.indexOf("CT") > -1) { location = Locate.replace("CT", "Connecticut, US"); };
    if (Locate.indexOf("DE") > -1) { location = Locate.replace("DE", "Delaware, US"); };
    if (Locate.indexOf("FL") > -1) { location = Locate.replace("FL", "Florida, US"); };
    if (Locate.indexOf("GA") > -1) { location = Locate.replace("GA", "Georgia, US"); };
    if (Locate.indexOf("HI") > -1) { location = Locate.replace("HI", "Hawaii, US"); };
    if (Locate.indexOf("ID") > -1) { location = Locate.replace("ID", "Idaho, US"); };
    if (Locate.indexOf("IL") > -1) { location = Locate.replace("IL", "llinois, US"); };
    if (Locate.indexOf("IN") > -1) { location = Locate.replace("IN", "Indiana, US"); };
    if (Locate.indexOf("IA") > -1) { location = Locate.replace("IA", "Iowa, US"); };
    if (Locate.indexOf("KS") > -1) { location = Locate.replace("KS", "Kansas, US"); };
    if (Locate.indexOf("KY") > -1) { location = Locate.replace("KY", "Kentucky, US"); };
    if (Locate.indexOf("LA") > -1) { location = Locate.replace("LA", "Louisiana, US"); };
    if (Locate.indexOf("ME") > -1) { location = Locate.replace("ME", "Maine, US"); };
    if (Locate.indexOf("MD") > -1) { location = Locate.replace("MD", "Maryland, US"); };
    if (Locate.indexOf("MA") > -1) { location = Locate.replace("MA", "Massachusetts, US"); };
    if (Locate.indexOf("MI") > -1) { location = Locate.replace("MI", "Míchigan, US"); };
    if (Locate.indexOf("MN") > -1) { location = Locate.replace("MN", "Minnesota, US"); };
    if (Locate.indexOf("MS") > -1) { location = Locate.replace("MS", "Mississippi, US"); };
    if (Locate.indexOf("MO") > -1) { location = Locate.replace("MO", "Missouri, US"); };
    if (Locate.indexOf("MT") > -1) { location = Locate.replace("MT", "Montana, US"); };
    if (Locate.indexOf("NE") > -1) { location = Locate.replace("NE", "Nebraska, US"); };
    if (Locate.indexOf("NV") > -1) { location = Locate.replace("NV", "Nevada, US"); }
    if (Locate.indexOf("NH") > -1) { location = Locate.replace("NH", "New Hampshire, US"); };
    if (Locate.indexOf("NJ") > -1) { location = Locate.replace("NJ", "New Jersey, US"); };
    if (Locate.indexOf("NM") > -1) { location = Locate.replace("NM", "New Mexico, US"); };
    if (Locate.indexOf("NY") > -1) { location = Locate.replace("NY", "New York, US"); };
    if (Locate.indexOf("NC") > -1) { location = Locate.replace("NC", "North Carolina, US"); };
    if (Locate.indexOf("ND") > -1) { location = Locate.replace("ND", "North Dakota, US"); };
    if (Locate.indexOf("OH") > -1) { location = Locate.replace("OH", "Ohio, US"); };
    if (Locate.indexOf("OK") > -1) { location = Locate.replace("OK", "Oklahoma, US"); };
    if (Locate.indexOf("OR") > -1) { location = Locate.replace("OR", "Oregon, US"); };
    if (Locate.indexOf("PA") > -1) { location = Locate.replace("PA", "Pennsylvania, US"); };
    if (Locate.indexOf("RI") > -1) { location = Locate.replace("RI", "Rhode Island, US"); };
    if (Locate.indexOf("SC") > -1) { location = Locate.replace("SC", "South Carolina, US"); };
    if (Locate.indexOf("SD") > -1) { location = Locate.replace("SD", "South Dakota, US"); };
    if (Locate.indexOf("TN") > -1) { location = Locate.replace("TN", "Tennessee, US"); };
    if (Locate.indexOf("TX") > -1) { location = Locate.replace("TX", "Texas, US"); };
    if (Locate.indexOf("UT") > -1) { location = Locate.replace("UT", "Utah, US"); };
    if (Locate.indexOf("VT") > -1) { location = Locate.replace("VT", "Vermont, US"); };
    if (Locate.indexOf("VA") > -1) { location = Locate.replace("VA", "Virginia, US"); };
    if (Locate.indexOf("WA") > -1) { location = Locate.replace("WA", "Washington, US"); };
    if (Locate.indexOf("WV") > -1) { location = Locate.replace("WV", "West Virginia, US"); };
    if (Locate.indexOf("WI") > -1) { location = Locate.replace("WI", "Wisconsin, US"); };
    if (Locate.indexOf("WY") > -1) { location = Locate.replace("WY", "Wyoming, US"); };
    if (Locate.indexOf("AL") > -1) { location = Locate.replace(/AL/g, "Alabama, US"); };
    if (Locate.indexOf("AK") > -1) { location = Locate.replace(/AK/g, "Alaska, US"); };
    if (Locate.indexOf("AZ") > -1) { location = Locate.replace(/AZ/g, "Arizona, US"); };
    if (Locate.indexOf("AR") > -1) { location = Locate.replace(/AR/g, "Arkansas, US"); };
    if (Locate.indexOf("CA") > -1) { location = Locate.replace(/CA/g, "California, US"); };
    if (Locate.indexOf("CO") > -1) { location = Locate.replace(/CO/g, "Colorado, US"); };
    if (Locate.indexOf("CT") > -1) { location = Locate.replace(/CT/g, "Connecticut, US"); };
    if (Locate.indexOf("DE") > -1) { location = Locate.replace(/DE/g, "Delaware, US"); };
    if (Locate.indexOf("FL") > -1) { location = Locate.replace(/FL/g, "Florida, US"); };
    if (Locate.indexOf("GA") > -1) { location = Locate.replace(/GA/g, "Georgia, US"); };
    if (Locate.indexOf("HI") > -1) { location = Locate.replace(/HI/g, "Hawaii, US"); };
    if (Locate.indexOf("ID") > -1) { location = Locate.replace(/ID/g, "Idaho, US"); };
    if (Locate.indexOf("IL") > -1) { location = Locate.replace(/IL/g, "llinois, US"); };
    if (Locate.indexOf("IN") > -1) { location = Locate.replace(/IN/g, "Indiana, US"); };
    if (Locate.indexOf("IA") > -1) { location = Locate.replace(/IA/g, "Iowa, US"); };
    if (Locate.indexOf("KS") > -1) { location = Locate.replace(/KS/g, "Kansas, US"); };
    if (Locate.indexOf("KY") > -1) { location = Locate.replace(/KY/g, "Kentucky, US"); };
    if (Locate.indexOf("LA") > -1) { location = Locate.replace(/LA/g, "Louisiana, US"); };
    if (Locate.indexOf("ME") > -1) { location = Locate.replace(/ME/g, "Maine, US"); };
    if (Locate.indexOf("MD") > -1) { location = Locate.replace(/MD/g, "Maryland, US"); };
    if (Locate.indexOf("MA") > -1) { location = Locate.replace(/MA/g, "Massachusetts, US"); };
    if (Locate.indexOf("MI") > -1) { location = Locate.replace(/MI/g, "Míchigan, US"); };
    if (Locate.indexOf("MN") > -1) { location = Locate.replace(/MN/g, "Minnesota, US"); };
    if (Locate.indexOf("MS") > -1) { location = Locate.replace(/MS/g, "Mississippi, US"); };
    if (Locate.indexOf("MO") > -1) { location = Locate.replace(/MO/g, "Missouri, US"); };
    if (Locate.indexOf("MT") > -1) { location = Locate.replace(/MT/g, "Montana, US"); };
    if (Locate.indexOf("NE") > -1) { location = Locate.replace(/NE/g, "Nebraska, US"); };
    if (Locate.indexOf("NV") > -1) { location = Locate.replace(/NV/g, "Nevada, US"); }
    if (Locate.indexOf("NH") > -1) { location = Locate.replace(/NH/g, "New Hampshire, US"); };
    if (Locate.indexOf("NJ") > -1) { location = Locate.replace(/NJ/g, "New Jersey, US"); };
    if (Locate.indexOf("NM") > -1) { location = Locate.replace(/NM/g, "New Mexico, US"); };
    if (Locate.indexOf("NY") > -1) { location = Locate.replace(/NY/g, "New York, US"); };
    if (Locate.indexOf("NC") > -1) { location = Locate.replace(/NC/g, "North Carolina, US"); };
    if (Locate.indexOf("ND") > -1) { location = Locate.replace(/ND/g, "North Dakota, US"); };
    if (Locate.indexOf("OH") > -1) { location = Locate.replace(/OH/g, "Ohio, US"); };
    if (Locate.indexOf("OK") > -1) { location = Locate.replace(/OK/g, "Oklahoma, US"); };
    if (Locate.indexOf("OR") > -1) { location = Locate.replace(/OR/g, "Oregon, US"); };
    if (Locate.indexOf("PA") > -1) { location = Locate.replace(/PA/g, "Pennsylvania, US"); };
    if (Locate.indexOf("RI") > -1) { location = Locate.replace(/RI/g, "Rhode Island, US"); };
    if (Locate.indexOf("SC") > -1) { location = Locate.replace(/SC/g, "South Carolina, US"); };
    if (Locate.indexOf("SD") > -1) { location = Locate.replace(/SD/g, "South Dakota, US"); };
    if (Locate.indexOf("TN") > -1) { location = Locate.replace(/TN/g, "Tennessee, US"); };
    if (Locate.indexOf("TX") > -1) { location = Locate.replace(/TX/g, "Texas, US"); };
    if (Locate.indexOf("UT") > -1) { location = Locate.replace(/UT/g, "Utah, US"); };
    if (Locate.indexOf("VT") > -1) { location = Locate.replace(/VT/g, "Vermont, US"); };
    if (Locate.indexOf("VA") > -1) { location = Locate.replace(/VA/g, "Virginia, US"); };
    if (Locate.indexOf("WA") > -1) { location = Locate.replace(/WA/g, "Washington, US"); };
    if (Locate.indexOf("WV") > -1) { location = Locate.replace(/WV/g, "West Virginia, US"); };
    if (Locate.indexOf("WI") > -1) { location = Locate.replace(/WI/g, "Wisconsin, US"); };
    if (Locate.indexOf("WY") > -1) { location = Locate.replace(/WY/g, "Wyoming, US"); };
    return location;
  }