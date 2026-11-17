/* JestBox — all joke content and interface logic run locally. No network requests or storage. */
const copy = {
  "en-US": {
    locale: "EN · US", eyebrow: "A LITTLE LAUGHTER, WHEREVER YOU ARE",
    headline: "Good jokes. No signal needed.",
    intro: "A pocket-sized laugh, with humour made for your corner of the world.",
    localeEyebrow: "CHOOSE YOUR HUMOUR", localeHeading: "Where should the jokes come from?", localeGroupLabel: "Choose joke language",
    daily: "TODAY'S LITTLE LAUGH", category: "Category",
    categories: { all: "All jokes", everyday: "Everyday life", work: "Work & study", tech: "Tech & internet", food: "Food & drink", wordplay: "Wordplay" },
    another: "Another joke", copy: "Copy", share: "Share",
    privacy: "Made for offline smiles. No accounts, tracking, or personal data collection.",
    footer: "Two locales. Locally stored laughs. Zero fuss.",
    copied: "Copied!", copyFailed: "Copy unavailable here. You can select the joke and copy it.",
    shared: "Ready to share.", shareFallback: "Sharing isn't available here. The joke has been copied instead.",
    categoryNames: { everyday: "Everyday life", work: "Work & study", tech: "Tech & internet", food: "Food & drink", wordplay: "Wordplay" }
  },
  "ru-RU": {
    locale: "RU · РФ", eyebrow: "НЕМНОГО ЮМОРА — ГДЕ БЫ ВЫ НИ БЫЛИ",
    headline: "Хорошие шутки. Интернет не нужен.",
    intro: "Порция хорошего настроения с юмором, понятным именно здесь.",
    localeEyebrow: "ВЫБЕРИТЕ СВОЙ ЮМОР", localeHeading: "Откуда будут шутки?", localeGroupLabel: "Выберите язык шуток",
    daily: "ШУТКА НА СЕГОДНЯ", category: "Категория",
    categories: { all: "Все шутки", everyday: "Повседневная жизнь", work: "Работа и учёба", tech: "Технологии и интернет", food: "Еда и напитки", wordplay: "Игра слов" },
    another: "Ещё шутку", copy: "Копировать", share: "Поделиться",
    privacy: "Улыбайтесь даже без интернета. Без аккаунтов, слежки и сбора личных данных.",
    footer: "Две локали. Юмор прямо в приложении. Никаких сложностей.",
    copied: "Скопировано!", copyFailed: "Копирование недоступно. Вы можете выделить шутку и скопировать её.",
    shared: "Можно отправлять!", shareFallback: "Поделиться сейчас нельзя — шутка скопирована.",
    categoryNames: { everyday: "Повседневная жизнь", work: "Работа и учёба", tech: "Технологии и интернет", food: "Еда и напитки", wordplay: "Игра слов" }
  }
};

