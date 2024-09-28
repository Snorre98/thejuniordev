import { useCallback, useEffect, useState } from "react";
import { Screen, type ScreenProps } from "../../Components";
import { AppButton } from "../../Components/AppButton";
import { getApps, getFavoriteApps, getFullIconUrl } from "../../api/appApi";
import styles from "./HomeDisplay.module.scss";

type App = {
	id: number;
	app_title: string;
	opens: string;
	icon_url: string;
};

interface HomeDisplayProps extends ScreenProps {
	onOpenApp: (opens: string) => void;
}

export function HomeDisplay({ onBack, onOpenApp, ...props }: HomeDisplayProps) {
	const [apps, setApps] = useState<App[]>([]);
	const [favoriteApps, setFavoriteApps] = useState<App[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isVisible, setIsVisible] = useState(false);

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
		}, 30);
		return () => clearTimeout(timer);
	}, [fetchData]);

	const renderApps = useCallback(
		(app: App) => (
			<AppButton
				key={app.id}
				onOpenApp={() => onOpenApp(app.opens)}
				iconURL={app.icon_url}
				appTitle={app.app_title}
				isFavorit={false}
			/>
		),
		[onOpenApp],
	);

	const renderFavApps = useCallback(
		(app: App) => (
			<AppButton
				key={app.id}
				onOpenApp={() => onOpenApp(app.opens)}
				iconURL={app.icon_url}
				appTitle={app.app_title}
				isFavorit={true}
			/>
		),
		[onOpenApp],
	);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<Screen onBack={onBack} {...props}>
			<div
				className={`${styles.homeScreenContainer} ${isVisible ? styles.homeScreenContainerVisible : ""}`}
			>
				<div className={styles.appsContainer}>{apps.map(renderApps)}</div>
				<div className={styles.favoriteApps}>
					{favoriteApps.map(renderFavApps)}
				</div>
			</div>
		</Screen>
	);
}
