// Style: Архивный авангард — конструктивистская геометрия, бумажная фактура, монтажный красный, DM Serif Display + IBM Plex Sans.
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, Film, MapPin, Play, Search, Ticket, X } from "lucide-react";

const WATERCOLOUR = "/manus-storage/likhov-watercolor-reconstruction_30cf8fea.png";
const INTERIOR = "/manus-storage/likhov-cinema-interior_e99dbab3.png";
const MARK = "/manus-storage/likhov-mark_17bd8120.png";

type FilmRecord = { year: number; title: string; kind: "игровой" | "мультфильм" | "документальный"; note: string };

const films: FilmRecord[] = [
  { year: 1927, title: "Чашка чая", kind: "игровой", note: "утрачен" },
  { year: 1928, title: "Потомок Чингисхана", kind: "игровой", note: "Всеволод Пудовкин" },
  { year: 1928, title: "Белый орёл", kind: "игровой", note: "Николай Шпиковский" },
  { year: 1928, title: "Кукла с миллионами", kind: "игровой", note: "комедия" },
  { year: 1928, title: "Саламандра", kind: "игровой", note: "научная фантастика" },
  { year: 1929, title: "В город входить нельзя", kind: "игровой", note: "социальная драма" },
  { year: 1929, title: "Торговцы славой", kind: "игровой", note: "антивоенная сатира" },
  { year: 1929, title: "Сто двадцать тысяч в год", kind: "игровой", note: "утрачен" },
  { year: 1929, title: "Весёлая канарейка", kind: "игровой", note: "музыкальная комедия" },
  { year: 1930, title: "Земля в плену", kind: "игровой", note: "драма" },
  { year: 1930, title: "Мёртвый дом", kind: "игровой", note: "экранизация" },
  { year: 1930, title: "Два-бульди-два", kind: "игровой", note: "Николай Шенгелая" },
  { year: 1930, title: "Простой случай", kind: "игровой", note: "Всеволод Пудовкин" },
  { year: 1931, title: "Путёвка в жизнь", kind: "игровой", note: "первый советский звуковой фильм" },
  { year: 1931, title: "Дезертир", kind: "игровой", note: "Всеволод Пудовкин" },
  { year: 1932, title: "Горизонт", kind: "игровой", note: "Лев Кулешов" },
  { year: 1932, title: "Гибель сенсации", kind: "игровой", note: "фантастическая драма" },
  { year: 1932, title: "Чины и люди", kind: "игровой", note: "новеллы по Чехову" },
  { year: 1933, title: "Окраина", kind: "игровой", note: "Борис Барнет" },
  { year: 1933, title: "Праздник святого Йоргена", kind: "игровой", note: "комедия" },
  { year: 1933, title: "У самого синего моря", kind: "игровой", note: "Борис Барнет" },
  { year: 1934, title: "Три песни о Ленине", kind: "документальный", note: "Дзига Вертов" },
  { year: 1934, title: "Механика головного мозга", kind: "документальный", note: "научно-популярный фильм" },
  { year: 1934, title: "Ледолом", kind: "игровой", note: "драма" },
  { year: 1934, title: "Джульбарс", kind: "игровой", note: "приключенческий фильм" },
  { year: 1935, title: "Гармонь", kind: "игровой", note: "с музыкальным оформлением" },
  { year: 1935, title: "Конец полустанка", kind: "игровой", note: "драма" },
  { year: 1935, title: "Сказка о весёлом пастухе", kind: "мультфильм", note: "анимация" },
  { year: 1936, title: "Восстание рыбаков", kind: "игровой", note: "экранизация Анны Зегерс" },
  { year: 1936, title: "Борцы", kind: "игровой", note: "Межрабпомфильм / Рот-Фронт" },
  { year: 1936, title: "Дохунда", kind: "игровой", note: "последний период студии" },
  { year: 2002, title: "Лихов, 6", kind: "документальный", note: "Леонид Махнач; РЦСДФ" },
];

