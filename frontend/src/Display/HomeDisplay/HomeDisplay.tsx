import { useCallback, useEffect, useState } from "react";
import { AppButton } from "../../Components/AppButton";
import { useStore } from "../../store/store";
import type { Screens } from "../../types";
import { ErrorDisplay } from "../ErrorDisplay";
import { LoadingDisplay } from "../LoadingDisplay";
import styles from "./HomeDisplay.module.scss";
import { useApps, useFavoriteApps, usePrefetch } from "../../hooks/useAppQueries";

type App = {
	id: number;
	app_title: string;
	opens?: Screens;
	icon_url: string;
	project?: number;
};

interface HomeDisplayProps {
	onSelectApp: (appId: number) => void;
}

export function HomeDisplay({ onSelectApp }: HomeDisplayProps) {
	const [isVisible, setIsVisible] = useState(false);
	const { setCurrentAppId, setScreen } = useStore();
	const { prefetchProject } = usePrefetch();
	
	// Use React Query hooks instead of direct API calls
	const { 
		data: apps = [], 
		isLoading: appsLoading, 
		error: appsError 
	} = useApps();
	
	const { 
		data: favoriteApps = [], 
		isLoading: favAppsLoading, 
		error: favAppsError 
	} = useFavoriteApps();

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 35);
		return () => clearTimeout(timer);
	}, []);

	const handleOpenApp = useCallback(
		(app: App) => {
			if (app.opens) {
				setScreen(app.opens);
			} else {
				setCurrentAppId(app.id);
				if (app.project) {
					// Prefetch project data when hovering over app buttons
					prefetchProject(app.project);
					onSelectApp(app.project);
				} else {
					console.error("No project associated with this app");
				}
			}
		},
		[setCurrentAppId, setScreen, onSelectApp, prefetchProject],
	);

	const renderApps = useCallback(
		(app: App) => (
			<AppButton
				key={app.id}
				onOpenApp={() => handleOpenApp(app)}
				iconURL={app.icon_url}
				appTitle={app.app_title}
				isFavorit={false}
				onMouseEnter={() => app.project && prefetchProject(app.project)}
			/>
		),
		[handleOpenApp, prefetchProject],
	);

	const renderFavApps = useCallback(
		(app: App) => (
			<AppButton
				key={app.id}
				onOpenApp={() => handleOpenApp(app)}
				iconURL={app.icon_url}
				appTitle={app.app_title}
				isFavorit={true}
				onMouseEnter={() => app.project && prefetchProject(app.project)}
			/>
		),
		[handleOpenApp, prefetchProject],
	);

	const isLoading = appsLoading || favAppsLoading;
	const error = appsError || favAppsError;

	if (isLoading) return <LoadingDisplay />;
	if (error) return <ErrorDisplay error={"Error fetching apps"} />;

	return (
		<div
			className={`${styles.homeScreenContainer} ${
				isVisible ? styles.homeScreenContainerVisible : ""
			}`}
		>
			<div className={styles.appsContainer}>{apps.map(renderApps)}</div>
			<div className={styles.favoriteApps}>
				{favoriteApps.map(renderFavApps)}
			</div>
		</div>
	);
}
