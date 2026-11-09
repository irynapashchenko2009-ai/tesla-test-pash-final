'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Zap,
  BatteryCharging,
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Radio,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

/* ------------------------------------------------------------------ */
/* Types & i18n dictionary                                            */
/* ------------------------------------------------------------------ */
type Lang = 'en' | 'ru'

interface ModalDict {
  title: string
  desc: string
  successTitle: string
  successKicker: string
  successBody: string
  name: string
  contact: string
  namePh: string
  contactPh: string
  submit: string
  close: string
  disclaimer: string
}

interface Dict {
  nav: { model: string; advantages: string; specs: string }
  orderBtn: string
  tagline: ReactNode
  specs: { value: string; label: string }[]
  priceLabel: string
  price: string
  orderNow: string
  testDrive: string
  priceNote: string
  advantages: { title: string; text: string }[]
  ticker: string[]
  modal: ModalDict
  aria: {
    main: string
    nav: string
    specs: string
    advantages: string
    ticker: string
    langToggle: string
  }
}

const I18N: Record<Lang, Dict> = {
  en: {
    nav: { model: 'MODEL', advantages: 'ADVANTAGES', specs: 'SPECS' },
    orderBtn: 'ORDER',
    tagline: (
      <>
        The electric predator from <span className="text-cyan-300">2077</span>.
        A thousand horsepower of pure energy — no gasoline, no emissions, no
        compromises. The city still sleeps —{' '}
        <span className="text-pink-400">it&apos;s already hunting</span>.
      </>
    ),
    specs: [
      { value: '2.1 s', label: '0–100 KM/H' },
      { value: '1,020', label: 'HP TRI MOTOR' },
      { value: '650 km', label: 'RANGE' },
      { value: '325 kW', label: 'SUPERCHARGER V4' },
    ],
    priceLabel: 'PRICE // FROM',
    price: '$89,990',
    orderNow: '▸ ORDER NOW',
    testDrive: 'TEST DRIVE 2077',
    priceNote: '* Prices valid for Neon City, 2077.',
    advantages: [
      {
        title: '2.1 S DYNAMICS',
        text: '0–100 km/h in 2.1 seconds. Tri Motor, 1,020 hp — faster than any ICE in Neon City.',
      },
      {
        title: '650 KM RANGE',
        text: 'Supercharger V4: 325 kW. Up to 250 km of range back in a 10-minute charge.',
      },
      {
        title: 'AUTOPILOT X',
        text: '8 cameras, 360° vision, 250 m radar reach. The car spots the risk — and kills it.',
      },
      {
        title: 'BIODEFENSE 5★',
        text: 'HEPA filter scrubs the cabin air in 2 minutes. Armor glass and a 5-star NHTSA rating.',
      },
    ],
    ticker: [
      'TESLA MODEL Ω',
      '0 CO₂ EMISSIONS',
      'AUTOPILOT X',
      'SUPERCHARGER V4',
      '1,020 HP',
      '0–100 IN 2.1 S',
      'FREE OTA UPDATES',
      'HEPA BIODEFENSE',
    ],
    modal: {
      title: 'ORDER // MODEL Ω',
      desc: 'FILL IN THE TRANSMITTER — WE’LL GET BACK ON YOUR CHANNEL',
      successTitle: 'ACCESS GRANTED',
      successKicker: 'REQUEST ACCEPTED, STREET KID',
      successBody:
        'A Neon City operator will contact you within 24 hours and lock in your Model Ω test drive.',
      name: 'PILOT NAME',
      contact: 'COMMS CHANNEL (EMAIL / PHONE)',
      namePh: 'E.g.: V',
      contactPh: 'v@nightcity.net',
      submit: '▸ TRANSMIT REQUEST',
      close: 'CLOSE CHANNEL',
      disclaimer:
        'By transmitting, you agree to Arasaka’s terms… oops, we meant Tesla’s.',
    },
    aria: {
      main: 'Tesla Model Ω — neon landing',
      nav: 'Main navigation',
      specs: 'Key specifications',
      advantages: 'Tesla Model Ω advantages',
      ticker: 'Advantages ticker',
      langToggle: 'Site language',
    },
  },
  ru: {
    nav: { model: 'МОДЕЛЬ', advantages: 'ПРЕИМУЩЕСТВА', specs: 'ХАРАКТЕРИСТИКИ' },
    orderBtn: 'ЗАКАЗАТЬ',
    tagline: (
      <>
        Электрический хищник из <span className="text-cyan-300">2077 года</span>
        . Тысяча лошадиных сил чистой энергии — без бензина, без выхлопа, без
        компромиссов. Город ещё спит —{' '}
        <span className="text-pink-400">он уже мчится</span>.
      </>
    ),
    specs: [
      { value: '2,1 с', label: '0–100 КМ/Ч' },
      { value: '1 020', label: 'Л.С. TRI MOTOR' },
      { value: '650 км', label: 'ЗАПАС ХОДА' },
      { value: '325 кВт', label: 'СУПЕРЗАРЯДКА V4' },
    ],
    priceLabel: 'ЦЕНА // ОТ',
    price: '$89 990',
    orderNow: '▸ ЗАКАЗАТЬ СЕЙЧАС',
    testDrive: 'ТЕСТ-ДРАЙВ 2077',
    priceNote: '* цены действительны для Неон-Сити, 2077 г.',
    advantages: [
      {
        title: 'ДИНАМИКА 2,1 С',
        text: '0–100 км/ч за 2,1 секунды. Tri Motor, 1 020 л.с. — быстрее любого ДВС в Неон-Сити.',
      },
      {
        title: 'ЗАПАС ХОДА 650 КМ',
        text: 'Суперзарядка V4: 325 кВт. До 250 км пробега за 10 минут зарядки.',
      },
      {
        title: 'AUTOPILOT X',
        text: '8 камер, обзор 360°, дальность радаров 250 м. Машина сама видит риск — и гасит его.',
      },
      {
        title: 'БИОЗАЩИТА 5★',
        text: 'HEPA-фильтр очищает воздух салона за 2 минуты. Бронестекло и 5 звёзд NHTSA.',
      },
    ],
    ticker: [
      'TESLA MODEL Ω',
      '0 ВЫБРОСОВ CO₂',
      'AUTOPILOT X',
      'СУПЕРЗАРЯДКА V4',
      '1 020 Л.С.',
      '0–100 ЗА 2,1 С',
      'БЕСПЛАТНЫЕ ОБНОВЛЕНИЯ ПО',
      'HEPA БИОЗАЩИТА',
    ],
    modal: {
      title: 'ЗАЯВКА // MODEL Ω',
      desc: 'ЗАПОЛНИ ПЕРЕДАТЧИК — МЫ ВЫЙДЕМ НА СВЯЗЬ',
      successTitle: 'ДОСТУП РАЗРЕШЁН',
      successKicker: 'ЗАЯВКА ПРИНЯТА, УЛИЧ',
      successBody:
        'Оператор Неон-Сити свяжется с тобой в течение 24 часов и закрепит тест-драйв Model Ω.',
      name: 'ИМЯ ПИЛОТА',
      contact: 'КАНАЛ СВЯЗИ (EMAIL / ТЕЛЕФОН)',
      namePh: 'Например: V',
      contactPh: 'v@nightcity.net',
      submit: '▸ ОТПРАВИТЬ ЗАЯВКУ',
      close: 'ЗАКРЫТЬ КАНАЛ',
      disclaimer:
        'Нажимая кнопку, ты соглашаешься с условиями Арасаки… ой, Tesla.',
    },
    aria: {
      main: 'Tesla Model Ω — неоновый лендинг',
      nav: 'Основная навигация',
      specs: 'Ключевые характеристики',
      advantages: 'Преимущества Tesla Model Ω',
      ticker: 'Бегущая строка преимуществ',
      langToggle: 'Язык сайта',
    },
  },
}