const timeline = [
  { year: "1901–1902", title: "Епархиальный дом", text: "Построен по проекту Петра Виноградова на земле Высоко-Петровского монастыря. В 1902 году освящен домовый Князь-Владимирский храм." },
  { year: "1917–1918", title: "Соборная палата", text: "В парадном зале заседал Поместный собор Русской церкви; здесь приняли решение о восстановлении патриаршества." },
  { year: "1930–1936", title: "Рот-Фронт", text: "Бывший Епархиальный дом перестроили под звуковую кинофабрику. Здесь работал Павел Тагер, а «Путёвка в жизнь» стала первым советским звуковым фильмом." },
  { year: "1940–1990-е", title: "ЦСДФ", text: "Центральная студия кинохроники, затем Центральная студия документальных фильмов выпускала киножурналы, фронтовую хронику и документальные фильмы." },
  { year: "2004–2015", title: "Возвращение", text: "Здание вернули Церкви для ПСТГУ. Исторический облик, купол, колокольню и интерьеры восстановили по архивным фотографиям." },
];

function Filmography() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"все" | FilmRecord["kind"]>("все");
  const filtered = useMemo(() => films.filter((film) => {
    const matchesQuery = `${film.title} ${film.year} ${film.note}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (kind === "все" || film.kind === kind);
  }), [query, kind]);
  return <section id="фильмография" className="filmography section-shell">
    <div className="section-heading"><div><span className="eyebrow">Кадр за кадром / 02</span><h2>Фильмография<br /><em>из Лихова</em></h2></div><p>Полный рабочий список названий, связанных с «Межрабпомфильмом» и его наследием. Адрес Лихов, 6 документирован для звуковой кинофабрики и ЦСДФ; не каждую картину можно подтвердить как снятую именно внутри здания.</p></div>
    <div className="film-tools"><label className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Найти фильм или год" aria-label="Найти фильм или год" /></label><div className="filter-row">{(["все", "игровой", "документальный", "мультфильм"] as const).map((item) => <button key={item} className={kind === item ? "filter active" : "filter"} onClick={() => setKind(item)}>{item}</button>)}</div></div>
    <div className="film-list">{filtered.map((film, index) => <article className="film-row" key={`${film.title}-${film.year}`}><span className="film-index">{String(index + 1).padStart(2, "0")}</span><span className="film-year">{film.year}</span><div className="film-title"><h3>{film.title}</h3><span>{film.note}</span></div><span className="film-kind">{film.kind}</span><ArrowUpRight size={17} className="film-arrow" /></article>)}</div>
    <p className="data-note">Составлено по перечню «Межрабпомфильма» и материалам Музея ЦСДФ. Для исследовательской публикации список следует дополнительно сверять с архивными фильмографическими каталогами.</p>
  </section>;
}

export default function Home() {
  return <main>
    <header className="site-nav"><a href="#top" className="wordmark"><img src={MARK} alt="Знак Лихов 6" /><span>ЛИХОВ <b>6</b></span></a><nav><a href="#история">История</a><a href="#фильмография">Фильмы</a><a href="#кинотеатр">Кинотеатр</a></nav><a className="nav-source" href="#источники">Источники <ArrowUpRight size={14} /></a></header>
    <section id="top" className="hero section-shell"><div className="hero-copy"><span className="eyebrow">Москва / Лихов переулок, 6</span><h1>Один адрес.<br /><em>Три жизни.</em></h1><p className="hero-lead">История дома, где духовное просвещение стало кинофабрикой, а кинопамять — частью архитектуры.</p><div className="hero-actions"><a className="button button-dark" href="#история">Смотреть хронику <ArrowDown size={16} /></a><a className="text-link" href="#фильмография">Открыть фильмографию <ArrowUpRight size={16} /></a></div></div><div className="hero-image-wrap"><div className="hero-image-label">Реконструкция / 1930-е</div><img className="hero-image" src={WATERCOLOUR} alt="Акварельная реконструкция здания на Лиховом переулке в эпоху кинофабрики" /><span className="hero-stamp">КАДР<br />01</span></div></section>
    <div className="ticker"><span>МЕЖРАБПОМФИЛЬМ</span><i>×</i><span>РОТ-ФРОНТ</span><i>×</i><span>ЦСДФ</span><i>×</i><span>ПСТГУ</span><i>×</i><span>МЕЖРАБПОМФИЛЬМ</span></div>
    <section id="история" className="history section-shell"><div className="section-heading"><div><span className="eyebrow">Монтаж времени / 01</span><h2>Дом, который<br /><em>перемонтировали</em></h2></div><p>Сначала — духовно-просветительский центр Московской епархии. Затем — советская кинофабрика и дом документальной хроники. Сегодня — университет и восстановленный памятник.</p></div><div className="timeline">{timeline.map((item, index) => <article className="timeline-item" key={item.year}><div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span><i /></div><div className="timeline-date">{item.year}</div><div className="timeline-content"><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>
    <section className="split-story section-shell"><div className="split-image"><img src={INTERIOR} alt="Акварельная реконструкция однозального кинотеатра внутри здания на Лиховом переулке" /><span className="image-caption">Концепт реконструкции / один зал</span></div><div className="split-copy"><span className="eyebrow">Кинотеатр «Лихов» / 03</span><h2>Не музей.<br /><em>Живой экран.</em></h2><p>На Лиховом не сохранился кинотеатр-прототип, который можно было бы восстановить по одному историческому чертежу. Поэтому концепция собирает реконструкцию из самого здания: пропорций Епархиального дома, памяти «Рот-Фронта», киножурнала ЦСДФ и камерной логики московской однозальной залы.</p><div className="spec-grid"><div><strong>01</strong><span>один экран</span></div><div><strong>240</strong><span>мест в зале</span></div><div><strong>16 mm</strong><span>архивный формат</span></div></div><a className="button button-red" href="#кинотеатр">Посмотреть концепцию <ArrowUpRight size={16} /></a></div></section>
    <section id="кинотеатр" className="cinema section-shell"><div className="cinema-top"><span className="eyebrow">Проект реконструкции / 2026</span><h2>Кинотеатр, который<br /><em>помнит пространство</em></h2><p>Гипотетическая реконструкция, а не утвержденный проект реставрации. Здесь восстановлена не буквальная утрата, а возможность снова смотреть кино в здании, которое его производило.</p></div><div className="cinema-plan"><div className="plan-label">ПЛАН / 1:200</div><div className="plan-box"><div className="screen">ЭКРАН</div><div className="aisle" /><div className="seats"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="projection">ПРОЕКЦИОННАЯ<br />КАМЕРА</div><div className="legend"><span><i className="red-dot" /> красная линия маршрута</span><span><i className="black-dot" /> исторический объем</span></div></div></div></section>
    <Filmography />
    <section id="источники" className="sources section-shell"><div><span className="eyebrow">Полевые заметки / 04</span><h2>Источники<br /><em>и границы знания</em></h2></div><div className="source-list"><a href="https://um.mos.ru/houses/moskovskiy-eparkhialnyy-dom/" target="_blank" rel="noreferrer"><BookOpen size={18} /><span><b>Узнай Москву</b><small>Департамент культурного наследия Москвы — архитектура, даты, реконструкция</small></span><ArrowUpRight size={16} /></a><a href="https://pstgu.ru/30let/activity/eparkhialnyy-dom/" target="_blank" rel="noreferrer"><BookOpen size={18} /><span><b>ПСТГУ / хроника дома</b><small>Официальная хронология строительства, кинофабрики и возвращения</small></span><ArrowUpRight size={16} /></a><a href="https://csdfmuseum.ru/articles/128-%D1%80%D0%BE%D0%B4%D0%BE%D0%BC-%D0%B8%D0%B7-%D0%9B%D0%B8%D1%85%D0%BE%D0%B2%D0%B0" target="_blank" rel="noreferrer"><Film size={18} /><span><b>Музей ЦСДФ</b><small>Воспоминания о Лиховом переулке, киножурналах и фильме «Лихов, 6»</small></span><ArrowUpRight size={16} /></a><a href="https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%80%D0%B0%D0%B1%D0%BF%D0%BE%D0%BC%D1%84%D0%B8%D0%BB%D1%8C%D0%BC" target="_blank" rel="noreferrer"><BookOpen size={18} /><span><b>Фильмография «Межрабпомфильма»</b><small>Сводный перечень студийных фильмов, использованный для каталога</small></span><ArrowUpRight size={16} /></a></div></section>
    <footer className="site-footer"><div className="wordmark footer-mark"><img src={MARK} alt="" /><span>ЛИХОВ <b>6</b></span></div><p>Исследовательский сайт о здании, кинопамяти и реконструкции.</p><span>2026 / Manus AI</span></footer>
  </main>;
}
