import { createContext, useContext, useState, useMemo } from 'react';

const LanguageContext = createContext(null);

const translations = {
  ru: {
    title: 'Менеджер задач',
    themeLight: 'Светлая',
    themeDark: 'Тёмная',
    placeholder: 'Новая задача',
    addButton: 'Добавить',
    filterAll: 'Все',
    filterActive: 'Активные',
    filterDone: 'Готовые',
    total: 'Всего',
    done: 'выполнено',
    promptText: 'Введите новое название задачи:',
  },
  en: {
    title: 'Task Manager',
    themeLight: 'Light',
    themeDark: 'Dark',
    placeholder: 'New task',
    addButton: 'Add',
    filterAll: 'All',
    filterActive: 'Active',
    filterDone: 'Done',
    total: 'Total',
    done: 'done',
    promptText: 'Enter new task name:',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru');

  const value = useMemo(() => ({
    lang,
    setLang,
    t: translations[lang], 
  }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage нужно вызывать внутри LanguageProvider');
  return ctx;
}
