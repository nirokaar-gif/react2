import { useReducer, useState, useMemo, useCallback } from 'react';
import { tasksReducer } from './tasksReducer.js';
import { useTheme } from './ThemeContext.jsx';
import { useLanguage } from './LanguageContext.jsx'; 
import { AddTaskForm } from './components/AddTaskForm.jsx';
import { TaskList } from './components/TaskList.jsx';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { LanguageToggle } from './components/LanguageToggle.jsx';

export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const { theme } = useTheme();
  const { t } = useLanguage(); 
  const [filter, setFilter] = useState('all');
  

  const handleAdd = useCallback((text) => {
    dispatch({ type: 'add', task: { id: crypto.randomUUID(), text, done: false } });
  }, []);

  const handleToggle = useCallback((id) => dispatch({ type: 'toggle', id }), []);
  const handleRemove = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const handleRename = useCallback((id, text) => dispatch({ type: 'rename', id, text }), []);

  const visibleTasks = useMemo(() => {
    if (filter === 'done') return tasks.filter((t) => t.done);
    if (filter === 'active') return tasks.filter((t) => !t.done);
    return tasks;
  }, [tasks, filter]);

  const doneCount = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);
  
  
const donePercentage = useMemo(() => {
  if (tasks.length === 0) return 0;
  return Math.round((doneCount / tasks.length) * 100);
}, [tasks.length, doneCount]);

  return (
    <div className={'app ' + theme}>
      <div className="card">
        <header className="top">
          <h1>{t.title}</h1> 
          <div>
            <ThemeToggle />
            <LanguageToggle /> 
          </div>
        </header>
        
        <AddTaskForm onAdd={handleAdd} />

        <div className="tabs">
          {[
            ['all', t.filterAll],
            ['active', t.filterActive],
            ['done', t.filterDone],
          ].map(([key, label]) => (
            <button
              key={key}
              className={filter === key ? 'active' : ''}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="muted">
  {t.total}: {tasks.length}, {t.done}: {doneCount} ({donePercentage}%)
</p>

        
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onRename={handleRename}
        />
      </div>
    </div>
  );
}
