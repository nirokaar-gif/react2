import { useId, useRef, useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext.jsx';

export function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const inputId = useId();
  const { t } = useLanguage();

  
  useEffect(() => {
    function handleKeyDown(e) {
      
      
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault(); 
        inputRef.current?.focus(); 
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    onAdd(clean);
    setText('');
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr">{t.placeholder}</label>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
      />
      <button type="submit">{t.addButton}</button>
    </form>
  );
}
