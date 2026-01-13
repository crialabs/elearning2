"use client";

import { Button } from "@repo/design-system/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/design-system/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@repo/design-system/components/ui/carousel";
import Image from "next/image";
import type { CarouselComponentProps } from "../../lib/types";
import { mapButtonType, normalizeUrl } from "../../lib/utils";

export function CarouselSection({
	title,
	description,
	items,
	variant = "card",
	mode = "neutral",
}: CarouselComponentProps) {
	const bgClassName =
		mode === "primary" ? "bg-secondary" : "bg-background";

	return (
		<section className={`w-full py-12 sm:py-20 ${bgClassName}`}>
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						{title}
					</h2>
					{description && (
						<p className="text-lg text-muted-foreground">
							{description}
						</p>
					)}
				</div>

				{/* Carousel */}
				<Carousel className="w-full">
					<CarouselContent className="-ml-4">
						{items.map((item, index) => (
							<CarouselItem
								key={item.id || index}
								className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
							>
								{variant === "card" ? (
									<Card className="h-full border border-border bg-card shadow-md hover:shadow-lg transition-shadow">
										{/* Image */}
										{item.image?.url && (
											<div className="relative h-48 w-full overflow-hidden rounded-t-lg">
												<Image
													src={item.image.url}
													alt={
														item.image.alt ||
														item.title
													}
													fill
													className="object-cover"
												/>
											</div>
										)}

										<CardHeader>
											<CardTitle className="text-lg text-foreground">
												{item.title}
											</CardTitle>
										</CardHeader>

										{item.description && (
											<CardContent>
												<p className="text-muted-foreground text-sm leading-relaxed">
													{item.description}
												</p>
											</CardContent>
										)}

										{item.button && (
											<CardContent className="pt-0">
												<Button
													asChild
													size="sm"
													variant={mapButtonType(
														item.button.type
													)}
													className="w-full"
												>
													<a
														href={normalizeUrl(
															item.button.link
														)}
														target={
															item.button
																.openNewTab
																? "_blank"
																: undefined
														}
														rel={
															item.button
																.openNewTab
																? "noopener noreferrer"
																: undefined
														}
													>
														{item.button.label}
													</a>
												</Button>
											</CardContent>
										)}
									</Card>
								) : (
									<div className="h-full p-4 bg-card rounded-lg border border-border">
										{item.image?.url && (
											<div className="relative h-40 w-full overflow-hidden rounded mb-4">
												<Image
													src={item.image.url}
													alt={
														item.image.alt ||
														item.title
													}
													fill
													className="object-cover"
												/>
											</div>
										)}
										<h3 className="font-semibold text-foreground mb-2">
											{item.title}
										</h3>
										{item.description && (
											<p className="text-sm text-muted-foreground">
												{item.description}
											</p>
										)}
									</div>
								)}
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	);
}
