"use client";

import {
	Card,
	CardContent,
	CardHeader,
} from "@repo/design-system/components/ui/card";
import type { QuickStatsGridComponentProps } from "../../lib/types";

export function QuickStatsGrid({
	title,
	stats,
	columns = 4,
}: QuickStatsGridComponentProps) {
	const gridColsClass: Record<2 | 3 | 4, string> = {
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	};

	const getBgClass = (
		variant?: "default" | "secondary",
	): "bg-primary" | "bg-secondary" | "bg-card" => {
		if (variant === "secondary") return "bg-secondary";
		return "bg-card";
	};

	return (
		<section className="w-full py-8 sm:py-12 bg-background">
			<div className="container mx-auto px-4">
				{title && (
					<h3 className="text-lg sm:text-xl font-semibold text-foreground mb-6">
						{title}
					</h3>
				)}

				<div
					className={`grid ${gridColsClass[columns as 2 | 3 | 4]} gap-4 sm:gap-6`}
				>
					{stats.map((stat, index) => {
						const bgClass = getBgClass(stat.variant);
						const isBgLight = stat.variant !== "secondary";

						return (
							<Card
								key={index}
								className={`border border-border ${
									isBgLight ? "bg-card" : `${bgClass} text-primary-foreground`
								}`}
							>
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between gap-3">
										<span
											className={`text-sm font-medium ${
												isBgLight ? "text-muted-foreground" : "text-current"
											}`}
										>
											{stat.label}
										</span>
										{stat.icon && (
											<div
												className={`text-2xl ${
													isBgLight ? "text-primary" : "text-current"
												}`}
											>
												{stat.icon}
											</div>
										)}
									</div>
								</CardHeader>
								<CardContent>
									<p
										className={`text-2xl sm:text-3xl font-bold ${
											isBgLight ? "text-foreground" : "text-current"
										}`}
									>
										{stat.value}
									</p>
									{stat.description && (
										<p
											className={`text-xs sm:text-sm mt-2 ${
												isBgLight
													? "text-muted-foreground"
													: "text-current opacity-90"
											}`}
										>
											{stat.description}
										</p>
									)}
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
