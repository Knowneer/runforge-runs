import { useEffect } from 'react';
import MyButton from '../UI/button/MyButton';
import classes from './RunDetailsDrawer.module.css';
import { formatDate, formatDuration } from './RunsList';

const RunDetailsDrawer = ({ run, onClose }) => {
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose();
		};
		if (run) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		}
	}, [run, onClose]);

	if (!run) return null;

	return (
		<div className={classes.overlay} onClick={onClose}>
			<aside
				className={classes.drawer}
				onClick={(e) => e.stopPropagation()}
				aria-label="Детали запуска"
			>
				<header className={classes.drawerHeader}>
					<div>
						<span className={classes.runId}>RUN #{run.id}</span>
						<h2 className={classes.title}>{run.name}</h2>
					</div>
					<MyButton variant="ghost" onClick={onClose} aria-label="Закрыть детали">
						✕ Закрыть
					</MyButton>
				</header>

				<div className={classes.drawerBody}>
					<div className={classes.infoGrid}>
						<div className={classes.infoItem}>
							<span className={classes.infoLabel}>Репозиторий</span>
							<span className={classes.infoValue}>{run.repository}</span>
						</div>
						<div className={classes.infoItem}>
							<span className={classes.infoLabel}>Ветка</span>
							<span className={classes.infoMono}>{run.branch}</span>
						</div>
						<div className={classes.infoItem}>
							<span className={classes.infoLabel}>Статус</span>
							<span className={classes.infoValue}>{run.status.toUpperCase()}</span>
						</div>
						<div className={classes.infoItem}>
							<span className={classes.infoLabel}>Создан</span>
							<span className={classes.infoValue}>{formatDate(run.createdAt)}</span>
						</div>
						<div className={classes.infoItem}>
							<span className={classes.infoLabel}>Длительность</span>
							<span className={classes.infoMono}>{formatDuration(run.durationSeconds)}</span>
						</div>
					</div>

					{run.result && (
						<section className={classes.section}>
							<h3 className={classes.sectionTitle}>Результат</h3>
							<div className={classes.resultBox}>{run.result}</div>
						</section>
					)}

					<section className={classes.section}>
						<h3 className={classes.sectionTitle}>Логи выполнения ({run.logs?.length || 0})</h3>
						<div className={classes.logsTerminal}>
							{run.logs && run.logs.length > 0 ? (
								run.logs.map((line, index) => (
									<div key={index} className={classes.logLine}>
										<span className={classes.lineNum}>{index + 1}</span>
										<span className={classes.lineText}>{line}</span>
									</div>
								))
							) : (
								<div className={classes.emptyLogs}>Логи пока отсутствуют...</div>
							)}
						</div>
					</section>
				</div>
			</aside>
		</div>
	);
};

export default RunDetailsDrawer;