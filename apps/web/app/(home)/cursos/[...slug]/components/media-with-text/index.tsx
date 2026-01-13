"use client";

import { Button } from "@repo/design-system/components/ui/button";
import Image from "next/image";
import type { MediaWithTextComponentProps } from "../../lib/types";
import { mapButtonType, normalizeUrl } from "../../lib/utils";

export function MediaWithText({
	title,
	description,
	image,
	bullets,
	position = "right",
	variant = "neutral",
	button,
}: MediaWithTextComponentProps) {
	const isReverse = position === "left";
	const buttonVariant = button ? mapButtonType(button.type) : undefined;
	const bgClassName = variant === "primary" ? "bg-secondary" : "bg-background";

	return (
		<section className={`w-full py-12 sm:py-20 ${bgClassName}`}>
			<div className="container mx-auto px-4">
				<div
					className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
						isReverse ? "lg:[&>*:first-child]:order-2" : ""
					}`}
				>
					{/* Image */}
					<div className="relative h-96 sm:h-125 rounded-lg overflow-hidden shadow-lg">
						<Image
							src={image?.url || ""}
							alt={image?.alt || title}
							fill
							className="object-cover"
						/>
					</div>

					{/* Content */}
					<div className="flex flex-col gap-6">
						<div>
							<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
								{title}
							</h2>
							<p className="text-lg text-muted-foreground leading-relaxed">
								{description}
							</p>
						</div>

						{/* Bullets */}
						{bullets && bullets.length > 0 && (
							<ul className="space-y-4">
								{bullets.map((bullet, index) => (
									<li key={index} className="flex gap-4">
										<div className="shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
											<span className="text-primary-foreground text-sm font-bold">
												{index + 1}
											</span>
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-foreground mb-1">
												{bullet.title}
											</h3>
											<p className="text-muted-foreground">
												{bullet.description}
											</p>
										</div>
									</li>
								))}
							</ul>
						)}

						{/* CTA Button */}
						{button && (
							<Button
								asChild
								size="lg"
								variant={buttonVariant}
								className="w-full sm:w-auto"
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
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
