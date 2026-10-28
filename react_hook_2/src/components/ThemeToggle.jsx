import { useTheme } from '../ThemeContext.jsx';
import { useLanguage } from '../LanguageContext.jsx'; // 1. Добавили импорт

export function ThemeToggle() {
  // 2. Перенесли хуки ВНУТРЬ функции компонента
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage(); 

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {/* 3. Заменили текст на переведённые значения из контекста */}
      {theme === 'light' ? t.themeDark : t.themeLight}
    </button>
  );
}
