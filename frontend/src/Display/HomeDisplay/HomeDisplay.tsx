import { useCallback, useEffect, useState } from "react";
import { AppButton } from "../../Components/AppButton";
import { getApps, getFavoriteApps, getFullIconUrl } from "../../api/appApi";
import { useStore } from "../../store/store";
import type { Screens } from "../../types";
import { ErrorDisplay } from "../ErrorDisplay";
import { LoadingDisplay } from "../LoadingDisplay";
import styles from "./HomeDisplay.module.scss";
type App = {
	id: number;
	app_title: string;
	opens?: Screens;
	icon_url: string;
};

interface HomeDisplayProps {
	onSelectApp: (appId: number) => void;
}

export function HomeDisplay({ onSelectApp }: HomeDisplayProps) {
	const [apps, setApps] = useState<App[]>([]);
	const [favoriteApps, setFavoriteApps] = useState<App[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const { setCurrentAppId, setScreen } = useStore();

	const fetchData = useCallback(async () => {
		try {
			setIsLoading(true);
			const [appsData, favoriteAppsData] = await Promise.all([
				getApps(),
				getFavoriteApps(),
			]);
			const processApps = (appsData: App[]) => {
				return appsData.map((app) => ({
					...app,
					icon_url: getFullIconUrl(app.icon_url),
				}));
			};
			setApps(processApps(appsData));
			setFavoriteApps(processApps(favoriteAppsData));
		} catch (error) {
			setError("Failed to fetch apps");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 35);
		return () => clearTimeout(timer);
	}, [fetchData]);

	const handleOpenApp = useCallback(
		(app: App) => {
			if (app.opens) {
				setScreen(app.opens);
			} else {
				setCurrentAppId(app.id);
				onSelectApp(app.id);
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
