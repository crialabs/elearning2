"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/design-system/components/ui/card";
import type { ItemGridComponentProps } from "../../lib/types";

export function ItemGrid({
	title,
	description,
	items,
	columns = 3,
	variant = "card",
	mode = "neutral",
}: ItemGridComponentProps) {
	const gridColsClass: Record<2 | 3 | 4, string> = {
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	};

	const bgClassName =
		mode === "primary" ? "bg-secondary" : "bg-background";
	const cardBgClassName =
		mode === "primary"
			? "bg-background border border-border"
			: "bg-card border-0";

	return (
		<section className={`w-full py-12 sm:py-20 ${bgClassName}`}>
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="mb-12 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						{title}
					</h2>
					{description && (
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							{description}
						</p>
					)}
				</div>

				{/* Grid */}
				<div
					className={`grid ${gridColsClass[columns as 2 | 3 | 4]} gap-6`}
				>
					{items.map((item) => (
						<div key={item.id}>
							{variant === "card" ? (
								<Card className={cardBgClassName}>
									<CardHeader>
										<CardTitle className="text-lg sm:text-xl text-foreground">
											{item.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground leading-relaxed">
											{item.description}
										</p>
									</CardContent>
								</Card>
							) : (
								<div className="p-4 sm:p-6">
									<h3 className="text-lg font-semibold text-foreground mb-2">
										{item.title}
									</h3>
									<p className="text-muted-foreground">
										{item.description}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
