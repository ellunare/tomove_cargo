/*
const F2 = {
	"furniture": {
		100: {
			"lng": {
				"en": 1,
				"he": 3,
				"ru": 2
			},
			"misc": {
				"coef": 0
			}
		},
		101: {
			"name": "fridge",
			"types": {
				1: {
					"dad": true,
					"dap": 125,
					"name": [
						"-",
						"Fridge 3/4 Doors",
						"Холодильник 3/4 Двери",
						"מקרר 3/4 דלתות"
					],
					"price": 225
				},
				2: {
					"dad": true,
					"dap": 100,
					"name": [
						"-",
						"Fridge 2 Doors",
						"Холодильник 2 Двери",
						"מקרר 2 דלתות"
					],
					"price": 200
				},
				3: {
					"dap": 75,
					"name": [
						"-",
						"Fridge up to 600l",
						"Холодильник до 600л",
						"מקרר עד 600 ליטר"
					],
					"price": 150
				},
				4: {
					"dap": 50,
					"name": [
						"-",
						"Fridge up to 400l",
						"Холодильник до 400л",
						"מקרר עד 400 ליטר"
					],
					"price": 100
				},
				5: {
					"dap": 50,
					"name": [
						"-",
						"Fridge up to 300l",
						"Холодильник до 300л",
						"מקרר עד 300 ליטר"
					],
					"price": 75
				},
				6: {
					"name": [
						"-",
						"Fridge Office",
						"Холодильник Офисный",
						"מקרר משרדי"
					],
					"price": 50
				},
				7: {
					"dap": 50,
					"name": [
						"-",
						"Freezer Large",
						"Мороз. Камера Больш.",
						"מקפיא גדול"
					],
					"price": 75
				},
				8: {
					"name": [
						"-",
						"Freezer Small",
						"Мороз. Камера Малая",
						"מקפיא קטן"
					],
					"price": 50
				},
				9: {
					"name": [
						"-",
						"Wine Cooler",
						"Винный Холодильник",
						"מקרר יין"
					],
					"price": 50
				}
			}
		},
		102: {
			"name": "kitchen tech",
			"types": {
				1: {
					"name": [
						"-",
						"Gas Stove 5 Burner",
						"Плита Газовая 5 Комф.",
						"תנור אפיה 5 להבות"
					],
					"price": 75
				},
				2: {
					"name": [
						"-",
						"Gas Stove",
						"Плита Газовая",
						"תנור אפיה"
					],
					"price": 60
				},
				3: {
					"name": [
						"-",
						"Oven built-in",
						"Духовой Шкаф встр.",
						"תנור בילד"
					],
					"price": 45
				},
				4: {
					"name": [
						"-",
						"Hob built-in 5 Burner",
						"Варочная Пов. 5 Ком. встр.",
						"כירים 5 להבות"
					],
					"price": 50
				},
				5: {
					"name": [
						"-",
						"Hob built-in",
						"Варочная Пов. встр.",
						"כירים"
					],
					"price": 40
				},
				6: {
					"name": [
						"-",
						"Microwave",
						"Микроволновая Печь",
						"מיקרוגל"
					],
					"price": 20
				},
				7: {
					"name": [
						"-",
						"Water Cooler",
						"Кулер для Воды",
						"מיתקן מים"
					],
					"price": 25
				},
				8: {
					"name": [
						"-",
						"Water Cooler Small",
						"Кулер для Воды Малый",
						"מיתקן מים קטן"
					],
					"price": 15
				}
			}
		},
		103: {
			"name": "washing",
			"types": {
				1: {
					"name": [
						"-",
						"Washer",
						"Стиральная Маш.",
						"מכונת כביסה"
					],
					"price": 60
				},
				2: {
					"name": [
						"-",
						"Washer (Top Load)",
						"Стиральная Маш. (Верхняя Загр.)",
						"מכונת כביסה פתח עליון"
					],
					"price": 50
				},
				3: {
					"name": [
						"-",
						"Drying Machine",
						"Сушильная Маш.",
						"מייבש כביסה"
					],
					"price": 50
				},
				4: {
					"name": [
						"-",
						"Dishwasher",
						"Посудомоечная Маш.",
						"מדיח כלים"
					],
					"price": 60
				}
			}
		},
		104: {
			"name": "Sofa",
			"types": {
				1: {
					"dad": true,
					"dap": 50,
					"name": [
						"-",
						"Sofa 3-Seat",
						"Диван 3-Мест.",
						"ספה 3 מושבית"
					],
					"price": 100
				},
				2: {
					"dap": 30,
					"name": [
						"-",
						"Sofa 2-Seat",
						"Диван 2-Мест.",
						"ספה 2 מושבית"
					],
					"price": 75
				},
				3: {
					"name": [
						"-",
						"Armchair",
						"Кресло",
						"כורסא"
					],
					"price": 50
				},
				4: {
					"dad": true,
					"dap": 75,
					"name": [
						"-",
						"Folding Sofa 3-Seat",
						"Диван Реклайнер 3-Мест.",
						"ספת 3 עם ריקליינרים"
					],
					"price": 150
				},
				5: {
					"dap": 75,
					"name": [
						"-",
						"Folding Sofa 2-Seat",
						"Диван Реклайнер 2-Мест.",
						"ספת 2 עם ריקליינרים"
					],
					"price": 125
				},
				6: {
					"name": [
						"-",
						"Folding Armchair",
						"Кресло Реклайнер",
						"כורסא עם ריקליינרים"
					],
					"price": 85
				},
				7: {
					"dad": true,
					"dap": 50,
					"name": [
						"-",
						"Corner Sofa",
						"Диван Угловой",
						"פינת ספה"
					],
					"price": 150
				},
				8: {
					"name": [
						"-",
						"Massage Chair",
						"Кресло Массажное",
						"כורסת מסאז'"
					],
					"price": 100
				},
				9: {
					"name": [
						"-",
						"Wooden Armchair",
						"Дервянное Кресло",
						"כורסת עץ"
					],
					"price": 35
				}
			}
		},
{
	"id": 105,
		"name": "table",
			"types": [
				{
					"id": 0
				},
				{
					"dad": true,
					"dap": 75,
					"id": 1,
					"name": [
						"-",
						"Dinner Table",
						"Обеденный Cтол",
						"שולחן פינת אוכל"
					],
					"price": 150
				},
				{
					"dap": 35,
					"id": 2,
					"name": [
						"-",
						"Glass Kitchen Table",
						"Кухонный Стол Стеклянный",
						"שולחן מטבח זכוכית"
					],
					"price": 75
				},
				{
					"dap": 20,
					"id": 3,
					"name": [
						"-",
						"Kitchen Table",
						"Кухонный Стол",
						"שולחן מטבח"
					],
					"price": 50
				},
				{
					"id": 4,
					"name": [
						"-",
						"Folding Table",
						"Стол - Книжка",
						"שולחן ספר"
					],
					"price": 65
				},
				{
					"id": 5,
					"name": [
						"-",
						"Salon Chair",
						"Салонный Стул",
						"כסא סלון"
					],
					"price": 12
				},
				{
					"id": 6,
					"name": [
						"-",
						"Kitchen Chair",
						"Кухонный Стул",
						"כיסא"
					],
					"price": 7
				}
			]
},
{
	"id": 106,
		"name": "tv",
			"types": [
				{
					"id": 0
				},
				{
					"dap": 25,
					"id": 1,
					"name": [
						"-",
						"TV up to 40\"",
						"ТВ до 40\"",
						"טלויזיה עד 40\""
					],
					"price": 50
				},
				{
					"dap": 25,
					"id": 2,
					"name": [
						"-",
						"TV up to 55\"",
						"ТВ до 55\"",
						"טלויזיה עד 55\""
					],
					"price": 75
				},
				{
					"dap": 25,
					"id": 3,
					"name": [
						"-",
						"TV up to 65\"",
						"ТВ до 65\"",
						"טלויזיה עד 65\""
					],
					"price": 125
				},
				{
					"dap": 25,
					"id": 4,
					"name": [
						"-",
						"TV over 65\"",
						"ТВ более 65\"",
						"טלויזיה מעל 65\""
					],
					"price": 175
				},
				{
					"id": 5,
					"name": [
						"-",
						"TV Stand over 1.2m",
						"ТВ Тумба более 1,2м",
						"מזנון מעל 1.2 מטר"
					],
					"price": 75
				},
				{
					"id": 6,
					"name": [
						"-",
						"TV Stand up to 1.2m",
						"ТВ Тумба менее 1,2м",
						"מזנון עד 1.2 מטר"
					],
					"price": 50
				},
				{
					"id": 7,
					"name": [
						"-",
						"Сoffee Table Large",
						"Журнальн. Столик больш.",
						"שולחן סלון גדול"
					],
					"price": 50
				},
				{
					"id": 8,
					"name": [
						"-",
						"Coffee Table",
						"Журнальн. Столик",
						"שולחן סלון"
					],
					"price": 35
				}
			]
},
{
	"id": 107,
		"name": "wardrobe",
			"types": [
				{
					"id": 0
				},
				{
					"dad": true,
					"dap": 40,
					"id": 1,
					"name": [
						"-",
						"Wardrobe 1-Door",
						"Шкаф 1-Дверь",
						"ארון 1 דלתות"
					],
					"price": 40
				},
				{
					"dad": true,
					"dap": 80,
					"id": 2,
					"name": [
						"-",
						"Wardrobe 2-Door",
						"Шкаф 2-Двери",
						"ארון 2 דלתות"
					],
					"price": 80
				},
				{
					"dad": true,
					"dap": 120,
					"id": 3,
					"name": [
						"-",
						"Wardrobe 3-Door",
						"Шкаф 3-Двери",
						"ארון 3 דלתות"
					],
					"price": 120
				},
				{
					"dad": true,
					"dap": 160,
					"id": 4,
					"name": [
						"-",
						"Wardrobe 4-Door",
						"Шкаф 4-Двери",
						"ארון 4 דלתות"
					],
					"price": 160
				},
				{
					"dad": true,
					"dap": 200,
					"id": 5,
					"name": [
						"-",
						"Wardrobe 5-Door",
						"Шкаф 5-Дверей",
						"ארון 5 דלתות"
					],
					"price": 200
				},
				{
					"dad": true,
					"dap": 240,
					"id": 6,
					"name": [
						"-",
						"Wardrobe 6-Door",
						"Шкаф 6-Дверей",
						"ארון 6 דלתות"
					],
					"price": 240
				},
				{
					"dad": true,
					"dap": 160,
					"id": 7,
					"name": [
						"-",
						"Closet 2-Door",
						"Шкаф Купе 2-Двери",
						"ארון עם 2 דלתות הזזה"
					],
					"price": 140
				},
				{
					"dad": true,
					"dap": 240,
					"id": 8,
					"name": [
						"-",
						"Closet 3-Door",
						"Шкаф Купе 3-Двери",
						"ארון עם 3 דלתות הזזה"
					],
					"price": 210
				},
				{
					"dad": true,
					"dap": 320,
					"id": 9,
					"name": [
						"-",
						"Closet 4-Door",
						"Шкаф Купе 4-Двери",
						"ארון עם 4 דלתות הזזה"
					],
					"price": 280
				}
			]
},
{
	"id": 108,
		"name": "bed_big",
			"types": [
				{
					"id": 0
				},
				{
					"dad": true,
					"dap": 100,
					"id": 1,
					"name": [
						"-",
						"Twin Bed (Electric)",
						"Кровать 2-Сп. (Электрич.)",
						"מיטה זוגית חשמלית"
					],
					"price": 225
				},
				{
					"dad": true,
					"dap": 75,
					"id": 2,
					"name": [
						"-",
						"Twin Bed (Box for linen + Mattress)",
						"Кровать 2-Сп. (Ящик для белья + Матрас)",
						"מיטה זוגית עם ארגז מצעים"
					],
					"price": 150
				},
				{
					"dad": true,
					"dap": 50,
					"id": 3,
					"name": [
						"-",
						"Twin Metal Bed",
						"Кровать 2-Сп. Металлич.",
						"מיטה זוגית מברזל"
					],
					"price": 125
				},
				{
					"dad": true,
					"dap": 50,
					"id": 4,
					"name": [
						"-",
						"Twin Bed (Frame + Mattress + Headboard)",
						"Кровать 2-Сп. (Каркас + Матрас + Изголовье) ",
						"מיטה זוגית עם מסגרת וראש מיטה"
					],
					"price": 125
				},
				{
					"id": 5,
					"name": [
						"-",
						"Twin Bed (Frame + Mattress)",
						"Кровать 2-Сп. (Каркас + Матрас)",
						"מיטה זוגית עם מסגרת"
					],
					"price": 100
				},
				{
					"id": 6,
					"name": [
						"-",
						"Twin Mattress",
						"Матрас 2-Сп.",
						"מיטה זוגית"
					],
					"price": 65
				},
				{
					"id": 7,
					"name": [
						"-",
						"Frame for Twin Mattress",
						"Каркас под Матрас 2-Сп.",
						"מסגרת למיטה זוגית"
					],
					"price": 50
				},
				{
					"dad": true,
					"dap": 50,
					"id": 8,
					"name": [
						"-",
						"Bed 1.5 (Electric)",
						"Кровать 1.5 (Электрич.)",
						"מיטה וחצי חשמלית"
					],
					"price": 125
				},
				{
					"dap": 50,
					"id": 9,
					"name": [
						"-",
						"Bed 1.5",
						"Кровать 1.5",
						"מיטה וחצי"
					],
					"price": 100
				}
			]
},
{
	"id": 109,
		"name": "bed_small",
			"types": [
				{
					"id": 0
				},
				{
					"dap": 50,
					"id": 1,
					"name": [
						"-",
						"Book Bed",
						"Кровать-Книжка",
						"מיטת ספר"
					],
					"price": 100
				},
				{
					"dad": true,
					"dap": 50,
					"id": 2,
					"name": [
						"-",
						"Single Bed (Frame + Mattress + Headboard)",
						"Кровать 1-Сп. (Каркас + Матрас + Изголовье)",
						"מיטת נוער נפתחת "
					],
					"price": 100
				},
				{
					"dad": true,
					"dap": 50,
					"id": 3,
					"name": [
						"-",
						"Single Metal Bed",
						"Кровать 1-Сп. Металлич.",
						"מיטת יחיד מברזל"
					],
					"price": 100
				},
				{
					"id": 4,
					"name": [
						"-",
						"Single Bed (Frame + Mattress)",
						"Кровать 1-Сп. (Каркас + Матрас)",
						"מיטת נוער"
					],
					"price": 85
				},
				{
					"id": 5,
					"name": [
						"-",
						"Single Matress",
						"Матрас 1-Сп.",
						"מזרון יחיד"
					],
					"price": 50
				},
				{
					"id": 6,
					"name": [
						"-",
						"Frame for Single Mattress",
						"Каркас под Матрас 1-Сп.",
						"בסיס למיטה יחיד"
					],
					"price": 25
				},
				{
					"dad": true,
					"dap": 75,
					"id": 7,
					"name": [
						"-",
						"Two-Level Bed",
						"Кровать 2-Ярусная",
						"מיטת קומותיים"
					],
					"price": 125
				},
				{
					"dap": 25,
					"id": 8,
					"name": [
						"-",
						"Children Bed 1.6m",
						"Кровать Детская 1,6м",
						"מיטת ילדים 1.6 מטר"
					],
					"price": 75
				},
				{
					"dad": true,
					"dap": 25,
					"id": 9,
					"name": [
						"-",
						"Baby Bed",
						"Кровать для Младенца",
						"מיטת תינוק"
					],
					"price": 60
				}
			]
},
{
	"id": 110,
		"name": "case",
			"types": [
				{
					"id": 0
				},
				{
					"dad": true,
					"dap": 150,
					"id": 1,
					"name": [
						"-",
						"Bookstand",
						"Книжный Шкаф",
						"ארון מדפים"
					],
					"price": 200
				},
				{
					"dap": 75,
					"id": 2,
					"name": [
						"-",
						"Bookcase Large",
						"Книжная Полка больш.",
						"כוורת גדולה"
					],
					"price": 100
				},
				{
					"id": 3,
					"name": [
						"-",
						"Bookcase Small",
						"Книжная Полка малая",
						"כוורת קטנה"
					],
					"price": 75
				},
				{
					"dad": true,
					"dap": 150,
					"id": 4,
					"name": [
						"-",
						"Furniture Wall",
						"Мебельная Стенка",
						"מזנון קיר"
					],
					"price": 200
				},
				{
					"dap": 50,
					"id": 5,
					"name": [
						"-",
						"Showcase",
						"Витрина",
						"ויטרינה"
					],
					"price": 100
				},
				{
					"id": 6,
					"name": [
						"-",
						"Glass Showcase",
						"Стеклянная Витрина",
						"ויטרינה זכוכית"
					],
					"price": 60
				},
				{
					"id": 7,
					"name": [
						"-",
						"Cupboard",
						"Шкафчик Навесной",
						"קובייה"
					],
					"price": 45
				},
				{
					"dap": 20,
					"id": 8,
					"name": [
						"-",
						"Shelf",
						"Полка",
						"מדף"
					],
					"price": 20
				}
			]
},
{
	"id": 111,
		"name": "chest",
			"types": [
				{
					"id": 0
				},
				{
					"dad": true,
					"dap": 25,
					"id": 1,
					"name": [
						"-",
						"Chest of Drawers & Mirror",
						"Комод с Зеркалом",
						"שידה עם מראה"
					],
					"price": 75
				},
				{
					"id": 2,
					"name": [
						"-",
						"Chest of Drawers",
						"Комод",
						"שידת טואלט"
					],
					"price": 50
				},
				{
					"id": 3,
					"name": [
						"-",
						"Baby Changing Table",
						"Тумба для Младенцев",
						"שידת החתלה"
					],
					"price": 60
				},
				{
					"id": 4,
					"name": [
						"-",
						"Bedside Table",
						"Прикроватная Тумбочка",
						"שידת צד למיטה"
					],
					"price": 20
				},
				{
					"id": 5,
					"name": [
						"-",
						"Shoe Cupboard",
						"Тумбочка для Обуви",
						"שידת נעליים"
					],
					"price": 35
				},
				{
					"id": 6,
					"name": [
						"-",
						"Floor Mirror",
						"Зеркало Напольное",
						"מראה עומדת"
					],
					"price": 60
				},
				{
					"id": 7,
					"name": [
						"-",
						"Hinged Mirror",
						"Зеркало Навесное",
						"מראת קיר"
					],
					"price": 30
				}
			]
},
{
	"id": 112,
		"name": "desk",
			"types": [
				{
					"id": 0
				},
				{
					"dap": 25,
					"id": 1,
					"name": [
						"-",
						"Desk",
						"Стол Письменный",
						"שולחן כתיבה"
					],
					"price": 50
				},
				{
					"dad": true,
					"dap": 50,
					"id": 2,
					"name": [
						"-",
						"Corner Desk",
						"Стол Письменный Угловой",
						"שולחן כתיבה פינתי"
					],
					"price": 75
				},
				{
					"id": 3,
					"name": [
						"-",
						"Glass Desk",
						"Стол Письменный Стеклянный",
						"שולחן משרדי זכוכית"
					],
					"price": 80
				},
				{
					"dap": 50,
					"id": 4,
					"name": [
						"-",
						"Computer Desk",
						"Стол Компьютерный",
						"שולחן עם סיפריה"
					],
					"price": 100
				},
				{
					"dad": true,
					"dap": 75,
					"id": 5,
					"name": [
						"-",
						"Corner Computer Desk",
						"Стол Компьютерный Угловой",
						"שולחן מחשב ספריה פינתי"
					],
					"price": 125
				},
				{
					"id": 6,
					"name": [
						"-",
						"Computer",
						"Компьютер",
						"מחשב אישי"
					],
					"price": 35
				},
				{
					"id": 7,
					"name": [
						"-",
						"All-in-One",
						"Моноблок",
						"הכל באחד"
					],
					"price": 60
				},
				{
					"id": 8,
					"name": [
						"-",
						"Computer Chair",
						"Стул Компьютеный",
						"כסא מחשב"
					],
					"price": 15
				},
				{
					"id": 9,
					"name": [
						"-",
						"Computer Armchair",
						"Кресло Компьютерное",
						"כורסא מחשב"
					],
					"price": 25
				}
			]
},
{
	"id": 113,
		"name": "music_inst",
			"types": [
				{
					"id": 0
				},
				{
					"id": 1,
					"name": [
						"-",
						"Grand-Piano",
						"Рояль",
						"פסנתר כנף"
					],
					"price": 600
				},
				{
					"id": 2,
					"name": [
						"-",
						"Piano 3-Pedal",
						"Пианино 3 Педали",
						"פסנתר 3 פדלים"
					],
					"price": 450
				},
				{
					"id": 3,
					"name": [
						"-",
						"Piano 2-Pedal",
						"Пианино 2 Педали",
						"פסנתר 2 פדלים"
					],
					"price": 350
				},
				{
					"id": 4,
					"name": [
						"-",
						"Synthesizer",
						"Синтезатор",
						"פסנתר חשמלי"
					],
					"price": 50
				},
				{
					"dad": true,
					"dap": 200,
					"id": 5,
					"name": [
						"-",
						"Drum Kit",
						"Барабаны",
						"תופים"
					],
					"price": 250
				},
				{
					"id": 6,
					"name": [
						"-",
						"Guitar",
						"Гитара",
						"גיטרה"
					],
					"price": 35
				}
			]
},
{
	"id": 114,
		"name": "sport",
			"types": [
				{
					"id": 0
				},
				{
					"dad": true,
					"dap": 150,
					"id": 1,
					"name": [
						"-",
						"Training Apparatus",
						"Тренажер",
						"מכשיר כושר"
					],
					"price": 175
				},
				{
					"id": 2,
					"name": [
						"-",
						"Treadmill",
						"Беговая Дорожка ",
						"הליכון "
					],
					"price": 100
				},
				{
					"id": 3,
					"name": [
						"-",
						"Exercise Bike",
						"Велотренажер",
						"אופני כושר"
					],
					"price": 75
				},
				{
					"id": 4,
					"name": [
						"-",
						"Bicycle",
						"Велосипед",
						"אופניים"
					],
					"price": 60
				},
				{
					"id": 5,
					"name": [
						"-",
						"Сhildren Bicycle",
						"Велосипед Детский",
						"אופניים לילדים"
					],
					"price": 25
				},
				{
					"dap": 75,
					"id": 6,
					"name": [
						"-",
						"Tennis Table",
						"Теннисный Стол",
						"טניס שולחן"
					],
					"price": 150
				},
				{
					"id": 7,
					"name": [
						"-",
						"Trampoline",
						"Батут",
						"טרמפולינה"
					],
					"price": 200
				}
			]
},
{
	"id": 115,
		"name": "decor",
			"types": [
				{
					"id": 0
				},
				{
					"id": 1,
					"name": [
						"-",
						"Painting",
						"Картина",
						"תמונה"
					],
					"price": 10
				},
				{
					"id": 2,
					"name": [
						"-",
						"Statuette Big (over 40cm)",
						"Статуэтка большая (от 40см)",
						"פסל גדול (מעל 40 ס\"מ)"
					],
					"price": 50
				},
				{
					"id": 3,
					"name": [
						"-",
						"Statuette",
						"Статуэтка",
						"פסל"
					],
					"price": 30
				},
				{
					"id": 4,
					"name": [
						"-",
						"Carpet",
						"Ковер",
						"שטיח"
					],
					"price": 20
				},
				{
					"dad": true,
					"dap": 25,
					"id": 5,
					"name": [
						"-",
						"Chandelier",
						"Люстра",
						"ניברשת"
					],
					"price": 25
				},
				{
					"id": 6,
					"name": [
						"-",
						"Floor Lamp",
						"Торшер",
						"מנורה"
					],
					"price": 10
				}
			]
},
{
	"id": 116,
		"name": "garden",
			"types": [
				{
					"id": 0
				},
				{
					"id": 1,
					"name": [
						"-",
						"Tree in a Pot",
						"Дерево в Горшке",
						"עץ בעציץ"
					],
					"price": 50
				},
				{
					"id": 2,
					"name": [
						"-",
						"Big Flower",
						"Цветок больш.",
						"עציץ גדול"
					],
					"price": 25
				},
				{
					"id": 3,
					"name": [
						"-",
						"Flower",
						"Цветок",
						"עציץ"
					],
					"price": 15
				},
				{
					"id": 4,
					"name": [
						"-",
						"Rattan Table",
						"Стол Ротанговый",
						"שולחן קש"
					],
					"price": 45
				},
				{
					"id": 5,
					"name": [
						"-",
						"Rattan Chair",
						"Стул Ротанговый",
						"כיסא קש"
					],
					"price": 10
				},
				{
					"id": 6,
					"name": [
						"-",
						"Gas BBQ",
						"Мангал Газовый",
						"מנגל גז"
					],
					"price": 50
				},
				{
					"id": 7,
					"name": [
						"-",
						"Children Swing",
						"Качели",
						"נדנדה"
					],
					"price": 175
				},
				{
					"id": 8,
					"name": [
						"-",
						"Hut (Suka)",
						"Сука (Шалаш)",
						"סוכה"
					],
					"price": 60
				}
			]
},
{
	"id": 117,
		"name": "plastic",
			"types": [
				{
					"id": 0
				},
				{
					"dap": 75,
					"id": 1,
					"name": [
						"-",
						"Plastic Pantry Large",
						"Пластиковая Кладовая больш.",
						"מחסן פלסטיק גדול"
					],
					"price": 200
				},
				{
					"dap": 50,
					"id": 2,
					"name": [
						"-",
						"Plastic Pantry Small",
						"Пластиковая Кладовая",
						"מחסן פלסטיק קטן"
					],
					"price": 125
				},
				{
					"id": 3,
					"name": [
						"-",
						"Plastic Cupboard",
						"Пластиковый Шкаф",
						"ארון שרות פלסטיק"
					],
					"price": 40
				},
				{
					"id": 4,
					"name": [
						"-",
						"Plastic Table",
						"Пластиковый Стол",
						"שולחן פלסטיק"
					],
					"price": 30
				},
				{
					"id": 5,
					"name": [
						"-",
						"Plastic Chair",
						"Пластиковый Стул",
						"כסא פלסטיק"
					],
					"price": 10
				},
				{
					"id": 6,
					"name": [
						"-",
						"Plastic Deck Chair",
						"Пластиковый Шезлонг",
						"כיסא חוף מתקפל"
					],
					"price": 30
				},
				{
					"id": 7,
					"name": [
						"-",
						"Plastic Bedside",
						"Пластиковая Тумбочка",
						"שידת פלסטיק"
					],
					"price": 10
				},
				{
					"id": 8,
					"name": [
						"-",
						"Plastic Shelf",
						"Пластиковая Полка",
						"מדף פלסטיק"
					],
					"price": 15
				},
				{
					"id": 9,
					"name": [
						"-",
						"Iron Cupboard",
						"Шкаф Железный",
						"ארון ברזל"
					],
					"price": 75
				}
			]
},
{
	"id": 118,
		"name": "climate",
			"types": [
				{
					"id": 0
				},
				{
					"id": 1,
					"name": [
						"-",
						"Fan",
						"Вентилятор",
						"מאוורר"
					],
					"price": 15
				},
				{
					"id": 2,
					"name": [
						"-",
						"Heater",
						"Обогреватель",
						"תנור חימום"
					],
					"price": 15
				},
				{
					"id": 3,
					"name": [
						"-",
						"Radiator",
						"Радиатор",
						"רדיאטור"
					],
					"price": 25
				},
				{
					"id": 4,
					"name": [
						"-",
						"Air Conditioner",
						"Кондиционер",
						"מזגן"
					],
					"price": 100
				}
			]
},
{
	"id": 119,
		"name": "movie",
			"types": [
				{
					"id": 0
				},
				{
					"id": 1,
					"name": [
						"-",
						"Home Theater",
						"Домашний кинотеатр",
						"מערכת סטריאו"
					],
					"price": 35
				},
				{
					"id": 2,
					"name": [
						"-",
						"Speakers",
						"Колонки",
						"רמקולים"
					],
					"price": 25
				},
				{
					"id": 3,
					"name": [
						"-",
						"Column Speaker",
						"Колонка Напольная",
						"רמקול גדול"
					],
					"price": 50
				}
			]
},
{
	"id": 120,
		"name": "pro",
			"types": [
				{
					"id": 0
				},
				{
					"id": 1,
					"name": [
						"-",
						"Sewing Machine",
						"Швейная Машина",
						"מכונת תפירה"
					],
					"price": 100
				},
				{
					"id": 2,
					"name": [
						"-",
						"Cosmetic Chair",
						"Косметологич. Кресло",
						"כסא קוסמטיקה"
					],
					"price": 60
				},
				{
					"id": 3,
					"name": [
						"-",
						"Dentist Chair",
						"Стоматологич. Кресло",
						"כיסא רופא שיניים"
					],
					"price": 250
				},
				{
					"id": 4,
					"name": [
						"-",
						"Massage Table",
						"Массажный Стол",
						"שולחן עיסוי"
					],
					"price": 100
				}
			]
},
{
	"id": 121,
		"name": "bag",
			"types": [
				{
					"id": 0
				},
				{
					"id": 1,
					"name": [
						"-",
						"Duffel Bag",
						"Вещевой Баул",
						"בלה עם דברים"
					],
					"price": 35
				},
				{
					"id": 2,
					"name": [
						"-",
						"Suitcase",
						"Вещевой Чемодан",
						"המזוודה עם הדברים"
					],
					"price": 15
				},
				{
					"id": 3,
					"name": [
						"-",
						"Bag",
						"Вещевая Сумка",
						"תיק עם דברים"
					],
					"price": 10
				},
				{
					"id": 4,
					"name": [
						"-",
						"Plastic Bag",
						"Вещевой Пакет",
						"שקית עם דברים"
					],
					"price": 7
				}
			]
},
{
	"id": 122,
		"name": "aquarium",
			"types": [
				{
					"id": 0
				},
				{
					"id": 1,
					"name": [
						"-",
						"Aquarium up to 200cm",
						"Аквариум до 200см",
						"אקווריום עד 200 ס\"מ"
					],
					"price": 250
				},
				{
					"id": 2,
					"name": [
						"-",
						"Aquarium up to 140cm",
						"Аквариум до 140см",
						"אקווריום עד 140 ס\"מ"
					],
					"price": 150
				},
				{
					"id": 3,
					"name": [
						"-",
						"Aquarium up to 80cm",
						"Аквариум до 80см",
						"אקווריום עד 80 ס\"מ"
					],
					"price": 80
				}
			]
}
	},
"main": "furniture"
}
*/









