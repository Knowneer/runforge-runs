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

  const [searchQuery, setSearchQuery] = useState(() => {
    return new URLSearchParams(window.location.search).get('q') || '';
  });
  const [selectedStatus, setSelectedStatus] = useState(() => {
    return new URLSearchParams(window.location.search).get('status') || 'all';
  });
  const [sortBy, setSortBy] = useState(() => {
    return new URLSearchParams(window.location.search).get('sort') || 'newest';
  });
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


  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedStatus !== 'all') params.set('status', selectedStatus);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (sortBy !== 'newest') params.set('sort', sortBy);

    const qs = params.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [selectedStatus, searchQuery, sortBy]);


  const statusCounts = useMemo(() => {
    const counts = { all: runs.length, queued: 0, running: 0, succeeded: 0, failed: 0 };
    runs.forEach((r) => {
      if (counts[r.status] !== undefined) counts[r.status] += 1;
    });
    return counts;
  }, [runs]);

  const filteredRuns = useMemo(() => {
    const filtered = runs.filter((run) => {
      const matchesStatus = selectedStatus === 'all' || run.status === selectedStatus;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        run.name.toLowerCase().includes(query) ||
        run.repository.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'duration-desc') {
        return (b.durationSeconds ?? -1) - (a.durationSeconds ?? -1);
      }
      if (sortBy === 'duration-asc') {
        return (a.durationSeconds ?? Infinity) - (b.durationSeconds ?? Infinity);
      }
      return 0;
    });
  }, [runs, selectedStatus, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSortBy('newest');
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
          sortBy={sortBy}
          onSortChange={setSortBy}
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