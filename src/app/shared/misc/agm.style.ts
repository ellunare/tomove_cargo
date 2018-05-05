const
	green = "#24bc68",
	blue = "#0a45f9",
	gold = "#a58f43",
	gold_dark = "#6d623d",

	road = "#eeeeee",
	manmade = "#dddddd",
	landscape = "#aaaaaa",

	stroke = "#cacaca";

export const AGM_STYLE = [
	{
		"featureType": "landscape",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": landscape
			}
		]
	},
	{
		"featureType": "landscape.man_made",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": stroke
			}
		]
	},
	{
		"featureType": "landscape.man_made",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"visibility": "on"
			},
			{
				"color": manmade
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": 'road',
		"elementType": 'geometry',
		"stylers": [
			{
				"color": road
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": gold
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": gold
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#ffffff"
			}
		]
	},
	// {
	// 	"featureType": "road.local",
	// 	"elementType": "geometry.fill",
	// 	"stylers": [
	// 		{
	// 			"color": "#999999"
	// 		}
	// 	]
	// },
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{
				"color": gold
			}
		]
	},
	{
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": gold_dark
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.icon",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "transit",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "all",
		"stylers": [
			{
				"color": blue
			},
			{
				"visibility": "on"
			}
		]
	},


	// POI
	{
		"featureType": "poi.park",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"visibility": "on"
			},
			{
				"color": green
			}
		]
	},
	{
		"featureType": "poi.attraction",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#55395e"
			}
		]
	},
	{
		"featureType": "poi.business",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#99856e"
			}
		]
	},
	{
		"featureType": "poi.government",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#5b5a4b"
			}
		]
	},
	{
		"featureType": "poi.medical",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#3f1313"
			}
		]
	},
	{
		"featureType": "poi.place_of_worship",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#45543e"
			}
		]
	},
	{
		"featureType": "poi.school",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#2c5f63"
			}
		]
	},
	{
		"featureType": "poi.sports_complex",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#ada380"
			}
		]
	}


]