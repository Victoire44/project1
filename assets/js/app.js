var nationalParks = ["Acadia", "American Samoa", "Arches", "Badlands", "Big Bend", "Biscayne", "Black Canyon of the Gunnison", "Bryce Canyon", "Cabrillo", "Canyonlands", "Capitol Reef", "Carlsbad Caverns", "Channel Islands", "Congaree", "Crater Lake", "Cuyahoga Valley", "Death Valley", "Denali", "Dry Tortugas", "Everglades", "Gates of the Arctic", "Gettysburg National Military Park", "Glacier", "Glacier Bay", "Grand Canyon", "Grand Teton", "Great Basin", "Great Sand Dunes", "Great Smoky Mountains", "Guadalupe Mountains", "Haleakala", "Hawai’i Volcanoes", "Harpers Ferry", "Hot Springs", "Isle Royale", "Joshua Tree", "Katmai", "Kenai Fjords", "Kings Canyon", "Kobuk Valley", "Lake Clark", "Lassen Volcanic", "Mammoth Cave", "Mesa Verde", "Mount Rainier", "North Cascades", "Organ Pipe Cactus", "Olympic", "Petrified Forest", "Pinnacles", "Redwood", "Rocky Mountain", "Saguaro", "Sequoia", "Shenandoah", "Theodore Roosevelt", "Valley Forge", "Virgin Islands", "Voyageurs", "Wind Cave", "Wrangell–St. Elias", "Yellowstone", "Yosemite", "Zion"]


$(document).ready(function () {
    $('input.autocomplete').autocomplete({ source: nationalParks });
    
});

$("#search").keypress((event) => {

    $("#card-section").empty();

    if (event.keyCode === 13) {
        

        event.preventDefault();



        var search = $("#search").val().trim();
        var queryURL = "https://developer.nps.gov/api/v1/campgrounds?q=" + search + "&api_key=O4VdhmolNStlPLj2bo2DfPKWks3F8J9xfihpGqTf";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (i = 0; i < (response.data).length; i ++) {

                    var card = $("<div>");
                    var name = response.data[i].name;
                    var description = response.data[i].description;
                    var weatherOverview = response.data[i].weatheroverview;
                    var directions = response.data[i].directionsoverview;

                    var latLongString = (response.data[i].latLong);
                    var regex = /[\d\.-]+/g;
                    var latLong = latLongString.match(regex);

                    var lat = latLong[0];
                    var long = latLong[1];

                    //var maps = (lat + ", " + long);

                        card.append("<h4>" +name + "</h4>");
                        card.append("<p>" + description + "</p>");
                        card.append("<div id='map'>");
                        // card.append("<p>" + weatherOverview + "</p>");
                        // card.append("<p>" + directions + "</p>");
                        card.addClass("card");

                        function initMap() {
                            map = new google.maps.Map(document.getElementById('#map'), {
                              center: {lat: 39.833333, lng: -98.583333},
                              zoom: 4
                            });
                        }

                            map.setCenter({
                                lat: parseFloat(lat),
                                lng: parseFloat(long),
                            });
                            map.setZoom(11);
    

                        $("#card-section").append(card);

            }
        }

        )};
    })