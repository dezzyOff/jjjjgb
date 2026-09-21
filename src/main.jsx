import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const iconPaths = {
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  bot: 'M12 8V4H8M8 4h8M6 12h.01M18 12h.01M7 16h10M5 8h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z',
  clock: 'M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  message: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  credit: 'M2 5h20v14H2zM2 10h20M6 15h4',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.02 1.56V20h-2.55v-.1a1.7 1.7 0 0 0-1.02-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.56-1.02H6.4v-2.55h.14A1.7 1.7 0 0 0 8.1 10.4a1.7 1.7 0 0 0-.34-1.88L7.7 8.46l1.8-1.8.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.02-1.56V5h2.55v.5a1.7 1.7 0 0 0 1.02 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.02H21v2.55h-.1A1.7 1.7 0 0 0 19.4 15z',
  plus: 'M12 5v14M5 12h14',
  chevron: 'M6 9l6 6 6-6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  search: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.35-4.35',
  copy: 'M9 9h10v10H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  check: 'M20 6L9 17l-5-5',
  close: 'M18 6L6 18M6 6l12 12',
  lock: 'M6 10V7a6 6 0 0 1 12 0v3M5 10h14v10H5z',
  logout: 'M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5',
  spark: 'M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z'
};

function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d={iconPaths[name] || iconPaths.grid} /></svg>;
}

const baseAccountSeed = {
    status: 'Active', statusTone: 'green', plan: 'Pro workspace', lastActive: '2 min ago',
    messages: '1,248', conversations: '86', responseRate: '94.2%', responseTime: '1m 42s',
    ai: { enabled: true, model: 'Lumen Pro', tone: 'Warm & concise', language: 'English', emojis: true, fallback: true },
    prompt: 'You are Nora’s thoughtful AI assistant. Be warm, direct, and helpful. Keep replies conversational and never claim to be human. Ask one clarifying question when context is missing.',
    timing: { start: '08:00', end: '22:00', delay: '30–90 seconds', timezone: 'UTC+0', activeDays: [true, true, true, true, true, false, false] },
    prices: [
      { id: 1, title: 'Standard consultation', description: '30 minute async consultation', amount: '49.00', currency: 'USD', status: 'Active' },
      { id: 2, title: 'Priority response', description: 'Same-day detailed response', amount: '89.00', currency: 'USD', status: 'Active' }
    ],
    cards: [], cryptoWallets: []
};

const mockAccounts = [
  {
    ...baseAccountSeed,
    id: 'nora', name: 'Nora Mitchell', username: '@nora_mitchell', initials: 'NM', tone: 'violet',
    enabled: true, lastActive: '2 min ago', messages: '1,248', responseRate: '94.2%',
    ai: { enabled: true, model: 'Lumen Pro', tone: 'Warm & concise', language: 'English', emojis: true, fallback: true },
    prompt: 'You are Nora’s thoughtful AI assistant. Be warm, direct, and helpful. Keep replies conversational and never claim to be human. Ask one clarifying question when context is missing.',
    timing: { start: '08:00', end: '22:00', delay: '30–90 seconds', timezone: 'UTC+0', activeDays: [true, true, true, true, true, false, false] },
    prices: [
      { id: 1, title: 'Standard consultation', description: '30 minute async consultation', amount: '49.00', currency: 'USD', status: 'Active' },
      { id: 2, title: 'Priority support', description: 'Dedicated response window for VIP clients', amount: '89.00', currency: 'USD', status: 'Active' }
    ]
  },
  {
    ...baseAccountSeed,
    id: 'elena', name: 'Elena Petrova', username: '@elena_petrova', initials: 'EP', tone: 'blue',
    enabled: true, lastActive: '8 min ago', messages: '986', responseRate: '91.8%',
    ai: { enabled: true, model: 'Lumen Plus', tone: 'Professional & calm', language: 'Russian', emojis: false, fallback: true },
    prompt: 'You are Elena’s assistant for sales and client support. Answer in Russian, remain polite and concise, and never promise unavailable outcomes.',
    timing: { start: '09:00', end: '21:00', delay: '20–60 seconds', timezone: 'UTC+3', activeDays: [true, true, true, true, true, true, false] },
    prices: [
      { id: 1, title: 'Strategy call', description: 'Short business strategy session', amount: '120.00', currency: 'USD', status: 'Active' },
      { id: 2, title: 'Lead qualification', description: 'Fast qualification and routing', amount: '69.00', currency: 'USD', status: 'Active' },
      { id: 3, title: 'VIP follow-up', description: 'Priority SLA for hot leads', amount: '150.00', currency: 'EUR', status: 'Paused' }
    ]
  },
  {
    ...baseAccountSeed,
    id: 'mikhail', name: 'Mikhail Orlov', username: '@mikhail_orlov', initials: 'MO', tone: 'mint',
    enabled: true, lastActive: '24 min ago', messages: '742', responseRate: '89.6%',
    ai: { enabled: false, model: 'Lumen Standard', tone: 'Direct & brief', language: 'English', emojis: true, fallback: false },
    prompt: 'You are Mikhail’s operational assistant. Prioritize speed, keep replies brief, and route complex issues to a human team member.',
    timing: { start: '07:00', end: '19:00', delay: '45–120 seconds', timezone: 'UTC+1', activeDays: [true, true, true, true, true, true, true] },
    prices: [
      { id: 1, title: 'Fast support', description: 'Quick consultation for active clients', amount: '39.00', currency: 'USD', status: 'Active' },
      { id: 2, title: 'Omnichannel setup', description: 'Setup and configuration package', amount: '199.00', currency: 'USD', status: 'Draft' }
    ]
  },
  {
    ...baseAccountSeed,
    id: 'sofia', name: 'Sofia Volkova', username: '@sofia_volkova', initials: 'SV', tone: 'peach',
    enabled: false, lastActive: '1 h ago', messages: '514', responseRate: '86.4%',
    ai: { enabled: false, model: 'Lumen Care', tone: 'Warm & supportive', language: 'Russian', emojis: true, fallback: true },
    prompt: 'You are Sofia’s customer care assistant. Be empathetic, patient, and helpful; avoid making decisions without good context.',
    timing: { start: '10:00', end: '23:00', delay: '60–180 seconds', timezone: 'UTC+2', activeDays: [true, true, true, true, true, false, false] },
    prices: [
      { id: 1, title: 'Care plan', description: 'Monthly support subscription', amount: '79.00', currency: 'USD', status: 'Active' },
      { id: 2, title: 'Premium onboarding', description: 'Extended onboarding for new clients', amount: '240.00', currency: 'EUR', status: 'Active' }
    ]
  }
];

const navGroups = [
  { label: 'Рабочее пространство', items: [{ key: 'dashboard', label: 'Обзор', icon: 'grid' }, { key: 'accounts', label: 'Аккаунты', icon: 'users' }, { key: 'pricing', label: 'Чеки', icon: 'credit' }] },
  { label: 'Автоматизация', items: [{ key: 'timing-settings', label: 'Расписание аккаунтов', icon: 'clock' }, { key: 'payment-cards', label: 'Кошельки', icon: 'credit' }] },
  { label: 'Настройки и биллинг', items: [{ key: 'tariffs', label: 'Тарифы', icon: 'credit' }, { key: 'settings', label: 'Общие настройки', icon: 'settings' }] }
];

const bankCatalog = [
  { name: 'Тестовый банк', country: 'Россия', countryCode: 'RU' },
  { name: 'Сбербанк', country: 'Россия', countryCode: 'RU' },
  { name: 'Т-Банк', country: 'Россия', countryCode: 'RU' },
  { name: 'Альфа-Банк', country: 'Россия', countryCode: 'RU' },
  { name: 'ВТБ', country: 'Россия', countryCode: 'RU' },
  { name: 'Газпромбанк', country: 'Россия', countryCode: 'RU' },
  { name: 'Райффайзенбанк', country: 'Россия', countryCode: 'RU' },
  { name: 'Kaspi Bank', country: 'Казахстан', countryCode: 'KZ' },
  { name: 'Halyk Bank', country: 'Казахстан', countryCode: 'KZ' },
  { name: 'Беларусбанк', country: 'Беларусь', countryCode: 'BY' },
  { name: 'Revolut', country: 'Великобритания', countryCode: 'GB' }
];

const binCatalog = [
  { prefix: '424242', bank: 'Тестовый банк', country: 'Россия', countryCode: 'RU' },
  { prefix: '427601', bank: 'Сбербанк', country: 'Россия', countryCode: 'RU' },
  { prefix: '546907', bank: 'Сбербанк', country: 'Россия', countryCode: 'RU' },
  { prefix: '437773', bank: 'Т-Банк', country: 'Россия', countryCode: 'RU' },
  { prefix: '521324', bank: 'Т-Банк', country: 'Россия', countryCode: 'RU' },
  { prefix: '548673', bank: 'Альфа-Банк', country: 'Россия', countryCode: 'RU' },
  { prefix: '444111', bank: 'Альфа-Банк', country: 'Россия', countryCode: 'RU' },
  { prefix: '489049', bank: 'ВТБ', country: 'Россия', countryCode: 'RU' },
  { prefix: '220024', bank: 'Сбербанк', country: 'Россия', countryCode: 'RU' }
];

const countryOptions = [
  { name: 'Россия', code: 'RU' },
  { name: 'Казахстан', code: 'KZ' },
  { name: 'Украина', code: 'UA' },
  { name: 'Беларусь', code: 'BY' },
  { name: 'Польша', code: 'PL' }
];

const pageMeta = {
  dashboard: ['Обзор', 'Вот что происходит в вашем Telegram workspace.'],
  accounts: ['Аккаунты', 'Управляйте аккаунтами Telegram, используемыми для доступа к TelePilot.'],
  'account-details': ['Детали аккаунта', 'Управляйте данными, подключением и настройками рабочей области.'],
  'timing-settings': ['Расписание аккаунтов', 'Настройте автоматическое включение и выключение аккаунтов.'],
  pricing: ['Чеки', 'История оплат от клиентов и собранных платежей.'],
  tariffs: ['Тарифы', 'Выберите план для вашего Telegram workspace.'],
  'payment-cards': ['Кошельки', 'Управляйте банковскими картами и криптокошельками workspace.'],
  settings: ['Общие настройки', 'Поддерживайте настройки рабочей области в актуальном состоянии.']
};

const timeZoneOptions = [
  { value: 'UTC-12', label: 'UTC−12 (Пиратское время)' },
  { value: 'UTC-11', label: 'UTC−11 (Американское Самоа)' },
  { value: 'UTC-10', label: 'UTC−10 (Гавайи)' },
  { value: 'UTC-9', label: 'UTC−9 (Аляска)' },
  { value: 'UTC-8', label: 'UTC−8 (Тихоокеанское время)' },
  { value: 'UTC-7', label: 'UTC−7 (США / Мексика)' },
  { value: 'UTC-6', label: 'UTC−6 (Центральное время)' },
  { value: 'UTC-5', label: 'UTC−5 (Восточное время)' },
  { value: 'UTC-4', label: 'UTC−4 (Атлантическое время)' },
  { value: 'UTC-3', label: 'UTC−3 (Рио-де-Жанейро)' },
  { value: 'UTC-2', label: 'UTC−2 (Среднеатлантическое время)' },
  { value: 'UTC-1', label: 'UTC−1 (Азорские острова)' },
  { value: 'UTC+0', label: 'UTC+0 (Лондон, Лиссабон)' },
  { value: 'UTC+1', label: 'UTC+1 (Берлин, Париж)' },
  { value: 'UTC+2', label: 'UTC+2 (Киев, Афины)' },
  { value: 'UTC+3', label: 'UTC+3 (Москва, Санкт-Петербург)' },
  { value: 'UTC+4', label: 'UTC+4 (Самара, Дубай)' },
  { value: 'UTC+5', label: 'UTC+5 (Екатеринбург, Ташкент)' },
  { value: 'UTC+6', label: 'UTC+6 (Омск, Алматы)' },
  { value: 'UTC+7', label: 'UTC+7 (Красноярск, Бангкок)' },
  { value: 'UTC+8', label: 'UTC+8 (Улан-Удэ, Сингапур)' },
  { value: 'UTC+9', label: 'UTC+9 (Токио, Сеул)' },
  { value: 'UTC+10', label: 'UTC+10 (Сидней, Гуам)' },
  { value: 'UTC+11', label: 'UTC+11 (Соломоновы острова)' },
  { value: 'UTC+12', label: 'UTC+12 (Фиджи, Веллингтон)' },
  { value: 'UTC+13', label: 'UTC+13 (Новая Зеландия)' },
  { value: 'UTC+14', label: 'UTC+14 (Линия перемены дат)' }
];

function getTimezoneOffsetMinutes(timezoneValue) {
  const match = /^UTC([+-])(\d{1,2})(?::?(\d{2}))?$/.exec(timezoneValue || 'UTC+0');
  if (!match) return 0;
  const sign = match[1] === '+' ? 1 : -1;
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  return sign * (hours * 60 + minutes);
}

function formatCurrentTimeForTimezone(timezoneValue) {
  const reference = getTimezoneOffsetMinutes(timezoneValue);
  const date = new Date();
  const utcNow = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  );
  const localMs = utcNow + reference * 60 * 1000;
  const zoned = new Date(localMs);
  return zoned.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' });
}

const currencyOptions = [
  { value: 'USD', label: 'USD — доллар США' },
  { value: 'EUR', label: 'EUR — евро' },
  { value: 'RUB', label: 'RUB — российский рубль' },
  { value: 'BYN', label: 'BYN — белорусский рубль' },
  { value: 'UAH', label: 'UAH — украинская гривна' }
];

const currencyRatesToUsd = { USD: 1, EUR: 1.09, RUB: 0.011, BYN: 0.31, UAH: 0.024 };

function convertCurrency(amount, fromCurrency, toCurrency) {
  const numericAmount = Number(amount) || 0;
  if (fromCurrency === toCurrency) return numericAmount;
  return numericAmount * (currencyRatesToUsd[fromCurrency] || 1) / (currencyRatesToUsd[toCurrency] || 1);
}

function formatMoney(amount, currency, displayCurrency = currency) {
  const symbols = { USD: '$', EUR: '€', RUB: '₽', BYN: 'Br', UAH: '₴' };
  const convertedAmount = convertCurrency(amount, currency, displayCurrency);
  return `${symbols[displayCurrency] || displayCurrency} ${convertedAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getLocalDateTimeInputValue() {
  const now = new Date();
  const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localTime.toISOString().slice(0, 16);
}

const receiptPeriodOptions = [
  { value: 'all', label: 'Весь период' },
  { value: 'today', label: 'Сегодня' },
  { value: 'yesterday', label: 'Вчера' },
  { value: '7days', label: 'Последние 7 дней' },
  { value: '30days', label: 'Последние 30 дней' },
  { value: 'custom', label: 'Выбранная дата' }
];

function isReceiptInPeriod(dateValue, period, selectedDate) {
  if (period === 'all') return true;
  const today = new Date();
  const date = new Date(dateValue);
  if (period === 'custom') {
    if (!selectedDate) return false;
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return dateKey === selectedDate;
  }
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDifference = Math.round((startOfToday - startOfDate) / 86400000);
  if (period === 'today') return dayDifference === 0;
  if (period === 'yesterday') return dayDifference === 1;
  if (period === '7days') return dayDifference >= 0 && dayDifference < 7;
  if (period === '30days') return dayDifference >= 0 && dayDifference < 30;
  return true;
}

function Avatar({ account, size = 'md' }) {
  return <div className={`avatar ${account.tone || account} ${size}`}>{account.initials || account}</div>;
}

function Button({ children, variant = 'primary', icon, onClick, type = 'button', className = '', disabled = false }) {
  return <button type={type} disabled={disabled} className={`button ${variant} ${className}`} onClick={onClick}>{icon && <Icon name={icon} size={16} />}{children}</button>;
}

function StatusPill({ label, tone = 'green' }) { return <span className={`status-pill ${tone}`}><span className="status-dot" />{label}</span>; }

function Toggle({ checked, onChange, label }) {
  return <button type="button" aria-label={label} aria-pressed={checked} className={`toggle ${checked ? 'on' : ''}`} onClick={() => onChange(!checked)}><span /></button>;
}

function Modal({ title, subtitle, children, onClose, wide = false }) {
  useEffect(() => {
    const handler = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className={`modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-head"><div><h2 id="modal-title">{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button></div>
      {children}
    </section>
  </div>;
}

