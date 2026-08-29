import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	root: "src/mainview",
	build: {
		minify: "terser",
		terserOptions: {
		compress: {
			drop_console: true,
			drop_debugger: true,
		},
		mangle: {
			toplevel: true, // Renomeia variáveis e funções no escopo global
		},
		format: {
			comments: false, // Remove todos os comentários do código final
		},
		},
		sourcemap: false,
		cssMinify: true,
		outDir: "../../dist",
		emptyOutDir: true,
	},
	server: {
		port: 5173,
		strictPort: true,
	},
});
