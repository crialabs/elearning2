"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/design-system/components/ui/accordion";
import { Button } from "@repo/design-system/components/ui/button";
import type { FAQComponentProps, FAQItem } from "../../lib/types";
import { mapButtonType, normalizeUrl } from "../../lib/utils";

export function FAQSection({
	title,
	description,
	items,
	mode = "primary",
	textCta,
	button,
}: FAQComponentProps) {
	const bgClassName =
		mode === "primary" ? "bg-secondary" : "bg-background";

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

				{/* Accordion */}
				<div className="max-w-3xl mx-auto">
					<Accordion type="single" collapsible className="w-full">
						{items.map((item: FAQItem, index: number) => (
							<AccordionItem
								key={item.id || index}
								value={String(item.id || index)}
								className="border-border"
							>
								<AccordionTrigger className="text-left hover:no-underline hover:bg-muted rounded px-4 py-3">
									<span className="text-lg font-semibold text-foreground">
										{item.title}
									</span>
								</AccordionTrigger>
								<AccordionContent className="px-4 py-4 text-muted-foreground whitespace-pre-wrap">
									{item.detail}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				{/* CTA Section */}
				{button && (
					<div className="mt-12 flex flex-col items-center gap-6 text-center">
						{textCta && (
							<p className="text-lg font-semibold text-foreground">
								{textCta}
							</p>
						)}
						<Button
							asChild
							size="lg"
							variant={mapButtonType(button.type)}
							data-element-analytic={
								button.dataElementAnalytic
							}
						>
							<a
								href={normalizeUrl(button.link)}
								target={
									button.openNewTab ? "_blank" : undefined
								}
								rel={
									button.openNewTab
										? "noopener noreferrer"
										: undefined
								}
							>
								{button.label}
							</a>
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
