import { useLanguage } from '../LanguageContext.jsx';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button 
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      style={{ marginLeft: '8px' }}
    >
      {lang === 'ru' ? '🇬🇧 EN' : '🇷🇺 RU'}
    </button>
  );
}
