import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
	// Add markdown plugins here, as desired
});

const config: NextConfig = {
	transpilePackages: ["@repo/data"],

	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	serverExternalPackages: ["shiki", "@shikijs/engine-oniguruma"],

	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
			},
			{
				protocol: "https",
				hostname: "cdn.portal.estacio.br",
			},
		],
	},
};

export default withMDX(config) as NextConfig;
