import React from 'react';
import classes from './RunsList.module.css';

const STATUS_LABELS = {
  queued: 'Queued · Ожидает',
  running: 'Running · Выполняется',
  succeeded: 'Succeeded · Успешно',
  failed: 'Failed · Ошибка',
};

export const formatDuration = (seconds) => {
  if (seconds === undefined || seconds === null) return '—';
  if (seconds < 60) return `${seconds}с`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}м ${secs}с` : `${mins}м`;
};

export const formatDate = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const RunsList = ({ runs, selectedRunId, onSelectRun }) => {
  return (
    <div className={classes.listWrapper}>
      <div className={classes.tableHeader}>
        <span>Запуск</span>
        <span>Репозиторий / Ветка</span>
        <span>Статус</span>
        <span>Создан</span>
        <span>Длительность</span>
      </div>

      <div className={classes.rowsContainer}>
        {runs.map((run) => {
          const isSelected = run.id === selectedRunId;
          return (
            <article
              key={run.id}
              onClick={() => onSelectRun(run)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRun(run);
                }
              }}
              tabIndex={0}
              role="button"
              className={`${classes.runRow} ${isSelected ? classes.selectedRow : ''}`}
            >
              <div className={classes.mainCol}>
                <span className={classes.runName}>{run.name}</span>
                <span className={classes.runId}>#{run.id}</span>
              </div>

              <div className={classes.repoCol}>
                <span className={classes.repoName}>{run.repository}</span>
                <span className={classes.branchBadge}>{run.branch}</span>
              </div>

              <div className={classes.statusCol}>
                <span className={`${classes.statusBadge} ${classes[run.status]}`}>
                  <span className={classes.statusDot} />
                  {STATUS_LABELS[run.status] || run.status}
                </span>
              </div>

              <div className={classes.metaCol}>
                <span className={classes.mobileLabel}>Создан: </span>
                {formatDate(run.createdAt)}
              </div>

              <div className={classes.durationCol}>
                <span className={classes.mobileLabel}>Длительность: </span>
                {formatDuration(run.durationSeconds)}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default RunsList;