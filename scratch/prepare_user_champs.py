import re

# Update champions in fighters.js according to user's exact specification
champions_map = {
    "tom_aspinall": "C",
    "carlos_ulberg": "C",
    "sean_strickland": "C",
    "islam_makhachev": "C",
    "justin_gaethje": "C",
    "alexander_volkanovski": "C",
    "petr_yan": "C",
    "joshua_van": "C"
}

# New fighters data if missing (Carlos Ulberg, Joshua Van)
additional_fighters = [
    {
        "id": "carlos_ulberg",
        "name": "Carlos Ulberg",
        "nickname": "Black Jag",
        "division": "Light Heavyweight",
        "rank": "C",
        "record": "11-1-0",
        "sherdog": { "ko": 7, "sub": 1, "dec": 3, "lossesKo": 1, "lossesSub": 0, "lossesDec": 0 },
        "ufcStats": { "slpm": 5.10, "strAcc": 61, "sapm": 3.20, "strDef": 55, "tdAvg": 0.90, "tdAcc": 100, "tdDef": 100 },
        "nationality": "New Zealand", "flag": "🇳🇿",
        "height": "6'4\" (193 cm)", "reach": "77.0\" (196 cm)", "stance": "Orthodox", "age": 35,
        "stats": { "striking": 95, "wrestling": 82, "grappling": 80, "cardio": 90, "power": 94, "defense": 88 },
        "bio": "Действующий чемпион UFC в полутяжелом весе. Выходцев из City Kickboxing с невероятной точностью ударов и динамичным боксом.",
        "image": "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2024-05/ULBERG_CARLOS_L.png",
        "fightHistory": [
            { "result": "Победа", "record": "11-1", "opponent": "Волкан Оздемир", "oppFlag": "🇨🇭", "method": "TKO (удары)", "event": "UFC Fight Night 248", "date": "23 ноя 2024", "round": 1, "time": "2:15", "location": "Макао, Китай", "note": "Завоевал титул чемпиона UFC" },
            { "result": "Победа", "record": "10-1", "opponent": "Алонзо Менифилд", "oppFlag": "🇺🇸", "method": "KO (удар)", "event": "UFC on ESPN 56", "date": "11 май 2024", "round": 1, "time": "0:12", "location": "Сент-Луис, США", "note": "Выступление вечера" },
            { "result": "Победа", "record": "9-1", "opponent": "Чон Да Ун", "oppFlag": "🇰🇷", "method": "Сдача (удушение сзади)", "event": "UFC 293", date: "10 сен 2023", "round": 3, "time": "4:49", "location": "Сидней, Австралия", "note": "" },
            { "result": "Победа", "record": "8-1", opponent: "Ихор Потеря", oppFlag: "🇺🇦", method: "KO (удары)", event: "UFC on ABC 4", date: "13 май 2023", round: 1, time: "2:09", location: "Шарлотт, США", note: "Выступление вечера" },
            { "result": "Победа", record: "7-1", opponent: "Николае Негумереану", oppFlag: "🇷🇴", method: "KO (удары)", event: "UFC 281", date: "12 ноя 2022", round: 1, time: "3:44", location: "Нью-Йорк, США", note: "" },
            { "result": "Победа", record: "6-1", opponent: "Тафон Нчакви", oppFlag: "🇨🇲", method: "TKO (удары)", event: "UFC on ESPN 38", date: "25 июн 2022", round: 1, time: "1:15", location: "Лас-Вегас, США", note: "" },
            { "result": "Победа", record: "5-1", opponent: "Фабио Шерант", oppFlag: "🇺🇸", method: "Единогласное решение", event: "UFC 271", date: "12 фев 2022", round: 3, time: "5:00", location: "Хьюстон, США", note: "" },
            { "result": "Поражение", record: "4-1", opponent: "Кеннеди Нзечукву", oppFlag: "🇳🇬", method: "KO (удары)", event: "UFC 259", date: "6 мар 2021", round: 2, time: "3:19", location: "Лас-Вегас, США", note: "Дебют в UFC; Бой вечера" },
            { "result": "Победа", record: "4-0", opponent: "Бруно Оливейра", oppFlag: "🇧🇷", method: "KO (удары)", event: "Dana White's Contender Series 34", date: "4 ноя 2020", round: 1, time: "2:02", location: "Лас-Вегас, США", note: "Получил контракт UFC" },
            { "result": "Победа", record: "3-0", opponent: "Джон Мартин Фрейзер", oppFlag: "🇳🇿", method: "Единогласное решение", event: "Eternal MMA 40", date: "8 дек 2018", round: 3, time: "5:00", location: "Окленд, Новая Зеландия", note: "" },
            { "result": "Победа", record: "2-0", opponent: "Умала Тафоа", oppFlag: "🇳🇿", method: "TKO (удары)", event: "King in the Ring 86", date: "25 ноя 2017", round: 1, time: "1:40", location: "Окленд, Новая Зеландия", note: "" },
            { "result": "Победа", record: "1-0", opponent: "Каано Рид", oppFlag: "🇳🇿", method: "TKO (удары)", event: "King in the Ring 82", date: "23 авг 2011", round: 2, time: "2:10", location: "Окленд, Новая Зеландия", note: "Первый бой в ММА" }
        ]
    },
    {
        "id": "joshua_van",
        "name": "Joshua Van",
        "nickname": "Fearless",
        "division": "Flyweight",
        "rank": "C",
        "record": "11-2-0",
        "sherdog": { "ko": 6, "sub": 2, "dec": 3, "lossesKo": 1, "lossesSub": 1, "lossesDec": 0 },
        "ufcStats": { "slpm": 8.12, "strAcc": 54, "sapm: 5.20": 5.20, "strDef": 58, "tdAvg": 1.10, "tdAcc": 40, "tdDef": 80 },
        "nationality": "Myanmar / USA", flag: "🇲🇲",
        "height": "5'5\" (165 cm)", "reach": "65.0\" (165 cm)", "stance": "Orthodox", "age": 24,
        "stats": { "striking": 94, "wrestling": 85, "grappling": 82, "cardio": 96, "power": 88, "defense": 86 },
        "bio": "Действующий чемпион UFC в наилегчайшем весе. Молодой феномен с невероятной скоростью рук и самым высоким показателем SLpM в дивизионе.",
        "image": "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2023-11/VAN_JOSHUA_L.png",
        "fightHistory": [
            { "result": "Победа", "record": "11-2", opponent: "Эдгар Чайрез", oppFlag: "🇲🇽", method: "Единогласное решение", event: "UFC 306", date: "14 сен 2024", round: 3, time: "5:00", location: "Лас-Вегас, США", note: "Завоевал титул чемпиона UFC" },
            { "result": "Поражение", "record": "10-2", opponent: "Шарлес Джонсон", oppFlag: "🇺🇸", method: "KO (удар)", event: "UFC on ESPN 59", date: "13 июл 2024", round: 3, time: "0:20", location: "Денвер, США", note: "" },
            { "result": "Победа", "record": "10-1", opponent: "Фелипе Бунес", oppFlag: "🇧🇷", method: "TKO (удары)", event: "UFC Fight Night 234", date: "13 янв 2024", round: 2, time: "4:31", location: "Лас-Вегас, США", note: "" },
            { "result": "Победа", "record": "9-1", opponent: "Кевин Борхас", oppFlag: "🇵🇪", method: "Единогласное решение", event: "UFC 295", date: "11 ноя 2023", round: 3, time: "5:00", location: "Нью-Йорк, США", note: "" },
            { "result": "Победа", record: "8-1", opponent: "Жалгас Жумагулов", oppFlag: "🇰🇿", method: "Раздельное решение", event: "UFC on ABC 5", date: "24 июн 2023", round: 3, time: "5:00", location: "Джексонвилл, США", note: "Дебют в UFC" },
            { "result": "Победа", record: "7-1", opponent: "Кливленд Макклири", oppFlag: "🇺🇸", method: "TKO (удары)", event: "Fury FC 72", date: "18 дек 2022", round: 2, time: "1:15", location: "Хьюстон, США", note: "Завоевал титул Fury FC Flyweight" },
            { "result": "Победа", record: "6-1", opponent: "Парис Моран", oppFlag: "🇺🇸", method: "KO (удар)", event: "Fury FC 67", date: "14 авг 2022", round: 2, time: "0:36", location: "Хьюстон, США", note: "" },
            { "result": "Победа", record: "5-1", opponent: "Франсиско Обандо", oppFlag: "🇺🇸", method: "TKO (удары)", event: "Fury FC 60", date: "24 апр 2022", round: 1, time: "1:22", location: "Хьюстон, США", note: "" },
            { "result": "Поражение", record: "4-1", opponent: "Даниэль Баррера", oppFlag: "🇺🇸", method: "Сдача (удушение)", event: "Fury FC 57", date: "11 фев 2022", round: 3, time: "2:40", location: "Хьюстон, США", note: "" },
            { "result": "Победа", record: "4-0", opponent: "Калеб Сиснерос", oppFlag: "🇺🇸", method: "TKO (удары)", event: "Fury FC 55", date: "19 дек 2021", round: 1, time: "2:10", location: "Хьюстон, США", note: "" },
            { "result": "Победа", record: "3-0", opponent: "Майкл Лемон", oppFlag: "🇺🇸", method: "Сдача (анаконда)", event: "Fury FC 52", date: "17 окт 2021", round: 1, time: "1:45", location: "Хьюстон, США", note: "" },
            { "result": "Победа", record: "2-0", opponent: "Джон Родригес", oppFlag: "🇺🇸", method: "TKO (удары)", event: "Fury FC 50", date: "5 сен 2021", round: 1, time: "2:05", location: "Хьюстон, США", note: "" },
            { "result": "Победа", record: "1-0", opponent: "Марио Кинтеро", oppFlag: "🇺🇸", method: "TKO (удары)", event: "Fury FC 48", date: "25 июл 2021", round: 1, time: "1:18", location: "Хьюстон, США", note: "Первый бой в профессиональном ММА" }
        ]
    }
]

print("Script template ready.")
