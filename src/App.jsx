import { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './App.module.css';
import Filters from './components/Filters';
import Header from './components/Header';
import RunDetailsDrawer from './components/RunDetailsDrawer';
import RunsList from './components/RunsList';
import { EmptyState, ErrorState } from './components/States';
import { fetchMockRuns } from './data/mockRuns';
import MyLoader from './UI/loader/MyLoader';

function App() {
  const [runs, setRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRun, setSelectedRun] = useState(null);

  const loadRuns = useCallback(async (shouldFail = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMockRuns(shouldFail);
      setRuns(data);
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке запусков');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRuns(false);
  }, [loadRuns]);

  // Подсчёт количества для бейджей на кнопках фильтра
  const statusCounts = useMemo(() => {
    const counts = { all: runs.length, queued: 0, running: 0, succeeded: 0, failed: 0 };
    runs.forEach((r) => {
      if (counts[r.status] !== undefined) counts[r.status] += 1;
    });
    return counts;
  }, [runs]);

  // Совместная работа поиска и фильтрации по статусу
  const filteredRuns = useMemo(() => {
    return runs.filter((run) => {
      const matchesStatus = selectedStatus === 'all' || run.status === selectedStatus;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        run.name.toLowerCase().includes(query) ||
        run.repository.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [runs, selectedStatus, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
  };

  return (
    <div className={classes.appLayout}>
      <Header
        onReload={() => loadRuns(false)}
        onSimulateError={() => loadRuns(true)}
      />

      <main className={classes.mainContent}>
        <div className={classes.pageHeader}>
          <h1 className={classes.pageTitle}>Запуски AI-агентов</h1>
          <p className={classes.pageSubtitle}>
            Мониторинг изолированных окружений, логов и результатов выполнения
          </p>
        </div>

        <Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          counts={statusCounts}
        />

        {isLoading ? (
          <MyLoader />
        ) : error ? (
          <ErrorState message={error} onRetry={() => loadRuns(false)} />
        ) : filteredRuns.length === 0 ? (
          <EmptyState onReset={handleResetFilters} />
        ) : (
          <RunsList
            runs={filteredRuns}
            selectedRunId={selectedRun?.id}
            onSelectRun={setSelectedRun}
          />
        )}
      </main>

      <RunDetailsDrawer
        run={selectedRun}
        onClose={() => setSelectedRun(null)}
      />
    </div>
  );
}

export default App;