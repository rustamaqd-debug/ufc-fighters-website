const fighters = [

    // =========================================================================
    // HEAVYWEIGHT (ТЯЖЕЛЫЙ ВЕС)
    // =========================================================================
    {
        id: "tom_aspinall",
        name: "Tom Aspinall",
        nickname: "—",
        division: "Heavyweight",
        rank: "C",
        record: "15-3-0",
        sherdog: { ko: 11, sub: 3, dec: 1, lossesKo: 1, lossesSub: 1, lossesDec: 1 },
        ufcStats: { slpm: 7.72, strAcc: 66, sapm: 2.77, strDef: 65, tdAvg: 2.30, tdAcc: 100, tdDef: 100 },
        nationality: "UK", flag: "🇬🇧",
        height: "196 cm", reach: "198 cm", stance: "Orthodox", age: 33,
        stats: { striking: 95, wrestling: 91, grappling: 93, cardio: 92, power: 98, defense: 90 },
        bio: "Действующий чемпион UFC в тяжелом весе. Невероятная скорость, нокаутирующая мощь и черный пояс по бразильскому джиу-джитсу.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2024-04/ASPINALL_TOM_L_BELT.png",
        fightHistory: [
            { result: "Победа", record: "15-3", opponent: "Сергей Павлович", oppFlag: "🇷🇺", method: "KO (удары)", event: "UFC 295", date: "11 ноя 2023", round: 1, time: "0:52", location: "Нью-Йорк, США", note: "Завоевал временный титул UFC в тяжелом весе; Выступление вечера" },
            { result: "Победа", record: "14-3", opponent: "Марцин Тыбура", oppFlag: "🇵🇱", method: "TKO (удары)", event: "UFC Fight Night 224", date: "22 июл 2023", round: 1, time: "0:38", location: "Лондон, Великобритания", note: "Выступление вечера" },
            { result: "Поражение", record: "13-3", opponent: "Кёртис Блэйдс", oppFlag: "🇺🇸", method: "TKO (травма колена)", event: "UFC Fight Night 208", date: "23 июл 2022", round: 1, time: "0:15", location: "Лондон, Великобритания", note: "" },
            { result: "Победа", record: "13-2", opponent: "Александр Волков", oppFlag: "🇷🇺", method: "Сдача (рычаг локтя)", event: "UFC Fight Night 204", date: "19 мар 2022", round: 1, time: "3:45", location: "Лондон, Великобритания", note: "Выступление вечера" },
            { result: "Победа", record: "12-2", opponent: "Сергей Спивак", oppFlag: "🇲🇩", method: "TKO (удары)", event: "UFC Fight Night 191", date: "4 сен 2021", round: 1, time: "2:30", location: "Лас-Вегас, США", note: "Выступление вечера" },
            { result: "Победа", record: "11-2", opponent: "Андрей Орловский", oppFlag: "🇧🇾", method: "Сдача (удушение сзади)", event: "UFC Fight Night 185", date: "20 фев 2021", round: 2, time: "1:09", location: "Лас-Вегас, США", note: "Выступление вечера" },
            { result: "Победа", record: "10-2", opponent: "Алан Бодо", oppFlag: "🇫🇷", method: "TKO (удары)", event: "UFC Fight Night 179", date: "10 окт 2020", round: 1, time: "1:35", location: "Абу-Даби, ОАЭ", note: "" },
            { result: "Победа", record: "9-2", opponent: "Джейк Кольер", oppFlag: "🇺🇸", method: "TKO (удары)", event: "UFC on ESPN 14", date: "25 июл 2020", round: 1, time: "0:45", location: "Абу-Даби, ОАЭ", note: "Дебют в UFC; Выступление вечера" },
            { result: "Победа", record: "8-2", opponent: "Микаэль Бен Хамуда", oppFlag: "🇫🇷", method: "TKO (удары)", event: "Cage Warriors 107", date: "28 сен 2019", round: 1, time: "0:56", location: "Ливерпуль, Великобритания", note: "" },
            { result: "Победа", record: "7-2", opponent: "Софьян Букишу", oppFlag: "🇫🇷", method: "TKO (травма ноги)", event: "Cage Warriors 101", date: "16 фев 2019", round: 1, time: "1:21", location: "Ливерпуль, Великобритания", note: "" },
            { result: "Победа", record: "6-2", opponent: "Камил Базеляк", oppFlag: "🇵🇱", method: "KO (удар)", event: "Full Contact Contender 16", date: "18 июн 2016", round: 1, time: "1:16", location: "Болтон, Великобритания", note: "" },
            { result: "Поражение", record: "5-2", opponent: "Лукаш Паржобец", oppFlag: "🇵🇱", method: "Дисквалификация", event: "BAMMA 25", date: "14 май 2016", round: 1, time: "1:45", location: "Бирмингем, Великобритания", note: "" },
            { result: "Победа", record: "5-1", opponent: "Адриан Рускал", oppFlag: "🇵🇱", method: "TKO (удары)", event: "Full Contact Contender 15", date: "5 мар 2016", round: 1, time: "1:05", location: "Болтон, Великобритания", note: "" },
            { result: "Поражение", record: "4-1", opponent: "Стюарт Остин", oppFlag: "🇬🇧", method: "Сдача (каблук)", event: "BAMMA 21", date: "13 июн 2015", round: 2, time: "3:59", location: "Бирмингем, Великобритания", note: "" },
            { result: "Победа", record: "4-0", opponent: "Сатиш Джамай", oppFlag: "🇳🇱", method: "TKO (удары)", event: "BAMMA 19", date: "28 мар 2015", round: 1, time: "0:09", location: "Blackpool, Великобритания", note: "" },
            { result: "Победа", record: "3-0", opponent: "Рики Кинг", oppFlag: "🇬🇧", method: "Сдача (скручивание пятки)", event: "BAMMA 18", date: "21 фев 2015", round: 1, time: "0:49", location: "Вулверхэмптон, Великобритания", note: "" },
            { result: "Победа", record: "2-0", opponent: "Джон Маккарти", oppFlag: "🇮🇪", method: "TKO (удары)", event: "MMA Ego 1", date: "13 дек 2014", round: 1, time: "1:36", location: "Манчестер, Великобритания", note: "" },
            { result: "Победа", record: "1-0", opponent: "Михал Пищек", oppFlag: "🇵🇱", method: "TKO (удары)", event: "MMA Maturation 1", date: "1 мар 2014", round: 1, time: "0:15", location: "Рексем, Уэльс", note: "Первый бой в профессиональном ММА" }
        ]
    },
    {
        id: "jon_jones",
        name: "Jon Jones",
        nickname: "Bones",
        division: "Heavyweight",
        rank: 1,
        record: "27-1-0 (1 NC)",
        sherdog: { ko: 10, sub: 7, dec: 10, lossesKo: 0, lossesSub: 0, lossesDec: 0 },
        ufcStats: { slpm: 4.30, strAcc: 57, sapm: 2.22, strDef: 64, tdAvg: 1.85, tdAcc: 45, tdDef: 95 },
        nationality: "USA", flag: "🇺🇸",
        height: "193 cm", reach: "215 cm", stance: "Orthodox", age: 38,
        stats: { striking: 88, wrestling: 97, grappling: 93, cardio: 91, power: 86, defense: 96 },
        bio: "Легенда ММА. Бывший чемпион UFC в полутяжелом весе и в тяжелом весе.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/JONES_JON_L.png",
        fightHistory: [
            { result: "Победа", record: "27-1 (1 NC)", opponent: "Стипе Миочич", oppFlag: "🇺🇸", method: "TKO (удар ногой с разворота и удары)", event: "UFC 309", date: "16 ноя 2024", round: 3, time: "4:29", location: "Нью-Йорк, США", note: "Защитил титул" },
            { result: "Победа", record: "26-1 (1 NC)", opponent: "Сирил Ган", oppFlag: "🇫🇷", method: "Сдача (гильотина)", event: "UFC 285", date: "4 мар 2023", round: 1, time: "2:04", location: "Лас-Вегас, США", note: "Завоевал вакантный титул" }
        ]
    },

    // =========================================================================
    // LIGHT HEAVYWEIGHT (ПОЛУТЯЖЕЛЫЙ ВЕС - КАРЛОС УЛБЕРГ ЧЕМПИОН)
    // =========================================================================
    {
        id: "carlos_ulberg",
        name: "Carlos Ulberg",
        nickname: "Black Jag",
        division: "Light Heavyweight",
        rank: "C",
        record: "11-1-0",
        sherdog: { ko: 7, sub: 1, dec: 3, lossesKo: 1, lossesSub: 0, lossesDec: 0 },
        ufcStats: { slpm: 5.10, strAcc: 61, sapm: 3.20, strDef: 55, tdAvg: 0.90, tdAcc: 100, tdDef: 100 },
        nationality: "New Zealand", flag: "🇳🇿",
        height: "193 cm", reach: "196 cm", stance: "Orthodox", age: 35,
        stats: { striking: 95, wrestling: 82, grappling: 80, cardio: 90, power: 94, defense: 88 },
        bio: "Действующий чемпион UFC в полутяжелом весе. Выходец из City Kickboxing с феноменальным таймингом и точностью.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2024-05/ULBERG_CARLOS_L.png",
        fightHistory: [
            { result: "Победа", record: "11-1", opponent: "Волкан Оздемир", oppFlag: "🇨🇭", method: "TKO (удары)", event: "UFC Fight Night 248", date: "23 ноя 2024", round: 1, time: "2:15", location: "Макао, Китай", note: "Завоевал титул чемпиона UFC" },
            { result: "Победа", record: "10-1", opponent: "Алонзо Менифилд", oppFlag: "🇺🇸", method: "KO (удар)", event: "UFC on ESPN 56", date: "11 май 2024", round: 1, time: "0:12", location: "Сент-Луис, США", note: "Выступление вечера" },
            { result: "Победа", record: "9-1", opponent: "Чон Да Ун", oppFlag: "🇰🇷", method: "Сдача (удушение сзади)", event: "UFC 293", date: "10 сен 2023", round: 3, time: "4:49", location: "Сидней, Австралия", note: "" },
            { result: "Победа", record: "8-1", opponent: "Ихор Потеря", oppFlag: "🇺🇦", method: "KO (удары)", event: "UFC on ABC 4", date: "13 май 2023", round: 1, time: "2:09", location: "Шарлотт, США", note: "Выступление вечера" },
            { result: "Победа", record: "7-1", opponent: "Николае Негумереану", oppFlag: "🇷🇴", method: "KO (удары)", event: "UFC 281", date: "12 ноя 2022", round: 1, time: "3:44", location: "Нью-Йорк, США", note: "" },
            { result: "Победа", record: "6-1", opponent: "Тафон Нчакви", oppFlag: "🇨🇲", method: "TKO (удары)", event: "UFC on ESPN 38", date: "25 июн 2022", round: 1, time: "1:15", location: "Лас-Вегас, США", note: "" },
            { result: "Победа", record: "5-1", opponent: "Фабио Шерант", oppFlag: "🇺🇸", method: "Единогласное решение", event: "UFC 271", date: "12 фев 2022", round: 3, time: "5:00", location: "Хьюстон, США", note: "" },
            { result: "Поражение", record: "4-1", opponent: "Кеннеди Нзечукву", oppFlag: "🇳🇬", method: "KO (удары)", event: "UFC 259", date: "6 мар 2021", round: 2, time: "3:19", location: "Лас-Вегас, США", note: "Дебют в UFC; Бой вечера" },
            { result: "Победа", record: "4-0", opponent: "Бруно Оливейра", oppFlag: "🇧🇷", method: "KO (удары)", event: "DWCS 34", date: "4 ноя 2020", round: 1, time: "2:02", location: "Лас-Вегас, США", note: "Получил контракт UFC" },
            { result: "Победа", record: "3-0", opponent: "Джон Мартин Фрейзер", oppFlag: "🇳🇿", method: "Единогласное решение", event: "Eternal MMA 40", date: "8 дек 2018", round: 3, time: "5:00", location: "Окленд, Новая Зеландия", note: "" },
            { result: "Победа", record: "2-0", opponent: "Умала Тафоа", oppFlag: "🇳🇿", method: "TKO (удары)", event: "King in the Ring 86", date: "25 ноя 2017", round: 1, time: "1:40", location: "Окленд, Новая Зеландия", note: "" },
            { result: "Победа", record: "1-0", opponent: "Каано Рид", oppFlag: "🇳🇿", method: "TKO (удары)", event: "King in the Ring 82", date: "23 авг 2011", round: 2, time: "2:10", location: "Окленд, Новая Зеландия", note: "Дебют в профессиональном ММА" }
        ]
    },
    {
        id: "alex_pereira",
        name: "Alex Pereira",
        nickname: "Poatan",
        division: "Light Heavyweight",
        rank: 1,
        record: "12-2-0",
        sherdog: { ko: 10, sub: 0, dec: 2, lossesKo: 1, lossesSub: 1, lossesDec: 0 },
        ufcStats: { slpm: 5.23, strAcc: 63, sapm: 3.51, strDef: 51, tdAvg: 0.18, tdAcc: 100, tdDef: 70 },
        nationality: "Brazil", flag: "🇧🇷",
        height: "193 cm", reach: "200 cm", stance: "Orthodox", age: 38,
        stats: { striking: 99, wrestling: 68, grappling: 70, cardio: 88, power: 100, defense: 85 },
        bio: "Бывший чемпион UFC в среднем и полутяжелом весе. Нокаутер мирового класса.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2024-04/PEREIRA_ALEX_L.png",
        fightHistory: [
            { result: "Победа", record: "12-2", opponent: "Халил Раунти II", oppFlag: "🇺🇸", method: "TKO (удары)", event: "UFC 307", date: "5 окт 2024", round: 4, time: "4:32", location: "Солт-Лейк-Сити, США", note: "Бой вечера" },
            { result: "Победа", record: "11-2", opponent: "Иржи Прохазка II", oppFlag: "🇨🇿", method: "TKO (удар ногой в голову)", event: "UFC 303", date: "29 июн 2024", round: 2, time: "0:13", location: "Лас-Вегас, США", note: "Выступление вечера" }
        ]
    },

    // =========================================================================
    // MIDDLEWEIGHT (СРЕДНИЙ ВЕС - ШОН СТРИКЛЕНД ЧЕМПИОН)
    // =========================================================================
    {
        id: "sean_strickland",
        name: "Sean Strickland",
        nickname: "Tarzan",
        division: "Middleweight",
        rank: "C",
        record: "29-6-0",
        sherdog: { ko: 11, sub: 4, dec: 14, lossesKo: 2, lossesSub: 0, lossesDec: 4 },
        ufcStats: { slpm: 5.89, strAcc: 41, sapm: 4.28, strDef: 65, tdAvg: 0.85, tdAcc: 64, tdDef: 84 },
        nationality: "USA", flag: "🇺🇸",
        height: "185 cm", reach: "193 cm", stance: "Orthodox", age: 34,
        stats: { striking: 93, wrestling: 85, grappling: 84, cardio: 98, power: 84, defense: 95 },
        bio: "Действующий чемпион UFC в среднем весе. Фирменная филадельфийская раковина блокировки, бешеный спарринговый прессинг и выносливость.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2023-09/STRICKLAND_SEAN_L_BELT_09-09.png",
        fightHistory: [
            { result: "Победа", record: "29-6", opponent: "Пауло Коста", oppFlag: "🇧🇷", method: "Раздельное решение", event: "UFC 302", date: "1 июн 2024", round: 5, time: "5:00", location: "Ньюарк, США", note: "Завоевал титул чемпиона UFC" },
            { result: "Поражение", record: "28-6", opponent: "Дрикус дю Плесси", oppFlag: "🇿🇦", method: "Раздельное решение", event: "UFC 297", date: "20 янв 2024", round: 5, time: "5:00", location: "Торонто, Канада", note: "Бой вечера" },
            { result: "Победа", record: "28-5", opponent: "Исраэль Адесанья", oppFlag: "🇳🇿", method: "Единогласное решение", event: "UFC 293", date: "10 сен 2023", round: 5, time: "5:00", location: "Сидней, Австралия", note: "Выступление вечера" },
            { result: "Победа", record: "27-5", opponent: "Абусупьян Магомедов", oppFlag: "🇩🇪", method: "TKO (удары)", event: "UFC Fight Night 225", date: "1 июл 2023", round: 2, time: "1:47", location: "Лас-Вегас, США", note: "Выступление вечера" },
            { result: "Победа", record: "26-5", opponent: "Нассурдин Имавов", oppFlag: "🇫🇷", method: "Единогласное решение", event: "UFC Fight Night 217", date: "14 янв 2023", round: 5, time: "5:00", location: "Лас-Вегас, США", note: "Бой в полутяжелом весе" }
        ]
    },

    // =========================================================================
    // LIGHTWEIGHT (ЛЕГКИЙ ВЕС - ИСЛАМ МАХАЧЕВ & ДЖАСТИН ГЕЙДЖИ)
    // =========================================================================
    {
        id: "islam_makhachev",
        name: "Islam Makhachev",
        nickname: "—",
        division: "Lightweight",
        rank: "C",
        record: "26-1-0",
        sherdog: { ko: 5, sub: 12, dec: 9, lossesKo: 1, lossesSub: 0, lossesDec: 0 },
        ufcStats: { slpm: 3.17, strAcc: 60, sapm: 1.24, strDef: 61, tdAvg: 3.17, tdAcc: 60, tdDef: 90 },
        nationality: "Russia", flag: "🇷🇺",
        height: "178 cm", reach: "179 cm", stance: "Southpaw", age: 34,
        stats: { striking: 86, wrestling: 98, grappling: 97, cardio: 95, power: 82, defense: 94 },
        bio: "Действующий чемпион UFC в легком весе & P4P #1 в мире. Ученик Абдулманапа Нурмагомедова.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2024-02/MAKHACHEV_ISLAM_L_BELT_02-17-2024.png",
        fightHistory: [
            { result: "Победа", record: "26-1", opponent: "Дастин Пуарье", oppFlag: "🇺🇸", method: "Сдача (удушение Д'Арсе)", event: "UFC 302", date: "1 июн 2024", round: 5, time: "2:42", location: "Ньюарк, США", note: "Защитил титул; Бой вечера и Выступление вечера" },
            { result: "Победа", record: "25-1", opponent: "Александр Волкановски II", oppFlag: "🇦🇺", method: "KO (удар ногой в голову)", event: "UFC 294", date: "21 окт 2023", round: 1, time: "3:06", location: "Абу-Даби, ОАЭ", note: "Защитил титул" }
        ]
    },
    {
        id: "justin_gaethje",
        name: "Justin Gaethje",
        nickname: "The Highlight",
        division: "Lightweight",
        rank: "C",
        record: "25-5-0",
        sherdog: { ko: 20, sub: 1, dec: 4, lossesKo: 3, lossesSub: 2, lossesDec: 0 },
        ufcStats: { slpm: 7.35, strAcc: 60, sapm: 7.63, strDef: 53, tdAvg: 0.13, tdAcc: 25, tdDef: 75 },
        nationality: "USA", flag: "🇺🇸",
        height: "180 cm", reach: "178 cm", stance: "Orthodox", age: 37,
        stats: { striking: 96, wrestling: 84, grappling: 70, cardio: 90, power: 97, defense: 75 },
        bio: "Действующий чемпион BMF и экс-чемпион UFC в легком весе. Один из самых зрелищных нокаутеров в истории спорта.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2023-07/GAETHJE_JUSTIN_L_BELT_07-29.png",
        fightHistory: [
            { result: "Поражение", record: "25-5", opponent: "Макс Холлоуэй", oppFlag: "🇺🇸", method: "KO (удар)", event: "UFC 300", date: "13 апр 2024", round: 5, time: "4:59", location: "Лас-Вегас, США", note: "Бой за титул BMF; Бой вечера" },
            { result: "Победа", record: "25-4", opponent: "Дастин Пуарье II", oppFlag: "🇺🇸", method: "KO (удар ногой в голову)", event: "UFC 291", date: "29 июл 2023", round: 2, time: "1:00", location: "Солт-Лейк-Сити, США", note: "Завоевал титул BMF; Выступление вечера" },
            { result: "Победа", record: "24-4", opponent: "Рафаэль Физиев", oppFlag: "🇦🇿", method: "Решение большинства", event: "UFC 286", date: "18 мар 2023", round: 3, time: "5:00", location: "Лондон, Великобритания", note: "Бой вечера" }
        ]
    },

    // =========================================================================
    // FEATHERWEIGHT (ПОЛУЛЕГКИЙ ВЕС - АЛЕКСАНДР ВОЛКАНОВСКИ ЧЕМПИОН)
    // =========================================================================
    {
        id: "alexander_volkanovski",
        name: "Alexander Volkanovski",
        nickname: "The Great",
        division: "Featherweight",
        rank: "C",
        record: "26-4-0",
        sherdog: { ko: 13, sub: 3, dec: 10, lossesKo: 3, lossesSub: 0, lossesDec: 1 },
        ufcStats: { slpm: 6.19, strAcc: 57, sapm: 3.44, strDef: 59, tdAvg: 1.84, tdAcc: 37, tdDef: 70 },
        nationality: "Australia", flag: "🇦🇺",
        height: "168 cm", reach: "182 cm", stance: "Orthodox", age: 37,
        stats: { striking: 96, wrestling: 89, grappling: 87, cardio: 98, power: 85, defense: 92 },
        bio: "Действующий чемпион UFC в полулегком весе. Легенда дивизиона с идеальным бойцовским IQ и разносторонней техникой.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2023-07/VOLKANOVSKI_ALEXANDER_L_BELT_07-08.png",
        fightHistory: [
            { result: "Поражение", record: "26-4", opponent: "Илия Топурия", oppFlag: "🇪🇸", method: "KO (удар)", event: "UFC 298", date: "17 фев 2024", round: 2, time: "3:32", location: "Анахайм, США", note: "Завоевал реванш" },
            { result: "Поражение", record: "26-3", opponent: "Ислам Махачев II", oppFlag: "🇷🇺", method: "KO (удар ногой в голову)", event: "UFC 294", date: "21 окт 2023", round: 1, time: "3:06", location: "Абу-Даби, ОАЭ", note: "Бой за титул в легком весе" },
            { result: "Победа", record: "26-2", opponent: "Яир Родригес", oppFlag: "🇲🇽", method: "TKO (удары)", event: "UFC 290", date: "8 июл 2023", round: 3, time: "4:19", location: "Лас-Вегас, США", note: "Защитил титул в полулегком весе" }
        ]
    },

    // =========================================================================
    // BANTAMWEIGHT (ЛЕГЧАЙШИЙ ВЕС - ПЕТР ЯН ЧЕМПИОН)
    // =========================================================================
    {
        id: "petr_yan",
        name: "Petr Yan",
        nickname: "No Mercy",
        division: "Bantamweight",
        rank: "C",
        record: "17-5-0",
        sherdog: { ko: 7, sub: 1, dec: 9, lossesKo: 0, lossesSub: 0, lossesDec: 5 },
        ufcStats: { slpm: 5.03, strAcc: 53, sapm: 4.00, strDef: 61, tdAvg: 1.71, tdAcc: 52, tdDef: 85 },
        nationality: "Russia", flag: "🇷🇺",
        height: "170 cm", reach: "170 cm", stance: "Switch", age: 33,
        stats: { striking: 97, wrestling: 86, grappling: 84, cardio: 96, power: 88, defense: 94 },
        bio: "Действующий чемпион UFC в легчайшем весе. Виртуоз переключения стоек и разбора защиты соперников.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2024-03/YAN_PETR_L_03-09.png",
        fightHistory: [
            { result: "Победа", record: "17-5", opponent: "Дейвисон Фигейреду", oppFlag: "🇧🇷", method: "Единогласное решение", event: "UFC Fight Night 248", date: "23 ноя 2024", round: 5, time: "5:00", location: "Макао, Китай", note: "Завоевал титул чемпиона UFC в легчайшем весе" },
            { result: "Победа", record: "16-5", opponent: "Сон Ядон", oppFlag: "🇨🇳", method: "Единогласное решение", event: "UFC 299", date: "9 мар 2024", round: 3, time: "5:00", location: "Майами, США", note: "" },
            { result: "Поражение", record: "15-5", opponent: "Мераб Двалишвили", oppFlag: "🇬🇪", method: "Единогласное решение", event: "UFC Fight Night 221", date: "11 мар 2023", round: 5, time: "5:00", location: "Лас-Вегас, США", note: "" },
            { result: "Поражение", record: "15-4", opponent: "Шон О'Мэлли", oppFlag: "🇺🇸", method: "Раздельное решение", event: "UFC 280", date: "22 окт 2022", round: 3, time: "5:00", location: "Абу-Даби, ОАЭ", note: "Бой вечера" }
        ]
    },

    // =========================================================================
    // FLYWEIGHT (НАИЛЕГЧАЙШИЙ ВЕС - ДЖОШУА ВАН ЧЕМПИОН)
    // =========================================================================
    {
        id: "joshua_van",
        name: "Joshua Van",
        nickname: "Fearless",
        division: "Flyweight",
        rank: "C",
        record: "11-2-0",
        sherdog: { ko: 6, sub: 2, dec: 3, lossesKo: 1, lossesSub: 1, lossesDec: 0 },
        ufcStats: { slpm: 8.12, strAcc: 54, sapm: 5.20, strDef: 58, tdAvg: 1.10, tdAcc: 40, tdDef: 80 },
        nationality: "Myanmar / USA", flag: "🇲🇲",
        height: "165 cm", reach: "165 cm", stance: "Orthodox", age: 24,
        stats: { striking: 94, wrestling: 85, grappling: 82, cardio: 96, power: 88, defense: 86 },
        bio: "Действующий чемпион UFC в наилегчайшем весе. Молодой феномен с феноменальной скоростью ударов.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2023-11/VAN_JOSHUA_L.png",
        fightHistory: [
            { result: "Победа", record: "11-2", opponent: "Эдгар Чайрез", oppFlag: "🇲🇽", method: "Единогласное решение", event: "UFC 306", date: "14 сен 2024", round: 3, time: "5:00", location: "Лас-Вегас, США", note: "Завоевал титул чемпиона UFC" },
            { result: "Поражение", record: "10-2", opponent: "Шарлес Джонсон", oppFlag: "🇺🇸", method: "KO (удар)", event: "UFC on ESPN 59", date: "13 июл 2024", round: 3, time: "0:20", location: "Денвер, США", note: "" },
            { result: "Победа", record: "10-1", opponent: "Фелипе Бунес", oppFlag: "🇧🇷", method: "TKO (удары)", event: "UFC Fight Night 234", date: "13 янв 2024", round: 2, time: "4:31", location: "Лас-Вегас, США", note: "" },
            { result: "Победа", record: "9-1", opponent: "Кевин Борхас", oppFlag: "🇵🇪", method: "Единогласное решение", event: "UFC 295", date: "11 ноя 2023", round: 3, time: "5:00", location: "Нью-Йорк, США", note: "" },
            { result: "Победа", record: "8-1", opponent: "Жалгас Жумагулов", oppFlag: "🇰🇿", method: "Раздельное решение", event: "UFC on ABC 5", date: "24 июн 2023", round: 3, time: "5:00", location: "Джексонвилл, США", note: "Дебют в UFC" }
        ]
    },

    // =========================================================================
    // OTHER TOP CONTENDERS & LEGENDS
    // =========================================================================
    {
        id: "nick_diaz",
        name: "Nick Diaz",
        nickname: "Diablo",
        division: "Welterweight",
        rank: 15,
        record: "26-10-0 (2 NC)",
        sherdog: { ko: 13, sub: 8, dec: 5, lossesKo: 3, lossesSub: 0, lossesDec: 7 },
        ufcStats: { slpm: 5.43, strAcc: 45, sapm: 3.76, strDef: 62, tdAvg: 0.81, tdAcc: 33, tdDef: 61 },
        nationality: "USA", flag: "🇺🇸",
        height: "185 cm", reach: "193 cm", stance: "Southpaw", age: 42,
        stats: { striking: 93, wrestling: 68, grappling: 90, cardio: 99, power: 82, defense: 80 },
        bio: "Легенда ММА из Стоктона. Бывший чемпион Strikeforce в полусреднем весе, претендент на титул UFC.",
        image: "https://dmxg5wxfqgde4.cloudfront.net/styles/athlete_bio_full_body/s3/2021-09/DIAZ_NICK_L_09-25.png",
        fightHistory: [
            { result: "Поражение", record: "26-10 (2 NC)", opponent: "Робби Лоулер II", oppFlag: "🇺🇸", method: "TKO (отказ от продолжения)", event: "UFC 266", date: "25 сен 2021", round: 3, time: "0:44", location: "Лас-Вегас, США", note: "" }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = fighters;
}
