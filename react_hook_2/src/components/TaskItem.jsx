import { memo } from 'react';
import { useLanguage } from '../LanguageContext.jsx'; // Импортируем хук языка

export const TaskItem = memo(function TaskItem({ task, onToggle, onRemove, onRename }) {
  console.log('Рисуем задачу:', task.text);
  const { t } = useLanguage(); // Вызываем хук ВНУТРИ компонента

  function handleEditClick() {
    const newText = prompt(t.promptText, task.text); /* Используем перевод в prompt */
    if (newText !== null && newText.trim() !== '') {
      onRename(task.id, newText.trim());
    }
  }

  return (
    <li className={task.done ? 'done' : ''}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <span>{task.text}</span>
      <button onClick={handleEditClick} style={{ marginRight: '8px' }}>✏️</button>
      <button onClick={() => onRemove(task.id)}>x</button>
    </li>
  );
});
