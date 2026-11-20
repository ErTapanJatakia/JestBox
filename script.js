/* JestBox local-first interface with on-device display preferences. */
const LOCALES=[
 {code:"en-US",label:"American English (en-US)",country:"United States of America"},
 {code:"es-PE",label:"Peruvian Spanish (es-PE)",country:"Republic of Peru"},
 {code:"ru-RU",label:"Russian (ru-RU)",country:"Russian Federation"},
 {code:"es-ES",label:"Spanish (es-ES)",country:"Kingdom of Spain"},
 {code:"en-IN",label:"Indian English (en-IN)",country:"Republic of India"},
 {code:"hi-IN",label:"Indian Hindi (hi-IN)",country:"Republic of India"},
 {code:"ur-IN",label:"Indian Urdu (ur-IN)",country:"Republic of India"},
 {code:"ur-PK",label:"Pakistani Urdu (ur-PK)",country:"Islamic Republic of Pakistan"}
];
const LOCALE_LABELS={
  "en-US": {
    "en-US": "American English",
    "es-PE": "Peruvian Spanish",
    "ru-RU": "Russian",
    "es-ES": "Spanish",
    "en-IN": "Indian English",
    "hi-IN": "Indian Hindi",
    "ur-IN": "Indian Urdu",
    "ur-PK": "Pakistani Urdu"
  },
  "es-PE": {
    "en-US": "Inglés estadounidense",
    "es-PE": "Español peruano",
    "ru-RU": "Ruso",
    "es-ES": "Español",
    "en-IN": "Inglés de India",
    "hi-IN": "Hindi de India",
    "ur-IN": "Urdu de India",
    "ur-PK": "Urdu de Pakistán"
  },
  "ru-RU": {
    "en-US": "Американский английский",
    "es-PE": "Перуанский испанский",
    "ru-RU": "Русский",
    "es-ES": "Испанский",
    "en-IN": "Индийский английский",
    "hi-IN": "Индийский хинди",
    "ur-IN": "Индийский урду",
    "ur-PK": "Пакистанский урду"
  },
  "es-ES": {
    "en-US": "Inglés estadounidense",
    "es-PE": "Español peruano",
    "ru-RU": "Ruso",
    "es-ES": "Español",
    "en-IN": "Inglés de la India",
    "hi-IN": "Hindi de la India",
    "ur-IN": "Urdu de la India",
    "ur-PK": "Urdu de Pakistán"
  },
  "en-IN": {
    "en-US": "American English",
    "es-PE": "Peruvian Spanish",
    "ru-RU": "Russian",
    "es-ES": "Spanish",
    "en-IN": "Indian English",
    "hi-IN": "Indian Hindi",
    "ur-IN": "Indian Urdu",
    "ur-PK": "Pakistani Urdu"
  },
  "hi-IN": {
    "en-US": "अमेरिकी अंग्रेज़ी",
    "es-PE": "पेरूवियन स्पेनिश",
    "ru-RU": "रूसी",
    "es-ES": "स्पेनिश",
    "en-IN": "भारतीय अंग्रेज़ी",
    "hi-IN": "भारतीय हिंदी",
    "ur-IN": "भारतीय उर्दू",
    "ur-PK": "पाकिस्तानी उर्दू"
  },
  "ur-IN": {
    "en-US": "امریکی انگریزی",
    "es-PE": "پیرو کی ہسپانوی",
    "ru-RU": "روسی",
    "es-ES": "ہسپانوی",
    "en-IN": "بھارتی انگریزی",
    "hi-IN": "بھارتی ہندی",
    "ur-IN": "بھارتی اردو",
    "ur-PK": "پاکستانی اردو"
  },
  "ur-PK": {
    "en-US": "امریکی انگریزی",
    "es-PE": "پیرو کی ہسپانوی",
    "ru-RU": "روسی",
    "es-ES": "ہسپانوی",
    "en-IN": "بھارتی انگریزی",
    "hi-IN": "بھارتی ہندی",
    "ur-IN": "بھارتی اردو",
    "ur-PK": "پاکستانی اردو"
  }
};
const COUNTRY_LABELS={
  "en-US": {
    "en-US": "United States of America",
    "es-PE": "Republic of Peru",
    "ru-RU": "Russian Federation",
    "es-ES": "Kingdom of Spain",
    "en-IN": "Republic of India",
    "hi-IN": "Republic of India",
    "ur-IN": "Republic of India",
    "ur-PK": "Islamic Republic of Pakistan"
  },
  "es-PE": {
    "en-US": "Estados Unidos de América",
    "es-PE": "República del Perú",
    "ru-RU": "Federación de Rusia",
    "es-ES": "Reino de España",
    "en-IN": "República de la India",
    "hi-IN": "República de la India",
    "ur-IN": "República de la India",
    "ur-PK": "República Islámica de Pakistán"
  },
  "ru-RU": {
    "en-US": "Соединённые Штаты Америки",
    "es-PE": "Республика Перу",
    "ru-RU": "Российская Федерация",
    "es-ES": "Королевство Испания",
    "en-IN": "Республика Индия",
    "hi-IN": "Республика Индия",
    "ur-IN": "Республика Индия",
    "ur-PK": "Исламская Республика Пакистан"
  },
  "es-ES": {
    "en-US": "Estados Unidos de América",
    "es-PE": "República del Perú",
    "ru-RU": "Federación de Rusia",
    "es-ES": "Reino de España",
    "en-IN": "República de la India",
    "hi-IN": "República de la India",
    "ur-IN": "República de la India",
    "ur-PK": "República Islámica de Pakistán"
  },
  "en-IN": {
    "en-US": "United States of America",
    "es-PE": "Republic of Peru",
    "ru-RU": "Russian Federation",
    "es-ES": "Kingdom of Spain",
    "en-IN": "Republic of India",
    "hi-IN": "Republic of India",
    "ur-IN": "Republic of India",
    "ur-PK": "Islamic Republic of Pakistan"
  },
  "hi-IN": {
    "en-US": "संयुक्त राज्य अमेरिका",
    "es-PE": "पेरू गणराज्य",
    "ru-RU": "रूसी संघ",
    "es-ES": "स्पेन का साम्राज्य",
    "en-IN": "भारत गणराज्य",
    "hi-IN": "भारत गणराज्य",
    "ur-IN": "भारत गणराज्य",
    "ur-PK": "इस्लामी गणराज्य पाकिस्तान"
  },
  "ur-IN": {
    "en-US": "ریاستہائے متحدہ امریکہ",
    "es-PE": "جمہوریہ پیرو",
    "ru-RU": "روسی وفاق",
    "es-ES": "مملکتِ اسپین",
    "en-IN": "جمہوریہ بھارت",
    "hi-IN": "جمہوریہ بھارت",
    "ur-IN": "جمہوریہ بھارت",
    "ur-PK": "اسلامی جمہوریہ پاکستان"
  },
  "ur-PK": {
    "en-US": "ریاستہائے متحدہ امریکہ",
    "es-PE": "جمہوریہ پیرو",
    "ru-RU": "روسی وفاق",
    "es-ES": "مملکتِ اسپین",
    "en-IN": "جمہوریہ بھارت",
    "hi-IN": "جمہوریہ بھارت",
    "ur-IN": "جمہوریہ بھارت",
    "ur-PK": "اسلامی جمہوریہ پاکستان"
  }
};
const localeDisplay=code=>LOCALE_LABELS[locale][code]+" ("+code+")";
const CATS=["all","everyday","work","tech","food","wordplay","characters","city","culture-contrasts","marriage","middle-class-life","relatives","romance","satire","trickster-stories","uncle-cheesy"];
const CATEGORY_IDS=localeCode=>localeCode==="en-IN"?["all","characters","city","culture-contrasts","everyday","food","marriage","middle-class-life","relatives","romance","satire","tech","trickster-stories","uncle-cheesy","work","wordplay"]:CATS.slice(0,6);
const THEMES=[["Midnight Pop","#101827","#1b2940","#f8f9ff","#c1cce0","#8092ad","#75e6da"],["Sunrise Punch","#261a24","#3c2934","#fff8f1","#f1cbd0","#bd8995","#ffb86b"],["Mint Condition","#10251f","#1b3930","#f0fff8","#c0e6d5","#6f9f89","#8cf0c2"],["Berry Blast","#26152d","#3c2447","#fff6ff","#e6cbe9","#a77bb0","#f0a6ff"],["Ocean Giggles","#0c2232","#16364b","#f0fbff","#bddbe9","#6c9fb7","#7bdcff"],["Citrus Circus","#252611","#3b3d1b","#ffffed","#e4e5b8","#a8a96a","#eaff70"],["Rose Roast","#2a171d","#43252e","#fff7f8","#edcbd2","#b78391","#ff9eb5"],["Lavender LOL","#201b32","#332b4b","#faf7ff","#d7cbed","#9b8bb9","#c9b1ff"],["Paper & Ink","#f4f0e7","#fffdf7","#20252b","#414b56","#6d7884","#075d68"],["Mono Mayhem","#111111","#222222","#ffffff","#eeeeee","#aaaaaa","#ffffff"]];
const THEME_NAMES={
"en-US":["Midnight Pop","Sunrise Punch","Mint Condition","Berry Blast","Ocean Giggles","Citrus Circus","Rose Roast","Lavender LOL","Paper & Ink","Mono Mayhem"],
"es-PE":["Noche de neón","Amanecer con chispa","Menta fresca","Explosión de bayas","Risas oceánicas","Circo cítrico","Rosa descarada","LOL lavanda","Papel y tinta","Caos monocromo"],
"ru-RU":["Полночный драйв","Утренний заряд","Мятная свежесть","Ягодный взрыв","Океан смеха","Цитрусовый цирк","Розовый сарказм","Лавандовый LOL","Бумага и чернила","Монохромный хаос"],
"es-ES":["Noche de neón","Amanecer con chispa","Menta fresca","Explosión de frutos rojos","Risas oceánicas","Circo cítrico","Rosa descarada","LOL lavanda","Papel y tinta","Caos monocromo"],
"en-IN":["Midnight Masala","Sunrise Chai","Minty Fresh","Berry Blast","Ocean Giggles","Citrus Circus","Rose Roast","Lavender LOL","Paper & Ink","Mono Mayhem"],
"hi-IN":["आधी रात की मस्ती","सूर्योदय की चुटकी","पुदीने की ताज़गी","बेरी धमाका","समंदर की हँसी","साइट्रस सर्कस","गुलाबी ठहाका","लैवेंडर LOL","कागज़ और स्याही","मोनोक्रोम मस्ती"],
"ur-IN":["نصف شب کی رونق","صبح کی چٹکی","پودینے کی تازگی","بیری کی بہار","سمندر کی ہنسی","ترش پھلوں کا تماشا","گلابی قہقہہ","لیونڈر کی لطافت","کاغذ اور سیاہی","یک رنگی ہنگامہ"],
"ur-PK":["رات کی محفل","صبح کا چسکا","پودینے کی ٹھنڈک","بیری کا دھماکا","سمندر کی شوخی","ترش پھلوں کا میلہ","گلابی گپ شپ","ارغوانی قہقہے","کاغذ قلم","سیاہ سفید شرارت"]
};
const UI={
"en-US":{eyebrow:"THE DAILY DOSE OF HA-HA",headline:"Tiny app. Ridiculously large grin.",intro:"Local laughs, zero signal drama. Your phone's funniest offline passenger.",localeEyebrow:"PICK YOUR COMEDY ZIP CODE",localeHeading:"Where should we borrow the punchlines from?",localeLabel:"Joke Language & Region",localeHelp:"Search by Language, Locale Code, or Country.",daily:"TODAY'S DOSE OF HA-HA",random:"FRESHLY BAKED GIGGLE",category:"Comedy Aisle",cats:["All Jokes","Characters","City","Culture Contrasts","Everyday Life","Food & Drink","Marriage","Middle-class Life","Relatives","Romance","Satire","Tech & Internet","Trickster Stories","Uncle / Cheesy","Work & Study","Wordplay"],another:"Hit me with another",copy:"Copy",share:"Share the Giggle",copied:"Joke copied. Go make someone smile!",copyFail:"Copy failed here. Select the joke text to copy it.",privacy:"Privacy at JestBox",access:"Accessibility Statement",footer:"No accounts. No tracking. Just laughs, wherever you go.",launch:"Pocket-sized local laughs.\nOffline. No accounts.\nNo tracking. No data snooping.\nYour phone’s funny sidekick.",skip:"Tap anywhere to skip the grand entrance.",theme:"Pick your flavour of fabulous",settings:"Settings & Superpowers",welcome:"Welcome to JestBox",themesAria:"Available themes",a11y:"Accessibility",large:"Larger Text",contrast:"Extra contrast",motion:"Reduce Motion",scale:"Text Size",underline:"Underline Links",targets:"Larger Touch Targets",spacing:"More Line Spacing",focus:"Stronger Focus Outline",themesTitle:"Themes",themesHint:"Pick your flavor of",note:"Saved on this device.",shareTitle:"Share a laugh",native:"Open device sharing apps",shareCopy:"Copy joke text",shareError:"Your device could not open its share panel. Copy the joke instead.",shared:"The giggle has left the building.",jokeTitle:"A joke from JestBox",skipMain:"Skip to main content",close:"Close",loading:"Loading a little laugh…",wcagTitle:"WCAG 2.2 guidance",wcagAlt:"WCAG 2.2 Level AA reference graphic",description:"JestBox: locally packed laughs, made for your language and offline moments."},
"es-PE":{eyebrow:"TU DOSIS DIARIA DE JA, JA, JA",headline:"Una app chiquita. Una carcajada grandota.",intro:"Humor local, cero dramas de señal. Tu copiloto de risas sin internet.",localeEyebrow:"ELIGE TU CÓDIGO POSTAL DEL HUMOR",localeHeading:"¿De dónde traemos los remates?",localeLabel:"Idioma y región de los chistes",localeHelp:"Busca por idioma, código regional o país.",daily:"LA RISA DE HOY",random:"OTRA RISITA RECIÉN HECHA",category:"Pasillo de carcajadas",cats:["Todos los chistes","Vida cotidiana","Trabajo y estudios","Tecnología e internet","Comida y bebida","Juegos de palabras"],another:"¡Suelta otra!",copy:"Copiar",share:"Compartir la carcajada",copied:"¡Chiste copiado! Que empiece la sonrisa.",copyFail:"No se pudo copiar. Selecciona el texto para copiarlo.",privacy:"Privacidad en JestBox",access:"Declaración de accesibilidad",footer:"Sin cuentas ni rastreo. Risas para llevar.",launch:"Risas locales de bolsillo.\nSin conexión. Sin cuentas.\nSin rastreo. Sin fisgoneo.\nTu risa va contigo.",skip:"Toca para saltarte la entrada triunfal.",theme:"Elige tu sabor de diversión",settings:"Ajustes y superpoderes",welcome:"Te damos la bienvenida a JestBox",themesAria:"Temas disponibles",a11y:"Accesibilidad",large:"Texto más grande",contrast:"Más contraste",motion:"Reducir movimiento",scale:"Tamaño del texto",underline:"Subrayar enlaces",targets:"Áreas táctiles más grandes",spacing:"Más espacio entre líneas",focus:"Resaltar mejor el foco",themesTitle:"Temas",themesHint:"Elige tu estilo de",note:"Guardado en este dispositivo.",shareTitle:"Comparte una carcajada",native:"Abrir apps para compartir",shareCopy:"Copiar el chiste",shareError:"El dispositivo no abrió el menú. Puedes copiar el chiste.",shared:"¡La carcajada ya salió!",jokeTitle:"Un chiste de JestBox",skipMain:"Saltar al contenido principal",close:"Cerrar",loading:"Cargando una risita…",wcagTitle:"Guía WCAG 2.2",wcagAlt:"Gráfico de referencia WCAG 2.2 nivel AA",description:"JestBox: chistes locales en tu idioma, listos para acompañarte sin conexión."},
"ru-RU":{eyebrow:"ЕЖЕДНЕВНАЯ ДОЗА ХА-ХА",headline:"Приложение маленькое, хохот — на весь район.",intro:"Местный юмор без капризов сети. Карманный пассажир хорошего настроения.",localeEyebrow:"ВЫБЕРИТЕ ЮМОР ПО ПРОПИСКЕ",localeHeading:"Откуда привезём смешные концовки?",localeLabel:"Язык и регион шуток",localeHelp:"Ищите по языку, коду региона или стране.",daily:"СЕГОДНЯШНЯЯ ПОРЦИЯ ХА-ХА",random:"ЕЩЁ ОДНА СВЕЖАЯ ШУТКА",category:"Отдел хорошего настроения",cats:["Все шутки","Повседневная жизнь","Работа и учёба","Технологии и интернет","Еда и напитки","Игра слов"],another:"Ну-ка, ещё!",copy:"Копировать",share:"Поделиться шуткой",copied:"Шутка скопирована. Пора улыбнуться!",copyFail:"Не удалось скопировать. Выделите текст вручную.",privacy:"Конфиденциальность в JestBox",access:"Заявление о доступности",footer:"Без аккаунтов. Без слежки. Смех всегда с вами.",launch:"Местный юмор всегда под рукой.\nБез интернета. Без аккаунтов.\nБез слежки. Без сбора данных.\nСмех всегда рядом.",skip:"Коснитесь экрана, чтобы пропустить выход.",theme:"Выберите цвет хорошего настроения",settings:"Настройки и суперспособности",welcome:"Добро пожаловать в JestBox",themesAria:"Доступные темы",a11y:"Доступность",large:"Увеличенный текст",contrast:"Повышенная контрастность",motion:"Уменьшить анимацию",scale:"Размер текста",underline:"Подчёркивать ссылки",targets:"Увеличить области нажатия",spacing:"Увеличить межстрочный интервал",focus:"Усилить выделение фокуса",themesTitle:"Темы",themesHint:"Выберите свой стиль:",note:"Сохранено на этом устройстве.",shareTitle:"Поделитесь смехом",native:"Открыть приложения для отправки",shareCopy:"Скопировать шутку",shareError:"Не удалось открыть меню отправки. Можно скопировать шутку.",shared:"Шутка отправилась покорять мир.",jokeTitle:"Шутка от JestBox",skipMain:"Перейти к основному содержимому",close:"Закрыть",loading:"Загружаем шутку…",wcagTitle:"Руководство WCAG 2.2",wcagAlt:"Справочная графика WCAG 2.2 уровня AA",description:"JestBox: местные шутки на вашем языке, всегда под рукой даже без интернета."},
"es-ES":{welcome:"Te damos la bienvenida a JestBox",themesAria:"Temas disponibles",eyebrow:"TU RACIÓN DIARIA DE JA, JA, JA",headline:"Una app pequeñita. Un ataque de risa enorme.",intro:"Humor de aquí, cero dramas de cobertura. Tu copiloto de carcajadas sin conexión.",localeEyebrow:"ELIGE TU CÓDIGO POSTAL DEL HUMOR",localeHeading:"¿De dónde traemos los remates?",localeLabel:"Idioma y región de los chistes",localeHelp:"Busca por idioma, código regional o país.",daily:"LA RISA DE HOY",random:"OTRA CARCAJADA RECIÉN HECHA",category:"Pasillo de carcajadas",cats:["Todos los chistes","Vida cotidiana","Trabajo y estudios","Tecnología e internet","Comida y bebida","Juegos de palabras"],another:"¡Venga, otra!",copy:"Copiar",share:"Compartir la carcajada",copied:"¡Chiste copiado! Que empiece la sonrisa.",copyFail:"No se pudo copiar. Selecciona el texto.",privacy:"Privacidad en JestBox",access:"Declaración de accesibilidad",footer:"Sin cuentas. Sin rastreo. Risas donde vayas.",launch:"Risas locales de bolsillo.\nSin conexión. Sin cuentas.\nSin rastreo. Sin fisgoneo.\nTu risa va contigo.",skip:"Toca para saltarte la entrada triunfal.",theme:"Elige tu toque de color",settings:"Ajustes y superpoderes",a11y:"Accesibilidad",large:"Texto más grande",contrast:"Más contraste",motion:"Reducir movimiento",scale:"Tamaño del texto",underline:"Subrayar enlaces",targets:"Áreas táctiles más grandes",spacing:"Más espacio entre líneas",focus:"Resaltar mejor el foco",themesTitle:"Temas",themesHint:"Elige tu estilo de",note:"Guardado en este dispositivo.",shareTitle:"Comparte una carcajada",native:"Abrir aplicaciones para compartir",shareCopy:"Copiar el chiste",shareError:"No se pudo abrir el menú. Puedes copiar el chiste.",shared:"¡La carcajada ya está de camino!",jokeTitle:"Un chiste de JestBox",skipMain:"Saltar al contenido principal",close:"Cerrar",loading:"Cargando una carcajada…",wcagTitle:"Guía WCAG 2.2",wcagAlt:"Gráfico de referencia WCAG 2.2 nivel AA",description:"JestBox: humor de aquí, en tu idioma y disponible sin conexión."},
"en-IN":{welcome:"Welcome to JestBox",themesAria:"Available themes",eyebrow:"YOUR DAILY DOSE OF HA-HA",headline:"Small app. Full-volume laughter.",intro:"Desi-flavoured laughs, zero network nakhras. Your offline comedy companion.",localeEyebrow:"PICK YOUR COMEDY PIN CODE",localeHeading:"Which corner should supply today's punchlines?",localeLabel:"Joke Language & Region",localeHelp:"Search by Language, Locale Code, or Country.",daily:"TODAY'S MASALA OF MIRTH",random:"ONE MORE, EXTRA CRISPY",category:"Comedy Aisle",cats:["All Jokes","Everyday Life","Work & Study","Tech & Internet","Food & Drink","Wordplay"],another:"Arre, one more!",copy:"Copy",share:"Share the Giggle",copied:"Joke copied. Go make someone smile!",copyFail:"Could not copy. Select the joke text.",privacy:"Privacy at JestBox",access:"Accessibility Statement",footer:"No accounts. No tracking. Just laughs, wherever you go.",launch:"Pocket-sized desi laughs.\nOffline. No accounts.\nNo tracking. No data snooping.\nYour phone’s funny sidekick.\nChai optional.",skip:"Tap anywhere to skip the dramatic entry.",theme:"Choose your vibe",settings:"Settings & superpowers",a11y:"Accessibility",large:"Larger text",contrast:"Extra contrast",motion:"Reduce Motion",scale:"Text Size",underline:"Underline Links",targets:"Larger Touch Targets",spacing:"More Line Spacing",focus:"Stronger Focus Outline",themesTitle:"Themes",themesHint:"Pick your flavor of",note:"Saved on this device.",shareTitle:"Share a laugh",native:"Open device sharing apps",shareCopy:"Copy joke text",shareError:"Your device could not open sharing. Copy the joke instead.",shared:"The laugh has been dispatched.",jokeTitle:"A joke from JestBox",skipMain:"Skip to main content",close:"Close",loading:"Loading a little laugh…",wcagTitle:"WCAG 2.2 guidance",wcagAlt:"WCAG 2.2 Level AA reference graphic",description:"JestBox: desi-flavoured laughs in your language, ready even when the network takes a break."},
"hi-IN":{eyebrow:"हँसी की रोज़ाना खुराक",headline:"ऐप छोटी-सी, ठहाके पूरे मोहल्ले जितने!",intro:"देसी अंदाज़ का हास्य, नेटवर्क के नखरों से आज़ाद। जेब में रहने वाला हँसी का साथी।",localeEyebrow:"अपना हास्य-पिनकोड चुनें",localeHeading:"आज के चुटकुले किस कोने से मँगवाएँ?",localeLabel:"चुटकुलों की भाषा और क्षेत्र",localeHelp:"भाषा, क्षेत्र कोड या देश से खोजें।",daily:"आज की हँसी की खुराक",random:"चलो, एक और हो जाए!",category:"चुटकुलों की दुनिया",cats:["सभी चुटकुले","रोज़मर्रा की ज़िंदगी","काम और पढ़ाई","तकनीक और इंटरनेट","खाना-पीना","शब्दों की शरारत"],another:"अरे, एक और सुनाओ!",copy:"कॉपी करें",share:"हँसी साझा करें",copied:"चुटकुला कॉपी हो गया! अब किसी को हँसाएँ।",copyFail:"कॉपी नहीं हो पाया। पाठ चुनकर कॉपी करें।",privacy:"JestBox में आपकी निजता",access:"सुगम्यता वक्तव्य",footer:"न खाता। न निगरानी। बस हँसी, हर जगह।",launch:"जेब में देसी हँसी।\nऑफ़लाइन। न खाता।\nन निगरानी। न डेटा जासूसी।\nहँसी हमेशा साथ।",skip:"शानदार एंट्री छोड़ने के लिए कहीं भी टैप करें।",theme:"अपना रंग चुनें",settings:"सेटिंग्स और खास सुविधाएँ",welcome:"JestBox में आपका स्वागत है",themesAria:"उपलब्ध थीम",a11y:"सुगम्यता",large:"बड़ा पाठ",contrast:"अधिक कंट्रास्ट",motion:"गतिशीलता कम करें",scale:"पाठ का आकार",underline:"लिंक रेखांकित करें",targets:"बड़े स्पर्श क्षेत्र",spacing:"पंक्तियों के बीच अधिक जगह",focus:"फ़ोकस को स्पष्ट दिखाएँ",themesTitle:"थीम",themesHint:"अपना अंदाज़ चुनें",note:"इस डिवाइस पर सहेजा गया।",shareTitle:"हँसी साझा करें",native:"डिवाइस के शेयर ऐप खोलें",shareCopy:"चुटकुला कॉपी करें",shareError:"डिवाइस शेयर मेनू नहीं खोल पाया। चुटकुला कॉपी करें।",shared:"हँसी रवाना हो गई!",jokeTitle:"JestBox का चुटकुला",skipMain:"मुख्य सामग्री पर जाएँ",close:"बंद करें",loading:"एक छोटी-सी हँसी आ रही है…",wcagTitle:"WCAG 2.2 मार्गदर्शिका",wcagAlt:"WCAG 2.2 स्तर AA संदर्भ चित्र",description:"JestBox: आपकी भाषा में देसी हँसी, इंटरनेट के बिना भी हमेशा साथ।"},
"ur-IN":{"eyebrow":"ہنسی کی روزانہ خوراک","headline":"چھوٹی سی ایپ، قہقہے بے حساب۔","intro":"اپنے رنگ کے لطیفے، انٹرنیٹ کے بغیر بھی۔","localeEyebrow":"اپنی ہنسی کی زبان چنیے","localeHeading":"آج کے قہقہے کس خطے سے آئیں؟","localeLabel":"لطیفوں کی زبان اور علاقہ","localeHelp":"زبان، علاقائی کوڈ یا ملک سے تلاش کریں۔","daily":"آج کی ہنسی کی خوراک","random":"تازہ تازہ قہقہہ","category":"لطیفوں کی محفل","cats":["تمام لطیفے","روزمرہ زندگی","کام اور تعلیم","ٹیکنالوجی اور انٹرنیٹ","کھانا پینا","لفظی شرارت"],"another":"چلیے، ایک اور!","copy":"نقل کریں","share":"ہنسی بانٹیں","copied":"لطیفہ نقل ہو گیا؛ اب کسی کو ہنسائیے!","copyFail":"نقل نہ ہو سکا۔ لطیفے کا متن منتخب کرکے نقل کریں۔","privacy":"JestBox کی رازداری","access":"رسائی پذیری کا بیان","footer":"نہ اکاؤنٹ، نہ نگرانی؛ بس ہر جگہ ہنسی۔","launch":"جیب میں مقامی ہنسی۔\nبغیر انٹرنیٹ۔ بغیر اکاؤنٹ۔\nنہ نگرانی، نہ ڈیٹا کی ٹوہ۔\nآپ کے فون کا خوش مزاج ساتھی۔","skip":"استقبالیہ چھوڑنے کے لیے کہیں بھی چھوئیں۔","theme":"اپنی پسند کے رنگ چنیے","settings":"ترتیبات اور خاص سہولتیں","welcome":"JestBox میں خوش آمدید","themesAria":"دستیاب رنگ","a11y":"رسائی پذیری","large":"بڑا متن","contrast":"زیادہ واضح تضاد","motion":"حرکت کم کریں","scale":"متن کا سائز","underline":"روابط کے نیچے لکیر","targets":"چھونے کے بڑے حصے","spacing":"سطروں میں زیادہ فاصلہ","focus":"انتخاب کو نمایاں کریں","themesTitle":"رنگوں کے انداز","themesHint":"اپنا پسندیدہ انداز چنیے","note":"اس آلے پر محفوظ ہے۔","shareTitle":"ہنسی بانٹیے","native":"فون کے اشتراک والے ایپس کھولیں","shareCopy":"لطیفہ نقل کریں","shareError":"فون اشتراک کا مینو نہیں کھول سکا۔ لطیفہ نقل کر لیجیے۔","shared":"ہنسی روانہ ہو گئی!","jokeTitle":"JestBox کا ایک لطیفہ","skipMain":"اصل مواد پر جائیں","close":"بند کریں","loading":"ایک چھوٹا سا قہقہہ آ رہا ہے…","wcagTitle":"ڈبلیو سی اے جی 2.2 رہنمائی","wcagAlt":"ڈبلیو سی اے جی 2.2 سطح اے اے حوالہ تصویر","description":"JestBox: آپ کی زبان میں مقامی لطیفے، انٹرنیٹ کے بغیر بھی۔"},
"ur-PK":{"eyebrow":"روزانہ ہنسی کا تڑکا","headline":"ایپ چھوٹی، قہقہے فل سائز!","intro":"اپنے ماحول کے لطیفے، نیٹ ورک کے نخرے ختم۔","localeEyebrow":"اپنی مزاحیہ زبان منتخب کریں","localeHeading":"آج کی ہنسی کہاں سے منگوائیں؟","localeLabel":"لطیفوں کی زبان اور علاقہ","localeHelp":"زبان، لوکیل کوڈ یا ملک سے تلاش کریں۔","daily":"آج کا مزاحیہ ڈوز","random":"ایک اور تازہ لطیفہ","category":"مزاح کا اڈہ","cats":["تمام لطیفے","روزمرہ زندگی","کام اور پڑھائی","ٹیکنالوجی اور انٹرنیٹ","کھانا پینا","لفظوں کی جگت"],"another":"اور سنائیں جی!","copy":"کاپی کریں","share":"قہقہہ شیئر کریں","copied":"لطیفہ کاپی ہوگیا؛ اب دوستوں کی باری!","copyFail":"کاپی نہیں ہوا۔ متن منتخب کرکے کاپی کرلیں۔","privacy":"JestBox کی رازداری","access":"رسائی کی سہولتوں کا بیان","footer":"نہ اکاؤنٹ، نہ ٹریکنگ؛ بس جہاں جائیں ہنسی ساتھ۔","launch":"جیب میں مزاح کا پٹارا۔\nآف لائن۔ کوئی اکاؤنٹ نہیں۔\nنہ ٹریکنگ، نہ ڈیٹا کی کھوج۔\nآپ کا ڈیجیٹل ہم سفر۔","skip":"انٹری چھوڑنے کے لیے اسکرین کو کہیں بھی چھوئیں۔","theme":"اپنا پسندیدہ رنگ چنیں","settings":"ترتیبات اور اضافی سہولتیں","welcome":"JestBox میں آپ کا خیرمقدم ہے","themesAria":"دستیاب تھیمز","a11y":"رسائی کی سہولتیں","large":"بڑا متن","contrast":"مزید واضح تضاد","motion":"حرکت کم کریں","scale":"متن کا سائز","underline":"لنکس کے نیچے لکیر","targets":"بڑے ٹچ ایریاز","spacing":"سطروں میں زیادہ فاصلہ","focus":"فوکس کو نمایاں کریں","themesTitle":"تھیمز","themesHint":"اپنا انداز منتخب کریں","note":"اسی ڈیوائس پر محفوظ ہے۔","shareTitle":"ہنسی شیئر کریں","native":"ڈیوائس کی شیئرنگ ایپس کھولیں","shareCopy":"لطیفہ کاپی کریں","shareError":"ڈیوائس شیئر مینو نہیں کھول سکی۔ لطیفہ کاپی کرلیں۔","shared":"قہقہہ روانہ کردیا گیا!","jokeTitle":"JestBox کا لطیفہ","skipMain":"مرکزی مواد پر جائیں","close":"بند کریں","loading":"ایک مزے دار لطیفہ آرہا ہے…","wcagTitle":"ڈبلیو سی اے جی 2.2 رہنمائی","wcagAlt":"ڈبلیو سی اے جی 2.2 سطح اے اے حوالہ تصویر","description":"JestBox: آپ کے علاقے کی اردو میں لطیفے، انٹرنیٹ کے بغیر بھی۔"}

};
const PREF_KEY="jestbox.preferences.v1";const DEFAULT_PREFS={theme:0,textScale:85,extraContrast:false,reduceMotion:false,underlineLinks:false,largerTargets:false,lineSpacing:false,focusOutline:false};let prefs={...DEFAULT_PREFS};try{const saved=JSON.parse(localStorage.getItem(PREF_KEY)||"{}");if(saved&&typeof saved==="object")prefs={...prefs,...saved}}catch{}prefs.theme=Number.isInteger(prefs.theme)&&prefs.theme>=0&&prefs.theme<THEMES.length?prefs.theme:0;prefs.textScale=Math.min(200,Math.max(50,Number(prefs.textScale)||85));let locale="en-US",current=null,themeId=0;const $=s=>document.querySelector(s),t=()=>UI[locale],list=()=>window.JESTBOX_JOKES?.[locale]||[];function savePrefs(){try{localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}catch{}}
function cat(){const n=t().cats.findIndex(x=>x.toLowerCase()===$("#category-search").value.trim().toLowerCase());return CATEGORY_IDS(locale)[n<0?0:n]}
function closeCombo(input,menu){menu.hidden=true;input.setAttribute("aria-expanded","false")}
function renderLocaleOptions(query=""){const input=$("#locale-search"),menu=$("#locale-options"),q=query.toLocaleLowerCase();menu.replaceChildren();const matches=LOCALES.filter(x=>(localeDisplay(x.code)+" "+x.label+" "+x.country+" "+COUNTRY_LABELS[locale][x.code]+" "+LOCALE_LABELS[locale][x.code]+" "+x.code).toLocaleLowerCase().includes(q)).sort((a,b)=>localeDisplay(a.code).localeCompare(localeDisplay(b.code),locale,{sensitivity:"base"}));for(const item of matches){const b=document.createElement("button");b.type="button";b.className="combo-option";b.setAttribute("role","option");b.setAttribute("aria-selected",String(item.code===locale));const title=document.createElement("span"),country=document.createElement("small");title.textContent=localeDisplay(item.code);country.textContent=COUNTRY_LABELS[locale][item.code];b.append(title,country);b.addEventListener("click",()=>selectLocale(item.code));menu.append(b)}menu.hidden=matches.length===0;input.setAttribute("aria-expanded",String(!menu.hidden))}
function renderCategoryOptions(query=""){const input=$("#category-search"),menu=$("#category-options"),q=query.toLocaleLowerCase();menu.replaceChildren();const matches=t().cats.map((label,index)=>({label,index})).filter(x=>x.label.toLocaleLowerCase().includes(q)).sort((a,b)=>a.label.localeCompare(b.label,locale,{sensitivity:"base"}));for(const item of matches){const b=document.createElement("button");b.type="button";b.className="combo-option";b.setAttribute("role","option");b.setAttribute("aria-selected",String(item.index===CATEGORY_IDS(locale).indexOf(cat())));b.textContent=item.label;b.addEventListener("click",()=>selectCategory(item.index));menu.append(b)}menu.hidden=matches.length===0;input.setAttribute("aria-expanded",String(!menu.hidden))}
function selectLocale(code){if(!LOCALES.some(x=>x.code===code))return;locale=code;const input=$("#locale-search");input.value=localeDisplay(code);input.focus();closeCombo(input,$("#locale-options"));applyLocale()}
function selectCategory(index){const input=$("#category-search");input.value=t().cats[index];input.focus();closeCombo(input,$("#category-options"));show()}
function show(mode="daily"){const a=list().filter(j=>cat()==="all"||(Array.isArray(j[0])?j[0]:[j[0]]).includes(cat()));if(!a.length){$("#joke-heading").textContent="";return}let i=mode==="daily"?Math.floor((Math.floor(Date.now()/86400000)+locale.length)%a.length):Math.floor(Math.random()*a.length);if(a.length>1&&a[i]===current)i=(i+1)%a.length;current=a[i];$("#daily-label").textContent=mode==="daily"?t().daily:t().random;$("#joke-heading").textContent=current[1];const assigned=Array.isArray(current[0])?current[0]:[current[0]];$("#joke-category").textContent=assigned.map(id=>t().cats[CATEGORY_IDS(locale).indexOf(id)]).filter(Boolean).join(" · ")}
function localizeThemes(){document.querySelectorAll(".theme-choice").forEach((b,i)=>{b.textContent=THEME_NAMES[locale][i];b.setAttribute("aria-label",THEME_NAMES[locale][i])})}
function applyLocale(){const x=t();document.documentElement.lang=locale;document.documentElement.dir=(locale==="ur-IN"||locale==="ur-PK")?"rtl":"ltr";document.title="JestBox — "+x.headline;document.querySelector('meta[name="description"]').content=x.description;for(const [id,k] of [["#locale-eyebrow","localeEyebrow"],["#locale-heading","localeHeading"],["#locale-label","localeLabel"],["#locale-help","localeHelp"],["#another-label","another"],["#copy-label","copy"],["#share-label","share"],["#privacy-link","privacy"],["#accessibility-link","access"],["#footer-line","footer"],["#launch-tagline","launch"],["#launch-hint","skip"],["#settings-title","settings"],["#accessibility-title","a11y"],["#large-text-label","large"],["#high-contrast-label","contrast"],["#reduce-motion-label","motion"],["#underline-links-label","underline"],["#larger-targets-label","targets"],["#line-spacing-label","spacing"],["#focus-outline-label","focus"],["#themes-title","themesTitle"],["#themes-hint","themesHint"],["#settings-note","note"],["#share-title","shareTitle"],["#native-share-button","native"],["#share-copy-button","shareCopy"]])$(id).textContent=x[k];$("#category-label").textContent=x.category;$("#category-search").value=x.cats[0];$("#locale-search").value=localeDisplay(locale);renderCategoryOptions("");closeCombo($("#category-search"),$("#category-options"));closeCombo($("#locale-search"),$("#locale-options"));localizeThemes();$("#large-text-value").textContent=prefs.textScale+"%";const settingsLabel=t().settings;$("#settings-button").setAttribute("aria-label",settingsLabel);$("#settings-button").title=settingsLabel;$("#launch-screen").setAttribute("aria-label",t().welcome);$("#theme-options").setAttribute("aria-label",t().themesAria);$("#joke-heading").textContent=x.loading;$("#wcag-mark-link").title=x.wcagTitle;$("#wcag-mark-image").alt=x.wcagAlt;$("#privacy-link").href="legal/privacy-"+locale+".html";$("#accessibility-link").href="legal/accessibility-"+locale+".html";document.querySelectorAll(".close-dialog").forEach(b=>b.setAttribute("aria-label",x.close));$("#home-link").setAttribute("aria-label","JestBox");$(".skip-link").textContent=x.skipMain;show()}
$("#locale-search").addEventListener("focus",()=>renderLocaleOptions($("#locale-search").value===localeDisplay(locale)?"":$("#locale-search").value));$("#locale-search").addEventListener("click",()=>renderLocaleOptions($("#locale-search").value===localeDisplay(locale)?"":$("#locale-search").value));
$("#locale-search").addEventListener("input",e=>renderLocaleOptions(e.target.value));
$("#locale-search").addEventListener("keydown",e=>{if(e.key==="Escape")closeCombo($("#locale-search"),$("#locale-options"));if(e.key==="ArrowDown"){e.preventDefault();$("#locale-options").querySelector("button")?.focus()}if(e.key==="Enter"){e.preventDefault();const v=e.target.value.toLocaleLowerCase();const match=LOCALES.find(x=>x.code.toLocaleLowerCase()===v||x.label.toLocaleLowerCase()===v);if(match)selectLocale(match.code);else $("#locale-options").querySelector("button")?.click()}});
$("#category-search").addEventListener("focus",()=>renderCategoryOptions($("#category-search").value===t().cats[CATS.indexOf(cat())]?"":$("#category-search").value));$("#category-search").addEventListener("click",()=>renderCategoryOptions($("#category-search").value===t().cats[CATS.indexOf(cat())]?"":$("#category-search").value));
$("#category-search").addEventListener("input",e=>renderCategoryOptions(e.target.value));
$("#category-search").addEventListener("keydown",e=>{if(e.key==="Escape")closeCombo($("#category-search"),$("#category-options"));if(e.key==="ArrowDown"){e.preventDefault();$("#category-options").querySelector("button")?.focus()}if(e.key==="Enter"){e.preventDefault();const v=e.target.value.toLocaleLowerCase();const i=t().cats.findIndex(x=>x.toLocaleLowerCase()===v);if(i>=0)selectCategory(i);else $("#category-options").querySelector("button")?.click()}});
document.addEventListener("click",e=>{if(!$("#locale-search").parentElement.contains(e.target))closeCombo($("#locale-search"),$("#locale-options"));if(!$("#category-search").parentElement.contains(e.target))closeCombo($("#category-search"),$("#category-options"))});
function bindListboxKeys(menu,input){menu.addEventListener("keydown",e=>{const items=[...menu.querySelectorAll("button")],index=items.indexOf(document.activeElement);if(e.key==="ArrowDown"){e.preventDefault();items[Math.min(index+1,items.length-1)]?.focus()}else if(e.key==="ArrowUp"){e.preventDefault();if(index<=0)input.focus();else items[index-1]?.focus()}else if(e.key==="Home"){e.preventDefault();items[0]?.focus()}else if(e.key==="End"){e.preventDefault();items.at(-1)?.focus()}else if(e.key==="Escape"){e.preventDefault();input.focus();closeCombo(input,menu)}})}
bindListboxKeys($("#locale-options"),$("#locale-search"));bindListboxKeys($("#category-options"),$("#category-search"));
$("#another-button").addEventListener("click",()=>show("random"));$("#copy-button").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(current[1]);$("#status").textContent=t().copied}catch{$("#status").textContent=t().copyFail}});
function open(id){const d=$("#"+id);if(d.showModal)d.showModal();else d.setAttribute("open","")}function close(id){const d=$("#"+id);if(d.close)d.close();else d.removeAttribute("open")}
$("#share-button").addEventListener("click",()=>{$("#share-preview").textContent=current?.[1]||"";$("#share-status").textContent="";open("share-dialog")});
$("#native-share-button").addEventListener("click",async()=>{try{const payload={title:t().jokeTitle,text:current[1],dialogTitle:t().shareTitle};if(window.JestBoxNativeShare?.share){await window.JestBoxNativeShare.share(payload)}else if(navigator.share){await navigator.share(payload)}else{throw Error("Native share unavailable")}$("#share-status").textContent=t().shared}catch(e){if(e.name!=="AbortError")$("#share-status").textContent=t().shareError}});
$("#share-copy-button").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(current[1]);$("#share-status").textContent=t().copied}catch{$("#share-status").textContent=t().copyFail}});
$("#settings-button").addEventListener("click",()=>open("settings-dialog"));document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>close(b.dataset.close)));
function setTheme(i,save=true){themeId=i;const a=THEMES[i];["page","surface","text","muted","border","accent"].forEach((k,n)=>document.documentElement.style.setProperty("--"+k,a[n+1]));document.documentElement.style.setProperty("--accent-ink",i===8?"#fff":i===9?"#000":"#061a1b");document.querySelectorAll(".theme-choice").forEach((b,n)=>b.setAttribute("aria-pressed",String(n===i)));if(save){prefs.theme=i;savePrefs()}}
THEMES.forEach((a,i)=>{const b=document.createElement("button");b.className="theme-choice";b.type="button";b.textContent=THEME_NAMES[locale][i];b.style.background=a[6];b.style.color=i===8?"#fff":i===9?"#000":"#061a1b";b.style.borderColor=a[5];b.setAttribute("aria-label",THEME_NAMES[locale][i]);b.setAttribute("aria-pressed","false");b.addEventListener("click",()=>setTheme(i));$("#theme-options").append(b)});
function applyPrefs(){document.documentElement.style.fontSize=prefs.textScale+"%";$("#large-text").value=String(prefs.textScale);$("#large-text-value").textContent=prefs.textScale+"%";for(const [id,key,cls] of [["high-contrast","extraContrast","high-contrast"],["reduce-motion","reduceMotion","reduce-motion"],["underline-links","underlineLinks","underline-links"],["larger-targets","largerTargets","larger-targets"],["line-spacing","lineSpacing","more-line-spacing"],["focus-outline","focusOutline","enhanced-focus"]]){$("#"+id).checked=Boolean(prefs[key]);document.body.classList.toggle(cls,Boolean(prefs[key]))}setTheme(prefs.theme,false)}
$("#large-text").addEventListener("input",e=>{prefs.textScale=Number(e.target.value);document.documentElement.style.fontSize=prefs.textScale+"%";$("#large-text-value").textContent=prefs.textScale+"%";savePrefs()});
for(const [id,key,cls] of [["high-contrast","extraContrast","high-contrast"],["reduce-motion","reduceMotion","reduce-motion"],["underline-links","underlineLinks","underline-links"],["larger-targets","largerTargets","larger-targets"],["line-spacing","lineSpacing","more-line-spacing"],["focus-outline","focusOutline","enhanced-focus"]])$("#"+id).addEventListener("change",e=>{prefs[key]=e.target.checked;document.body.classList.toggle(cls,e.target.checked);savePrefs()});
let timer;function dismiss(){const s=$("#launch-screen");if(!s||s.classList.contains("dismissed"))return;clearTimeout(timer);s.classList.add("dismissed");setTimeout(()=>s.remove(),260)}$("#launch-screen").addEventListener("click",dismiss);$("#launch-screen").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();dismiss()}});timer=setTimeout(dismiss,5000);
applyPrefs();applyLocale();