let searchResults = [];
let arrPhotoURL = [];
let restFotes = {};

$("#modal-validate").modal({show: false});

validateUserLocation
function validateUserLocation(userInput) {
  let listOfSubarbs = ["alexander heights", "alfred cove", "alkimos", "anketell", "applecross", "ardross", "armadale",
    "ascot", "ashby", "ashfield", "attadale", "atwell", "aubin grove", "aveley", "bailup", "balcatta", "baldivis", "balga",
    "ballajura", "banjup", "banksia grove", "baskerville", "bassendean", "bateman", "bayswater", "beaconsfield", "beckenham",
    "bedford", "bedfordale", "beechboro", "beechina", "beeliar", "beldon", "belhus", "bellevue", "belmont", "bennett springs",
    "bentley", "bertram", "bibra lake", "bickley", "bicton", "booragoon", "boya", "brabham", "brentwood", "brigadoon", "brookdale",
    "bull creek", "bullsbrook", "burns beach", "burswood", "butler", "byford", "calista", "camillo", "canning vale", "cannington",
    "carabooda", "cardup", "carine", "carlisle", "carmel", "carramar", "casuarina", "caversham", "champion lakes", "chidlow", "churchlands",
    "city beach", "claremont", "clarkson", "clifton park", "cloverdale", "cockburn central", "como", "connolly", "coogee", "coolbellup", "coolbinia",
    "cooloongup", "cottesloe", "craigie", "crawley", "cullacabardee", "currambine", "daglish", "dalkeith", "darch", "darling downs",
    "darlington", "dayton", "dianella", "doubleview", "duncraig", "east cannington", "east fremantle", "east perth", "east rockingham",
    "east victoria park", "eden hill", "edgewater", "eglinton", "ellenbrook", "embleton", "ferndale", "floreat", "forrestdale", "forrestfield",
    "fremantle", "garden island", "gidgegannup", "girrawheen", "glen forrest", "glendalough", "gnangara", "golden bay", "gooseberry hill",
    "gosnells", "greenmount", "greenwood", "guildford", "gwelup", "hacketts gully", "hamersley", "hamilton hill", "hammond park", "harrisdale",
    "haynes", "hazelmere", "heathridge", "helena valley", "henderson", "henley brook", "herne hill", "high wycombe", "highgate", "hilbert",
    "hillarys", "hillman", "hilton", "hocking", "hope valley", "hopeland", "hovea", "huntingdale", "illawarra", "iluka", "inglewood", "innaloo",
    "jandabup", "jandakot", "jane brook", "jarrahdale", "jindalee", "jolimont", "joondalup", "joondanna", "kalamunda", "kallaroo", "karawara",
    "kardinya", "karnup", "karragullen", "karrakatta", "karrakup", "karrinyup", "kelmscott", "kelscott", "kensington", "kenwick", "kewdale",
    "keysbrook", "kiara", "kings park", "kingsley", "kinross", "koondoola", "koongamia", "kwinana beach", "kwinana town centre", "landsdale",
    "langford", "lathlain", "leda", "leederville", "leeming", "lesmurdie", "lexia", "lockridge", "lynwood", "maddington", "madeley",
    "mahogany creek", "maida vale", "malaga", "mandogalup", "mandurah quays", "manning", "marangaroo", "mardella", "mariginiup",
    "marmion", "martin", "maylands", "medina", "melville", "menora", "merriwa", "middle swan", "midland", "midvale", "millendon",
    "mindarie", "mirrabooka", "morley", "mosman park", "mount claremont", "mount hawthorn", "mount helena", "mount lawley",
    "mount nasura", "mount pleasant", "mount richon", "mullaloo", "mundaring", "mundijong", "munster", "murdoch",
    "myaree", "naval base", "nedlands", "neerabup", "nollamara", "noranda", "north beach", "north coogee",
    "north fremantle", "north lake", "north perth", "northbridge", "nowergup", "oakford", "ocean reef", "o'connor",
    "oldbury", "orange grove", "orelia", "osborne park", "padbury", "palmyra", "parkerville", "parkwood", "parmelia",
    "paulls valley", "pearsall", "peppermint grove", "peron", "perth (cbd)", "perth airport", "piara waters",
    "pickering brook", "piesse brook", "pinjar", "port kennedy", "postans", "queens park", "quinns rocks", "redcliffe",
    "reservoir", "ridgewood", "riverton", "rivervale", "rockingham", "rockingham beach", "roleystone",
    "rossmoyne", "rottnest island", "safety bay", "salter point", "samson", "sawyers valley", "scarborough", "secret harbour",
    "serpentine", "seville grove", "shelley", "shenton park", "shoalwater", "sinagra", "singleton", "sorrento", "south fremantle",
    "south guildford", "south lake", "south perth", "southern river", "spearwood", "st james", "stirling", "stoneville", "stratton",
    "subiaco", "success", "swan view", "swanbourne", "tapping", "the lakes", "the spectacles", "the vines", "thornlie", "trigg",
    "tuart hill", "two rocks", "upper swan", "victoria park", "viveash", "waikiki", "walliston", "wandi", "wangara", "wanneroo",
    "warnbro", "warwick", "waterford", "watermans bay", "wattle grove", "wattleup", "wellard", "welshpool", "wembley", "wembley downs",
    "west leederville", "west perth", "west swan", "westfield", "westminster", "whitby", "white gum valley", "whiteman", "willagee", "willetton", "wilson",
    "winthrop", "woodbridge", "woodlands", "woodvale", "wooroloo", "wungong", "yanchep", "yangebup", "yokine"];


  let userInputLower = userInput.toLowerCase();

  if (listOfSubarbs.includes(userInputLower)) {
    searchByUserLocation(userInput);
  }
  else {
    $("#modal-validate").modal("show");
  }
}

