import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"~": path.resolve(__dirname, "./"),
		},
	},
	css: {
		postcss: "./postcss.config.js",
		modules: {
			localsConvention: "camelCaseOnly",
			generateScopedName: "[name]__[local]___[hash:base64:5]",
		},
	},
});
