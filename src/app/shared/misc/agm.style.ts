let green = "#24bc68"
	, blue = "#0a45f9"
	, gold = "#a58f43"
	, gold_dark = "#6d623d"
	, road = "#eeeeee"
	, manmade = "#dddddd"
	, landscape = "#aaaaaa"
	, stroke = "#cacaca"

export const AGM_STYLE = [
	{
		featureType: "all",
		elementType: "labels.text.fill",
		stylers: [
			{ color: "#aaaaaa" }
		]
	},
	{
		featureType: "all",
		elementType: "labels.text.stroke",
		stylers: [
			{ color: "#000000" },
			{ lightness: 13 }
		]
	},
	{
		featureType: "all",
		elementType: "labels.icon",
		stylers: [
			{ visibility: "off" }
		]
	},
	{
		featureType: "administrative",
		elementType: "geometry.stroke",
		stylers: [
			{ color: "#515151" }
		]
	},
	{
		featureType: "landscape.man_made",
		elementType: "geometry.fill",
		stylers: [
			{ color: "#333333" }
		]
	},
	{
		featureType: "landscape.man_made",
		elementType: "geometry.stroke",
		stylers: [
			{ visibility: "on" },
			{ color: "#cccccc" }
		]
	},
	{
		featureType: "landscape.natural",
		elementType: "geometry.fill",
		stylers: [
			{ color: "#2f2d27" }
		]
	},
	{
		featureType: "poi",
		elementType: "geometry.fill",
		stylers: [
			{ color: "#4a473b" }
		]
	},
	{
		featureType: "poi.park",
		elementType: "geometry.fill",
		stylers: [
			{ color: "#235b34" }
		]
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
			{ color: "#a58f43" },
			{ lightness: 17 }
		]
	},
	{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{ color: "#6d623d" }
		]
	},
	{
		featureType: "road.local",
		elementType: "geometry",
		stylers: [
			{ color: "#515151" }
		]
	},

	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [
			{ color: "#6d623d" }
		]
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [
			{ color: "#09284b" }
		]
	}
]