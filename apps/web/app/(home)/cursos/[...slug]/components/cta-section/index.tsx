"use client";

import { Button } from "@repo/design-system/components/ui/button";
import Image from "next/image";
import type { CTASectionComponentProps } from "../../lib/types";
import { normalizeUrl } from "../../lib/utils";

export function CTASection({
	title,
	description,
	button,
	backgroundImage,
	backgroundColor,
	theme,
}: CTASectionComponentProps) {
	const bgColor =
		backgroundColor || theme?.primaryActionColorPure || "hsl(var(--primary))";

	return (
		<section
			className="w-full py-16 sm:py-24 relative overflow-hidden"
			style={{ backgroundColor: bgColor }}
		>
			{/* Background Image */}
			{backgroundImage?.url && (
				<div className="absolute inset-0 opacity-20" aria-hidden="true">
					<Image
						src={backgroundImage.url}
						alt=""
						fill
						className="object-cover"
					/>
				</div>
			)}

			{/* Content */}
			<div className="container mx-auto px-4 relative z-10">
				<div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto">
					{/* Title */}
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
						{title}
					</h2>

					{/* Description */}
					{description && (
						<p className="text-lg sm:text-xl text-white/90">{description}</p>
					)}

					{/* CTA Button */}
					<Button
						asChild
						size="lg"
						variant="secondary"
						className="mt-4"
						data-element-analytic={button.dataElementAnalytic}
					>
						<a
							href={normalizeUrl(button.link)}
							target={button.openNewTab ? "_blank" : undefined}
							rel={button.openNewTab ? "noopener noreferrer" : undefined}
						>
							{button.label}
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
