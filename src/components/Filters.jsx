import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import classes from './Filters.module.css';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'queued', label: 'Queued' },
  { value: 'running', label: 'Running' },
  { value: 'succeeded', label: 'Succeeded' },
  { value: 'failed', label: 'Failed' },
];

const Filters = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  counts = {},
  sortBy,
  onSortChange
}) => {
  return (
    <section className={classes.filtersBar} aria-label="Фильтры запусков">
      <div className={classes.searchContainer}>
        <MyInput
          type="text"
          placeholder="Поиск по названию запуска или репозиторию..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onClear={() => onSearchChange('')}
        />
      </div>

      <div className={classes.sortContainer}>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className={classes.sortSelect}
          aria-label="Сортировка запусков"
        >
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="duration-desc">По длительности (убыв.)</option>
          <option value="duration-asc">По длительности (возр.)</option>
        </select>
      </div>

      <div className={classes.statusGroup} role="group" aria-label="Фильтр по статусу">
        {STATUS_OPTIONS.map((status) => {
          const isActive = selectedStatus === status.value;
          const count = counts[status.value];

          return (
            <MyButton
              key={status.value}
              active={isActive}
              onClick={() => onStatusChange(status.value)}
              className={classes.filterBtn}
            >
              <span>{status.label}</span>
              {typeof count === 'number' && (
                <span className={`${classes.badgeCount} ${isActive ? classes.badgeActive : ''}`}>
                  {count}
                </span>
              )}
            </MyButton>
          );
        })}
      </div>
    </section>
  );
};

export default Filters;