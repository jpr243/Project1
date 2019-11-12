let searchResults = [];
let arrPhotoURL = [];
let restFotes = {};

function searchByUserLocation(userInput) {
  queryUrl =
    "https://api.foursquare.com/v2/venues/search?near=" +
    userInput +
    "%20WA&categoryId=4bf58dd8d48988d116941735&radius=1000&limit=5&client_id=LXW4D1FR20T23BWGUZEGLJHBLPHZOYB2XXRFUK233JM0KHJD&client_secret=1NHWFLIFEX1RDNFRDPN4TL04GW0LO4SLWXBFWOGB31BD2K3H&v=20191105";

  $.ajax({
    url: queryUrl,
    method: "GET",
    datatype: "json",
    success: showResults
  });

  function showResults(response) {
    searchResults = response.response.venues;
    console.log(queryUrl);
    appendLocationDetailsToPage(searchResults);
    getLatAndLong(searchResults);
    getMoreBarDetails(searchResults);
  }
}

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

function getMoreBarDetails(locations) {
  let moreDetails = [];

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
      moreDetails.push({
        venueHours: venueHours,
        contactDetails: contactDetails
      });

      appendOpeningHoursAndContactDetails(i, venueHours, contactDetails);
    });
  }
}

function getLatAndLong(locations) {
  for (let i = 0; i < locations.length; i++) {
    let latitude = searchResults[i].location.lat;
    let longitude = searchResults[i].location.lng;
    console.log(locations[i].name, latitude, longitude);
    getZomPub(locations[i].name, i);
  }
}


function appendOpeningHoursAndContactDetails(i, hours, contact) {
  if (hours !== undefined) {
    $("#modal-" + i)
      .find("#bar-hours")
      .html(hours);
  }

  if (contact !== undefined) {
    $("#modal-" + i)
      .find("#bar-phone")
      .html(contact);
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
  $.each(pubDeets.restaurant.photos, function(j, fote) {
    photo[j] = fote.photo.url;
  })
  restFotes.photos = photo;
}