const jokes = {
  "en-US": [
    { category: "everyday", text: "My weather app said “light showers,” so I took a flashlight to the bathroom." },
    { category: "everyday", text: "I tried to take a day off from my responsibilities. They followed me home." },
    { category: "everyday", text: "The GPS said “turn around.” I did. Now it says we need to talk." },
    { category: "everyday", text: "I bought a smart doorbell. Now even my front porch has better social skills than I do." },
    { category: "everyday", text: "My grocery list said “just the essentials.” Somehow I came home with three kinds of cheese and no bread." },
    { category: "work", text: "My calendar and I had a disagreement. It thinks every day is booked. I think it needs a vacation." },
    { category: "work", text: "I asked my boss for a raise. They said my salary was already growing — just not as fast as the cost of coffee." },
    { category: "work", text: "My inbox is like a haunted house: every time I open it, something new screams for attention." },
    { category: "work", text: "I love teamwork. It means I can blame the spreadsheet on a whole committee." },
    { category: "tech", text: "I told my laptop I needed a break. It froze. Very supportive." },
    { category: "tech", text: "My password is so strong that even I can't get into my own account." },
    { category: "tech", text: "The cloud is amazing. My files live in the sky, and somehow I still can't find them." },
    { category: "tech", text: "I asked the Wi-Fi for a connection. It said, “Let's keep things wireless.”" },
    { category: "food", text: "I made a salad for dinner. Then I added croutons, cheese, and dressing until it became a very confused pizza." },
    { category: "food", text: "Coffee and I have a great relationship. It's always there when I need a little grounds for optimism." },
    { category: "food", text: "I tried meal prepping. I prepared a meal, then immediately ate it. Very efficient." },
    { category: "wordplay", text: "I used to be a baker, but I couldn't make enough dough." },
    { category: "wordplay", text: "I wondered why the baseball was getting bigger. Then it hit me." },
    { category: "wordplay", text: "The calendar's days are numbered. It knows exactly when its time is up." },
    { category: "wordplay", text: "I used to hate facial hair, but then it grew on me." }
  ],
  "ru-RU": [
    { category: "everyday", text: "Купил умный чайник. Теперь каждое утро он спрашивает: «Вы уверены, что готовы к этому дню?»" },
    { category: "everyday", text: "Поставил будильник на семь утра. Он прозвенел. Мы оба сделали вид, что ничего не произошло." },
    { category: "everyday", text: "Вышел прогуляться без телефона. Через пять минут понял: даже мысли теперь хотят зарядку." },
    { category: "everyday", text: "Решил навести порядок в шкафу. Теперь у меня три стопки вещей: нужные, ненужные и «вдруг пригодится»." },
    { category: "everyday", text: "Спросил навигатор, далеко ли до дома. Он ответил: «Смотря насколько вы устали»." },
    { category: "work", text: "На работе попросили мыслить нестандартно. Я пришёл в понедельник в пятницу." },
    { category: "work", text: "Начальник сказал: «Нужно работать быстрее». Я включил ускоренное воспроизведение." },
    { category: "work", text: "Мой список дел такой длинный, что у него уже появился собственный список дел." },
    { category: "work", text: "На совещании спросили, есть ли вопросы. Я спросил, когда будет следующее совещание без вопросов." },
    { category: "tech", text: "Компьютер попросил обновление. Я тоже попросил, но мне почему-то предложили просто поспать." },
    { category: "tech", text: "Интернет сегодня такой медленный, что я успел передумать, пока открывалась страница." },
    { category: "tech", text: "Забыл пароль от Wi-Fi. Теперь у нас дома самая надёжная защита от гостей." },
    { category: "tech", text: "Облако хранит мои файлы. Надеюсь, у него хорошая память и нет страха высоты." },
    { category: "food", text: "Поставил чайник и ушёл. Вернулся — чайник уже остыл, а я всё ещё не определился с печеньем." },
    { category: "food", text: "Решил питаться правильно. Теперь ем салат одной рукой, а другой держу меню доставки." },
    { category: "food", text: "Купил кофе без кофеина. Это как смотреть фильм с выключенным звуком: вроде всё правильно, но зачем?" },
    { category: "wordplay", text: "У часов тяжёлый характер: они всё время тикают, а потом делают вид, что время ни при чём." },
    { category: "wordplay", text: "Книга по самоорганизации лежала на столе три недели. Очень убедительно объясняла, как не откладывать дела." },
    { category: "wordplay", text: "У оптимиста стакан наполовину полон, у пессимиста — наполовину пуст. У физика — просто в два раза больше, чем надо." },
    { category: "wordplay", text: "Слово не воробей: вылетит — потом ещё долго объясняй, что имел в виду." }
  ]
};

const elements = {
  root: document.documentElement,
  localeLabel: document.querySelector("#locale-label"),
  headline: document.querySelector("#headline"),
  eyebrow: document.querySelector("#eyebrow"),
  intro: document.querySelector("#intro"),
  localeEyebrow: document.querySelector("#locale-eyebrow"),
  localeHeading: document.querySelector("#locale-heading"),
  localeButtons: document.querySelector("#locale-buttons"),
  daily: document.querySelector("#daily-label"),
  categoryLabel: document.querySelector("#category-label"),
  category: document.querySelector("#category"),
  joke: document.querySelector("#joke-heading"),
  jokeCategory: document.querySelector("#joke-category"),
  status: document.querySelector("#status"),
  another: document.querySelector("#another-label"),
  copy: document.querySelector("#copy-label"),
  share: document.querySelector("#share-label"),
  privacy: document.querySelector("#privacy-note"),
  footer: document.querySelector("#footer-line")
};

