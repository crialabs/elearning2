"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@repo/design-system/components/ui/breadcrumb";
import { Button } from "@repo/design-system/components/ui/button";
import Image from "next/image";
import type { CourseHeaderComponentProps } from "../../lib/types";
import { mapButtonType, normalizeUrl } from "../../lib/utils";

export function CourseHeader({
	title,
	description,
	certificationType,
	image,
	breadcrumbs,
	duration,
	learningModels,
	button,
	theme,
}: CourseHeaderComponentProps) {
	const buttonVariant = mapButtonType(button.type);
	const accentColor = theme?.backgroundColorPublic01Pure || "#33C0FF";

	return (
		<section className="relative w-full bg-background">
			{/* Breadcrumb */}
			<nav className="container mx-auto px-4 py-4 sm:py-6">
				<Breadcrumb>
					{breadcrumbs.map((item, index) => (
						<BreadcrumbItem key={item.slug || index}>
							{index < breadcrumbs.length - 1 ? (
								<>
									<BreadcrumbLink href={item.slug || "#"}>
										{item.label}
									</BreadcrumbLink>
									<BreadcrumbSeparator />
								</>
							) : (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
					))}
				</Breadcrumb>
			</nav>

			{/* Hero Section */}
			<div className="container mx-auto px-4 pb-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					{/* Content */}
					<div className="flex flex-col justify-center space-y-6">
						{/* Badges */}
						<div className="flex flex-wrap gap-2">
							<Badge variant="secondary" className="text-sm">
								{certificationType}
							</Badge>
							<Badge variant="outline" className="text-sm">
								{duration}
							</Badge>
						</div>

						{/* Title */}
						<h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
							{title}
						</h1>

						{/* Description */}
						<p className="text-lg text-muted-foreground leading-relaxed">
							{description}
						</p>

						{/* Learning Models */}
						{learningModels && learningModels.length > 0 && (
							<div className="pt-4 space-y-3">
								<p className="text-sm font-semibold text-foreground">
									Modelos de Ensino
								</p>
								<ul className="space-y-2">
									{learningModels.map((model) => (
										<li key={model.id} className="flex items-start gap-3">
											<div
												className="mt-1.5 h-2 w-2 rounded-full shrink-0"
												style={{
													backgroundColor: accentColor,
												}}
												aria-hidden="true"
											/>
											<div>
												<p className="font-medium text-foreground">
													{model.title}
												</p>
												<p className="text-sm text-muted-foreground">
													{model.description}
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
						)}

						{/* CTA Button */}
						<Button
							asChild
							size="lg"
							variant={buttonVariant}
							className="w-full sm:w-auto mt-4"
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

					{/* Image */}
					{image?.url && (
						<div className="relative h-96 sm:h-125 rounded-lg overflow-hidden shadow-lg">
							<Image
								src={image.url}
								alt={image.alt || title}
								fill
								className="object-cover"
								priority
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