/* ------------------------------------------------------------------ */
/* Детерминированные частицы (без Math.random — нет рассинхрона SSR)  */
/* ------------------------------------------------------------------ */
const PARTICLES = [
  { left: '6%', size: 3, dur: 9, delay: 0, color: '#00f5ff' },
  { left: '14%', size: 2, dur: 12, delay: 2.5, color: '#ff2ec4' },
  { left: '23%', size: 4, dur: 8, delay: 1.2, color: '#b026ff' },
  { left: '31%', size: 2, dur: 11, delay: 4, color: '#00f5ff' },
  { left: '42%', size: 3, dur: 10, delay: 0.6, color: '#ff2ec4' },
  { left: '55%', size: 2, dur: 13, delay: 3.2, color: '#00f5ff' },
  { left: '63%', size: 4, dur: 9.5, delay: 5.1, color: '#b026ff' },
  { left: '71%', size: 2, dur: 12.5, delay: 1.8, color: '#ff2ec4' },
  { left: '80%', size: 3, dur: 10.5, delay: 0.2, color: '#00f5ff' },
  { left: '88%', size: 2, dur: 8.5, delay: 4.4, color: '#b026ff' },
  { left: '95%', size: 3, dur: 11.5, delay: 2.1, color: '#00f5ff' },
  { left: '48%', size: 2, dur: 14, delay: 6, color: '#ff2ec4' },
  { left: '36%', size: 3, dur: 9.8, delay: 7.2, color: '#f9f002' },
  { left: '76%', size: 2, dur: 13.5, delay: 3.7, color: '#f9f002' },
]