function Field({ label, value, onChange, placeholder, type = 'text', error, children, onFocus }) {
  return <label className="field"><span>{label}</span>{children || <input type={type} value={value} onChange={(event) => onChange?.(event.target.value)} onFocus={onFocus} placeholder={placeholder} />}{error && <small className="error">{error}</small>}</label>;
}

function TimeSelect({ label, value, onChange }) {
  const [hour = '00', minute = '00'] = (value || '00:00').split(':');
  const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, '0'));
  const update = (nextHour, nextMinute) => onChange(`${nextHour}:${nextMinute}`);

  return <label className="field"><span>{label}</span><div className="time-select-group"><select aria-label={`${label}: часы`} value={hour} onChange={(event) => update(event.target.value, minute)}>{hours.map((item) => <option key={item} value={item}>{item}</option>)}</select><span>:</span><select aria-label={`${label}: минуты`} value={minute} onChange={(event) => update(hour, event.target.value)}>{minutes.map((item) => <option key={item} value={item}>{item}</option>)}</select></div></label>;
}

function EmptyState({ icon = 'message', title, description, action }) {
  return <div className="empty-state"><div className="empty-icon"><Icon name={icon} size={24} /></div><h3>{title}</h3><p>{description}</p>{action}</div>;
}

function App() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const loginAccountId = mockAccounts[0]?.id;
  const managedAccounts = accounts.filter((item) => item.id !== loginAccountId);
  const [selectedAccountId, setSelectedAccountId] = useState(mockAccounts[1]?.id);
  const [page, setPage] = useState(window.location.pathname.slice(1) || 'dashboard');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState('USD');
  const [balanceRub, setBalanceRub] = useState(2450);

  const account = managedAccounts.find((item) => item.id === selectedAccountId) ?? managedAccounts[0];
  const currentSection = navGroups.find((group) => group.items.some((item) => item.key === page))?.label || 'Рабочее пространство';
  const updateAccount = (patch) => setAccounts((items) => items.map((item) => item.id === selectedAccountId ? { ...item, ...patch } : item));
  const updateAI = (patch) => updateAccount({ ai: { ...account.ai, ...patch } });
  const updateTiming = (patch) => updateAccount({ timing: { ...account.timing, ...patch } });
  const toggleAccount = (id) => setAccounts((items) => items.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item));
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };
  const navigate = (next) => { setPage(next); window.history.pushState({}, '', `/${next === 'dashboard' ? '' : next}`); setMobileNav(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  useEffect(() => {
    const onPop = () => setPage(window.location.pathname.slice(1) || 'dashboard');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const isAuth = ['login', 'registration', 'forgot-password'].includes(page);
  if (isAuth) return <AuthPage type={page} onNavigate={navigate} />;

  return <div className="app-shell">
    <Sidebar page={page} navigate={navigate} account={account} loginAccount={accounts.find((item) => item.id === loginAccountId)} mobileNav={mobileNav} setMobileNav={setMobileNav} />
    <main className="main-content">
      <header className="topbar">
        <button className="mobile-menu icon-button" onClick={() => setMobileNav(true)} aria-label="Открыть навигацию"><Icon name="grid" /></button>
        <div className="breadcrumb">{page === 'account-details' ? <><span>Рабочее пространство</span><Icon name="arrow" size={13} /><span>Аккаунты</span><Icon name="arrow" size={13} /><strong>{account?.name || 'Аккаунт'}</strong></> : <><span>{currentSection}</span><Icon name="arrow" size={13} /><strong>{pageMeta[page]?.[0] || 'Обзор'}</strong></>}</div>
        <div className="topbar-actions"><button className="balance-trigger" type="button" onClick={() => navigate('tariffs')} aria-label="Открыть тарифы и баланс"><span>Баланс</span><strong>{formatMoney(balanceRub, 'RUB', displayCurrency)}</strong></button><Avatar account={{ initials: 'VL', tone: 'violet' }} size="sm" /></div>
      </header>
      <div className="content-wrap">
        {page === 'dashboard' && <Dashboard account={account} accounts={managedAccounts} profileName={accounts.find((item) => item.id === loginAccountId)?.name || 'Владислав'} navigate={navigate} notify={notify} onSelectAccount={(id) => setSelectedAccountId(id)} />}
        {page === 'accounts' && <AccountsPage account={account} accounts={managedAccounts} selectedAccountId={selectedAccountId} navigate={navigate} setModal={setModal} notify={notify} toggleAccount={toggleAccount} onSelectAccount={(id) => { setSelectedAccountId(id); navigate('account-details'); }} />}
        {page === 'account-details' && <AccountDetails account={account} updateAccount={updateAccount} notify={notify} />}
        {page === 'timing-settings' && <TimingSettings account={account} updateTiming={updateTiming} notify={notify} />}
        {page === 'pricing' && <ReceiptsPageV4 account={account} accounts={managedAccounts} displayCurrency={displayCurrency} setModal={setModal} notify={notify} />}
        {page === 'tariffs' && <TariffsPageV3 displayCurrency={displayCurrency} balanceRub={balanceRub} notify={notify} onOpenTopUp={() => setModal({ type: 'top-up' })} />}
        {page === 'payment-cards' && <WalletsPage account={account} updateAccount={updateAccount} setModal={setModal} notify={notify} />}
        {page === 'settings' && <WorkspaceSettingsPageV3 displayCurrency={displayCurrency} setDisplayCurrency={setDisplayCurrency} notify={notify} />}
      </div>
    </main>
    {modal?.type === 'price' && <PriceModal price={modal.price} onClose={() => setModal(null)} onSave={(price) => { const prices = modal.price ? account.prices.map((item) => item.id === modal.price.id ? { ...item, ...price } : item) : [...account.prices, { ...price, id: Date.now() }]; updateAccount({ prices }); setModal(null); notify(modal.price ? 'Price updated' : 'Price added'); }} />}
    {modal?.type === 'receipt' && <ReceiptModalV2 account={account} accounts={managedAccounts} onClose={() => setModal(null)} onSave={(receipt) => { modal.onSave?.(receipt); setModal(null); notify(`Чек ${receipt.id} добавлен`); }} />}
    {modal === 'add-card' && <CardModal onClose={() => setModal(null)} onSave={(card) => { updateAccount({ cards: [...account.cards, { ...card, id: Date.now(), primary: account.cards.length === 0 }] }); setModal(null); notify('Карта добавлена'); }} />}
    {modal?.type === 'crypto-wallet' && <CryptoWalletModal wallet={modal.wallet} onClose={() => setModal(null)} onSave={(wallet) => { const wallets = modal.wallet ? account.cryptoWallets.map((item) => item.id === modal.wallet.id ? { ...item, ...wallet } : item) : [...account.cryptoWallets, { ...wallet, id: Date.now() }]; updateAccount({ cryptoWallets: wallets }); setModal(null); notify(modal.wallet ? 'Кошелёк обновлён' : 'Кошелёк добавлен'); }} />}
    {modal?.type === 'edit-bank' && <BankModal card={modal.card} onClose={() => setModal(null)} onSave={(bank) => { const country = detectCountryFromBank(bank); updateAccount({ cards: account.cards.map((item) => item.id === modal.card.id ? { ...item, bank, country: country.name, countryCode: country.code } : item) }); setModal(null); notify('Банк сохранён'); }} />}
    {modal?.type === 'edit-country' && <CountryModal card={modal.card} onClose={() => setModal(null)} onSave={(country) => { updateAccount({ cards: account.cards.map((item) => item.id === modal.card.id ? { ...item, country, countryCode: '' } : item) }); setModal(null); notify('Страна сохранена'); }} />}
    {modal?.type === 'top-up' && <TopUpModal displayCurrency={displayCurrency} onClose={() => setModal(null)} onSave={(amount, method) => { setBalanceRub((value) => value + convertCurrency(amount, displayCurrency, 'RUB')); setModal(null); notify(`Баланс пополнен через ${method}`); }} />}
    {modal === 'connect-account' && <ConnectTelegramModal onClose={() => setModal(null)} onConnect={() => { notify('Реальное подключение Telegram будет добавлено позже'); setModal(null); }} />}

    {toast && <div className="toast"><span className="toast-check"><Icon name="check" size={14} /></span>{toast}</div>}
  </div>;
}

function Sidebar({ page, navigate, account, loginAccount, mobileNav, setMobileNav }) {
  return <><div className={`sidebar-overlay ${mobileNav ? 'show' : ''}`} onClick={() => setMobileNav(false)} /><aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
    <div className="brand"><div className="brand-mark"><Icon name="spark" size={18} /></div><span>tele<span>pilot</span></span></div>
    <nav className="nav" aria-label="Основная навигация">
      {navGroups.map((group, index) => <div className="nav-group" key={`${group.label}-${index}`}><span className="nav-label">{group.label}</span>{group.items.map((item) => <button key={item.key} className={`nav-item ${page === item.key ? 'active' : ''}`} onClick={() => navigate(item.key)}><Icon name={item.icon} size={17} /><span>{item.label}</span></button>)}</div>)}
    </nav>
    <div className="sidebar-bottom"><button className="nav-item sidebar-settings" onClick={() => navigate('settings')}><Avatar account={{ initials: 'VL', tone: 'violet' }} size="sm" /><span><strong>Владислав</strong><small>{loginAccount?.username || 'Профиль владельца'}</small></span><Icon name="more" size={18} /></button></div>
  </aside></>;
}

function PageHeader({ eyebrow, title, description, action }) {
  return <div className="page-header"><div className="page-heading-row"><div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div></div>;
}

function AccountRaceChart({ accounts, maxScore }) {
  return <div className="account-race"><div className="card-heading"><div><h3>Рейтинг аккаунтов</h3><p>Новые сообщения и покупки · топ {accounts.length}</p></div></div><div className="race-list">{accounts.map((item, index) => <div className="race-row" key={item.account.id}><span className="race-rank">0{index + 1}</span><div className="race-track" style={{ marginRight: '18px' }}><div className="race-fill" style={{ width: `${Math.max(18, Math.round((item.score / maxScore) * 100))}%` }}><div className="race-avatar"><Avatar account={item.account} size="sm" /><div className="race-tooltip"><strong>{item.account.name}</strong><span>{item.messages.toLocaleString('ru-RU')} новых сообщений</span><span>{item.purchases} покупок</span><b>{item.score} баллов</b></div></div></div></div><div className="race-label" style={{ paddingLeft: '4px' }}><strong>{item.account.name}</strong><span>{item.messages.toLocaleString('ru-RU')} сообщений · {item.purchases} покупок</span></div></div>)}</div></div>;
}

function Dashboard({ account, accounts, profileName, navigate, notify, onSelectAccount }) {
  const activeAccountsCount = accounts.filter((item) => item.enabled).length;
  const cardsCount = accounts.reduce((total, item) => total + item.cards.length, 0);
  const walletsCount = accounts.reduce((total, item) => total + (item.cryptoWallets?.length || 0), 0);
  const demandData = accounts.map((item) => ({
    account: item,
    purchases: { elena: 18, mikhail: 12, sofia: 7 }[item.id] || 0,
    messages: Number(String(item.messages).replace(/,/g, '')) || 0,
    score: (Number(String(item.messages).replace(/,/g, '')) || 0) + ({ elena: 18, mikhail: 12, sofia: 7 }[item.id] || 0) * 50
  }));
  const topDemandAccounts = demandData.sort((first, second) => second.score - first.score).slice(0, 5);
  const topDemand = topDemandAccounts[0] || { account, purchases: 0, messages: 0 };
  const maxDemandScore = topDemandAccounts[0]?.score || 1;
  const receiptStats = (() => {
    try {
      const receipts = JSON.parse(window.localStorage.getItem('telepilot-receipts') || '[]');
      const now = new Date();
      const currentMonth = receipts.filter((receipt) => { const date = new Date(receipt.date); return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth(); });
      const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const previousMonth = receipts.filter((receipt) => { const date = new Date(receipt.date); return date.getFullYear() === previousMonthDate.getFullYear() && date.getMonth() === previousMonthDate.getMonth(); });
      const change = previousMonth.length === 0 ? (currentMonth.length > 0 ? 100 : 0) : ((currentMonth.length - previousMonth.length) / previousMonth.length) * 100;
      return { count: currentMonth.length, change };
    } catch {
      return { count: 0, change: 0 };
    }
  })();
  return <><PageHeader eyebrow="Обзор" title={`Доброе утро, ${profileName}`} description={`Вот что происходит в вашем Telegram workspace.`} action={<Button icon="users" onClick={() => navigate('accounts')}>Открыть аккаунты</Button>} />
    <div className="dashboard-grid">
      <div className="hero-card"><div><h2>Всё под контролем</h2><p>Сводка подключённых ресурсов вашего рабочего пространства.</p><div className="hero-stats"><div><strong>{activeAccountsCount}</strong><span>Аккаунтов в работе</span></div><div><strong>{cardsCount}</strong><span>Банковских карт</span></div><div><strong>{walletsCount}</strong><span>Криптокошельков</span></div></div></div><div className="hero-orb"><Icon name="spark" size={30} /></div></div>
      <div className="metric-card"><div className="metric-top"><span>Обработано сообщений</span><span className="metric-icon lavender"><Icon name="message" size={16} /></span></div><strong>{account.messages}</strong><div className="metric-change up">+18.4% <span>по сравнению с прошлым месяцем</span></div></div>
      <div className="metric-card"><div className="metric-top"><span>Среднее время ответа</span><span className="metric-icon peach"><Icon name="clock" size={16} /></span></div><strong>{account.responseTime}</strong><div className="metric-change down">−12.2% <span>по сравнению с прошлым месяцем</span></div></div>
      <div className="metric-card"><div className="metric-top"><span>Чеки</span><span className="metric-icon mint"><Icon name="credit" size={16} /></span></div><strong>{receiptStats.count}</strong><div className={`metric-change ${receiptStats.change >= 0 ? 'up' : 'down'}`}>{receiptStats.change >= 0 ? '+' : ''}{receiptStats.change.toFixed(1)}% <span>по сравнению с прошлым месяцем</span></div></div>
      <AccountRaceChart accounts={topDemandAccounts} maxScore={maxDemandScore} />
      <div className="chart-card"><div className="card-heading"><div><h3>Топ востребованных аккаунтов</h3><p>{topDemand.account.name} лидирует · {topDemand.messages.toLocaleString('ru-RU')} новых сообщений · {topDemand.purchases} покупок</p></div><span className="demo-chart-label">Демо-аналитика</span></div><div className="chart-area"><div className="chart-y"><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div><div className="chart-plot"><div className="grid-lines" /><svg viewBox="0 0 700 190" preserveAspectRatio="none" aria-label="График востребованности аккаунта"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c6df4" stopOpacity=".22" /><stop offset="100%" stopColor="#7c6df4" stopOpacity="0" /></linearGradient></defs><path d="M0 151 C35 138 40 119 75 130 S115 158 145 112 S185 128 218 105 S270 126 295 83 S330 96 362 66 S390 88 420 75 S454 98 480 58 S520 92 550 48 S590 70 620 39 S670 58 700 22 L700 190 L0 190Z" fill="url(#fill)" /><path d="M0 151 C35 138 40 119 75 130 S115 158 145 112 S185 128 218 105 S270 126 295 83 S330 96 362 66 S390 88 420 75 S454 98 480 58 S520 92 550 48 S590 70 620 39 S670 58 700 22" fill="none" stroke="#7164e8" strokeWidth="3" strokeLinecap="round" /></svg><div className="chart-x"><span>1 мая</span><span>8 мая</span><span>15 мая</span><span>22 мая</span><span>29 мая</span></div></div></div><div className="top-demand-list">{topDemandAccounts.map((item, index) => <div className="top-demand-row" key={item.account.id}><span className="top-demand-rank">0{index + 1}</span><Avatar account={item.account} size="sm" /><div className="top-demand-copy"><strong>{item.account.name}</strong><span>{item.messages.toLocaleString('ru-RU')} сообщений · {item.purchases} покупок</span></div><div className="top-demand-score"><strong>{item.messages + item.purchases * 50}</strong><span>баллов</span></div></div>)}</div></div>
      <div className="activity-card"><div className="card-heading"><div><h3>Последняя активность</h3><p>Из вашего Telegram-аккаунта</p></div></div>{accounts.map((item) => <div className="activity-row" key={item.id}><Avatar account={item} size="sm" /><div className="activity-copy"><strong>{item.name}</strong><span>ИИ ответил на 12 бесед</span></div><time>2ч назад</time></div>)}</div>
    </div>
  </>;
}

function AccountsPage({ account, accounts, selectedAccountId, navigate, setModal, notify, toggleAccount, onSelectAccount }) {
  return <><PageHeader eyebrow="Рабочее пространство" title="Аккаунты" description="Управляйте аккаунтами Telegram, используемыми для доступа к рабочему пространству TelePilot." action={<Button icon="plus" onClick={() => setModal('connect-account')}>Добавить аккаунт</Button>} />
    <div className="info-banner"><div className="banner-icon"><Icon name="lock" size={18} /></div><div><strong>Подключено управляемых аккаунтов {accounts.length} из 3</strong><p>Аккаунт входа скрыт из этого списка и используется только для доступа к сайту.</p></div></div>
    <div className="accounts-list">{accounts.map((item) => <div className="account-row" key={item.id}><Avatar account={item} size="lg" /><div className="account-identity"><div className="identity-line"><h3>{item.name}</h3></div><span>{item.username}</span><div className="account-status"><StatusPill label={item.enabled ? 'Включён' : 'Выключен'} tone={item.enabled ? 'green' : 'gray'} /><span>·</span><small>Последняя активность {item.lastActive}</small></div></div><div className="row-actions"><Button variant="secondary" onClick={() => toggleAccount(item.id)}>{item.enabled ? 'Пауза' : 'Запустить'}</Button><Button variant="soft" onClick={() => { onSelectAccount(item.id); navigate('account-details'); }}>Управлять</Button></div></div>)}</div>
  </>;
}

function AccountDetails({ account, updateAccount, notify }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(account.name);
  const [prompt, setPrompt] = useState(account.prompt);
  const tabs = [{ id: 'profile', label: 'Профиль', icon: 'users' }, { id: 'messages', label: 'Сообщения', icon: 'message' }, { id: 'pricing', label: 'Прайс', icon: 'credit' }, { id: 'media', label: 'Медиа', icon: 'spark' }];
  const saveProfile = () => { updateAccount({ name }); notify('Профиль аккаунта сохранён'); };
  const updateMessageSettings = (patch) => updateAccount({ ai: { ...account.ai, ...patch } });
  const addPrice = () => updateAccount({ prices: [...account.prices, { id: Date.now(), title: 'Новое предложение', description: 'Описание услуги', amount: '0.00', currency: 'USD', status: 'Draft' }] });
  const updatePrice = (id, patch) => updateAccount({ prices: account.prices.map((price) => price.id === id ? { ...price, ...patch } : price) });
  const removePrice = (id) => updateAccount({ prices: account.prices.filter((price) => price.id !== id) });
  const media = account.media || { avatar: true, attachments: true, voice: false, albums: true };
  const updateMedia = (patch) => updateAccount({ media: { ...media, ...patch } });

  return <><PageHeader eyebrow="Настройки аккаунта" title={account.name} description="Общие вкладки для всех аккаунтов. Значения и изменения сохраняются отдельно для каждого аккаунта." /><div className="account-settings-tabs" role="tablist" aria-label="Настройки аккаунта">{tabs.map((tab) => <button type="button" role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'active' : ''} key={tab.id} onClick={() => setActiveTab(tab.id)}><Icon name={tab.icon} size={16} />{tab.label}</button>)}</div><section className="account-settings-panel">
    {activeTab === 'profile' && <div className="account-tab-content"><div className="account-tab-heading"><div><span className="eyebrow">Профиль аккаунта</span><h2>Основные данные</h2><p>Имя и Telegram username этого аккаунта.</p></div><Avatar account={account} size="xl" /></div><div className="form-grid"><Field label="Отображаемое имя" value={name} onChange={setName} /><Field label="Telegram username" value={account.username} onChange={() => {}} /></div><div className="account-connection-status"><StatusPill label="Подключён" tone="green" /><span>Telegram готов принимать сообщения</span></div><div className="account-tab-actions"><Button onClick={saveProfile}>Сохранить изменения</Button></div></div>}
    {activeTab === 'messages' && <div className="account-tab-content"><div className="account-tab-heading"><div><span className="eyebrow">Настройки сообщений</span><h2>Как аккаунт общается</h2><p>Эти правила применяются только к {account.name}.</p></div><Icon name="message" size={24} /></div><div className="form-grid"><label className="field"><span>Модель ИИ</span><select value={account.ai.model} onChange={(event) => updateMessageSettings({ model: event.target.value })}><option>Lumen Pro</option><option>Lumen Plus</option><option>Lumen Standard</option></select></label><label className="field"><span>Язык ответов</span><select value={account.ai.language} onChange={(event) => updateMessageSettings({ language: event.target.value })}><option>English</option><option>Russian</option><option>French + English</option></select></label><label className="field"><span>Тон</span><select value={account.ai.tone} onChange={(event) => updateMessageSettings({ tone: event.target.value })}><option>Warm & concise</option><option>Professional & calm</option><option>Direct & brief</option><option>Warm & supportive</option></select></label><label className="field"><span>Ответы AI</span><select value={account.ai.enabled ? 'enabled' : 'disabled'} onChange={(event) => updateMessageSettings({ enabled: event.target.value === 'enabled' })}><option value="enabled">Включены</option><option value="disabled">Приостановлены</option></select></label></div><label className="field account-prompt-field"><span>Короткое правило для ответов</span><textarea value={prompt} onChange={(event) => { setPrompt(event.target.value); updateAccount({ prompt: event.target.value }); }} rows="6" /></label><div className="account-tab-actions"><Button onClick={() => notify('Настройки сообщений сохранены')}>Сохранить сообщения</Button></div></div>}
    {activeTab === 'pricing' && <div className="account-tab-content"><div className="account-tab-heading"><div><span className="eyebrow">Прайс аккаунта</span><h2>Предложения для клиентов</h2><p>У каждого аккаунта свой набор услуг, валют и цен.</p></div><Button icon="plus" onClick={addPrice}>Добавить позицию</Button></div><div className="account-price-list">{account.prices.map((price) => <div className="account-price-row" key={price.id}><div><input value={price.title} onChange={(event) => updatePrice(price.id, { title: event.target.value })} aria-label="Название позиции" /><small>{price.description}</small></div><label className="account-price-amount"><input value={price.amount} onChange={(event) => updatePrice(price.id, { amount: event.target.value })} aria-label="Цена позиции" /><select value={price.currency} onChange={(event) => updatePrice(price.id, { currency: event.target.value })} aria-label="Валюта позиции"><option>USD</option><option>EUR</option><option>RUB</option><option>BYN</option></select></label><StatusPill label={price.status === 'Active' ? 'Активна' : 'Черновик'} tone={price.status === 'Active' ? 'green' : 'yellow'} /><button className="icon-button danger-icon" type="button" aria-label="Удалить позицию" onClick={() => removePrice(price.id)}><Icon name="close" size={15} /></button></div>)}</div></div>}
    {activeTab === 'media' && <div className="account-tab-content"><div className="account-tab-heading"><div><span className="eyebrow">Медиа аккаунта</span><h2>Что можно отправлять клиентам</h2><p>Включайте типы медиа отдельно для каждого Telegram-аккаунта.</p></div><Icon name="spark" size={24} /></div><div className="account-media-grid">{[['avatar', 'Аватары', 'Показывать изображение аккаунта'], ['attachments', 'Вложения', 'Разрешить отправку файлов и изображений'], ['voice', 'Голосовые сообщения', 'Разрешить AI-ответы голосом'], ['albums', 'Альбомы', 'Объединять несколько изображений в альбом']].map(([key, title, description]) => <div className="account-media-option" key={key}><div><strong>{title}</strong><p>{description}</p></div><Toggle checked={media[key]} onChange={(value) => updateMedia({ [key]: value })} label={title} /></div>)}</div><div className="account-media-empty"><Icon name="spark" size={18} /><div><strong>Медиа-правила готовы к настройке</strong><p>Здесь позже можно будет добавить лимиты размера, форматы и библиотеку шаблонов.</p></div></div></div>}
  </section></>;
}

function AIBehavior({ account, updateAI, notify }) {
  return <><PageHeader eyebrow="Автоматизация" title="Поведение ИИ" description="Настройте, как ваш ассистент говорит, думает и отвечает." action={<Button onClick={() => notify('Настройки ИИ сохранены')}>Сохранить настройки</Button>} /><div className="settings-layout"><div className="settings-main"><section className="panel"><div className="panel-title"><div><h3>AI-ассистент</h3><p>Управляйте тем, должен ли ассистент отвечать на входящие сообщения.</p></div><Toggle checked={account.ai.enabled} onChange={(value) => updateAI({ enabled: value })} label="Включить AI-ассистента" /></div><div className={`feature-state ${account.ai.enabled ? 'enabled' : 'disabled'}`}><div className="feature-state-icon"><Icon name="bot" size={20} /></div><div><strong>{account.ai.enabled ? 'Ассистент активен' : 'Ассистент приостановлен'}</strong><p>{account.ai.enabled ? 'Новые сообщения будут обрабатываться по вашему промпту и правилам тайминга.' : 'Вы всё ещё будете получать новые сообщения, но ИИ не будет отвечать автоматически.'}</p></div></div></section><section className="panel"><div className="panel-title"><div><h3>Личность и стиль</h3><p>Задайте стандартный голос для вашего ассистента.</p></div></div><div className="form-grid"><label className="field"><span>Модель ИИ</span><select value={account.ai.model} onChange={(e) => updateAI({ model: e.target.value })}><option>Lumen Pro</option><option>Lumen Standard</option></select></label><label className="field"><span>Тон ответа</span><select value={account.ai.tone} onChange={(e) => updateAI({ tone: e.target.value })}><option>Тёплый и лаконичный</option><option>Профессиональный</option><option>Игривый</option><option>Прямой</option></select></label><label className="field"><span>Основной язык</span><select value={account.ai.language} onChange={(e) => updateAI({ language: e.target.value })}><option>English</option><option>French + English</option><option>Spanish + English</option></select></label></div><div className="toggle-list"><div><div><strong>Использовать эмодзи</strong><p>Случайныеly use emojis when they fit the conversation.</p></div><Toggle checked={account.ai.emojis} onChange={(value) => updateAI({ emojis: value })} label="Use emojis" /></div><div><div><strong>Fallback to human</strong><p>Pause AI when a conversation needs your personal attention.</p></div><Toggle checked={account.ai.fallback} onChange={(value) => updateAI({ fallback: value })} label="Fallback to human" /></div></div></section></div><aside className="settings-side"><div className="side-card ai-preview"><div className="preview-head"><span className="eyebrow">Live preview</span><span className="online-dot" /></div><div className="preview-message incoming">Hey! What’s the best way to get started?</div><div className="preview-message outgoing">Hi there! I’d be happy to help. Tell me a little about what you’re looking for and we’ll take it from there.</div><small>Generated from your current settings</small></div></aside></div></>;
}

function PromptEditor({ account, updateAccount, notify }) {
  const [prompt, setPrompt] = useState(account.prompt);
  return <><PageHeader eyebrow="Автоматизация" title="Редактор промптов" description="Дайте вашему ассистенту чёткий контекст для каждой беседы." action={<Button onClick={() => { updateAccount({ prompt }); notify('Промпт сохранён'); }}>Сохранить промпт</Button>} /><div className="editor-layout"><section className="panel editor-panel"><div className="editor-toolbar"><span className="eyebrow">Системные инструкции</span><span className="char-count">{prompt.length} / 2,000</span></div><textarea value={prompt} onChange={(e) => setPrompt(e.target.value.slice(0, 2000))} spellCheck="false" /><div className="editor-help"><Icon name="spark" size={15} /><span>Подсказка: опишите роль ассистента, тон общения, границы ответственности и реакцию на неопределённость.</span></div></section><aside className="side-card prompt-tips"><h3>Основы промпта</h3>{['Определите чёткую роль', 'Опишите желаемый тон', 'Поставьте границы', 'Уточните реакцию при неопределённости'].map((item, index) => <div className="tip-row" key={item}><span>0{index + 1}</span><strong>{item}</strong><Icon name="check" size={14} /></div>)}<Button variant="secondary" className="full-button" onClick={() => setPrompt(`${prompt}\n\nВсегда помогай, будь понятным и честным в том, что знаешь.`)}>Добавить полезное правило</Button></aside></div></>;
}

function TimingSettings({ account, updateTiming, notify }) {
  const [now, setNow] = useState(() => formatCurrentTimeForTimezone(account.timing.timezone || 'UTC+3'));
  const activeDays = account.timing.activeDays ?? [true, true, true, true, true, false, false];

  useEffect(() => {
    const update = () => setNow(formatCurrentTimeForTimezone(account.timing.timezone || 'UTC+3'));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [account.timing.timezone]);

  const toggleDay = (index) => {
    updateTiming({ activeDays: activeDays.map((item, idx) => idx === index ? !item : item) });
  };

  return (
    <>
      <PageHeader
        eyebrow="Автоматизация"
        title="Расписание работы аккаунта"
        description="Укажите, когда аккаунт должен работать автоматически, а когда выключаться."
        action={<Button onClick={() => notify('Расписание аккаунта сохранено')}>Сохранить расписание</Button>}
      />

      <div className="settings-layout">
        <div className="settings-main">
          <section className="panel">
            <div className="panel-title">
              <div>
                <h3>Время работы аккаунта</h3>
                <p>В рабочее время аккаунт включён автоматически. В остальное время он выключается.</p>
              </div>
              <Icon name="clock" size={21} />
            </div>

            <div className="form-grid">
              <TimeSelect label="Включать аккаунт" value={account.timing.start} onChange={(value) => updateTiming({ start: value })} />
              <TimeSelect label="Выключать аккаунт" value={account.timing.end} onChange={(value) => updateTiming({ end: value })} />

              <label className="field">
                <span>Часовой пояс</span>
                <select
                  value={account.timing.timezone || 'UTC+3'}
                  onChange={(e) => updateTiming({ timezone: e.target.value })}
                >
                  {timeZoneOptions.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Вне расписания</span>
                <select defaultValue="off">
                  <option value="off">Автоматически выключать</option>
                  <option value="on">Оставлять аккаунт включённым</option>
                </select>
              </label>
            </div>
          </section>

          <section className="panel">
            <div className="panel-title">
              <div>
                <h3>Дни работы аккаунта</h3>
                <p>Выберите дни, когда аккаунт будет включаться автоматически.</p>
              </div>
            </div>

            <div className="day-picker">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                <button
                  type="button"
                  className={activeDays[index] ? 'active' : ''}
                  key={day}
                  onClick={() => toggleDay(index)}
                >
                  {day}
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="settings-side">
          <div className="side-card schedule-card">
            <div className="schedule-ring">
              <Icon name="clock" size={25} />
            </div>

            <span className="eyebrow">Расписание включения</span>
            <strong>
              {account.timing.start} — {account.timing.end}
            </strong>

            <div className="timezone-now">
              <span>Сейчас</span>
              <strong>{now}</strong>
              <small>{account.timing.timezone || 'UTC+3'}</small>
            </div>

            <div className="schedule-progress">
              <span style={{ width: '68%' }} />
            </div>

            <small className="schedule-status">Автоматическое управление включено</small>
          </div>
        </aside>
      </div>
    </>
  );
}

function TariffsPageV3({ displayCurrency, balanceRub, notify, onOpenTopUp }) {
  const [activeAccounts, setActiveAccounts] = useState(5);
  const [workMinutes, setWorkMinutes] = useState(60);
  const [aiReplies, setAiReplies] = useState(120);
  const accountRate = 0.07;
  const aiRate = 3;
  const accountCost = activeAccounts * workMinutes * accountRate;
  const aiCost = aiReplies * aiRate;
  const totalCost = accountCost + aiCost;
  const money = (value) => formatMoney(value, 'RUB', displayCurrency);
  const rateMoney = (value) => {
    const symbols = { USD: '$', EUR: '€', RUB: '₽', BYN: 'Br', UAH: '₴' };
    const converted = convertCurrency(value, 'RUB', displayCurrency);
    return `${symbols[displayCurrency] || displayCurrency} ${converted.toLocaleString('ru-RU', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`;
  };

  return <>
    <PageHeader eyebrow="Настройки и биллинг" title="Как работает оплата" description="Сервис списывает деньги только за фактическую работу аккаунтов и отправленные AI-ответы." action={<Button icon="plus" onClick={onOpenTopUp}>Пополнить баланс</Button>} />
    <section className="billing-balance"><div><span className="eyebrow light">Баланс workspace</span><strong>{money(balanceRub)}</strong><p>Баланс и все расходы отображаются в валюте из общих настроек.</p></div><div className="billing-balance-meta"><span>Текущий режим</span><strong><span className="status-dot" /> Демо-расчёт</strong><small>Реальные списания пока отключены</small></div></section>
    <div className="billing-layout"><div className="billing-main"><section className="billing-panel"><div className="billing-panel-heading"><div><h2>За что списываются деньги</h2><p>Ставки автоматически показываются в выбранной валюте.</p></div></div><div className="billing-rules"><article><span className="billing-rule-icon account"><Icon name="clock" size={18} /></span><div><h3>Работа Telegram-аккаунтов</h3><p>Оплата начисляется за каждую минуту, пока аккаунт включён. Пять одновременно работающих аккаунтов дают 5 account-minutes за одну реальную минуту.</p><strong>{rateMoney(accountRate)} <small>за 1 аккаунт-минуту</small></strong></div></article><article><span className="billing-rule-icon ai"><Icon name="bot" size={18} /></span><div><h3>AI-ответы</h3><p>Каждый отправленный AI-ответ оплачивается отдельно. Входящие сообщения без ответа и ручные сообщения деньги не списывают.</p><strong>{rateMoney(aiRate)} <small>за 1 AI-ответ</small></strong></div></article></div></section><section className="billing-panel calculator-panel"><div className="billing-panel-heading"><div><h2>Калькулятор расхода</h2><p>Измените значения и посмотрите расход в {currencyOptions.find((item) => item.value === displayCurrency)?.label || displayCurrency}.</p></div><span className="calculator-total">{money(totalCost)}<small>за выбранный сценарий</small></span></div><div className="billing-controls"><label><span>Работающих аккаунтов <strong>{activeAccounts}</strong></span><input type="range" min="1" max="10" value={activeAccounts} onChange={(event) => setActiveAccounts(Number(event.target.value))} /></label><label><span>Минут работы <strong>{workMinutes}</strong></span><input type="range" min="1" max="480" value={workMinutes} onChange={(event) => setWorkMinutes(Number(event.target.value))} /></label><label><span>AI-ответов <strong>{aiReplies}</strong></span><input type="range" min="0" max="1000" step="10" value={aiReplies} onChange={(event) => setAiReplies(Number(event.target.value))} /></label></div><div className="calculator-breakdown"><span>{activeAccounts} аккаунтов × {workMinutes} мин × {rateMoney(accountRate)} <strong>{money(accountCost)}</strong></span><span>{aiReplies} AI-ответов × {rateMoney(aiRate)} <strong>{money(aiCost)}</strong></span></div></section></div><aside className="billing-side"><section className="billing-panel"><div className="billing-panel-heading"><div><h2>Последние списания</h2><p>Пример будущего журнала операций.</p></div></div><div className="billing-ledger"><div><span className="ledger-icon account"><Icon name="clock" size={14} /></span><p><strong>5 аккаунтов работали</strong><small>60 минут · сегодня, 14:32</small></p><b>−{money(21)}</b></div><div><span className="ledger-icon ai"><Icon name="bot" size={14} /></span><p><strong>AI-ответы</strong><small>12 ответов · сегодня, 14:28</small></p><b>−{money(36)}</b></div><div><span className="ledger-icon plus"><Icon name="plus" size={14} /></span><p><strong>Пополнение баланса</strong><small>Демо-операция · вчера, 09:15</small></p><b className="positive">+{money(1000)}</b></div></div></section><section className="billing-panel billing-note"><Icon name="lock" size={15} /><div><strong>Баланс в безопасности</strong><p>При нулевом балансе новые AI-ответы и автоматический запуск аккаунтов приостанавливаются.</p></div></section></aside></div><div className="tariffs-footnote"><Icon name="lock" size={14} /> Демо-расчёт: деньги не списываются, банковская карта не требуется.</div>
  </>;
}

function TariffsPage({ displayCurrency, balanceRub, notify, onOpenTopUp }) {
  const [activeAccounts, setActiveAccounts] = useState(5);
  const [workMinutes, setWorkMinutes] = useState(60);
  const [aiReplies, setAiReplies] = useState(120);
  const accountRate = 0.07;
  const aiRate = 3;
  const accountCost = activeAccounts * workMinutes * accountRate;
  const aiCost = aiReplies * aiRate;
  const totalCost = accountCost + aiCost;
  const money = (value) => formatMoney(value, 'RUB', displayCurrency);

  return <>
    <PageHeader eyebrow="Настройки и биллинг" title="Как работает оплата" description="Сервис списывает деньги только за фактическую работу аккаунтов и отправленные AI-ответы." action={<Button icon="plus" onClick={onOpenTopUp}>Пополнить баланс</Button>} />
    <section className="billing-balance"><div><span className="eyebrow light">Баланс workspace</span><strong>{formatMoney(balanceRub, 'RUB', displayCurrency)}</strong><p>Баланс отображается в валюте из общих настроек. Все расчёты ниже используют те же ставки.</p></div><div className="billing-balance-meta"><span>Текущий режим</span><strong><span className="status-dot" /> Демо-расчёт</strong><small>Реальные списания пока отключены</small></div></section>
    <div className="billing-layout"><div className="billing-main"><section className="billing-panel"><div className="billing-panel-heading"><div><h2>За что списываются деньги</h2><p>У аккаунтов и AI разные статьи расходов, поэтому вы всегда видите причину списания.</p></div></div><div className="billing-rules"><article><span className="billing-rule-icon account"><Icon name="clock" size={18} /></span><div><h3>Работа Telegram-аккаунтов</h3><p>Оплата начисляется за каждую минуту, пока аккаунт включён. Если работают 5 аккаунтов одновременно, за одну реальную минуту расходуется 5 account-minutes.</p><strong>0,07 ₽ <small>за 1 аккаунт-минуту</small></strong></div></article><article><span className="billing-rule-icon ai"><Icon name="bot" size={18} /></span><div><h3>AI-ответы</h3><p>Каждый отправленный AI-ответ оплачивается отдельно. Входящие сообщения без ответа и ручные сообщения деньги не списывают.</p><strong>3,00 ₽ <small>за 1 AI-ответ</small></strong></div></article></div></section><section className="billing-panel calculator-panel"><div className="billing-panel-heading"><div><h2>Калькулятор расхода</h2><p>Измените значения и посмотрите примерный расход в {currencyOptions.find((item) => item.value === displayCurrency)?.label || displayCurrency}.</p></div><span className="calculator-total">{money(totalCost)}<small>за выбранный сценарий</small></span></div><div className="billing-controls"><label><span>Работающих аккаунтов <strong>{activeAccounts}</strong></span><input type="range" min="1" max="10" value={activeAccounts} onChange={(event) => setActiveAccounts(Number(event.target.value))} /></label><label><span>Минут работы <strong>{workMinutes}</strong></span><input type="range" min="1" max="480" step="1" value={workMinutes} onChange={(event) => setWorkMinutes(Number(event.target.value))} /></label><label><span>AI-ответов <strong>{aiReplies}</strong></span><input type="range" min="0" max="1000" step="10" value={aiReplies} onChange={(event) => setAiReplies(Number(event.target.value))} /></label></div><div className="calculator-breakdown"><span>{activeAccounts} аккаунтов × {workMinutes} мин × 0,07 ₽ <strong>{money(accountCost)}</strong></span><span>{aiReplies} AI-ответов × 3,00 ₽ <strong>{money(aiCost)}</strong></span></div></section></div><aside className="billing-side"><section className="billing-panel"><div className="billing-panel-heading"><div><h2>Последние списания</h2><p>Пример будущего журнала операций.</p></div></div><div className="billing-ledger"><div><span className="ledger-icon account"><Icon name="clock" size={14} /></span><p><strong>5 аккаунтов работали</strong><small>60 минут · сегодня, 14:32</small></p><b>−{money(21).replace(' ', '')}</b></div><div><span className="ledger-icon ai"><Icon name="bot" size={14} /></span><p><strong>AI-ответы</strong><small>12 ответов · сегодня, 14:28</small></p><b>−{money(36).replace(' ', '')}</b></div><div><span className="ledger-icon plus"><Icon name="plus" size={14} /></span><p><strong>Пополнение баланса</strong><small>Демо-операция · вчера, 09:15</small></p><b className="positive">+{money(1000)}</b></div></div></section><section className="billing-panel billing-note"><Icon name="lock" size={15} /><div><strong>Баланс в безопасности</strong><p>При нулевом балансе новые AI-ответы и автоматический запуск аккаунтов приостанавливаются. Уже начатая минута не списывается повторно.</p></div></section></aside></div>
    <div className="tariffs-footnote"><Icon name="lock" size={14} /> Демо-расчёт: деньги не списываются, банковская карта не требуется.</div>
  </>;
}

function ReceiptsPageV4({ account, accounts, displayCurrency, setModal, notify }) {
  const getTargets = (item) => ({ card: item.cards.length > 0 ? `Карта •••• ${item.cards[0].last4 || '4242'}` : 'Visa •••• 4242', crypto: item.cryptoWallets?.[0] ? `${item.cryptoWallets[0].currency} · ${item.cryptoWallets[0].network}` : 'USDT · TRC20' });
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [receipts, setReceipts] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('telepilot-receipts') || '[]');
    } catch {
      return [];
    }
  });
  const targetOptions = [...new Set(receipts.map((receipt) => receipt.target))];
  const accountOptions = [...new Set(receipts.map((receipt) => receipt.accountId))].map((id) => accounts.find((item) => item.id === id)).filter(Boolean);
  const filteredReceipts = receipts.filter((receipt) => (selectedTargets.length === 0 || selectedTargets.includes(receipt.target)) && (selectedAccounts.length === 0 || selectedAccounts.includes(receipt.accountId)) && isReceiptInPeriod(receipt.date, selectedPeriod, selectedDate)).sort((first, second) => new Date(second.date) - new Date(first.date));
  const periodReceipts = filteredReceipts;
  const currencyTotals = periodReceipts.reduce((totals, receipt) => ({ ...totals, [receipt.currency]: (totals[receipt.currency] || 0) + Number(receipt.amount) }), {});
  const currencyEntries = Object.entries(currencyTotals);
  const convertedTotal = periodReceipts.reduce((total, receipt) => total + convertCurrency(receipt.amount, receipt.currency, displayCurrency), 0);
  const paidTotal = formatMoney(convertedTotal, displayCurrency, displayCurrency);
  const averageReceipt = formatMoney(periodReceipts.length ? convertedTotal / periodReceipts.length : 0, displayCurrency, displayCurrency);
  const selectedPeriodLabel = selectedPeriod === 'custom' && selectedDate ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }) : receiptPeriodOptions.find((item) => item.value === selectedPeriod)?.label || 'Весь период';
  const toggleItem = (setter, value) => setter((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
  const removeReceipt = (id) => { setReceipts((items) => items.filter((receipt) => receipt.id !== id)); notify('Чек удалён'); };
  const openReceiptModal = () => setModal({ type: 'receipt', onSave: (receipt) => setReceipts((items) => [{ ...receipt, date: receipt.date || new Date().toISOString(), accountId: receipt.accountId || account.id }, ...items]) });
  const formatDate = (value) => new Date(value).toLocaleString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false });

  useEffect(() => {
    window.localStorage.setItem('telepilot-receipts', JSON.stringify(receipts));
  }, [receipts]);

  useEffect(() => {
    const closeFilter = (event) => { if (!event.target.closest('.receipt-filter-menu')) setFilterOpen(false); };
    document.addEventListener('mousedown', closeFilter);
    return () => document.removeEventListener('mousedown', closeFilter);
  }, []);

  return <><PageHeader eyebrow="Статистика" title="Чеки" description="Здесь будут собираться все чеки после оплаты клиентами." action={<Button icon="plus" onClick={openReceiptModal}>Добавить чек</Button>} /><div className="receipt-summary"><div className="receipt-total"><span className="eyebrow">Оплачено за выбранный период</span><strong>{paidTotal}</strong><div className="receipt-sparkline"><span /><span /><span /><span /><span /><span /><span /></div></div><div><span className="eyebrow">Успешные оплаты</span><strong>{periodReceipts.length}</strong><span className="receipt-meta"><span className="status-dot" /> По выбранным фильтрам</span></div><div><span className="eyebrow">Средний чек</span><strong>{averageReceipt}</strong><span className="receipt-meta">за выбранный период</span></div></div><section className="panel receipts-panel"><div className="table-heading"><div><h3>История чеков</h3><p>Выберите аккаунты и конкретные места получения оплаты.</p></div><div className="receipt-table-tools"><span className="table-count">{filteredReceipts.length} показано</span><div className="receipt-filter-menu"><button className={`receipt-filter-trigger ${filterOpen ? 'active' : ''}`} onClick={() => setFilterOpen((open) => !open)}>Фильтры · {selectedPeriodLabel} <Icon name="chevron" size={13} /></button>{filterOpen && <div className="receipt-filter-popover"><div className="receipt-filter-section"><strong>Период</strong><select className="compact-select" value={selectedPeriod} onChange={(event) => { const value = event.target.value; setSelectedPeriod(value); if (value !== 'custom') setSelectedDate(''); }}>{receiptPeriodOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><label className="receipt-date-filter"><span>Конкретная дата</span><input type="date" value={selectedDate} onChange={(event) => { setSelectedDate(event.target.value); setSelectedPeriod(event.target.value ? 'custom' : 'all'); }} aria-label="Выберите конкретный день" /></label><button type="button" className="receipt-date-clear" disabled={!selectedDate} onClick={() => { setSelectedDate(''); setSelectedPeriod('all'); }}>Очистить дату</button></div><div className="receipt-filter-section"><strong>Telegram-аккаунты</strong>{accountOptions.map((item) => <label key={item.id}><input type="checkbox" checked={selectedAccounts.includes(item.id)} onChange={() => toggleItem(setSelectedAccounts, item.id)} /><span>{item.name}</span></label>)}</div><div className="receipt-filter-section"><strong>Куда пришла оплата</strong>{targetOptions.map((target) => <label key={target}><input type="checkbox" checked={selectedTargets.includes(target)} onChange={() => toggleItem(setSelectedTargets, target)} /><span>{target}</span></label>)}</div><button className="receipt-clear-filter" onClick={() => { setSelectedTargets([]); setSelectedAccounts([]); setSelectedPeriod('all'); setSelectedDate(''); }}>Сбросить фильтры</button></div>}</div></div></div><div className="receipt-table"><div className="receipt-head"><span>Чек</span><span>Telegram-аккаунт</span><span>Получено на</span><span>Услуга</span><span>Сумма</span><span>Дата</span><span>Статус</span><span /></div>{filteredReceipts.map((receipt) => <div className="receipt-row" key={receipt.id}><div><strong>{receipt.id}</strong><span>{receipt.type === 'card' ? 'Банковская карта' : 'Криптовалюта'}</span></div><strong>{receipt.accountName}</strong><span className="receipt-target">{receipt.target}</span><span>{receipt.product}</span><strong>{formatMoney(receipt.amount, receipt.currency)}</strong><time>{formatDate(receipt.date)}</time><StatusPill label="Оплачено" tone="green" /><button className="icon-button danger-icon" onClick={() => removeReceipt(receipt.id)} aria-label={`Удалить чек ${receipt.id}`}><Icon name="close" size={15} /></button></div>)}</div>{filteredReceipts.length === 0 && <EmptyState icon="credit" title="Чеки не найдены" description="Снимите часть фильтров или добавьте новый чек." action={<Button onClick={openReceiptModal}>Добавить чек</Button>} />}<div className="receipts-footer"><Icon name="lock" size={15} /><span>Статистика пересчитывается по выбранному периоду и активным фильтрам.</span></div></section></>;
}