export interface F_ITEM {
	id: number,
	name?: [string],
	price: number,
	dap?: number
}

export interface FURNITURE {
	id: number,
	name: string,
	types: [F_ITEM]
}

export const FURNITURE_LIST: {} | [FURNITURE] = [
	{ en: 1, ru: 2, he: 3 },

	// 01 ////////////////////////////////////////////// Холодильники
	{
		id: 101,
		name: 'fridge',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Fridge 3/4 Doors'
					, 'Холодильник 3/4 Двери'
					, 'מקרר 3/4 דלתות'
				],
				price: 225,
				dap: 125
			},
			{
				id: 2,
				name: ['-'
					, 'Fridge 2 Doors'
					, 'Холодильник 2 Двери'
					, 'מקרר 2 דלתות'
				],
				price: 200,
				dap: 100
			},
			{
				id: 3,
				name: ['-'
					, 'Fridge up to 600l'
					, 'Холодильник до 600л'
					, 'מקרר עד 600 ליטר'
				],
				price: 150,
				dap: 75
			},
			{
				id: 4,
				name: ['-'
					, 'Fridge up to 400l'
					, 'Холодильник до 400л'
					, 'מקרר עד 400 ליטר'
				],
				price: 100,
				dap: 50
			},
			{
				id: 5,
				name: ['-'
					, 'Fridge up to 300l'
					, 'Холодильник до 300л'
					, 'מקרר עד 300 ליטר'
				],
				price: 75,
				dap: 50
			},
			{
				id: 6,
				name: ['-'
					, 'Fridge Office'
					, 'Холодильник Офисный'
					, 'מקרר משרדי'
				],
				price: 50
			},
			{
				id: 7,
				name: ['-'
					, 'Freezer Large'
					, 'Мороз. Камера Больш.'
					, 'מקפיא גדול'
				],
				price: 75,
				dap: 50
			},
			{
				id: 8,
				name: ['-'
					, 'Freezer Small'
					, 'Мороз. Камера Малая'
					, 'מקפיא קטן'
				],
				price: 50
			},
			{
				id: 9,
				name: ['-'
					, 'Wine Cooler'
					, 'Винный Холодильник'
					, 'מקרר יין'
				],
				price: 50
			}
		]
	},
	// 02 ////////////////////////////////////////////// Кухонная техника
	{
		id: 102,
		name: 'kitchen tech',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Gas Stove 5 Burner'
					, 'Плита Газовая 5 Комф.'
					, 'תנור אפיה 5 להבות'
				],
				price: 75
			},
			{
				id: 2,
				name: ['-'
					, 'Gas Stove'
					, 'Плита Газовая'
					, 'תנור אפיה'
				],
				price: 60
			},
			{
				id: 3,
				name: ['-'
					, 'Oven built-in'
					, 'Духовой Шкаф встр.'
					, 'תנור בילד'
				],
				price: 45
			},
			{
				id: 4,
				name: ['-'
					, 'Hob built-in 5 Burner'
					, 'Варочная Пов. 5 Ком. встр.'
					, 'כירים 5 להבות'
				],
				price: 50
			},
			{
				id: 5,
				name: ['-'
					, 'Hob built-in'
					, 'Варочная Пов. встр.'
					, 'כירים'
				],
				price: 40
			},
			{
				id: 6,
				name: ['-'
					, 'Microwave'
					, 'Микроволновая Печь'
					, 'מיקרוגל'
				],
				price: 20
			},
			{
				id: 7,
				name: ['-'
					, 'Water Cooler'
					, 'Кулер для Воды'
					, 'מיתקן מים'
				],
				price: 25
			},
			{
				id: 8,
				name: ['-'
					, 'Water Cooler Small'
					, 'Кулер для Воды Малый'
					, 'מיתקן מים קטן'
				],
				price: 15
			}
		]
	},
	// 03 ////////////////////////////////////////////// Стирка
	{
		id: 103,
		name: 'washing',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Washer'
					, 'Стиральная Маш.'
					, 'מכונת כביסה'
				],
				price: 60
			},
			{
				id: 2,
				name: ['-'
					, 'Washer (Top Load)'
					, 'Стиральная Маш. (Верхняя Загр.)'
					, 'מכונת כביסה פתח עליון'
				],
				price: 0
			},
			{
				id: 3,
				name: ['-'
					, 'Drying Machine'
					, 'Сушильная Маш.'
					, 'מייבש כביסה'
				],
				price: 50
			},
			{
				id: 4,
				name: ['-'
					, 'Dishwasher'
					, 'Посудомоечная Маш.'
					, 'מדיח כלים'
				],
				price: 60
			}
		]
	},
	// 04 ////////////////////////////////////////////// Диваны / Кресла
	{
		id: 104,
		name: 'Sofa',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Sofa 3-Seat'
					, 'Диван 3-Мест.'
					, 'ספה 3 מושבית'
				],
				price: 100,
				dap: 50
			},
			{
				id: 2,
				name: ['-'
					, 'Sofa 2-Seat'
					, 'Диван 2-Мест.'
					, 'ספה 2 מושבית'
				],
				price: 75,
				dap: 30
			},
			{
				id: 3,
				name: ['-'
					, 'Armchair'
					, 'Кресло'
					, 'כורסא'
				],
				price: 50
			},
			{
				id: 4,
				name: ['-'
					, 'Folding Sofa 3-Seat'
					, 'Диван Реклайнер 3-Мест.'
					, 'ספת 3 עם ריקליינרים'
				],
				price: 150,
				dap: 75
			},
			{
				id: 5,
				name: ['-'
					, 'Folding Sofa 2-Seat'
					, 'Диван Реклайнер 2-Мест.'
					, 'ספת 2 עם ריקליינרים'
				],
				price: 125,
				dap: 75
			},
			{
				id: 6,
				name: ['-'
					, 'Folding Armchair'
					, 'Кресло Реклайнер'
					, 'כורסא עם ריקליינרים'
				],
				price: 85
			},
			{
				id: 7,
				name: ['-'
					, 'Corner Sofa'
					, 'Диван Угловой'
					, 'פינת ספה'
				],
				price: 150,
				dap: 50
			},
			{
				id: 8,
				name: ['-'
					, 'Massage Chair'
					, 'Кресло Массажное'
					, 'כורסת מסאז\''
				],
				price: 100
			}
		]
	},
	// 05 ////////////////////////////////////////////// Кухня Столы Стулья
	{
		id: 105,
		name: 'table',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Glass Kitchen Table'
					, 'Кухонный Стол Стеклянный'
					, 'שולחן מטבח זכוכית'
				],
				price: 75
			},
			{
				id: 2,
				name: ['-'
					, 'Kitchen Table'
					, 'Кухонный Стол'
					, 'שולחן מטבח'
				],
				price: 50
			},
			{
				id: 3,
				name: ['-'
					, 'Kitchen Chair'
					, 'Кухонный Стул'
					, 'כיסא'
				],
				price: 7
			},
			{
				id: 4,
				name: ['-'
					, 'Dinner Table'
					, 'Обеденный Cтол'
					, 'שולחן פינת אוכל'
				],
				price: 150,
				dap: 75
			},
			{
				id: 5,
				name: ['-'
					, 'Salon Chair'
					, 'Салонный Стул'
					, 'כסא סלון'
				],
				price: 12
			}
		]
	},
	// 06 ////////////////////////////////////////////// ТВ
	{
		id: 106,
		name: 'tv',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'TV up to 32"'
					, 'ТВ до 32"'
					, 'טלויזיה עד 32"'
				],
				price: 35,
				dap: 35
			},
			{
				id: 2,
				name: ['-'
					, 'TV up to 42"'
					, 'ТВ до 42"'
					, 'טלויזיה עד 42"'
				],
				price: 50,
				dap: 35
			},
			{
				id: 3,
				name: ['-'
					, 'TV up to 50"'
					, 'ТВ до 50"'
					, 'טלויזיה עד 50"'
				],
				price: 75,
				dap: 35
			},
			{
				id: 4,
				name: ['-'
					, 'TV up to 60"'
					, 'ТВ до 60"'
					, 'טלויזיה עד 60"'
				],
				price: 125,
				dap: 50
			},
			{
				id: 5,
				name: ['-'
					, 'TV over 65"'
					, 'ТВ более 65"'
					, 'טלויזיה מעל 65"'
				],
				price: 175,
				dap: 75
			},
			{
				id: 6,
				name: ['-'
					, 'Сoffee Table Large'
					, 'Журнальн. Столик больш.'
					, 'שולחן סלון גדול'
				],
				price: 50
			},
			{
				id: 7,
				name: ['-'
					, 'TV Stand over 1.2m'
					, 'ТВ Тумба более 1,2м'
					, 'מזנון מעל 1.2 מטר'
				],
				price: 75
			},
			{
				id: 8,
				name: ['-'
					, 'TV Stand up to 1.2m'
					, 'ТВ Тумба менее 1,2м'
					, 'מזנון עד 1.2 מטר'
				],
				price: 50
			},
			{
				id: 9,
				name: ['-'
					, 'Coffee Table'
					, 'Журнальн. Столик'
					, 'שולחן סלון'
				],
				price: 35
			}
		]
	},
	// 07 ////////////////////////////////////////////// Гардероб
	{
		id: 107,
		name: 'wardrobe',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Wardrobe 1-Door'
					, 'Шкаф 1-Дверь'
					, 'ארון 1 דלתות'
				],
				price: 40,
				dap: 40
			}
			,
			{
				id: 2,
				name: ['-'
					, 'Wardrobe 2-Door'
					, 'Шкаф 2-Двери'
					, 'ארון 2 דלתות'
				],
				price: 80,
				dap: 80
			},
			{
				id: 3,
				name: ['-'
					, 'Wardrobe 3-Door'
					, 'Шкаф 3-Двери'
					, 'ארון 3 דלתות'
				],
				price: 120,
				dap: 120
			},
			{
				id: 4,
				name: ['-'
					, 'Wardrobe 4-Door'
					, 'Шкаф 4-Двери'
					, 'ארון 4 דלתות'
				],
				price: 160,
				dap: 160
			},
			{
				id: 5,
				name: ['-'
					, 'Wardrobe 5-Door'
					, 'Шкаф 5-Дверей'
					, 'ארון 5 דלתות'
				],
				price: 200,
				dap: 200
			},
			{
				id: 6,
				name: ['-'
					, 'Wardrobe 6-Door'
					, 'Шкаф 6-Дверей'
					, 'ארון 6 דלתות'
				],
				price: 240,
				dap: 240
			},
			{
				id: 7,
				name: ['-'
					, 'Closet 2-Door'
					, 'Шкаф Купе 2-Двери'
					, 'ארון עם 2 דלתות הזזה'
				],
				price: 140,
				dap: 160
			},
			{
				id: 8,
				name: ['-'
					, 'Closet 3-Door'
					, 'Шкаф Купе 3-Двери'
					, 'ארון עם 3 דלתות הזזה'
				],
				price: 210,
				dap: 240
			},
			{
				id: 9,
				name: ['-'
					, 'Closet 4-Door'
					, 'Шкаф Купе 4-Двери'
					, 'ארון עם 4 דלתות הזזה'
				],
				price: 280,
				dap: 320
			}
		]
	},
	// 08 ////////////////////////////////////////////// Кровати Большие
	{
		id: 108,
		name: 'bed_big',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Twin Bed (Electric)'
					, 'Кровать 2-Сп. (Электрич.)'
					, 'מיטה זוגית חשמלית'
				],
				price: 225,
				dap: 100
			},
			{
				id: 2,
				name: ['-'
					, 'Twin Bed (Box for linen + Mattress)'
					, 'Кровать 2-Сп. (Ящик для белья + Матрас)'
					, 'מיטה זוגית עם ארגז מצעים'
				],
				price: 150,
				dap: 75
			},
			{
				id: 3,
				name: ['-'
					, 'Twin Bed (Frame + Mattress + Headboard)'
					, 'Кровать 2-Сп. (Каркас + Матрас + Изголовье) '
					, 'מיטה זוגית עם מסגרת וראש מיטה'
				],
				price: 125,
				dap: 50
			},
			{
				id: 4,
				name: ['-'
					, 'Twin Bed (Frame + Mattress)'
					, 'Кровать 2-Сп. (Каркас + Матрас)'
					, 'מיטה זוגית עם מסגרת'
				],
				price: 100
			},
			{
				id: 5,
				name: ['-'
					, 'Twin Mattress'
					, 'Матрас 2-Сп.'
					, 'מיטה זוגית'
				],
				price: 65
			},
			{
				id: 6,
				name: ['-'
					, 'Frame for Twin Mattress'
					, 'Каркас под Матрас 2-Сп.'
					, 'מסגרת למיטה זוגית'
				],
				price: 50
			},
			{
				id: 7,
				name: ['-'
					, 'Bed 1.5 (Electric)'
					, 'Кровать 1.5 (Электрич.)'
					, 'מיטה וחצי חשמלית'
				],
				price: 125,
				dap: 50
			},
			{
				id: 8,
				name: ['-'
					, 'Bed 1.5'
					, 'Кровать 1.5'
					, 'מיטה וחצי'
				],
				price: 100,
				dap: 50
			}
		]
	},
	// 09 ////////////////////////////////////////////// Кровати Маленькие
	{
		id: 109,
		name: 'bed_small',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Book Bed'
					, 'Кровать-Книжка'
					, 'מיטת ספר'
				],
				price: 100,
				dap: 50
			},
			{
				id: 2,
				name: ['-'
					, 'Single Bed (Frame + Mattress + Headboard)'
					, 'Кровать 1-Сп. (Каркас + Матрас + Изголовье) '
					, 'מיטת נוער נפתחת '
				],
				price: 100,
				dap: 50
			},
			{
				id: 3,
				name: ['-'
					, 'Single Bed (Frame + Mattress)'
					, 'Кровать 1-Сп. (Каркас + Матрас)'
					, 'מיטת נוער'
				],
				price: 85
			},
			{
				id: 4,
				name: ['-'
					, 'Single Matress'
					, 'Матрас 1-Сп.'
					, 'מזרון יחיד'
				],
				price: 50
			},
			{
				id: 5,
				name: ['-'
					, 'Frame for Single Mattress'
					, 'Каркас под Матрас 1-Сп.'
					, 'בסיס למיטה יחיד'
				],
				price: 25
			},
			{
				id: 6,
				name: ['-'
					, 'Two-Level Bed'
					, 'Кровать 2-Ярусная'
					, 'מיטת קומותיים'
				],
				price: 125,
				dap: 75
			},
			{
				id: 7,
				name: ['-'
					, 'Children Bed 1.6m'
					, 'Кровать Детская 1,6м'
					, 'מיטת ילדים 1.6 מטר'
				],
				price: 75,
				dap: 25
			},
			{
				id: 8,
				name: ['-'
					, 'Baby Bed'
					, 'Кровать для Младенца'
					, 'מיטת תינוק'
				],
				price: 60,
				dap: 25
			}
		]
	},
	// 10 ////////////////////////////////////////////// Книгохранилище
	{
		id: 110,
		name: 'case',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Bookstand'
					, 'Книжный Шкаф'
					, 'ארון מדפים'
				],
				price: 200,
				dap: 150
			},
			{
				id: 2,
				name: ['-'
					, 'Bookcase Large'
					, 'Книжная Полка больш.'
					, 'כוורת גדולה'
				],
				price: 100,
				dap: 75
			},
			{
				id: 3,
				name: ['-'
					, 'Bookcase Small'
					, 'Книжная Полка малая'
					, 'כוורת קטנה'
				],
				price: 75
			},
			{
				id: 4,
				name: ['-'
					, 'Furniture Wall'
					, 'Мебельная Стенка'
					, 'מזנון קיר'
				],
				price: 200,
				dap: 150
			},
			{
				id: 5,
				name: ['-'
					, 'Showcase'
					, 'Витрина'
					, 'ויטרינה'
				],
				price: 100,
				dap: 50
			},
			{
				id: 6,
				name: ['-'
					, 'Glass Showcase'
					, 'Стеклянная Витрина'
					, 'ויטרינה זכוכית'
				],
				price: 60
			},
			{
				id: 7,
				name: ['-'
					, 'Cupboard'
					, 'Шкафчик Навесной'
					, 'קובייה'
				],
				price: 45
			},
			{
				id: 8,
				name: ['-'
					, 'Shelf'
					, 'Полка'
					, 'מדף'
				],
				price: 20,
				dap: 20
			}
		]
	},
	// 11 ////////////////////////////////////////////// Комоды / Тумбы
	{
		id: 111,
		name: 'chest',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Chest of Drawers & Mirror'
					, 'Комод с Зеркалом'
					, 'שידה עם מראה'
				],
				price: 75,
				dap: 25
			},
			{
				id: 2,
				name: ['-'
					, 'Chest of Drawers'
					, 'Комод'
					, 'שידת טואלט'
				],
				price: 50
			},
			{
				id: 3,
				name: ['-'
					, 'Baby Changing Table'
					, 'Тумба для Младенцев'
					, 'שידת החתלה'
				],
				price: 60
			},
			{
				id: 4,
				name: ['-'
					, 'Bedside Table'
					, 'Прикроватная Тумбочка'
					, 'שידת צד למיטה'
				],
				price: 20
			},
			{
				id: 5,
				name: ['-'
					, 'Shoe Cupboard'
					, 'Тумбочка для Обуви'
					, 'שידת נעליים'
				],
				price: 35
			},
			{
				id: 6,
				name: ['-'
					, 'Floor Mirror'
					, 'Зеркало Напольное'
					, 'מראה עומדת'
				],
				price: 60
			},
			{
				id: 7,
				name: ['-'
					, 'Hinged Mirror'
					, 'Зеркало Навесное'
					, 'מראת קיר'
				],
				price: 30
			}
		]
	},
	// 12 ////////////////////////////////////////////// Столы / ПК
	{
		id: 112,
		name: 'desk',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Desk'
					, 'Стол Письменный'
					, 'שולחן כתיבה'
				],
				price: 50,
				dap: 25
			},
			{
				id: 2,
				name: ['-'
					, 'Corner Desk'
					, 'Стол Письменный Угловой'
					, 'שולחן כתיבה פינתי'
				],
				price: 75,
				dap: 50
			},
			{
				id: 3,
				name: ['-'
					, 'Glass Desk'
					, 'Стол Письменный Стеклянный'
					, 'שולחן משרדי זכוכית'
				],
				price: 80
			},
			{
				id: 4,
				name: ['-'
					, 'Computer Desk'
					, 'Стол Компьютерный'
					, 'שולחן עם סיפריה'
				],
				price: 100,
				dap: 50
			},
			{
				id: 5,
				name: ['-'
					, 'Corner Computer Desk'
					, 'Стол Компьютерный Угловой'
					, 'שולחן מחשב ספריה פינתי'
				],
				price: 125,
				dap: 75
			},
			{
				id: 6,
				name: ['-'
					, 'Computer'
					, 'Компьютер'
					, 'מחשב אישי'
				],
				price: 35
			},
			{
				id: 7,
				name: ['-'
					, 'All-in-One'
					, 'Моноблок'
					, 'הכל באחד'
				],
				price: 60
			},
			{
				id: 8,
				name: ['-'
					, 'Computer Chair'
					, 'Стул Компьютеный'
					, 'כסא מחשב'
				],
				price: 15
			},
			{
				id: 9,
				name: ['-'
					, 'Computer Armchair'
					, 'Кресло Компьютерное'
					, 'כורסא מחשב'
				],
				price: 25
			}
		]
	},
	// 13 ////////////////////////////////////////////// Муз. Инструменты
	{
		id: 113,
		name: 'music_inst',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Grand-Piano'
					, 'Рояль'
					, 'פסנתר כנף'
				],
				price: 600
			},
			{
				id: 2,
				name: ['-'
					, 'Piano 3-Pedal'
					, 'Пианино 3 Педали'
					, 'פסנתר 3 פדלים'
				],
				price: 450
			},
			{
				id: 3,
				name: ['-'
					, 'Piano 2-Pedal'
					, 'Пианино 2 Педали'
					, 'פסנתר 2 פדלים'
				],
				price: 350
			},
			{
				id: 4,
				name: ['-'
					, 'Synthesizer'
					, 'Синтезатор'
					, 'פסנתר חשמלי'
				],
				price: 50
			},
			{
				id: 5,
				name: ['-'
					, 'Drum Kit'
					, 'Барабаны'
					, 'תופים'
				],
				price: 250,
				dap: 200
			},
			{
				id: 6,
				name: ['-'
					, 'Guitar'
					, 'Гитара'
					, 'גיטרה'
				],
				price: 35
			}
		]
	},
	// 14 ////////////////////////////////////////////// Спорт
	{
		id: 114,
		name: 'sport',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Training Apparatus'
					, 'Тренажер'
					, 'מכשיר כושר'
				],
				price: 175,
				dap: 150
			},
			{
				id: 2,
				name: ['-'
					, 'Treadmill'
					, 'Беговая Дорожка '
					, 'הליכון '
				],
				price: 100
			},
			{
				id: 3,
				name: ['-'
					, 'Exercise Bike'
					, 'Велотренажер'
					, 'אופני כושר'
				],
				price: 75
			},
			{
				id: 4,
				name: ['-'
					, 'Bicycle'
					, 'Велосипед'
					, 'אופניים'
				],
				price: 60
			},
			{
				id: 5,
				name: ['-'
					, 'Сhildren Bicycle'
					, 'Велосипед Детский'
					, 'אופניים לילדים'
				],
				price: 25
			},
			{
				id: 6,
				name: ['-'
					, 'Tennis Table'
					, 'Теннисный Стол'
					, 'טניס שולחן'
				],
				price: 150,
				dap: 75
			},
			{
				id: 7,
				name: ['-'
					, 'Trampoline'
					, 'Батут'
					, 'טרמפולינה'
				],
				price: 200
			}
		]
	},
	// 15 ////////////////////////////////////////////// Декор
	{
		id: 115,
		name: 'decor',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Picture'
					, 'Картина'
					, 'תמונה'
				],
				price: 10
			},
			{
				id: 2,
				name: ['-'
					, 'Statuette Big (over 40cm)'
					, 'Статуэтка большая (от 40см)'
					, 'פסל גדול (מעל 40 ס"מ)'
				],
				price: 50
			},
			{
				id: 3,
				name: ['-'
					, 'Statuette'
					, 'Статуэтка'
					, 'פסל'
				],
				price: 30
			},
			{
				id: 4,
				name: ['-'
					, 'Hut (Suka)'
					, 'Сука (Шалаш)'
					, 'סוכה'
				],
				price: 60
			},
			{
				id: 5,
				name: ['-'
					, 'Carpet'
					, 'Ковер'
					, 'שטיח'
				],
				price: 20
			},
			{
				id: 6,
				name: ['-'
					, 'Chandelier'
					, 'Люстра'
					, 'ניברשת'
				],
				price: 25,
				dap: 25
			},
			{
				id: 7,
				name: ['-'
					, 'Floor Lamp'
					, 'Торшер'
					, 'מנורה'
				],
				price: 10
			}
		]
	},
	// 16 ////////////////////////////////////////////// Сад
	{
		id: 116,
		name: 'garden',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Tree in a Pot'
					, 'Дерево в Горшке'
					, 'עץ בעציץ'
				],
				price: 50
			},
			{
				id: 2,
				name: ['-'
					, 'Big Flower'
					, 'Цветок больш.'
					, 'עציץ גדול'
				],
				price: 25
			},
			{
				id: 3,
				name: ['-'
					, 'Flower'
					, 'Цветок'
					, 'עציץ'
				],
				price: 15
			},
			{
				id: 4,
				name: ['-'
					, 'Rattan Table'
					, 'Стол Ротанговый'
					, 'שולחן קש'
				],
				price: 45
			},
			{
				id: 5,
				name: ['-'
					, 'Rattan Chair'
					, 'Стул Ротанговый'
					, 'כיסא קש'
				],
				price: 10
			},
			{
				id: 6,
				name: ['-'
					, 'Gas BBQ'
					, 'Мангал Газовый'
					, 'מנגל גז'
				],
				price: 50
			},
			{
				id: 7,
				name: ['-'
					, 'Children Swing'
					, 'Качели'
					, 'נדנדה'
				],
				price: 175
			}
		]
	},
	// 17 ////////////////////////////////////////////// Пластиковая мебель
	{
		id: 117,
		name: 'plastic',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Plastic Pantry Large'
					, 'Пластиковая Кладовая больш.'
					, 'מחסן פלסטיק גדול'
				],
				price: 200,
				dap: 75
			},
			{
				id: 2,
				name: ['-'
					, 'Plastic Pantry Small'
					, 'Пластиковая Кладовая'
					, 'מחסן פלסטיק קטן'
				],
				price: 125,
				dap: 50
			},
			{
				id: 3,
				name: ['-'
					, 'Plastic Cupboard'
					, 'Пластиковый Шкаф'
					, 'ארון שרות פלסטיק'
				],
				price: 40
			},
			{
				id: 4,
				name: ['-'
					, 'Plastic Table'
					, 'Пластиковый Стол'
					, 'שולחן פלסטיק'
				],
				price: 30
			},
			{
				id: 5,
				name: ['-'
					, 'Plastic Chair'
					, 'Пластиковый Стул'
					, 'כסא פלסטיק'
				],
				price: 10
			},
			{
				id: 6,
				name: ['-'
					, 'Plastic Deck Chair'
					, 'Пластиковый Шезлонг'
					, 'כיסא חוף מתקפל'
				],
				price: 30
			},
			{
				id: 7,
				name: ['-'
					, 'Plastic Bedside'
					, 'Пластиковая Тумбочка'
					, 'שידת פלסטיק'
				],
				price: 10
			},
			{
				id: 8,
				name: ['-'
					, 'Plastic Shelf'
					, 'Пластиковая Полка'
					, 'מדף פלסטיק'
				],
				price: 15
			},
			{
				id: 9,
				name: ['-'
					, 'Iron Cupboard'
					, 'Шкаф Железный'
					, 'ארון ברזל'
				],
				price: 75
			}
		]
	},
	// 18 ////////////////////////////////////////////// Климат
	{
		id: 118,
		name: 'climate',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Fan'
					, 'Вентилятор'
					, 'מאוורר'
				],
				price: 15
			},
			{
				id: 2,
				name: ['-'
					, 'Heater'
					, 'Обогреватель'
					, 'תנור חימום'
				],
				price: 15
			},
			{
				id: 3,
				name: ['-'
					, 'Radiator'
					, 'Радиатор'
					, 'רדיאטור'
				],
				price: 25
			},
			{
				id: 4,
				name: ['-'
					, 'Air Conditioner'
					, 'Кондиционер'
					, 'מזגן'
				],
				price: 100
			}
		]
	},
	// 19 ////////////////////////////////////////////// Кино / Звук
	{
		id: 119,
		name: 'movie',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Home Theater'
					, 'Домашний кинотеатр'
					, 'מערכת סטריאו'
				],
				price: 35
			},
			{
				id: 2,
				name: ['-'
					, 'Speakers'
					, 'Колонки'
					, 'רמקולים'
				],
				price: 25
			},
			{
				id: 3,
				name: ['-'
					, 'Column Speaker'
					, 'Колонка Напольная'
					, 'רמקול גדול'
				],
				price: 50
			}
		]
	},
	// 20 ////////////////////////////////////////////// Проф
	{
		id: 120,
		name: 'pro',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Sewing Machine'
					, 'Швейная Машина'
					, 'מכונת תפירה'
				],
				price: 100
			},
			{
				id: 2,
				name: ['-'
					, 'Cosmetic Chair'
					, 'Косметологическое Кресло'
					, 'כסא קוסמטיקה'
				],
				price: 60
			},
			{
				id: 3,
				name: ['-'
					, 'Dentist Chair'
					, 'Стоматологическое Кресло'
					, 'כיסא רופא שיניים'
				],
				price: 250
			},
			{
				id: 4,
				name: ['-'
					, 'Massage Table'
					, 'Массажный Стол'
					, 'שולחן עיסוי'
				],
				price: 100
			}
		]
	},
	// 21 ////////////////////////////////////////////// Сумки
	{
		id: 121,
		name: 'bag',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Duffel Bag'
					, 'Вещевой Баул'
					, 'בלה עם דברים'
				],
				price: 35
			},
			{
				id: 2,
				name: ['-'
					, 'Suitcase'
					, 'Вещевой Чемодан'
					, 'המזוודה עם הדברים'
				],
				price: 15
			},
			{
				id: 3,
				name: ['-'
					, 'Bag'
					, 'Вещевая Сумка'
					, 'תיק עם דברים'
				],
				price: 10
			},
			{
				id: 4,
				name: ['-'
					, 'Plastic Bag'
					, 'Вещевой Пакет'
					, 'שקית עם דברים'
				],
				price: 10
			}
		]
	},
	// 22 ////////////////////////////////////////////// Аквариум
	{
		id: 122,
		name: 'aquarium',
		types: [
			{ id: 0 },
			{
				id: 1,
				name: ['-'
					, 'Aquarium up to 200cm'
					, 'Аквариум до 200см'
					, 'אקווריום עד 200 ס"מ'
				],
				price: 250
			},
			{
				id: 2,
				name: ['-'
					, 'Aquarium up to 140cm'
					, 'Аквариум до 140см'
					, 'אקווריום עד 140 ס"מ'
				],
				price: 150
			},
			{
				id: 3,
				name: ['-'
					, 'Aquarium up to 80cm'
					, 'Аквариум до 80см'
					, 'אקווריום עד 80 ס"מ'
				],
				price: 80
			}
		]
	},
]