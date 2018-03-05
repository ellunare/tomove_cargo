export interface F_ITEM {
	id: number,
	name: string,
	price: number,
}

export interface FURNITURE {
	id: number,
	name: string,
	types: F_ITEM[]
}

export const FURNITURE_LIST: FURNITURE[] = [
	{
		id: 101,
		name: 'fridge',
		types: [
			{
				id: 1,
				name: 'Fridge 3-Door',
				price: 200
			},
			{
				id: 2,
				name: 'Fridge 2-Door',
				price: 200
			},
			{
				id: 3,
				name: 'Fridge 600L',
				price: 200
			},
			{
				id: 4,
				name: 'Fridge 400L',
				price: 200
			},
			{
				id: 5,
				name: 'Fridge 250L',
				price: 200
			},
			{
				id: 6,
				name: 'Fridge Office',
				price: 200
			},
			{
				id: 7,
				name: 'Freezer Large',
				price: 200
			},
			{
				id: 8,
				name: 'Freezer Small',
				price: 200
			},
			{
				id: 9,
				name: 'Wine Cooler',
				price: 200
			}
		]
	},
	{
		id: 102,
		name: 'stove',
		types: []
	},
	{
		id: 103,
		name: 'table',
		types: []
	},
	{
		id: 104,
		name: 'Sofa',
		types: [
			{
				id: 1,
				name: 'Sofa 3',
				price: 100,
			},
			{
				id: 2,
				name: 'Sofa 2',
				price: 100
			},
			{
				id: 3,
				name: 'Sofa 1',
				price: 100
			},
			{
				id: 4,
				name: 'Sofa Corner',
				price: 100
			},
			{
				id: 5,
				name: 'Armchair TV',
				price: 100
			},
			{
				id: 6,
				name: 'Armchair',
				price: 100
			},
			{
				id: 7,
				name: 'Sofa 3 Recliner',
				price: 100
			},
			{
				id: 8,
				name: 'Sofa 2 Recliner',
				price: 100
			},
			{
				id: 9,
				name: 'Armchair Massage',
				price: 100
			}
		]
	},
	{
		id: 105,
		name: 'desk',
		types: []
	},
	{
		id: 106,
		name: 'bed_dbl',
		types: []
	},
	{
		id: 107,
		name: 'bed_sgl',
		types: []
	},
	{
		id: 108,
		name: 'chair',
		types: []
	},
	{
		id: 109,
		name: 'washer',
		types: [
			{
				id: 1,
				name: 'Washer Simple',
				price: 300
			},
			{
				id: 1,
				name: 'Washer Simple',
				price: 300
			}
		]
	},
	{
		id: 110,
		name: 'stand',
		types: []
	},
	{
		id: 111,
		name: 'tv',
		types: [
			{
				id: 1,
				name: 'TV 42',
				price: 300
			}
		]
	},
	{
		id: 112,
		name: 'piano',
		types: []
	},
	{
		id: 113,
		name: 'aquarium',
		types: []
	},
	{
		id: 114,
		name: 'sport',
		types: []
	},
	{
		id: 115,
		name: 'wardrobe',
		types: [
			{
				id: 1,
				name: 'Wardrobe 1-Door',
				price: 300
			},
			{
				id: 2,
				name: 'Wardrobe 2-Door',
				price: 300
			},
			{
				id: 3,
				name: 'Wardrobe 3-Door',
				price: 300
			},
			{
				id: 4,
				name: 'Wardrobe 4-Door',
				price: 300
			},
			{
				id: 5,
				name: 'Wardrobe 5-Door',
				price: 300
			},
			{
				id: 6,
				name: 'Wardrobe 6-Door',
				price: 300
			},
			{
				id: 7,
				name: 'Closet 2-Door',
				price: 300
			},
			{
				id: 8,
				name: 'Closet 3-Door',
				price: 300
			},
			{
				id: 9,
				name: 'Closet 4-Door',
				price: 300
			}
		]
	},
	{
		id: 116,
		name: 'glasscase',
		types: []
	},
	{
		id: 117,
		name: 'climate',
		types: []
	},
	{
		id: 118,
		name: 'shelf',
		types: []
	},
	{
		id: 119,
		name: 'pro',
		types: []
	},
	{
		id: 120,
		name: 'storage',
		types: []
	},
	{
		id: 121,
		name: 'box',
		types: []
	},
	{
		id: 122,
		name: 'garden',
		types: []
	},
]


export const rooms = [
	{
		id: 1,
		name: "bathroom",
		items: [
			{
				id: 2,
				name: '01 - Washer',
				price: 200
			},
			{
				id: 3,
				name: '02 - Table',
				price: 200
			},
			{
				id: 2,
				name: '03 - Shelf',
				price: 200
			},
		]
	},
	{
		id: 2,
		name: "salon",
		items: [
			{
				id: 2,
				name: '01 - TV 32',
				price: 200
			},
			{
				id: 3,
				name: '02 - Sofa 2',
				price: 200
			},
			{
				id: 2,
				name: '03 - Table',
				price: 200
			},
		]
	},
	{
		id: 3,
		name: "kitchen",
		items: [
			{
				id: 2,
				name: '01 - Microwave',
				price: 200
			},
			{
				id: 3,
				name: '02 - Table',
				price: 200
			},
			{
				id: 2,
				name: '03 - Fridge 400',
				price: 200
			},
		]
	}
]