const ADVANTAGE_ICONS = [Zap, BatteryCharging, BrainCircuit, ShieldCheck]

const ADVANTAGE_STYLES = [
  {
    color: 'text-cyan-300',
    glow: 'shadow-[0_0_18px_rgba(0,245,255,0.65)]',
    border: 'border-cyan-400/50',
  },
  {
    color: 'text-pink-400',
    glow: 'shadow-[0_0_18px_rgba(255,46,196,0.65)]',
    border: 'border-pink-500/50',
  },
  {
    color: 'text-purple-300',
    glow: 'shadow-[0_0_18px_rgba(176,38,255,0.65)]',
    border: 'border-purple-500/50',
  },
  {
    color: 'text-yellow-300',
    glow: 'shadow-[0_0_18px_rgba(249,240,2,0.5)]',
    border: 'border-yellow-400/50',
  },
]

function TickerContent({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span
          key={item}
          className="mx-6 inline-flex items-center gap-6 whitespace-nowrap"
        >
          <span className="text-cyan-300/90">{item}</span>
          <span className="text-pink-500">◆</span>
        </span>
      ))}
    </>
  )
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [orderOpen, setOrderOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const t = I18N[lang]

  /* Восстановить выбор языка и синхронизировать <html lang> */
  useEffect(() => {
    const saved = window.localStorage.getItem('tesla-lang')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- восстановление выбора языка после гидрации (как в next-themes)
    if (saved === 'ru' || saved === 'en') setLang(saved)
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem('tesla-lang', lang)
  }, [lang])

  const openOrder = () => {
    setSent(false)
    setOrderOpen(true)
  }

  return (
    <main
      className="scanlines relative min-h-dvh w-full overflow-y-auto bg-[#03010a] text-white lg:h-dvh lg:overflow-hidden"
      aria-label={t.aria.main}
    >
      {/* ================= ФОНОВЫЕ СЛОИ ================= */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* неоновые пятна */}
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-pink-600/15 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-purple-600/15 blur-[120px]" />
        {/* сетка-перспектива */}
        <div className="grid-floor absolute inset-x-[-20%] bottom-[-6%] h-[52%]" />
        {/* восходящие частицы */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle bottom-[-12px]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      {/* CRT-виньетка поверх всего */}
      <div
        aria-hidden
        className="crt-vignette pointer-events-none absolute inset-0 z-40"
      />

      {/* ================= ВЕРТИКАЛЬНЫЕ ДЕКОРИ ================= */}
      <span
        aria-hidden
        className="font-cyber absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 text-[10px] tracking-[0.5em] text-cyan-400/40 xl:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        NEON.DRIVE // SECTOR-07
      </span>
      <span
        aria-hidden
        className="font-cyber absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rotate-180 text-[10px] tracking-[0.5em] text-pink-500/40 xl:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        EST. 2077 // NIGHT CITY
      </span>

      {/* ================= КОНТЕНТ ================= */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 lg:h-dvh lg:px-10">
        {/* ---------- HEADER ---------- */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-cyan-400/25">
          <a
            href="#"
            className="flex items-center gap-2"
            aria-label="Tesla Model Ω"
          >
            <span className="btn-neon-pink rounded border border-pink-500/70 bg-pink-500/10 p-1.5">
              <Zap className="h-4 w-4 text-pink-400" aria-hidden />
            </span>
            <span className="font-display flicker text-lg font-black tracking-[0.35em] neon-cyan">
              TESLA
            </span>
          </a>
          <nav
            className="font-cyber hidden items-center gap-7 text-[11px] tracking-[0.3em] text-cyan-200/70 md:flex"
            aria-label={t.aria.nav}
          >
            <a href="#" className="transition hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.9)]">
              {t.nav.model}
            </a>
            <a href="#" className="transition hover:text-pink-400 hover:drop-shadow-[0_0_6px_rgba(255,46,196,0.9)]">
              {t.nav.advantages}
            </a>
            <a href="#" className="transition hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.9)]">
              {t.nav.specs}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {/* Переключатель языка */}
            <div
              className="font-cyber flex overflow-hidden rounded border border-cyan-400/50 text-[10px] font-bold tracking-[0.15em]"
              role="group"
              aria-label={t.aria.langToggle}
            >
              <button
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2.5 py-1.5 transition ${
                  lang === 'en'
                    ? 'bg-cyan-400/25 text-cyan-200 drop-shadow-[0_0_6px_rgba(0,245,255,0.8)]'
                    : 'text-slate-500 hover:text-cyan-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ru')}
                aria-pressed={lang === 'ru'}
                className={`px-2.5 py-1.5 transition ${
                  lang === 'ru'
                    ? 'bg-pink-500/25 text-pink-300 drop-shadow-[0_0_6px_rgba(255,46,196,0.8)]'
                    : 'text-slate-500 hover:text-pink-400'
                }`}
              >
                RU
              </button>
            </div>
            <button
              onClick={openOrder}
              className="font-cyber btn-neon-pink rounded border border-pink-500/80 bg-pink-500/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-pink-300 transition hover:bg-pink-500/25"
            >
              {t.orderBtn}
            </button>
          </div>
        </header>

        {/* ---------- HERO ---------- */}
        <section className="grid flex-1 min-h-0 items-center gap-4 py-4 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
          {/* Левая колонка */}
          <div className="min-w-0">
            <p className="font-cyber mb-2 flex items-center gap-2 text-[10px] tracking-[0.35em] text-cyan-400/80 sm:text-[11px]">
              <span className="blink-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
              [ SYS.BOOT // NEON-DRIVE v4.0 ]
            </p>

            <h1 className="font-russo mb-3 text-4xl leading-none sm:text-5xl xl:text-6xl">
              <span className="text-white/90">MODEL</span>{' '}
              <span
                className="glitch neon-pink font-cyber text-5xl font-bold sm:text-6xl xl:text-7xl"
                data-text="Ω"
              >
                Ω
              </span>
            </h1>

            <p className="mb-4 max-w-md text-sm leading-relaxed text-slate-300/85 sm:text-[15px]">
              {t.tagline}
            </p>

            {/* Спец-чипы */}
            <ul className="mb-5 flex flex-wrap gap-2" aria-label={t.aria.specs}>
              {t.specs.map((s) => (
                <li
                  key={s.label}
                  className="neon-frame rounded border border-cyan-400/40 bg-cyan-500/5 px-3 py-1.5"
                >
                  <span className="font-cyber block text-sm font-bold text-cyan-300 sm:text-base">
                    {s.value}
                  </span>
                  <span className="font-cyber block text-[9px] tracking-[0.2em] text-cyan-200/60">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Цена + CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="font-cyber block text-[10px] tracking-[0.3em] text-slate-400">
                  {t.priceLabel}
                </span>
                <span className="font-russo neon-pink text-2xl">{t.price}</span>
              </div>
              <button
                onClick={openOrder}
                className="font-cyber btn-neon-pink rounded border border-pink-500 bg-pink-500/20 px-6 py-3 text-xs font-bold tracking-[0.25em] text-pink-200 transition hover:bg-pink-500/35"
              >
                {t.orderNow}
              </button>
              <button
                onClick={openOrder}
                className="font-cyber btn-neon-cyan rounded border border-cyan-400 bg-cyan-400/10 px-6 py-3 text-xs font-bold tracking-[0.25em] text-cyan-200 transition hover:bg-cyan-400/20"
              >
                {t.testDrive}
              </button>
            </div>
            <p className="font-cyber mt-3 text-[9px] tracking-[0.15em] text-slate-500">
              {t.priceNote}
            </p>
          </div>

          {/* Правая колонка — машина в HUD-рамке */}
          <div className="relative min-w-0">
            {/* HUD-уголки */}
            <span aria-hidden className="absolute -left-2 -top-2 z-10 h-5 w-5 border-l-2 border-t-2 border-cyan-400" />
            <span aria-hidden className="absolute -right-2 -top-2 z-10 h-5 w-5 border-r-2 border-t-2 border-cyan-400" />
            <span aria-hidden className="absolute -bottom-2 -left-2 z-10 h-5 w-5 border-b-2 border-l-2 border-pink-500" />
            <span aria-hidden className="absolute -bottom-2 -right-2 z-10 h-5 w-5 border-b-2 border-r-2 border-pink-500" />

            <div className="float-slow neon-frame relative aspect-[7/4] w-full overflow-hidden rounded border border-cyan-400/60 bg-black/60">
              <img
                src="/tesla-neon.png"
                alt="Tesla Model Ω concept in a neon cyberpunk city"
                className="h-full w-full object-cover"
              />
              {/* затемнение снизу */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#03010a]/85 via-transparent to-transparent"
              />
              {/* HUD-подписи */}
              <div className="font-cyber absolute left-3 top-2.5 flex items-center gap-2 text-[10px] tracking-[0.2em] text-cyan-300/90">
                <Radio className="h-3 w-3 animate-pulse" aria-hidden />
                SYS.CAR // MODEL-Ω
              </div>
              <div className="font-cyber absolute right-3 top-2.5 flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-pink-400">
                <span className="blink-dot inline-block h-1.5 w-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ff2ec4]" />
                ONLINE
              </div>
              <div className="font-cyber absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[9px] tracking-[0.15em] text-cyan-200/80 sm:text-[10px]">
                <MapPin className="h-3 w-3 shrink-0 text-pink-400" aria-hidden />
                <span className="whitespace-nowrap">37.4419° N, 122.1430° W</span>
                <span className="hidden sm:inline">{'// PALO ALTO GRID'}</span>
              </div>
              <div className="font-cyber absolute bottom-2.5 right-3 hidden text-[10px] tracking-[0.2em] text-pink-400/80 sm:block">
                PWR: 100% ⚡
              </div>
            </div>
          </div>
        </section>

        {/* ---------- ПРЕИМУЩЕСТВА ---------- */}
        <section
          className="grid shrink-0 grid-cols-2 gap-3 pb-3 lg:grid-cols-4"
          aria-label={t.aria.advantages}
        >
          {t.advantages.map((a, i) => {
            const Icon = ADVANTAGE_ICONS[i]
            const st = ADVANTAGE_STYLES[i]
            return (
              <article
                key={a.title}
                className="card-neon rounded border border-cyan-400/30 p-3 sm:p-4"
              >
                <div className="mb-2 flex items-center gap-2.5">
                  <span className={`rounded border ${st.border} bg-black/60 p-1.5 ${st.glow}`}>
                    <Icon className={`h-4 w-4 ${st.color}`} aria-hidden />
                  </span>
                  <h2 className={`font-russo text-[13px] sm:text-sm ${st.color}`}>
                    {a.title}
                  </h2>
                </div>
                <p className="text-[11px] leading-snug text-slate-300/80 sm:text-xs">
                  {a.text}
                </p>
              </article>
            )
          })}
        </section>

        {/* ---------- БЕГУЩАЯ СТРОКА ---------- */}
        <footer
          className="relative mb-0 shrink-0 overflow-hidden border-t border-cyan-400/30 bg-black/70 py-1.5 lg:mb-0"
          aria-label={t.aria.ticker}
        >
          <div className="marquee-track font-cyber text-[10px] tracking-[0.3em] lg:text-[11px]">
            <TickerContent items={t.ticker} />
            <TickerContent items={t.ticker} />
          </div>
        </footer>
      </div>

      {/* ================= МОДАЛКА ЗАКАЗА ================= */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent
          className="neon-frame border-cyan-400/60 bg-[#070312] p-6 sm:max-w-md"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="mb-2">
            <DialogTitle className="font-russo neon-cyan text-xl tracking-wider">
              {sent ? t.modal.successTitle : t.modal.title}
            </DialogTitle>
            <DialogDescription className="font-cyber text-xs tracking-[0.15em] text-slate-400">
              {sent ? 'CONNECTING // NIGHT CITY GRID' : t.modal.desc}
            </DialogDescription>
          </DialogHeader>

          {sent ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2
                className="h-14 w-14 text-cyan-300 drop-shadow-[0_0_14px_rgba(0,245,255,0.9)]"
                aria-hidden
              />
              <p className="font-cyber text-sm tracking-[0.2em] text-cyan-200">
                {t.modal.successKicker}
              </p>
              <p className="text-xs text-slate-400">{t.modal.successBody}</p>
              <button
                onClick={() => setOrderOpen(false)}
                className="font-cyber btn-neon-cyan mt-2 rounded border border-cyan-400 bg-cyan-400/10 px-6 py-2.5 text-[11px] font-bold tracking-[0.25em] text-cyan-200 transition hover:bg-cyan-400/20"
              >
                {t.modal.close}
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="pilot-name"
                  className="font-cyber mb-1.5 block text-[10px] tracking-[0.25em] text-cyan-300/80"
                >
                  {t.modal.name}
                </label>
                <input
                  id="pilot-name"
                  required
                  placeholder={t.modal.namePh}
                  className="font-cyber w-full rounded border border-cyan-400/40 bg-black/60 px-3 py-2.5 text-sm text-cyan-100 placeholder:text-slate-600 focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
                />
              </div>
              <div>
                <label
                  htmlFor="pilot-contact"
                  className="font-cyber mb-1.5 block text-[10px] tracking-[0.25em] text-cyan-300/80"
                >
                  {t.modal.contact}
                </label>
                <input
                  id="pilot-contact"
                  required
                  placeholder={t.modal.contactPh}
                  className="font-cyber w-full rounded border border-cyan-400/40 bg-black/60 px-3 py-2.5 text-sm text-cyan-100 placeholder:text-slate-600 focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
                />
              </div>
              <button
                type="submit"
                className="font-cyber btn-neon-pink mt-1 w-full rounded border border-pink-500 bg-pink-500/20 px-6 py-3 text-xs font-bold tracking-[0.3em] text-pink-200 transition hover:bg-pink-500/35"
              >
                {t.modal.submit}
              </button>
              <p className="font-cyber text-center text-[9px] leading-relaxed tracking-[0.1em] text-slate-500">
                {t.modal.disclaimer}
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
