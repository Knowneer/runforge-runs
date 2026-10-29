import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import * as mockApi from './data/mockRuns';

const TEST_RUNS = [
	{
		id: 'run-1',
		name: 'Auth refactor',
		repository: 'web-platform',
		branch: 'main',
		status: 'running',
		createdAt: '2026-10-28T10:00:00Z',
		durationSeconds: 120,
		logs: ['Starting container...', 'Running tests...'],
		result: 'In progress',
	},
	{
		id: 'run-2',
		name: 'Fix checkout tests',
		repository: 'payments',
		branch: 'fix/stripe',
		status: 'succeeded',
		createdAt: '2026-10-28T09:00:00Z',
		durationSeconds: 45,
		logs: ['All tests passed'],
		result: 'Patch applied successfully',
	},
];

describe('Runforge Runs Dashboard', () => {
	beforeEach(() => {
		window.history.replaceState(null, '', '/');
		vi.spyOn(mockApi, 'fetchMockRuns').mockResolvedValue(TEST_RUNS);
	});

	it('1. Фильтрация по статусу оставляет только подходящие запуски', async () => {
		render(<App />);
		await waitFor(() => expect(screen.getByText('Auth refactor')).toBeInTheDocument());

		const filterButtons = screen.getAllByRole('button', { name: /Succeeded/i });
		fireEvent.click(filterButtons[0]);

		expect(screen.getByText('Fix checkout tests')).toBeInTheDocument();
		expect(screen.queryByText('Auth refactor')).not.toBeInTheDocument();
	});

	it('2. Поиск по названию или репозиторию фильтрует список', async () => {
		render(<App />);
		await waitFor(() => expect(screen.getByText('Auth refactor')).toBeInTheDocument());

		const searchInput = screen.getByPlaceholderText(/Поиск по названию запуска или репозиторию/i);
		fireEvent.change(searchInput, { target: { value: 'payments' } });

		expect(screen.getByText('Fix checkout tests')).toBeInTheDocument();
		expect(screen.queryByText('Auth refactor')).not.toBeInTheDocument();
	});

	it('3. Клик по запуску открывает Drawer с деталями и логами', async () => {
		render(<App />);
		await waitFor(() => expect(screen.getByText('Fix checkout tests')).toBeInTheDocument());

		fireEvent.click(screen.getByText('Fix checkout tests'));

		expect(screen.getByLabelText('Детали запуска')).toBeInTheDocument();
		expect(screen.getByText('Patch applied successfully')).toBeInTheDocument();
		expect(screen.getByText('All tests passed')).toBeInTheDocument();
	});
});