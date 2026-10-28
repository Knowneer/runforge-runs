
export const mockRuns = [
  {
    id: 'run-1042',
    name: 'Auth refactor & JWT rotation',
    repository: 'web-platform',
    branch: 'feat/auth-v2',
    status: 'running',
    createdAt: '2026-10-28T09:30:00Z',
    durationSeconds: 84,
    logs: [
      '[09:30:01] Initializing isolated runtime environment...',
      '[09:30:04] Cloning repository web-platform (branch: feat/auth-v2)',
      '[09:30:12] Installing dependencies via npm ci...',
      '[09:30:40] Agent analyzing auth middleware and token refresh logic...',
      '[09:31:15] Running unit tests: 18 passed, 2 pending...'
    ]
  },
  {
    id: 'run-1041',
    name: 'Fix checkout Stripe webhook tests',
    repository: 'payments-service',
    branch: 'fix/stripe-webhooks',
    status: 'succeeded',
    createdAt: '2026-10-28T08:15:00Z',
    durationSeconds: 142,
    result: 'All 42 test suites passed. Webhook signature validation fixed and PR #218 created.',
    logs: [
      '[08:15:00] Sandbox container started.',
      '[08:15:10] Reproducing failing test in checkout.spec.ts...',
      '[08:16:05] Applied patch to signature header parser.',
      '[08:17:18] Vitest run completed: 42 passed, 0 failed.',
      '[08:17:22] Run completed successfully.'
    ]
  },
  {
    id: 'run-1040',
    name: 'Update dependencies & Vite 6 migration',
    repository: 'web-platform',
    branch: 'chore/deps-oct',
    status: 'queued',
    createdAt: '2026-10-28T09:42:00Z',
    logs: [
      '[09:42:00] Run queued. Waiting for available devbox worker...'
    ]
  },
  {
    id: 'run-1039',
    name: 'Optimize PostgreSQL indexing for runs query',
    repository: 'api-service',
    branch: 'perf/db-indexes',
    status: 'failed',
    createdAt: '2026-10-28T07:50:00Z',
    durationSeconds: 63,
    result: 'Migration script failed: deadlock detected on table "agent_runs".',
    logs: [
      '[07:50:02] Starting database migration in staging sandbox...',
      '[07:50:31] Applying index CONCURRENTLY idx_runs_status_created...',
      '[07:51:05] ERROR: Deadlock detected while acquiring lock on relation "agent_runs".',
      '[07:51:05] Process exited with code 1.'
    ]
  },
  {
    id: 'run-1038',
    name: 'Generate OpenAPI client types',
    repository: 'sdk-typescript',
    branch: 'main',
    status: 'succeeded',
    createdAt: '2026-10-27T19:20:00Z',
    durationSeconds: 47,
    result: 'Generated 64 TypeScript interfaces and updated package exports.',
    logs: [
      '[19:20:01] Fetching schema from api-service...',
      '[19:20:19] Generating TypeScript definitions...',
      '[19:20:48] Build succeeded with zero warnings.'
    ]
  },
  {
    id: 'run-1037',
    name: 'Fix mobile drawer overflow on 360px screens',
    repository: 'web-platform',
    branch: 'fix/mobile-drawer',
    status: 'succeeded',
    createdAt: '2026-10-27T16:10:00Z',
    durationSeconds: 95,
    result: 'CSS Modules updated. Responsive layout verified at 360px width.',
    logs: [
      '[16:10:05] Inspecting layout rules in RunDetailsDrawer.module.css...',
      '[16:11:12] Adjusted media query breakpoints and flex-wrap.',
      '[16:11:40] Visual regression check passed.'
    ]
  },
  {
    id: 'run-1036',
    name: 'Refactor Redis queue retry backoff',
    repository: 'worker-engine',
    branch: 'feat/exponential-backoff',
    status: 'failed',
    createdAt: '2026-10-27T14:05:00Z',
    durationSeconds: 118,
    result: 'Test timeout exceeded (30000ms) in retry-worker.test.js.',
    logs: [
      '[14:05:00] Cloning worker-engine...',
      '[14:05:45] Running integration tests with mock Redis...',
      '[14:07:03] FAIL: retry-worker.test.js timed out after 30000ms.'
    ]
  }
];

export const fetchMockRuns = (shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Не удалось подключиться к серверу Runforge. Попробуйте снова.'));
      } else {
        resolve([...mockRuns]);
      }
    }, 1200); 
  });
};