// Searches by user input and returns bars in WA within 1km.
function searchByUserLocation(userInput) {
  queryUrl =
    "https://api.foursquare.com/v2/venues/search?near=" +
    userInput +
    "%20WA&categoryId=4bf58dd8d48988d116941735&radius=1000&limit=5&client_id=LXW4D1FR20T23BWGUZEGLJHBLPHZOYB2XXRFUK233JM0KHJD&client_secret=1NHWFLIFEX1RDNFRDPN4TL04GW0LO4SLWXBFWOGB31BD2K3H&v=20191105";

  $.ajax({
    url: queryUrl,
    method: "GET",
    datatype: "json",
    success: showResults,
    error: noResultsFound
  });

  // If query returns response, get results and call append functions.
  function showResults(response) {
    searchResults = response.response.venues;
    console.log(queryUrl);
    appendLocationDetailsToPage(searchResults);
    getPubPhotos(searchResults);
    getMoreBarDetails(searchResults);
  }

  // If no response, display error message in HTML.
  function noResultsFound() {
    let noResultsDiv = $("#portfolio").append("<div>");
    let noResultsAlert = $(noResultsDiv).append("<p>");
    $(noResultsAlert).html("No results found :(");
    $(noResultsAlert).attr("id", "no-results-message");
  }
}

// Appends results and modals dynamically to page.
function appendLocationDetailsToPage(locations) {
  for (let i = 0; i < locations.length; i++) {
    let barName = locations[i].name;
    let barAddress = locations[i].location.address;
    templateClone = $("#result-template")
      .clone()
      .appendTo("#bar-results");
    $(templateClone).attr("id", "template-" + i);
    $(templateClone)
      .find("#modal-target")
      .attr("data-target", "#modal-" + i);
    templateClone.attr("class", "bars");
    $(".bars").css("display", "block");

    let barModal = $("#portfolioModal1")
      .clone()
      .appendTo("#page-top");
    $(barModal).attr("id", "modal-" + i);
    $(barModal).attr("aria-labelledby", "modal-" + i + "Label");
    $(barModal)
      .find(".bar-names")
      .html(barName);
    $(barModal)
      .find(".bar-address")
      .html(barAddress);
  }
}

// New ajax query for venue hours and phone number where available.
function getMoreBarDetails(locations) {
  for (let i = 0; i < locations.length; i++) {
    let venueId = locations[i].id;
    queryUrl =
      "https://api.foursquare.com/v2/venues/" +
      venueId +
      "?&client_id=LXW4D1FR20T23BWGUZEGLJHBLPHZOYB2XXRFUK233JM0KHJD&client_secret=1NHWFLIFEX1RDNFRDPN4TL04GW0LO4SLWXBFWOGB31BD2K3H&v=20191105";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      let venueHours = response.response.venue.hours.status;
      console.log(venueHours);

      let contactDetails = response.response.venue.contact.formattedPhone;
      console.log(contactDetails);

      appendOpeningHoursAndContactDetails({
        loop: i,
        hours: venueHours,
        contact: contactDetails,
      });
    });
  }
}

function getPubPhotos(locations) {
  for (let i = 0; i < locations.length; i++) {
    console.log(locations[i].name);
    getZomPub(locations[i].name, i);
  }
}


function appendOpeningHoursAndContactDetails(i, hours, contact) {
  if (hours !== undefined) {
    $("#modal-" + i)
    restFotes = [];
  }}
// Appends results from getMoreBarDetails function to existing modals.
function appendOpeningHoursAndContactDetails(inputs) {
  // inputs = {loop: i, hours: venueHours, contact: contactDetails}
  if (inputs.hours !== undefined) {
    $("#modal-" + inputs.loop)
      .find("#bar-hours")
      .html(inputs.hours);
  } else {
    $("#modal-" + inputs.loop)
      .find("#bar-hours")
      .html("No opening hours available");
  }

  if (inputs.contact !== undefined) {
    $("#modal-" + inputs.loop)
      .find("#bar-phone")
      .html(inputs.contact);
  } else {
    $("#modal-" + inputs.loop)
      .find("#bar-phone")
      .html("No contact details available");
  }
}

function getZomPub(pubName, i) {  //even with the precise name input to the api, zomato still returns multiple establishments
                                  //so this function filters the Zomato results for the exact pub
  let queryURL = "https://developers.zomato.com/api/v2.1/search?q='" + pubName + "'";
  console.log(queryURL);
  $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "user-key": "7c5b101b634a31bcfcda3cf933e803ba" }

  }).done(function(respZomato){  //iterate through the 
    console.log(respZomato);
    $.each(respZomato.restaurants, function(j, pubDeets){  //loop through the list of potentially matching restaurants
                                                           //to find the exact match using regex .test function

      let testName = new RegExp(pubDeets.restaurant.name);  //create a regular expression of the name of the current restaurant from the Zomato API
      if (testName.test(pubName)) {   //regex test if the Zomato restaurant name matches the name from foursquare
        console.log("regex works for " + pubName + ".");
        restFotes = {pub: pubName};
        getPhotoPub(pubDeets);
        return false;
      }
    })
    //populate the array containing the pub and photo objects
    if (restFotes.pub !== undefined) {
      console.log(restFotes.pub);
      arrPhotoURL[i] = restFotes;
    }
    restFotes = {};
    console.log(arrPhotoURL);
  })
}

function getPhotoPub(pubDeets, pubName) {  //iterate through the object containing the photos for each matching restaurant in Zomato
  let photo = [];
  // $.each(pubDeets.restaurant.photos, function(j, fote) {
    photo = pubDeets.restaurant.photos[0].photo.url;
    console.log(photo)
}
  // restFotes.photos = photo;

  
