"use client";

import { use, useMemo } from "react";
import { CarouselSection } from "./components/carousel-section";
import { CourseHeader } from "./components/course-header";
import { CurriculumSection } from "./components/curriculum-section";
import { FAQSection } from "./components/faq-section";
import { ItemGrid } from "./components/item-grid";
import { MediaWithText } from "./components/media-with-text";
import { realCourseData } from "./lib/mock-data";
import { generateThemeStyles } from "./lib/theme-mapper";
import type {
	BlocksSection,
	CarouselSection as CarouselSectionType,
	CourseHeader as CourseHeaderType,
	FAQSection as FAQSectionType,
	MediaWithTextSection,
} from "./lib/types";
import {
	filterSectionsByType,
	findFirstSection,
	formatBreadcrumbs,
	formatDuration,
} from "./lib/utils";

export default function CourseDetailPage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string[] }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	use(params);
	use(searchParams);

	// TODO: Buscar dados reais do CMS/API baseado no slug
	const { course, theme } = {
		course: realCourseData.pageProps.course,
		theme: realCourseData.theme,
	};

	// Processar dados do curso
	const courseHeader = useMemo(
		() =>
			findFirstSection(course.body, "course-header.course-header-section-v2") as
				| CourseHeaderType
				| undefined,
		[course],
	);

	const mediaWithTextSections = useMemo(
		() =>
			filterSectionsByType(
				course.body,
				"media-with-text.template-bullets",
			) as MediaWithTextSection[],
		[course],
	);

	const blocksSections = useMemo(
		() =>
			filterSectionsByType(
				course.body,
				"blocks.blocks-section",
			) as BlocksSection[],
		[course],
	);

	const carouselSections = useMemo(
		() =>
			filterSectionsByType(
				course.body,
				"carousel.carousel-section",
			) as CarouselSectionType[],
		[course],
	);

	const faqSections = useMemo(
		() =>
			filterSectionsByType(course.body, "faq.faq-section") as FAQSectionType[],
		[course],
	);

	const themeStyles = useMemo(() => generateThemeStyles(theme), [theme]);

	return (
		<div style={{ "--theme-styles": themeStyles } as React.CSSProperties}>
			{/* Course Header */}
			{courseHeader && (
				<CourseHeader
					title={courseHeader.title}
					description={courseHeader.description}
					certificationType={courseHeader.certificationType}
					image={courseHeader.backgroundImage}
					breadcrumbs={formatBreadcrumbs(
						courseHeader.breadcrumb.slugs,
						courseHeader.breadcrumb.labels,
					)}
					duration={formatDuration(course.metadata.duration)}
					learningModels={courseHeader.learningModels}
					button={courseHeader.button}
					theme={theme}
				/>
			)}

			{/* Media with Text Sections */}
			{mediaWithTextSections.map((section) => (
				<MediaWithText
					key={section.id}
					title={section.templateTitle}
					description={section.templateBullets.templateDescription}
					image={
						section.position === "Esquerda"
							? section.imageDesktop
							: section.imageDesktop
					}
					imageMobile={
						section.position === "Esquerda"
							? section.imageMobile
							: section.imageMobile
					}
					bullets={section.templateBullets.bullets}
					position={section.position === "Esquerda" ? "left" : "right"}
					variant={section.mode.toLowerCase() as "neutral" | "primary"}
					button={section.templateButton?.[0]}
				/>
			))}

			{/* Blocks Grid Sections */}
			{blocksSections.map((section) => (
				<ItemGrid
					key={section.id}
					title={section.title}
					description={section.description || undefined}
					items={section.cards}
					columns={section.cards.length > 3 ? 4 : 3}
					mode={section.mode.toLowerCase() as "neutral" | "primary"}
				/>
			))}

			{/* Carousel Sections */}
			{carouselSections.map((section) => (
				<CarouselSection
					key={section.id}
					title={section.title}
					description={section.description || undefined}
					items={section.cards}
					mode={section.mode}
				/>
			))}

			{/* FAQ Sections */}
			{faqSections.map((section) => (
				<FAQSection
					key={section.id}
					title={section.title}
					description={section.description || undefined}
					items={section.cards}
					mode={section.mode}
					textCta={section.textCta}
					button={section.button}
				/>
			))}

			{/* Curriculum Section */}
			{course.curriculum && (
				<CurriculumSection
					title={course.curriculum.title}
					description={course.curriculum.description}
					disciplines={course.curriculum.disciplines}
					mode="neutral"
				/>
			)}
		</div>
	);
}
