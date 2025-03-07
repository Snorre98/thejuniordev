import { useCallback, useEffect, useState } from "react";
import { AppButton } from "../../Components/AppButton";
import { useStore } from "../../store/store";
import type { Screens } from "../../types";
import { ErrorDisplay } from "../ErrorDisplay";
import { LoadingDisplay } from "../LoadingDisplay";
import styles from "./HomeDisplay.module.scss";
import { useApps, useFavoriteApps } from "../../hooks/useAppQueries";

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
					onSelectApp(app.project);
				} else {
					console.error("No project associated with this app");
				}
			}
		},
		[setCurrentAppId, setScreen, onSelectApp],
	);

	const renderApps = useCallback(
		(app: App) => (
			<AppButton
				key={app.id}
				onOpenApp={() => handleOpenApp(app)}
				iconURL={app.icon_url}
				appTitle={app.app_title}
				isFavorit={false}
			/>
		),
		[handleOpenApp],
	);

	const renderFavApps = useCallback(
		(app: App) => (
			<AppButton
				key={app.id}
				onOpenApp={() => handleOpenApp(app)}
				iconURL={app.icon_url}
				appTitle={app.app_title}
				isFavorit={true}
			/>
		),
		[handleOpenApp],
	);

	const isLoading = appsLoading || favAppsLoading;
	//const error = appsError || favAppsError;

	//if (error) return <ErrorDisplay error={"Error fetching apps"} />;

	return (
		<div className={`${styles.homeScreenContainer} ${isVisible ? styles.homeScreenContainerVisible : ""}`}>
		  {isLoading ? (
			<LoadingDisplay />
		  ) : (
			<>
			  <div className={styles.appsContainer}>{apps.map(renderApps)}</div>
			  <div className={styles.favoriteApps}>{favoriteApps.map(renderFavApps)}</div>
			</>
		  )}
		</div>
	  );
}
