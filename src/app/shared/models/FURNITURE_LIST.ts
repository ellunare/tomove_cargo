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
		id: 1,
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
		id: 2,
		name: 'Fridge',
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
		id: 3,
		name: 'Wardrobe',
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
		id: 4,
		name: 'Washer',
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
		id: 5,
		name: 'TV',
		types: [
			{
				id: 1,
				name: 'TV 42',
				price: 300
			},

		]
	}
]