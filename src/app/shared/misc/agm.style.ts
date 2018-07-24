const
	green = "#24bc68",
	blue = "#0a45f9",
	gold = "#a58f43",
	gold_dark = "#6d623d",

	road = "#eeeeee",
	manmade = "#dddddd",
	landscape = "#aaaaaa",

	stroke = "#cacaca";

export const AGM_STYLE =
	// [
	// 	{
	// 		"featureType": "landscape",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": landscape
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "landscape.man_made",
	// 		"elementType": "geometry.stroke",
	// 		"stylers": [
	// 			{
	// 				"color": stroke
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "landscape.man_made",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"visibility": "on"
	// 			},
	// 			{
	// 				"color": manmade
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "poi",
	// 		"elementType": "labels",
	// 		"stylers": [
	// 			{
	// 				"visibility": "off"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": 'road',
	// 		"elementType": 'geometry',
	// 		"stylers": [
	// 			{
	// 				"color": road
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "road.arterial",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": gold
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "road.arterial",
	// 		"elementType": "labels.text.stroke",
	// 		"stylers": [
	// 			{
	// 				"color": gold
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "road.arterial",
	// 		"elementType": "labels.text.fill",
	// 		"stylers": [
	// 			{
	// 				"color": "#ffffff"
	// 			}
	// 		]
	// 	},
	// 	// {
	// 	// 	"featureType": "road.local",
	// 	// 	"elementType": "geometry.fill",
	// 	// 	"stylers": [
	// 	// 		{
	// 	// 			"color": "#999999"
	// 	// 		}
	// 	// 	]
	// 	// },
	// 	{
	// 		"featureType": "road.highway",
	// 		"elementType": "geometry",
	// 		"stylers": [
	// 			{
	// 				"color": gold
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "road.highway.controlled_access",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": gold_dark
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "road.arterial",
	// 		"elementType": "labels.icon",
	// 		"stylers": [
	// 			{
	// 				"visibility": "off"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "transit",
	// 		"elementType": "all",
	// 		"stylers": [
	// 			{
	// 				"visibility": "off"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "water",
	// 		"elementType": "all",
	// 		"stylers": [
	// 			{
	// 				"color": blue
	// 			},
	// 			{
	// 				"visibility": "on"
	// 			}
	// 		]
	// 	},


	// 	// POI
	// 	{
	// 		"featureType": "poi.park",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"visibility": "on"
	// 			},
	// 			{
	// 				"color": green
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "poi.attraction",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": "#55395e"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "poi.business",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": "#99856e"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "poi.government",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": "#5b5a4b"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "poi.medical",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": "#3f1313"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "poi.place_of_worship",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": "#45543e"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "poi.school",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": "#2c5f63"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"featureType": "poi.sports_complex",
	// 		"elementType": "geometry.fill",
	// 		"stylers": [
	// 			{
	// 				"color": "#ada380"
	// 			}
	// 		]
	// 	}


	// ]

	[
		{
			"featureType": "all",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"saturation": 36
				},
				{
					"color": "#6a6a6a"
				},
				{
					"lightness": 40
				}
			]
		},
		{
			"featureType": "all",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#000000"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"featureType": "all",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 20
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 17
				},
				{
					"weight": 1.2
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 20
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 21
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#a58f43"
				},
				{
					"lightness": 17
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 29
				},
				{
					"weight": 0.2
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 18
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#6d623d"
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#515151"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#000000"
				},
				{
					"lightness": 19
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#09284b"
				}
			]
		}
	]