function ReceiptsPageV3({ account, accounts, setModal, notify }) {
  const getTargets = (item) => ({ card: item.cards.length > 0 ? `Карта •••• ${item.cards[0].last4 || '4242'}` : 'Visa •••• 4242', crypto: item.cryptoWallets?.[0] ? `${item.cryptoWallets[0].currency} · ${item.cryptoWallets[0].network}` : 'USDT · TRC20' });
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  useEffect(() => {
    const closeFilter = (event) => { if (!event.target.closest('.receipt-filter-menu')) setFilterOpen(false); };
    document.addEventListener('mousedown', closeFilter);
    return () => document.removeEventListener('mousedown', closeFilter);
  }, []);
  const [receipts, setReceipts] = useState(() => accounts.slice(0, 3).map((item, index) => { const targets = getTargets(item); return { id: `TL-${1048 - index}`, accountId: item.id, accountName: item.name, product: item.prices[index % item.prices.length]?.title || 'Консультация', amount: ['49.00', '89.00', '150.00'][index], currency: index === 2 ? 'EUR' : 'USD', date: new Date().toISOString(), target: index === 1 ? targets.card : targets.crypto, type: index === 1 ? 'card' : 'crypto' }; }));
  const targetOptions = [...new Set(receipts.map((receipt) => receipt.target))];
  const accountOptions = [...new Set(receipts.map((receipt) => receipt.accountId))].map((id) => accounts.find((item) => item.id === id)).filter(Boolean);
  const filteredReceipts = receipts.filter((receipt) => (selectedTargets.length === 0 || selectedTargets.includes(receipt.target)) && (selectedAccounts.length === 0 || selectedAccounts.includes(receipt.accountId)));
  const currentMonth = new Date();
  const monthReceipts = filteredReceipts.filter((receipt) => { const date = new Date(receipt.date); return date.getFullYear() === currentMonth.getFullYear() && date.getMonth() === currentMonth.getMonth(); });
  const currencyTotals = monthReceipts.reduce((totals, receipt) => ({ ...totals, [receipt.currency]: (totals[receipt.currency] || 0) + Number(receipt.amount) }), {});
  const currencyEntries = Object.entries(currencyTotals);
  const paidTotal = currencyEntries.length === 1 ? formatMoney(currencyEntries[0][1], currencyEntries[0][0]) : currencyEntries.map(([currency, amount]) => formatMoney(amount, currency)).join(' · ');
  const averageReceipt = currencyEntries.length === 1 && monthReceipts.length ? formatMoney(currencyEntries[0][1] / monthReceipts.length, currencyEntries[0][0]) : 'Разные валюты';
  const toggleItem = (setter, value) => setter((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
  const removeReceipt = (id) => { setReceipts((items) => items.filter((receipt) => receipt.id !== id)); notify('Чек удалён'); };
  const openReceiptModal = () => setModal({ type: 'receipt', onSave: (receipt) => setReceipts((items) => [{ ...receipt, date: new Date().toISOString(), accountId: receipt.accountId || account.id }, ...items]) });
  const formatDate = (value) => new Date(value).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' });

  return <><PageHeader eyebrow="Статистика" title="Чеки" description="Здесь будут собираться все чеки после оплаты клиентами." action={<Button icon="plus" onClick={openReceiptModal}>Добавить чек</Button>} /><div className="receipt-summary"><div className="receipt-total"><span className="eyebrow">Оплачено за выбранный период</span><strong>${paidTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><span className="receipt-meta">с 1 по {new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()} число</span><div className="receipt-sparkline"><span /><span /><span /><span /><span /><span /><span /></div></div><div><span className="eyebrow">Успешные оплаты</span><strong>{monthReceipts.length}</strong><span className="receipt-meta"><span className="status-dot" /> По выбранным фильтрам</span></div><div><span className="eyebrow">Средний чек</span><strong>${averageReceipt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><span className="receipt-meta">за выбранный период</span></div></div><section className="panel receipts-panel"><div className="table-heading"><div><h3>История чеков</h3><p>Выберите аккаунты и конкретные места получения оплаты.</p></div><div className="receipt-table-tools"><span className="table-count">{filteredReceipts.length} показано</span><div className="receipt-filter-menu"><button className={`receipt-filter-trigger ${filterOpen ? 'active' : ''}`} onClick={() => setFilterOpen((open) => !open)}>Фильтры <Icon name="chevron" size={13} /></button>{filterOpen && <div className="receipt-filter-popover"><div className="receipt-filter-section"><strong>Период</strong><select className="compact-select" value={selectedPeriod} onChange={(event) => setSelectedPeriod(event.target.value)}>{receiptPeriodOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div><div className="receipt-filter-section"><strong>Telegram-аккаунты</strong>{accountOptions.map((item) => <label key={item.id}><input type="checkbox" checked={selectedAccounts.includes(item.id)} onChange={() => toggleItem(setSelectedAccounts, item.id)} /><span>{item.name}</span></label>)}</div><div className="receipt-filter-section"><strong>Куда пришла оплата</strong>{targetOptions.map((target) => <label key={target}><input type="checkbox" checked={selectedTargets.includes(target)} onChange={() => toggleItem(setSelectedTargets, target)} /><span>{target}</span></label>)}</div><button className="receipt-clear-filter" onClick={() => { setSelectedTargets([]); setSelectedAccounts([]); }}>Сбросить фильтры</button></div>}</div></div></div><div className="receipt-table"><div className="receipt-head"><span>Чек</span><span>Telegram-аккаунт</span><span>Получено на</span><span>Услуга</span><span>Сумма</span><span>Дата</span><span>Статус</span><span /></div>{filteredReceipts.map((receipt) => <div className="receipt-row" key={receipt.id}><div><strong>{receipt.id}</strong><span>{receipt.type === 'card' ? 'Банковская карта' : 'Криптовалюта'}</span></div><strong>{receipt.accountName}</strong><span className="receipt-target">{receipt.target}</span><span>{receipt.product}</span><strong>{receipt.currency === 'EUR' ? '€' : '$'}{receipt.amount}</strong><time>{formatDate(receipt.date)}</time><StatusPill label="Оплачено" tone="green" /><button className="icon-button danger-icon" onClick={() => removeReceipt(receipt.id)} aria-label={`Удалить чек ${receipt.id}`}><Icon name="close" size={15} /></button></div>)}</div>{filteredReceipts.length === 0 && <EmptyState icon="credit" title="Чеки не найдены" description="Снимите часть фильтров или добавьте новый чек." action={<Button onClick={openReceiptModal}>Добавить чек</Button>} />}<div className="receipts-footer"><Icon name="lock" size={15} /><span>Статистика пересчитывается по выбранному периоду и активным фильтрам.</span></div></section></>;
}

function ReceiptsPageV2({ account, accounts, setModal, notify }) {
  const cardTargets = account.cards.length > 0 ? account.cards.map((card) => `Карта •••• ${card.last4 || '4242'}`) : ['Visa •••• 4242'];
  const walletTargets = account.cryptoWallets?.length > 0 ? account.cryptoWallets.map((wallet) => `${wallet.currency} · ${wallet.network}`) : ['USDT · TRC20', 'USDC · TON'];
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [receipts, setReceipts] = useState([
    { id: 'TL-1048', accountName: account.name, product: account.prices[0]?.title || 'Консультация', amount: '49.00', currency: 'USD', date: 'Сегодня, 14:32', target: walletTargets[0], type: 'crypto' },
    { id: 'TL-1047', accountName: account.name, product: account.prices[1]?.title || 'Priority support', amount: '89.00', currency: 'USD', date: 'Сегодня, 11:08', target: cardTargets[0], type: 'card' },
    { id: 'TL-1046', accountName: account.name, product: 'VIP follow-up', amount: '150.00', currency: 'EUR', date: 'Вчера, 18:45', target: walletTargets[1], type: 'crypto' }
  ]);
  const targets = [...new Set([...cardTargets, ...walletTargets])];
  const filteredReceipts = selectedTargets.length === 0 ? receipts : receipts.filter((receipt) => selectedTargets.includes(receipt.target));
  const toggleTarget = (target) => setSelectedTargets((items) => items.includes(target) ? items.filter((item) => item !== target) : [...items, target]);
  const removeReceipt = (id) => { setReceipts((items) => items.filter((receipt) => receipt.id !== id)); notify('Чек удалён'); };
  const openReceiptModal = () => setModal({ type: 'receipt', onSave: (receipt) => setReceipts((items) => [receipt, ...items]) });

  return <><PageHeader eyebrow="Статистика" title="Чеки" description="Здесь будут собираться все чеки после оплаты клиентами." action={<Button icon="plus" onClick={openReceiptModal}>Добавить чек</Button>} /><div className="receipt-summary"><div className="receipt-total"><span className="eyebrow">Оплачено за месяц</span><strong>{formatMoney(2840, 'USD')}</strong><span className="metric-change up">+14.8% к прошлому месяцу</span><div className="receipt-sparkline"><span /><span /><span /><span /><span /><span /><span /></div></div><div><span className="eyebrow">Успешные оплаты</span><strong>{receipts.length}</strong><span className="receipt-meta"><span className="status-dot" /> Все подтверждены</span></div><div><span className="eyebrow">Средний чек</span><strong>{formatMoney(88.75, 'USD')}</strong><span className="receipt-meta">за последние 30 дней</span></div></div><section className="panel receipts-panel"><div className="table-heading"><div><h3>История чеков</h3><p>Выберите конкретные карты или криптокошельки для отображения.</p></div><div className="receipt-table-tools"><span className="table-count">{filteredReceipts.length} показано</span><div className="receipt-filter-menu"><button className={`receipt-filter-trigger ${filterOpen ? 'active' : ''}`} onClick={() => setFilterOpen((open) => !open)}>Фильтры <Icon name="chevron" size={13} /></button>{filterOpen && <div className="receipt-filter-popover"><strong>Показывать оплаты на</strong>{targets.map((target) => <label key={target}><input type="checkbox" checked={selectedTargets.includes(target)} onChange={() => toggleTarget(target)} /><span>{target}</span></label>)}<button className="receipt-clear-filter" onClick={() => setSelectedTargets([])}>Сбросить фильтры</button></div>}</div></div></div><div className="receipt-table"><div className="receipt-head"><span>Чек</span><span>Telegram-аккаунт</span><span>Получено на</span><span>Услуга</span><span>Сумма</span><span>Дата</span><span>Статус</span><span /></div>{filteredReceipts.map((receipt) => <div className="receipt-row" key={receipt.id}><div><strong>{receipt.id}</strong><span>{receipt.type === 'card' ? 'Банковская карта' : 'Криптовалюта'}</span></div><strong>{receipt.accountName}</strong><span className="receipt-target">{receipt.target}</span><span>{receipt.product}</span><strong>{receipt.currency === 'EUR' ? '€' : '$'}{receipt.amount}</strong><time>{receipt.date}</time><StatusPill label="Оплачено" tone="green" /><button className="icon-button danger-icon" onClick={() => removeReceipt(receipt.id)} aria-label={`Удалить чек ${receipt.id}`}><Icon name="close" size={15} /></button></div>)}</div>{filteredReceipts.length === 0 && <EmptyState icon="credit" title="Чеки не найдены" description="В выбранных кошельках пока нет оплат." action={<Button onClick={openReceiptModal}>Добавить чек</Button>} />}<div className="receipts-footer"><Icon name="lock" size={15} /><span>Реальные чеки будут добавляться автоматически после подключения оплаты.</span></div></section></>;
}

function ReceiptsPage({ account, setModal, notify }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [receipts, setReceipts] = useState([
    { id: 'TL-1048', accountName: account.name, product: account.prices[0]?.title || 'Консультация', amount: '49.00', currency: 'USD', date: 'Сегодня, 14:32', method: 'crypto' },
    { id: 'TL-1047', accountName: account.name, product: account.prices[1]?.title || 'Priority support', amount: '89.00', currency: 'USD', date: 'Сегодня, 11:08', method: 'card' },
    { id: 'TL-1046', accountName: account.name, product: 'VIP follow-up', amount: '150.00', currency: 'EUR', date: 'Вчера, 18:45', method: 'crypto' }
  ]);
  const filteredReceipts = activeFilter === 'all' ? receipts : receipts.filter((receipt) => receipt.method === activeFilter);
  const removeReceipt = (id) => { setReceipts((items) => items.filter((receipt) => receipt.id !== id)); notify('Чек удалён'); };
  const methodLabel = (method) => method === 'card' ? 'Банковская карта' : 'Криптовалюта';

  const openReceiptModal = () => setModal({ type: 'receipt', onSave: (receipt) => setReceipts((items) => [receipt, ...items]) });
  return <><PageHeader eyebrow="Статистика" title="Чеки" description="Здесь будут собираться все чеки после оплаты клиентами." action={<div className="receipt-header-actions"><Button variant="secondary" icon="search" onClick={() => setActiveFilter(activeFilter === 'all' ? 'card' : 'all')}>Фильтры</Button><Button icon="plus" onClick={openReceiptModal}>Добавить чек</Button></div>} /><div className="receipt-summary"><div className="receipt-total"><span className="eyebrow">Оплачено за месяц</span><strong>{formatMoney(2840, 'USD')}</strong><span className="metric-change up">+14.8% к прошлому месяцу</span><div className="receipt-sparkline"><span /><span /><span /><span /><span /><span /><span /></div></div><div><span className="eyebrow">Успешные оплаты</span><strong>{receipts.length}</strong><span className="receipt-meta"><span className="status-dot" /> Все подтверждены</span></div><div><span className="eyebrow">Средний чек</span><strong>{formatMoney(88.75, 'USD')}</strong><span className="receipt-meta">за последние 30 дней</span></div></div><section className="panel receipts-panel"><div className="table-heading"><div><h3>История чеков</h3><p>Удаляйте ошибочные записи или добавляйте оплату вручную.</p></div><span className="table-count">{filteredReceipts.length} показано</span></div><div className="receipt-filters">{[['all', 'Все оплаты'], ['card', 'Банковские карты'], ['crypto', 'Криптовалюта']].map(([value, label]) => <button className={`receipt-filter ${activeFilter === value ? 'active' : ''}`} key={value} onClick={() => setActiveFilter(value)}>{label}</button>)}</div>{filteredReceipts.length > 0 ? <div className="receipt-table"><div className="receipt-head"><span>Чек</span><span>Telegram-аккаунт</span><span>Услуга</span><span>Сумма</span><span>Дата</span><span>Статус</span><span /></div>{filteredReceipts.map((receipt) => <div className="receipt-row" key={receipt.id}><div><strong>{receipt.id}</strong><span>{methodLabel(receipt.method)}</span></div><strong>{receipt.accountName}</strong><span>{receipt.product}</span><strong>{receipt.currency === 'EUR' ? '€' : '$'}{receipt.amount}</strong><time>{receipt.date}</time><StatusPill label="Оплачено" tone="green" /><button className="icon-button danger-icon" onClick={() => removeReceipt(receipt.id)} aria-label={`Удалить чек ${receipt.id}`}><Icon name="close" size={15} /></button></div>)}</div> : <EmptyState icon="credit" title="Чеки не найдены" description="Измените фильтр или добавьте чек вручную." action={<Button onClick={openReceiptModal}>Добавить чек</Button>} />}<div className="receipts-footer"><Icon name="lock" size={15} /><span>Реальные чеки будут добавляться автоматически после подключения оплаты.</span></div></section></>;
}

function PricingPage({ account, updateAccount, setModal, notify }) {
  const receipts = [
    { id: 'TL-1048', client: 'Анна Петрова', product: account.prices[0]?.title || 'Консультация', amount: '49.00', currency: 'USD', date: 'Сегодня, 14:32', method: 'USDT · TRC20' },
    { id: 'TL-1047', client: 'Michael Reed', product: account.prices[1]?.title || 'Priority support', amount: '89.00', currency: 'USD', date: 'Сегодня, 11:08', method: 'Visa •••• 4242' },
    { id: 'TL-1046', client: 'Елена Смирнова', product: 'VIP follow-up', amount: '150.00', currency: 'EUR', date: 'Вчера, 18:45', method: 'USDC · TON' }
  ];

  return <><PageHeader eyebrow="Статистика" title="Чеки" description="Здесь будут собираться все чеки после оплаты клиентами." action={<Button variant="secondary" icon="search" onClick={() => notify('Фильтры чеков будут доступны после подключения оплаты')}>Фильтры</Button>} /><div className="receipt-summary"><div className="receipt-total"><span className="eyebrow">Оплачено за месяц</span><strong>{formatMoney(2840, 'USD')}</strong><span className="metric-change up">+14.8% к прошлому месяцу</span><div className="receipt-sparkline"><span /><span /><span /><span /><span /><span /><span /></div></div><div><span className="eyebrow">Успешные оплаты</span><strong>32</strong><span className="receipt-meta"><span className="status-dot" /> Все подтверждены</span></div><div><span className="eyebrow">Средний чек</span><strong>{formatMoney(88.75, 'USD')}</strong><span className="receipt-meta">за последние 30 дней</span></div></div><section className="panel receipts-panel"><div className="table-heading"><div><h3>История чеков</h3><p>Демо-записи оплат. Реальная логика добавления будет подключена позже.</p></div><span className="table-count">{receipts.length} последние</span></div><div className="receipt-filters"><button className="receipt-filter active">Все оплаты</button><button className="receipt-filter">Банковские карты</button><button className="receipt-filter">Криптовалюта</button></div><div className="receipt-table"><div className="receipt-head"><span>Чек</span><span>Клиент</span><span>Услуга</span><span>Сумма</span><span>Дата</span><span>Статус</span></div>{receipts.map((receipt) => <div className="receipt-row" key={receipt.id}><div><strong>{receipt.id}</strong><span>{receipt.method}</span></div><strong>{receipt.client}</strong><span>{receipt.product}</span><strong>{receipt.currency === 'EUR' ? '€' : '$'}{receipt.amount}</strong><time>{receipt.date}</time><StatusPill label="Оплачено" tone="green" /></div>)}</div><div className="receipts-footer"><Icon name="lock" size={15} /><span>Чеки появятся здесь автоматически после подтверждения оплаты.</span></div></section></>;
}

function CardBrandLogo({ brand }) {
  const normalized = brand.toLowerCase();
  return <span className={`card-brand-logo ${normalized}`} aria-label={brand === 'CARD' ? 'Другая карта' : brand}>{brand === 'CARD' ? 'CARD' : brand}</span>;
}

function WalletsPage({ account, updateAccount, setModal, notify }) {
  const cards = account.cards;
  const wallets = account.cryptoWallets || [];
  const walletSymbol = (currency) => ({ BTC: '₿', ETH: 'Ξ', USDT: '₮', USDC: '$', TON: '◈', TRX: '⚡' }[currency] || '₿');
  const openCardAction = (card) => setModal({ type: 'edit-bank', card });
  const removeCard = (card) => {
    updateAccount({ cards: account.cards.filter((item) => item.id !== card.id) });
    notify('Карта удалена');
  };
  const removeWallet = (wallet) => {
    updateAccount({ cryptoWallets: account.cryptoWallets.filter((item) => item.id !== wallet.id) });
    notify('Кошелёк удалён');
  };

  return <>
    <PageHeader eyebrow="Автоматизация" title="Платёжные карты и криптокошельки" description="Храните карты и адреса кошельков, которые можно отправлять клиентам для оплаты." />
    <div className="wallets-page">
      <section className="wallet-surface">
        <div className="wallet-section-heading"><div><h2>Банковские карты</h2><p>Данные карт используются только в демонстрационных сценариях.</p></div><span className="wallet-count">{account.cards.length} карт</span></div>
        <div className="wallet-card-grid">
          {cards.map((card) => <article className={`wallet-card ${card.tone || (card.brand.toLowerCase() === 'mastercard' ? 'demo-dark' : card.brand.toLowerCase() === 'visa' ? 'demo-blue' : 'demo-light')}`} key={card.id}>
            <div className="wallet-card-top"><CardBrandLogo brand={card.brand} /><button className="wallet-card-country" type="button" onClick={() => setModal({ type: 'edit-country', card })}>{card.countryCode ? countryFlag(card.countryCode) : 'RU'}</button></div>
            <strong className="wallet-card-number">•••• •••• •••• {card.last4}</strong>
            <div className="wallet-card-bottom"><div><small>Банк</small><button type="button" onClick={() => openCardAction(card)}>{card.bank || 'Указать банк'}</button></div><div><small>Владелец</small><strong>{card.name || 'Не указано'}</strong></div></div>
            <button className="wallet-card-remove" type="button" aria-label="Удалить карту" title="Удалить карту" onClick={() => removeCard(card)}><Icon name="close" size={14} /></button>
          </article>)}
          <button className="wallet-add-card" type="button" onClick={() => setModal('add-card')}><span><Icon name="plus" size={22} /></span><strong>Добавить карту</strong><small>Добавьте карту для оплаты</small></button>
        </div>
        <div className="wallet-security"><Icon name="lock" size={14} /> Данные карт используются только для демонстрации.</div>
      </section>

      <section className="wallet-surface wallet-crypto-surface">
        <div className="wallet-section-heading"><div><h2>Криптокошельки</h2><p>Адреса для получения оплаты в разных сетях.</p></div><Button variant="secondary" icon="plus" onClick={() => setModal({ type: 'crypto-wallet' })}>Добавить</Button></div>
        {wallets.length === 0 ? <div className="wallet-empty-state"><span className="wallet-coin-icon"><Icon name="credit" size={17} /></span><div><strong>Криптокошельков пока нет</strong><small>Добавьте адрес кошелька, чтобы он появился здесь.</small></div></div> : <div className="wallet-demo-list">{wallets.map((wallet) => <div className="wallet-demo-row" key={wallet.id}><span className={`wallet-coin-icon ${wallet.currency.toLowerCase()}`}>{walletSymbol(wallet.currency)}</span><div className="wallet-demo-copy"><strong>{wallet.currency}</strong><small>{wallet.network}</small><code>{wallet.address}</code></div><div className="wallet-demo-actions"><button type="button" onClick={() => { navigator.clipboard?.writeText(wallet.address); notify('Адрес кошелька скопирован'); }}><Icon name="copy" size={14} /> Копировать</button><button className="wallet-delete" type="button" onClick={() => removeWallet(wallet)}><Icon name="close" size={13} /> Удалить</button></div></div>)}</div>}
        <div className="wallet-security"><Icon name="lock" size={14} /> Используйте только адреса кошельков, принадлежащие вашему аккаунту.</div>
      </section>
    </div>
  </>;
}

function CardsPage({ account, updateAccount, setModal, notify }) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const removeCard = (id) => { const cards = account.cards.filter((card) => card.id !== id); updateAccount({ cards: cards.map((card, index) => ({ ...card, primary: index === 0 })) }); notify('Карта удалена'); };
  const wallets = account.cryptoWallets || [];
  const walletSymbol = (currency) => ({ BTC: '₿', ETH: 'Ξ', USDT: '₮', USDC: '$', TON: '◈', TRX: '⚡' }[currency] || '₿');
  const copyAddress = (address) => { navigator.clipboard?.writeText(address); notify('Адрес кошелька скопирован'); };
  const removeWallet = (id) => { updateAccount({ cryptoWallets: wallets.filter((wallet) => wallet.id !== id) }); notify('Кошелёк удалён'); };
  return <><PageHeader eyebrow="Доход" title="Платёжные карты и криптокошельки" description="Храните карты и адреса кошельков, которые можно отправлять клиентам для оплаты." action={<div className="add-payment-menu"><Button icon="plus" onClick={() => setShowAddMenu((open) => !open)}>Добавить способ оплаты</Button>{showAddMenu && <div className="add-payment-options"><button type="button" onClick={() => { setShowAddMenu(false); setModal('add-card'); }}><span className="payment-option-icon"><Icon name="credit" size={16} /></span><span><strong>Банковская карта</strong><small>Добавить карту для оплаты</small></span></button><button type="button" onClick={() => { setShowAddMenu(false); setModal({ type: 'crypto-wallet' }); }}><span className="payment-option-icon crypto"><span>₿</span></span><span><strong>Криптокошелёк</strong><small>Добавить адрес и сеть</small></span></button></div>}</div>} /><section className="payment-section"><div className="section-heading"><div><h2>Банковские карты</h2><p>Карты для получения оплаты от клиентов.</p></div></div><div className="cards-grid">{account.cards.map((card) => <div className={`payment-card ${card.brand.toLowerCase() === 'mastercard' ? 'mc' : card.brand.toLowerCase()}`} key={card.id}><div className="payment-card-top"><CardBrandLogo brand={card.brand} /><button className="card-country-button" onClick={() => setModal({ type: 'edit-country', card })} aria-label="Изменить страну карты">{card.countryCode ? countryFlag(card.countryCode) : card.country || 'Указать страну'}</button></div><div className="card-number">{card.number ? card.number.replace(/(\d{4})(?=\d)/g, '$1 ') : `•••• •••• •••• ${card.last4}`}</div><div className="payment-card-bottom"><div><small>Банк</small><button className="card-bank-button" onClick={() => setModal({ type: 'edit-bank', card })}>{card.bank || 'Указать банк'}</button></div><div><small>ФИО владельца</small><strong>{card.name || 'Не указано'}</strong></div></div><button className="card-menu icon-button danger-icon" onClick={() => removeCard(card.id)} aria-label={`Удалить карту ${card.name || card.last4}`}><Icon name="close" /></button></div>)}<div className="payment-empty"><span><Icon name="credit" size={19} /></span><strong>Банковские карты ещё не добавлены</strong><small>Выберите способ оплаты в кнопке выше.</small></div></div><div className="security-note"><Icon name="lock" size={16} /><span>Данные карт используются только как демонстрационные.</span></div></section><section className="payment-section crypto-section"><div className="section-heading"><div><h2>Криптокошельки</h2><p>Добавьте несколько адресов для разных валют и сетей.</p></div></div>{wallets.length > 0 ? <div className="wallet-list">{wallets.map((wallet) => <div className="wallet-row" key={wallet.id}><div className={`wallet-icon ${wallet.currency.toLowerCase()}`}>{walletSymbol(wallet.currency)}</div><div className="wallet-copy"><div className="wallet-title-line"><strong>{wallet.name}</strong><span className="wallet-badge">{wallet.currency}</span></div><span className="wallet-network">Сеть {wallet.network}</span><code>{wallet.address}</code></div><div className="wallet-actions"><button className="icon-button" onClick={() => copyAddress(wallet.address)} aria-label={`Скопировать адрес ${wallet.name}`}><Icon name="credit" size={16} /></button><button className="icon-button" onClick={() => setModal({ type: 'crypto-wallet', wallet })} aria-label={`Изменить кошелёк ${wallet.name}`}><Icon name="settings" size={16} /></button><button className="icon-button danger-icon" onClick={() => removeWallet(wallet.id)} aria-label={`Удалить кошелёк ${wallet.name}`}><Icon name="close" size={16} /></button></div></div>)}</div> : <div className="wallet-empty"><div className="wallet-icon">₿</div><div><strong>Криптокошельки ещё не добавлены</strong><p>Добавьте адрес USDT, BTC, ETH или другой валюты.</p></div><span className="wallet-empty-action">Выберите тип выше</span></div>}<div className="security-note"><Icon name="lock" size={16} /><span>Используйте только адреса кошельков, которые принадлежат вашему аккаунту.</span></div></section></>;
}

function SettingsPage({ account, notify }) {
  const [email, setEmail] = useState('vladislav@telepilot.app');
  const [saved, setSaved] = useState(false);
  return <><PageHeader eyebrow="Рабочее пространство" title="Общие настройки" description="Поддерживайте настройки рабочего пространства в актуальном состоянии." /><div className="settings-layout"><div className="settings-main"><section className="panel"><div className="panel-title"><div><h3>Профиль workspace</h3><p>Как ваш workspace выглядит в TelePilot.</p></div></div><div className="form-grid"><Field label="Название workspace" value="Рабочее пространство Владислава" onChange={() => {}} /><Field label="Email владельца" value={email} onChange={setEmail} type="email" /></div><div className="panel-actions"><Button onClick={() => { setSaved(true); notify('Настройки workspace сохранены'); window.setTimeout(() => setSaved(false), 2200); }}>{saved ? 'Сохранено ✓' : 'Сохранить изменения'}</Button></div></section><section className="panel"><div className="panel-title"><div><h3>Уведомления</h3><p>Выберите, что именно вы хотите получать.</p></div></div><div className="toggle-list"><div><div><strong>Еженедельная сводка workspace</strong><p>Краткий обзор сообщений, процента ответов и дохода.</p></div><Toggle checked label="Еженедельная сводка workspace" onChange={() => notify('Настройки уведомлений обновлены')} /></div><div><div><strong>Оповещения Telegram-подключения</strong><p>Получайте уведомления, если основной аккаунт требует внимания.</p></div><Toggle checked label="Оповещения Telegram-подключения" onChange={() => notify('Настройки уведомлений обновлены')} /></div></div></section></div><aside className="settings-side"><div className="side-card plan-card"><span className="eyebrow">Текущий план</span><div className="plan-title"><strong>Pro workspace</strong><span>Ежемесячно</span></div><div className="plan-price">$29 <small>/ month</small></div><div className="plan-rule" /><p>Advanced AI controls, conversation history, pricing, and priority support for one Telegram account.</p><button className="text-button" onClick={() => notify('Открыто управление планом')}>Управлять планом <Icon name="arrow" size={14} /></button></div><button className="logout-button" onClick={() => notify('You have been logged out of the prototype')}><Icon name="logout" size={16} /> Sign out of workspace</button></aside></div></>;
}

function WorkspaceSettingsPageV3({ displayCurrency, setDisplayCurrency, notify }) {
  const [email, setEmail] = useState('vladislav@telepilot.app');
  const [saved, setSaved] = useState(false);
  const saveSettings = () => {
    setSaved(true);
    notify('Настройки workspace сохранены');
    window.setTimeout(() => setSaved(false), 2200);
  };

  return <><PageHeader eyebrow="Рабочее пространство" title="Общие настройки" description="Настройте workspace и валюту, в которой отображается баланс и расход." /><div className="settings-layout settings-layout-clean"><div className="settings-main"><section className="panel"><div className="panel-title"><div><h3>Профиль workspace</h3><p>Эти настройки применяются ко всему рабочему пространству.</p></div></div><div className="form-grid"><Field label="Название workspace" value="Рабочее пространство Владислава" onChange={() => {}} /><Field label="Email владельца" value={email} onChange={setEmail} type="email" /><label className="field"><span>Основная валюта</span><select value={displayCurrency} onChange={(event) => { setDisplayCurrency(event.target.value); notify(`Валюта изменена на ${event.target.value}`); }}>{currencyOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><small>Баланс, ставки и история списаний используют эту валюту.</small></label></div><div className="panel-actions"><Button onClick={saveSettings}>{saved ? 'Сохранено' : 'Сохранить изменения'}</Button></div></section><section className="panel"><div className="panel-title"><div><h3>Уведомления</h3><p>Выберите, что именно вы хотите получать.</p></div></div><div className="toggle-list"><div><div><strong>Еженедельная сводка workspace</strong><p>Краткий обзор сообщений, процента ответов и расхода.</p></div><Toggle checked label="Еженедельная сводка workspace" onChange={() => notify('Настройки уведомлений обновлены')} /></div><div><div><strong>Оповещения Telegram-подключения</strong><p>Получайте уведомления, если основной аккаунт требует внимания.</p></div><Toggle checked label="Оповещения Telegram-подключения" onChange={() => notify('Настройки уведомлений обновлены')} /></div></div></section></div></div></>;
}

function WorkspaceSettingsPageV2({ displayCurrency, setDisplayCurrency, balanceRub, onOpenBilling, notify }) {
  const [email, setEmail] = useState('vladislav@telepilot.app');
  const [saved, setSaved] = useState(false);
  const saveSettings = () => {
    setSaved(true);
    notify('Настройки workspace сохранены');
    window.setTimeout(() => setSaved(false), 2200);
  };

  return <><PageHeader eyebrow="Рабочее пространство" title="Общие настройки" description="Настройте workspace и валюту, в которой отображается баланс и расход." /><div className="settings-layout"><div className="settings-main"><section className="panel"><div className="panel-title"><div><h3>Профиль workspace</h3><p>Эти настройки применяются ко всему рабочему пространству.</p></div></div><div className="form-grid"><Field label="Название workspace" value="Рабочее пространство Владислава" onChange={() => {}} /><Field label="Email владельца" value={email} onChange={setEmail} type="email" /><label className="field"><span>Основная валюта</span><select value={displayCurrency} onChange={(event) => { setDisplayCurrency(event.target.value); notify(`Валюта изменена на ${event.target.value}`); }}>{currencyOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><small>Баланс, калькулятор и история списаний используют эту валюту.</small></label></div><div className="panel-actions"><Button onClick={saveSettings}>{saved ? 'Сохранено' : 'Сохранить изменения'}</Button></div></section><section className="panel"><div className="panel-title"><div><h3>Уведомления</h3><p>Выберите, что именно вы хотите получать.</p></div></div><div className="toggle-list"><div><div><strong>Еженедельная сводка workspace</strong><p>Краткий обзор сообщений, процента ответов и расхода.</p></div><Toggle checked label="Еженедельная сводка workspace" onChange={() => notify('Настройки уведомлений обновлены')} /></div><div><div><strong>Оповещения Telegram-подключения</strong><p>Получайте уведомления, если основной аккаунт требует внимания.</p></div><Toggle checked label="Оповещения Telegram-подключения" onChange={() => notify('Настройки уведомлений обновлены')} /></div></div></section></div><aside className="settings-side"><div className="side-card billing-settings-card"><span className="eyebrow">Баланс и расход</span><div className="plan-title"><strong>{formatMoney(balanceRub, 'RUB', displayCurrency)}</strong><span>Демо-баланс</span></div><div className="plan-price">0,07 ₽ <small>за аккаунт-минуту</small></div><div className="plan-rule" /><p>AI-ответы: 3 ₽ за один ответ. Списание происходит из баланса только за фактическое использование.</p><button className="text-button" onClick={onOpenBilling}>Открыть биллинг <Icon name="arrow" size={14} /></button></div></aside></div></>;
}

function WorkspaceSettingsPage({ displayCurrency, setDisplayCurrency, balanceRub, onOpenBilling, notify }) {
  const [email, setEmail] = useState('vladislav@telepilot.app');
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);
    notify('Настройки workspace сохранены');
    window.setTimeout(() => setSaved(false), 2200);
  };

  return <><PageHeader eyebrow="Рабочее пространство" title="Общие настройки" description="Выберите валюту, в которой отображаются все суммы TelePilot." /><div className="settings-layout"><div className="settings-main"><section className="panel"><div className="panel-title"><div><h3>Профиль workspace</h3><p>Эти настройки применяются ко всему рабочему пространству.</p></div></div><div className="form-grid"><Field label="Название workspace" value="Рабочее пространство Владислава" onChange={() => {}} /><Field label="Email владельца" value={email} onChange={setEmail} type="email" /><label className="field"><span>Основная валюта</span><select value={displayCurrency} onChange={(event) => { setDisplayCurrency(event.target.value); notify(`Валюта изменена на ${event.target.value}`); }}>{currencyOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><small>Все суммы, чеки и средний чек автоматически конвертируются в эту валюту.</small></label></div><div className="panel-actions"><Button onClick={saveSettings}>{saved ? 'Сохранено' : 'Сохранить изменения'}</Button></div></section><section className="panel"><div className="panel-title"><div><h3>Уведомления</h3><p>Выберите, что именно вы хотите получать.</p></div></div><div className="toggle-list"><div><div><strong>Еженедельная сводка workspace</strong><p>Краткий обзор сообщений, процента ответов и дохода.</p></div><Toggle checked label="Еженедельная сводка workspace" onChange={() => notify('Настройки уведомлений обновлены')} /></div><div><div><strong>Оповещения Telegram-подключения</strong><p>Получайте уведомления, если основной аккаунт требует внимания.</p></div><Toggle checked label="Оповещения Telegram-подключения" onChange={() => notify('Настройки уведомлений обновлены')} /></div></div></section></div><aside className="settings-side"><div className="side-card plan-card"><span className="eyebrow">Текущий план</span><div className="plan-title"><strong>Pro workspace</strong><span>Ежемесячно</span></div><div className="plan-price">{formatMoney(29, 'USD', displayCurrency)} <small>/ month</small></div><div className="plan-rule" /><p>Advanced AI controls, conversation history, pricing, and priority support for one Telegram account.</p><button className="text-button" onClick={() => notify('Открыто управление планом')}>Управлять планом <Icon name="arrow" size={14} /></button></div></aside></div></>;
}

function ConnectTelegramModal({ onClose, onConnect }) {
  const [phone, setPhone] = useState('+7 999 123 45 67');
  const [code, setCode] = useState('');
  const [code2fa, setCode2fa] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  return <Modal title="Добавить Telegram-аккаунты" subtitle="Подключите аккаунт через QR-код или по номеру телефона. Для завершения может потребоваться 2FA." onClose={onClose} wide>
    <div className="modal-body connect-modal-body">
      <div className="connect-columns">
        <div className="phone-connect-panel">
          {step === 1 && <>
            <Field label="Номер телефона" value={phone} onChange={(value) => { setPhone(value); setError(''); }} placeholder="+7 999 123 45 67" error={error} />
            <Button className="full-button" onClick={() => { if (!phone.trim()) { setError('Введите номер телефона.'); return; } setError(''); setStep(2); }}>Получить код в Telegram</Button>
          </>}
          {step === 2 && <>
            <div className="connect-step-note"><span className="step-check"><Icon name="check" size={13} /></span><span>Код отправлен в Telegram на номер <strong>{phone}</strong></span></div>
            <Field label="Код из Telegram" value={code} onChange={(value) => { setCode(value); setError(''); }} placeholder="Введите 5 цифр" error={error} />
            <div className="connect-inline-actions"><button className="text-button" onClick={() => setStep(1)}>Изменить номер</button><Button onClick={() => { if (!code.trim()) { setError('Введите код из Telegram.'); return; } setError(''); setStep(3); }}>Проверить код</Button></div>
          </>}
          {step === 3 && <>
            <div className="connect-step-note"><span className="step-check"><Icon name="check" size={13} /></span><span>Код подтверждён. Если в Telegram включена 2FA, введите пароль ниже.</span></div>
            <Field label="Пароль 2FA" value={code2fa} onChange={(value) => { setCode2fa(value); setError(''); }} placeholder="Введите пароль 2FA" type="password" error={error} />
            <Button className="full-button" onClick={() => { setError(''); onConnect(); }}>Подключить аккаунт</Button>
          </>}
          <div className="connect-progress"><span className={step >= 1 ? 'active' : ''}>Номер</span><i /><span className={step >= 2 ? 'active' : ''}>Код</span><i /><span className={step >= 3 ? 'active' : ''}>2FA</span></div>
        </div>
        <div className="qr-connect-panel">
          <div className="qr-box">
            <div className="qr-pattern" aria-label="QR-код" />
          </div>
          <div className="connect-copy">
            <strong>Или войдите по QR-коду</strong>
            <p>Откройте Telegram → Настройки → Устройства → Подключить устройство и отсканируйте код.</p>
          </div>
          <span className="qr-status"><span className="online-dot" />QR-код активен 02:00</span>
        </div>
      </div>
      <div className="modal-actions"><Button variant="secondary" onClick={onClose}>Отмена</Button></div>
    </div>
  </Modal>;
}

function ReceiptModal({ account, accounts, onClose, onSave }) {
  const [selectedAccountId, setSelectedAccountId] = useState(account.id);
  const selectedAccount = accounts.find((item) => item.id === selectedAccountId) || account;
  const [product, setProduct] = useState(selectedAccount.prices[0]?.title || 'Консультация');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [receiptDate, setReceiptDate] = useState(getLocalDateTimeInputValue);
  const [receiptDatePart = '', receiptTimePart = ''] = receiptDate.split('T');
  const [method, setMethod] = useState('card');
  const cardTargets = selectedAccount.cards.length > 0 ? selectedAccount.cards.map((card) => `Карта •••• ${card.last4 || '4242'}`) : ['Visa •••• 4242'];
  const walletTargets = selectedAccount.cryptoWallets?.length > 0 ? selectedAccount.cryptoWallets.map((wallet) => `${wallet.currency} · ${wallet.network}`) : ['USDT · TRC20', 'USDC · TON'];
  const [target, setTarget] = useState(cardTargets[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    setTarget(method === 'card' ? cardTargets[0] : walletTargets[0]);
  }, [selectedAccountId, method]);

  const submit = () => {
    if (!product.trim() || !amount || Number(amount) <= 0) {
      setError('Введите услугу и корректную сумму.');
      return;
    }
    onSave({ id: `TL-${Date.now().toString().slice(-4)}`, accountId: selectedAccount.id, accountName: selectedAccount.name, product: product.trim(), amount, currency, date: new Date(receiptDate).toISOString(), method, type: method, target });
  };

  return <Modal title="Добавить чек" subtitle={`Выберите аккаунт, на который пришла оплата.`} onClose={onClose}><div className="modal-body"><div className="receipt-account-preview"><Avatar account={selectedAccount} size="sm" /><div><label className="receipt-account-picker"><span>Telegram-аккаунт</span><select value={selectedAccountId} onChange={(event) => { const next = accounts.find((item) => item.id === event.target.value) || account; setSelectedAccountId(next.id); setProduct(next.prices[0]?.title || 'Консультация'); }}><option value={selectedAccount.id}>{selectedAccount.name} · {selectedAccount.username}</option>{accounts.filter((item) => item.id !== selectedAccount.id).map((item) => <option key={item.id} value={item.id}>{item.name} · {item.username}</option>)}</select></label></div></div><Field label="Услуга" value={product} onChange={setProduct} placeholder="Например: Консультация" /><div className="form-grid"><Field label="Сумма" value={amount} onChange={(value) => { setAmount(value); setError(''); }} placeholder="0.00" type="number" error={error} /><label className="field"><span>Валюта</span><select value={currency} onChange={(event) => setCurrency(event.target.value)}><option>USD</option><option>EUR</option><option>RUB</option><option>USDT</option></select></label></div><label className="field"><span>Способ оплаты</span><select value={method} onChange={(event) => { const nextMethod = event.target.value; setMethod(nextMethod); setTarget(nextMethod === 'card' ? cardTargets[0] : walletTargets[0]); }}><option value="card">Банковская карта</option><option value="crypto">Криптовалюта</option></select></label><label className="field"><span>Куда поступила оплата</span><select value={target} onChange={(event) => setTarget(event.target.value)}>{(method === 'card' ? cardTargets : walletTargets).map((item) => <option key={item}>{item}</option>)}</select></label><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Отмена</Button><Button onClick={submit}>Добавить чек</Button></div></div></Modal>;
}

function ReceiptModalV2({ account, accounts, onClose, onSave }) {
  const [selectedAccountId, setSelectedAccountId] = useState(account.id);
  const selectedAccount = accounts.find((item) => item.id === selectedAccountId) || account;
  const [product, setProduct] = useState(selectedAccount.prices[0]?.title || 'Консультация');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [receiptDate, setReceiptDate] = useState(getLocalDateTimeInputValue);
  const [receiptDatePart = '', receiptTimePart = ''] = receiptDate.split('T');
  const [method, setMethod] = useState('card');
  const [error, setError] = useState('');
  const targets = method === 'card' ? (selectedAccount.cards.length ? selectedAccount.cards.map((card) => `Карта •••• ${card.last4 || '4242'}`) : ['Visa •••• 4242']) : (selectedAccount.cryptoWallets?.length ? selectedAccount.cryptoWallets.map((wallet) => `${wallet.currency} · ${wallet.network}`) : ['USDT · TRC20', 'USDC · TON']);
  const [target, setTarget] = useState(targets[0]);

  useEffect(() => setTarget(targets[0]), [selectedAccountId, method]);
  const submit = () => {
    if (!product.trim() || !amount || Number(amount) <= 0) { setError('Введите услугу и корректную сумму.'); return; }
    const [hours, minutes] = receiptTimePart.split(':').map(Number);
    if (!receiptDatePart || !/^\d{2}:\d{2}$/.test(receiptTimePart) || hours > 23 || minutes > 59) { setError('Укажите дату и время в формате ЧЧ:ММ.'); return; }
    onSave({ id: `TL-${Date.now().toString().slice(-4)}`, accountId: selectedAccount.id, accountName: selectedAccount.name, product: product.trim(), amount, currency, date: new Date(receiptDate).toISOString(), method, type: method, target });
  };

  return <Modal title="Добавить чек" subtitle="Выберите аккаунт, на который пришла оплата." onClose={onClose}><div className="modal-body"><div className="receipt-account-preview"><Avatar account={selectedAccount} size="sm" /><label className="receipt-account-picker"><span>Telegram-аккаунт</span><select value={selectedAccountId} onChange={(event) => { const next = accounts.find((item) => item.id === event.target.value) || account; setSelectedAccountId(next.id); setProduct(next.prices[0]?.title || 'Консультация'); }}>{accounts.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.username}</option>)}</select></label></div><Field label="Услуга" value={product} onChange={setProduct} placeholder="Например: Консультация" /><div className="form-grid"><Field label="Сумма" value={amount} onChange={(value) => { setAmount(value); setError(''); }} placeholder="0.00" type="number" error={error} /><label className="field"><span>Валюта</span><select value={currency} onChange={(event) => setCurrency(event.target.value)}><option>USD</option><option>EUR</option><option>RUB</option><option>UAH</option><option>BYN</option><option>USDT</option></select></label><label className="field receipt-date-field"><span>Дата оплаты</span><input type="date" value={receiptDatePart} onChange={(event) => setReceiptDate(`${event.target.value}T${receiptTimePart}`)} /></label><label className="field receipt-time-field"><span>Время оплаты (24 ч)</span><input type="text" inputMode="numeric" pattern="[0-2][0-9]:[0-5][0-9]" placeholder="ЧЧ:ММ" value={receiptTimePart} onChange={(event) => setReceiptDate(`${receiptDatePart}T${event.target.value.slice(0, 5)}`)} /></label></div><label className="field"><span>Способ оплаты</span><select value={method} onChange={(event) => setMethod(event.target.value)}><option value="card">Банковская карта</option><option value="crypto">Криптовалюта</option></select></label><label className="field"><span>Куда поступила оплата</span><select value={target} onChange={(event) => setTarget(event.target.value)}>{targets.map((item) => <option key={item}>{item}</option>)}</select></label><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Отмена</Button><Button onClick={submit}>Добавить чек</Button></div></div></Modal>;
}

function TopUpModal({ displayCurrency, onClose, onSave }) {
  const [amount, setAmount] = useState('1000');
  const [method, setMethod] = useState('Банковская карта');
  const [error, setError] = useState('');
  const submit = () => {
    const value = Number(amount);
    if (!value || value <= 0) {
      setError('Введите сумму пополнения.');
      return;
    }
    onSave(value, method);
  };

  return <Modal title="Пополнить баланс" subtitle="Выберите сумму и удобный способ оплаты. Сейчас это демо-сценарий без реального списания." onClose={onClose}><div className="modal-body top-up-modal-body"><div className="top-up-methods"><button type="button" className={method === 'Банковская карта' ? 'active' : ''} onClick={() => setMethod('Банковская карта')}><Icon name="credit" size={17} /><span>Карта</span><small>Visa / Mastercard / МИР</small></button><button type="button" className={method === 'Криптовалюта' ? 'active' : ''} onClick={() => setMethod('Криптовалюта')}><span className="top-up-method-mark">₿</span><span>Криптовалюта</span><small>USDT, BTC, ETH</small></button><button type="button" className={method === 'CryptoBot в Telegram' ? 'active' : ''} onClick={() => setMethod('CryptoBot в Telegram')}><span className="top-up-method-mark telegram">✈</span><span>CryptoBot</span><small>В Telegram</small></button></div><Field label={`Сумма пополнения (${displayCurrency})`} value={amount} onChange={(value) => { setAmount(value); setError(''); }} placeholder="1000" type="number" error={error} /><div className="top-up-demo-note"><Icon name="lock" size={14} /><span>Выбранный способ: <strong>{method}</strong><br />После подключения backend здесь откроется реальная форма оплаты.</span></div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Отмена</Button><Button onClick={submit}>Пополнить в демо</Button></div></div></Modal>;
}

function PriceModal({ price, onClose, onSave }) {
  const [title, setTitle] = useState(price?.title || '');
  const [description, setDescription] = useState(price?.description || '');
  const [amount, setAmount] = useState(price?.amount || '');
  const [error, setError] = useState('');
  const submit = () => {
    if (!title || !amount || Number(amount) <= 0) {
      setError('Введите корректное название и сумму.');
      return;
    }
    onSave({ title, description, amount, currency: price?.currency || 'USD', status: price?.status || 'Active' });
  };

  return (
    <Modal title={price ? 'Редактировать цену' : 'Добавить цену'} subtitle="Создайте понятное предложение для ваших контактов." onClose={onClose}>
      <div className="modal-body">
        <Field label="Название предложения" value={title} onChange={setTitle} placeholder="Например: Сессия стратегии" />
        <Field label="Описание" value={description} onChange={setDescription} placeholder="Что входит в предложение?" />
        <div className="form-grid">
          <Field label="Сумма" value={amount} onChange={setAmount} placeholder="0.00" type="number" error={error} />
          <label className="field">
            <span>Валюта</span>
            <select defaultValue={price?.currency || 'USD'}>
              <option>USD</option>
              <option>EUR</option>
              <option>BYN</option>
            </select>
          </label>
        </div>
        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose}>Отмена</Button>
          <Button onClick={submit}>Сохранить цену</Button>
        </div>
      </div>
    </Modal>
  );
}

function detectCardBrand(number) {
  const compact = number.replace(/\D/g, '');
  const prefix2 = Number(compact.slice(0, 2));
  const prefix4 = Number(compact.slice(0, 4));
  if (compact.startsWith('4')) return 'VISA';
  if (prefix4 >= 2200 && prefix4 <= 2204) return 'МИР';
  if ((prefix2 >= 51 && prefix2 <= 55) || (prefix4 >= 2221 && prefix4 <= 2720)) return 'MASTERCARD';
  return 'CARD';
}

function detectCardBank(number) {
  const compact = number.replace(/\D/g, '');
  const binMatch = binCatalog.filter((item) => compact.startsWith(item.prefix)).sort((a, b) => b.prefix.length - a.prefix.length)[0];
  if (binMatch) return binMatch.bank;
  const bankPrefixes = {
    '4276': 'Сбербанк',
    '5469': 'Сбербанк',
    '4377': 'Т-Банк',
    '5213': 'Т-Банк',
    '5486': 'Альфа-Банк',
    '4441': 'Альфа-Банк',
    '4890': 'ВТБ'
  };
  const prefix = Object.keys(bankPrefixes).find((item) => compact.startsWith(item));
  return prefix ? bankPrefixes[prefix] : 'Банк не определён';
}

function detectCountryFromBank(bank) {
  const normalized = bank.toLowerCase();
  if (['сбербанк', 'т-банк', 'тинькофф', 'альфа-банк', 'втб'].some((name) => normalized.includes(name))) return { name: 'Россия', code: 'RU' };
  return { name: '', code: '' };
}

function detectCardCountry(number) {
  const compact = number.replace(/\D/g, '');
  const binMatch = binCatalog.filter((item) => compact.startsWith(item.prefix)).sort((a, b) => b.prefix.length - a.prefix.length)[0];
  if (binMatch) return { country: binMatch.country, countryCode: binMatch.countryCode };
  const bank = detectCardBank(number);
  return bank === 'Банк не определён' ? { country: '', countryCode: '' } : { country: 'Россия', countryCode: 'RU' };
}

function countryFlag(countryCode) {
  if (!countryCode) return '';
  return countryCode.toUpperCase().replace(/[A-Z]/g, (letter) => String.fromCodePoint(letter.charCodeAt(0) + 127397));
}

function CardModal({ onClose, onSave }) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [detectedBrand, setDetectedBrand] = useState('');
  const [showBankSuggestions, setShowBankSuggestions] = useState(false);
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [error, setError] = useState('');
  const bankAutocompleteRef = useRef(null);
  const countryAutocompleteRef = useRef(null);
  useEffect(() => {
    const closeSuggestions = (event) => {
      if (!bankAutocompleteRef.current?.contains(event.target)) setShowBankSuggestions(false);
      if (!countryAutocompleteRef.current?.contains(event.target)) setShowCountrySuggestions(false);
    };
    document.addEventListener('mousedown', closeSuggestions);
    return () => document.removeEventListener('mousedown', closeSuggestions);
  }, []);
  const bin = number.slice(0, 6);
  useEffect(() => {
    if (bin.length < 6) return undefined;
    let cancelled = false;
    fetch(`/api/bin/${bin}`)
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        const data = payload?.data;
        if (cancelled || !data) return;
        const scheme = data.card?.scheme?.toUpperCase();
        const brand = scheme === 'MASTERCARD' ? 'MASTERCARD' : scheme === 'VISA' ? 'VISA' : scheme === 'MIR' ? 'МИР' : scheme || 'CARD';
        setDetectedBrand(brand);
        if (data.bank?.name) setBank(data.bank.name);
        if (data.country?.name) setCountry(data.country.name);
        if (data.country?.code) setCountryCode(data.country.code.toUpperCase());
        setShowBankSuggestions(false);
        setShowCountrySuggestions(false);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [bin]);
  const suggestions = bank ? bankCatalog.filter((item) => item.name.toLowerCase().includes(bank.toLowerCase())) : bankCatalog.slice(0, 5);
  const countrySuggestions = country ? countryOptions.filter((item) => item.name.toLowerCase().includes(country.toLowerCase())) : countryOptions;
  const chooseBank = (item) => { setBank(item.name); setCountry(item.country); setCountryCode(item.countryCode); setShowBankSuggestions(false); };
  const handleNumber = (value) => {
    const nextNumber = value.replace(/\D/g, '').slice(0, 16);
    const detectedBank = detectCardBank(nextNumber);
    const matchedBank = bankCatalog.find((item) => item.name === detectedBank);
    setNumber(nextNumber);
    setError('');
    if (matchedBank) chooseBank(matchedBank);
  };
  return <Modal title="Добавить платёжную карту" subtitle="Добавьте реквизиты, банк и страну карты для передачи клиентам." onClose={onClose}><div className="modal-body"><Field label="ФИО владельца" value={name} onChange={setName} placeholder="Иванов Иван Иванович" /><Field label="Номер карты" value={number} onChange={handleNumber} placeholder="1234 5678 9012 3456" /> <div className="bank-autocomplete" ref={bankAutocompleteRef}><Field label="Банк" value={bank} onChange={(value) => { setBank(value); setCountryCode(''); setShowBankSuggestions(true); }} onFocus={() => setShowBankSuggestions(true)} placeholder="Начните вводить название банка" />{showBankSuggestions && suggestions.length > 0 && <div className="bank-suggestions">{suggestions.map((item) => <button type="button" key={item.name} onClick={() => chooseBank(item)}><strong>{item.name}</strong><span>{item.country}</span></button>)}</div>}</div><div className="bank-autocomplete" ref={countryAutocompleteRef}><Field label="Страна карты" value={country} onChange={(value) => { setCountry(value); setCountryCode(''); setShowCountrySuggestions(true); }} onFocus={() => setShowCountrySuggestions(true)} placeholder="Начните вводить страну" />{showCountrySuggestions && countrySuggestions.length > 0 && <div className="bank-suggestions">{countrySuggestions.map((item) => <button type="button" key={item.name} onClick={() => { setCountry(item.name); setCountryCode(item.code); setShowCountrySuggestions(false); }}><strong>{item.name}</strong><span>{countryFlag(item.code)}</span></button>)}</div>}{country && countryCode && <small className="selected-country">{countryFlag(countryCode)} {country}</small>}</div>{error && <small className="error card-form-error">{error}</small>}<div className="modal-actions"><Button variant="secondary" onClick={onClose}>Отмена</Button><Button onClick={() => { const brand = detectedBrand || detectCardBrand(number); if (number.length < 12 || !name) { setError('Введите ФИО владельца и полный номер карты.'); return; } onSave({ brand, bank: bank || detectCardBank(number), country, countryCode, name, number, last4: number.slice(-4) }); }}>Добавить карту</Button></div></div></Modal>;
}

function CryptoWalletModal({ wallet, onClose, onSave }) {
  const [name, setName] = useState(wallet?.name || 'Основной кошелёк');
  const [currency, setCurrency] = useState(wallet?.currency || 'USDT');
  const [network, setNetwork] = useState(wallet?.network || 'TRC20');
  const [address, setAddress] = useState(wallet?.address || '');
  const [error, setError] = useState('');

  const submit = () => {
    if (!name.trim() || !address.trim()) {
      setError('Введите название и адрес кошелька.');
      return;
    }
    onSave({ name: name.trim(), currency, network, address: address.trim() });
  };

  return <Modal title={wallet ? 'Изменить криптокошелёк' : 'Добавить криптокошелёк'} subtitle="Сохраните адрес для получения оплаты в выбранной сети." onClose={onClose}><div className="modal-body"><Field label="Название кошелька" value={name} onChange={setName} placeholder="Например: USDT для клиентов" /><div className="form-grid"><label className="field"><span>Валюта</span><select value={currency} onChange={(event) => setCurrency(event.target.value)}><option>USDT</option><option>USDC</option><option>BTC</option><option>ETH</option><option>TON</option><option>TRX</option></select></label><label className="field"><span>Сеть</span><select value={network} onChange={(event) => setNetwork(event.target.value)}><option>TRC20</option><option>ERC20</option><option>BEP20</option><option>TON</option><option>Bitcoin</option><option>Solana</option></select></label></div><Field label="Адрес кошелька" value={address} onChange={(value) => { setAddress(value); setError(''); }} placeholder="Вставьте полный адрес" error={error} /><div className="wallet-warning"><Icon name="lock" size={15} /><span>Проверьте сеть и адрес перед сохранением. Это демо-интерфейс, реальные переводы не выполняются.</span></div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Отмена</Button><Button onClick={submit}>{wallet ? 'Сохранить изменения' : 'Добавить кошелёк'}</Button></div></div></Modal>;
}

function BankModal({ card, onClose, onSave }) {
  const [bank, setBank] = useState(card.bank || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const bankAutocompleteRef = useRef(null);
  useEffect(() => {
    const closeSuggestions = (event) => {
      if (!bankAutocompleteRef.current?.contains(event.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', closeSuggestions);
    return () => document.removeEventListener('mousedown', closeSuggestions);
  }, []);
  const suggestions = bank ? bankCatalog.filter((item) => item.name.toLowerCase().includes(bank.toLowerCase())) : bankCatalog.slice(0, 5);
  return <Modal title="Банк карты" subtitle="Выберите банк из списка или введите название вручную." onClose={onClose}><div className="modal-body"><div className="bank-autocomplete" ref={bankAutocompleteRef}><Field label="Название банка" value={bank} onChange={(value) => { setBank(value); setShowSuggestions(true); }} onFocus={() => setShowSuggestions(true)} placeholder="Начните вводить название банка" />{showSuggestions && suggestions.length > 0 && <div className="bank-suggestions">{suggestions.map((item) => <button type="button" key={item.name} onClick={() => { setBank(item.name); setShowSuggestions(false); }}><strong>{item.name}</strong><span>{item.country}</span></button>)}</div>}</div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Отмена</Button><Button onClick={() => onSave(bank.trim() || 'Банк не определён')}>Сохранить</Button></div></div></Modal>;
}

function CountryModal({ card, onClose, onSave }) {
  const [country, setCountry] = useState(card.country || '');
  return <Modal title="Страна карты" subtitle="Укажите страну вручную, если её не удалось определить автоматически." onClose={onClose}><div className="modal-body"><Field label="Страна" value={country} onChange={setCountry} placeholder="Например: Россия" /><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Отмена</Button><Button onClick={() => onSave(country.trim() || 'Страна не указана')}>Сохранить</Button></div></div></Modal>;
}

function AuthPage({ type, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const content = type === 'registration' ? { title: 'Начните с комфортной переписки', subtitle: 'Создайте workspace для важных разговоров и AI-поддержки.', button: 'Создать workspace', prompt: 'Уже есть аккаунт?', link: 'Войти' } : type === 'forgot-password' ? { title: 'Сбросить пароль', subtitle: 'Введите email и мы отправим безопасную ссылку для восстановления доступа.', button: 'Отправить ссылку', prompt: 'Вспомнили?', link: 'Вернуться ко входу' } : { title: 'Добро пожаловать', subtitle: 'Войдите через основной Telegram-аккаунт, чтобы открыть рабочее пространство.', button: 'Войти в workspace', prompt: 'Новичок в TelePilot?', link: 'Создать аккаунт' };
  return <div className="auth-shell"><div className="auth-showcase"><div className="brand"><div className="brand-mark"><Icon name="spark" size={18} /></div><span>tele<span>pilot</span></span></div><div className="showcase-copy"><span className="eyebrow light">Спокойствие в каждой беседе</span><h1>Позвольте ИИ взять на себя рутину.</h1><p>TelePilot добавляет вашему Telegram присутствию тёплый и продуманный подход даже в ваше отсутствие.</p></div><div className="showcase-quote">“Это как будто у вас есть замечательный ассистент, который знает, как я бы ответил.”<span>— Sofia Laurent, Pro customer</span></div></div><div className="auth-form-side"><div className="auth-form-wrap"><button className="back-link" onClick={() => onNavigate('dashboard')}><Icon name="arrow" size={14} /> Вернуться на сайт</button><div className="auth-form"><span className="eyebrow">{type === 'registration' ? 'Начать' : 'Добро пожаловать'}</span><h2>{content.title}</h2><p>{content.subtitle}</p>{submitted ? <div className="success-state"><div className="success-icon"><Icon name="check" /></div><h3>Проверьте почту</h3><p>Мы отправили безопасную ссылку на <strong>{email}</strong>.</p><Button variant="secondary" onClick={() => setSubmitted(false)}>Использовать другой email</Button></div> : <>{type === 'login' && <><button className="telegram-login" onClick={() => onNavigate('dashboard')}><span>✈</span>Продолжить через Telegram <Icon name="arrow" size={15} /></button><div className="auth-divider"><span>или продолжить через email</span></div></>}<div className="auth-fields">{type === 'registration' && <Field label="Полное имя" value="" onChange={() => {}} placeholder="Владислав" />}<Field label="Email адрес" value={email} onChange={setEmail} placeholder="you@company.com" type="email" />{type !== 'forgot-password' && <Field label="Пароль" value={password} onChange={setPassword} placeholder="Минимум 8 символов" type="password" />}</div>{type === 'login' && <div className="auth-options"><label><input type="checkbox" /> Запомнить меня</label><button onClick={() => onNavigate('forgot-password')}>Забыли пароль?</button></div>}<Button className="full-button" onClick={() => type === 'forgot-password' ? setSubmitted(true) : onNavigate('dashboard')}>{content.button} <Icon name="arrow" size={15} /></Button></>}<div className="auth-switch"><span>{content.prompt}</span><button onClick={() => onNavigate(type === 'login' ? 'registration' : 'login')}>{content.link}</button></div><small className="auth-legal">By continuing, you agree to our Terms of service and Privacy policy.</small></div></div></div></div>;
}

const rootElement = document.getElementById('root');
const root = rootElement._telePilotRoot ?? createRoot(rootElement);
rootElement._telePilotRoot = root;
root.render(<App />);
