"use client";

import { CarouselSection } from "../carousel-section";
import type { RelatedCoursesComponentProps } from "../../lib/types";

export function RelatedCourses({
	title,
	courses,
	showCarousel = true,
}: RelatedCoursesComponentProps) {
	if (showCarousel) {
		return (
			<CarouselSection
				title={title}
				items={courses}
				mode="neutral"
				variant="card"
			/>
		);
	}

	// Grid fallback
	return (
		<section className="w-full py-12 sm:py-20 bg-background">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
					{title}
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{courses.map((course, index) => (
						<div
							key={course.id || index}
							className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-border"
						>
							<div className="p-6">
								<h3 className="text-lg font-semibold text-foreground mb-2">
									{course.title}
								</h3>
								{course.description && (
									<p className="text-sm text-muted-foreground mb-4">
										{course.description}
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