let locale = "en-US";
let currentJoke = null;
let previousIndex = -1;

function getFilteredJokes() {
  const selected = elements.category.value;
  return jokes[locale].filter((joke) => selected === "all" || joke.category === selected);
}

function daySeed() {
  const now = new Date();
  return [now.getFullYear(), now.getMonth() + 1, now.getDate(), locale].join("-");
}

function stableIndex(seed, length) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % length;
}

function renderJoke(joke) {
  currentJoke = joke;
  elements.joke.textContent = joke.text;
  elements.jokeCategory.textContent = copy[locale].categoryNames[joke.category];
  elements.status.textContent = "";
}

function showDailyJoke() {
  const filtered = getFilteredJokes();
  if (!filtered.length) return;
  renderJoke(filtered[stableIndex(daySeed() + elements.category.value, filtered.length)]);
}

function showRandomJoke() {
  const filtered = getFilteredJokes();
  if (!filtered.length) return;
  const alternatives = filtered
    .map((joke, index) => ({ joke, index }))
    .filter((entry) => entry.joke !== currentJoke);
  const candidates = alternatives.length ? alternatives : filtered.map((joke, index) => ({ joke, index }));
  const withoutPrevious = candidates.filter((entry) => entry.index !== previousIndex);
  const pool = withoutPrevious.length ? withoutPrevious : candidates;
  const selected = pool[Math.floor(Math.random() * pool.length)];
  previousIndex = selected.index;
  renderJoke(selected.joke);
}

function renderLocale() {
  const text = copy[locale];
  elements.root.lang = locale;
  elements.root.dir = "ltr";
  document.title = locale === "ru-RU" ? "JestBox — Немного хорошего настроения" : "JestBox — A little laughter, wherever you are";
  elements.localeLabel.textContent = text.locale;
  elements.eyebrow.textContent = text.eyebrow;
  elements.headline.textContent = text.headline;
  elements.intro.textContent = text.intro;
  elements.localeEyebrow.textContent = text.localeEyebrow;
  elements.localeHeading.textContent = text.localeHeading;
  elements.localeButtons.setAttribute("aria-label", text.localeGroupLabel);
  elements.daily.textContent = text.daily;
  elements.categoryLabel.textContent = text.category;
  elements.another.textContent = text.another;
  elements.copy.textContent = text.copy;
  elements.share.textContent = text.share;
  elements.privacy.textContent = text.privacy;
  elements.footer.textContent = text.footer;
  Array.from(elements.category.options).forEach((option) => {
    option.textContent = text.categories[option.value];
  });
  document.querySelectorAll("[data-locale]").forEach((button) => {
    const active = button.dataset.locale === locale;
    button.classList.toggle("active", active);
    button.classList.toggle("secondary", !active);
    button.setAttribute("aria-pressed", String(active));
  });
  previousIndex = -1;
  showDailyJoke();
}

document.querySelectorAll("[data-locale]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.locale === locale) return;
    locale = button.dataset.locale;
    elements.category.value = "all";
    renderLocale();
  });
});

elements.category.addEventListener("change", () => {
  previousIndex = -1;
  showDailyJoke();
});
document.querySelector("#another-button").addEventListener("click", showRandomJoke);

document.querySelector("#copy-button").addEventListener("click", async () => {
  if (!currentJoke) return;
  try {
    await navigator.clipboard.writeText(currentJoke.text);
    elements.status.textContent = copy[locale].copied;
  } catch {
    elements.status.textContent = copy[locale].copyFailed;
  }
});

document.querySelector("#share-button").addEventListener("click", async () => {
  if (!currentJoke) return;
  const title = locale === "ru-RU" ? "Шутка от JestBox" : "A joke from JestBox";
  if (navigator.share) {
    try {
      await navigator.share({ title, text: currentJoke.text });
      elements.status.textContent = copy[locale].shared;
      return;
    } catch (error) {
      if (error && error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(currentJoke.text);
    elements.status.textContent = copy[locale].shareFallback;
  } catch {
    elements.status.textContent = copy[locale].copyFailed;
  }
});

renderLocale();
