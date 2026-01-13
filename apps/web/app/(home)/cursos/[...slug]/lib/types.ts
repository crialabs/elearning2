/**
 * Tipos e interfaces para página de detalhe de curso
 * Baseados na estrutura JSON da Estácio
 */

export interface ThemeColors {
	menuButton: {
		neutral: { color: { focus: string } };
		primary: {
			color: { open: string; close: string; focus: string };
			opacity: number;
		};
	};
	menuSubItem: { neutral: { color: string }; primary: { color: string } };
	chronometer: {
		secondary: {
			backgroundColor: string;
			backgroundColorCounter: string;
			button: {
				backgroundColor: string;
				borderColor: string;
				hover: { backgroundColor: string; borderColor: string };
			};
		};
		primary: {
			backgroundColor: string;
			backgroundColorCounter: string;
			button: {
				backgroundColor: string;
				borderColor: string;
				hover: { backgroundColor: string; borderColor: string };
			};
		};
	};
	campaignTrigger: {
		secondary: { backgroundColor: string };
		primary: { backgroundColor: string };
	};
	neutralColorDarkPure: string;
	neutralColorDarkHigh: string;
	neutralColorDarkLow: string;
	neutralColorLightPure: string;
	neutralColorLightHigh: string;
	neutralColorLightLow: string;
	feedbackColorPositivePure: string;
	feedbackColorPositiveHigh: string;
	feedbackColorPositiveLow: string;
	feedbackColorNegativePure: string;
	feedbackColorNegativeHigh: string;
	feedbackColorNegativeLow: string;
	feedbackWarningHigh: string;
	feedbackWarningPure: string;
	feedbackWarningLow: string;
	primaryActionColorPure: string;
	primaryActionColorHigh: string;
	primaryActionColorLow: string;
	backgroundColorSystemPure: string;
	backgroundColorSystemHigh: string;
	backgroundColorSystemLow: string;
	backgroundColorPublic01Pure: string;
	backgroundColorPublic01High: string;
	backgroundColorPublic01Low: string;
	backgroundColorPublic02Pure: string;
	backgroundColorPublic02High: string;
	backgroundColorPublic02Low: string;
	secondaryActionColorPure: string;
	secondaryActionColorHigh: string;
	secondaryActionColorLow: string;
	backgroundColorPublic03Pure: string;
	mainOpacity: string;
	logo: string;
	srcLogo: string;
	altLogo: string;
	logoWidth: string;
	fontFamily: string;
	fontFamilyBase: string;
	footerBackgroundColor: string;
	buttonConversaoLabelColor: string;
	buttonConversaoBGColorHover: string;
}

export interface ButtonConfig {
	type: string;
	label: string;
	link: string;
	dataElementAnalytic?: string;
	openNewTab?: boolean;
}

export interface ImageData {
	code?: number;
	url: string;
	alt: string;
	formats?: {
		thumbnail: {
			url: string;
			width: number;
			height: number;
		};
	};
}

export interface BreadcrumbItem {
	label: string;
	slug?: string;
}

export interface BulletItem {
	title: string;
	description: string;
}

export interface CardItem {
	id: number | string;
	title: string;
	description?: string;
	icon?: {
		code?: number;
		alt?: string;
		url?: string;
	};
	image?: ImageData;
	link?: string;
	button?: ButtonConfig;
	highlightCard?: boolean;
}

export interface CarouselItemData {
	id?: number;
	title: string;
	description?: string;
	image?: ImageData;
	link?: string;
	button?: ButtonConfig;
	openNewTab?: boolean;
}

export interface FAQItem {
	id?: string | number;
	title: string;
	detail: string;
	dataElementAnalytics?: string;
	dataElementAnalyticsLink?: string;
}

export interface Discipline {
	code?: string;
	name: string;
	hours?: number;
	period?: "obrigatória" | "eletiva";
	description?: string;
}

export interface LearningModel {
	id: number;
	title: string;
	description: string;
}

export interface CourseMetadata {
	duration: string;
	certification: string;
	category: string;
	interestArea: string;
	specialty?: string | null;
}

export interface CourseCardData {
	title?: string;
	duration: string;
	progressBar: boolean;
}

export interface CourseHeader {
	componentName: string;
	id: number;
	title: string;
	description: string;
	certificationType: string;
	modalTitle: string;
	backgroundImage: ImageData;
	breadcrumb: {
		slugs: string[];
		labels: string[];
	};
	card: CourseCardData;
	learningModels: LearningModel[];
	button: ButtonConfig;
}

export interface MediaWithTextSection {
	id: number;
	componentName: "media-with-text.template-bullets";
	mode: "neutral" | "primary";
	position: "Esquerda" | "Direita";
	templateTitle: string;
	anchorId?: string | null;
	dataSection: string;
	imageDesktop: ImageData;
	imageMobile: ImageData;
	templateButton: ButtonConfig[];
	templateBullets: {
		templateDescription: string;
		bullets: BulletItem[];
	};
}

export interface BlocksSection {
	componentName: "blocks.blocks-section";
	id: number;
	mode: "Neutral" | "Primary";
	title: string;
	description?: string | null;
	cards: CardItem[];
	button?: ButtonConfig;
	dataSectionAnalytics?: string;
	dataElementAnalytics?: string;
}

export interface CarouselSection {
	componentName: "carousel.carousel-section";
	id: number;
	mode: "primary" | "neutral";
	title: string;
	description?: string | null;
	cards: CarouselItemData[];
	button?: ButtonConfig;
	openNewTab?: boolean;
	anchorId?: string | null;
}

export interface FAQSection {
	componentName: "faq.faq-section";
	id: number;
	mode: "primary" | "neutral";
	title: string;
	description?: string | null;
	cards: FAQItem[];
	button?: ButtonConfig;
	textCta?: string;
}

export interface Course {
	pageName: string;
	courseName: string;
	slug: string;
	code: number;
	type: string;
	fullSlug: string;
	metadata: CourseMetadata;
	body: Array<
		| CourseHeader
		| MediaWithTextSection
		| BlocksSection
		| CarouselSection
		| FAQSection
	>;
	curriculum?: {
		title: string;
		description?: string;
		disciplines: Discipline[];
		totalHours?: number;
	};
	enableCode?: string | null;
	seo?: {
		id: number;
		metaTitle: string;
		metaDescription: string;
		metaImage: ImageData;
		keywords?: string | null;
		canonicalURL: string;
		structuredData?: Array<Record<string, any>>;
	};
}

export interface CourseDetailPageProps {
	course: Course;
	theme: ThemeColors;
	brandLabel: string;
	brandName: string;
}

// Types para componentes reutilizáveis
export interface CourseHeaderComponentProps {
	title: string;
	description: string;
	certificationType: string;
	image: ImageData;
	breadcrumbs: BreadcrumbItem[];
	duration: string;
	learningModels: LearningModel[];
	button: ButtonConfig;
	theme?: ThemeColors;
}

export interface MediaWithTextComponentProps {
	title: string;
	description: string;
	image: ImageData;
	imageMobile?: ImageData;
	bullets?: BulletItem[];
	position?: "left" | "right";
	variant?: "neutral" | "primary";
	button?: ButtonConfig;
}

export interface ItemGridComponentProps {
	title: string;
	description?: string;
	items: CardItem[];
	columns?: 3 | 4;
	variant?: "card" | "minimal";
	mode?: "neutral" | "primary";
}

export interface CarouselComponentProps {
	title: string;
	description?: string;
	items: CarouselItemData[];
	columns?: 3 | 4;
	variant?: "card" | "minimal";
	mode?: "neutral" | "primary";
}

export interface FAQComponentProps {
	title: string;
	description?: string;
	items: FAQItem[];
	mode?: "primary" | "neutral";
	textCta?: string;
	button?: ButtonConfig;
}

export interface CurriculumComponentProps {
	title: string;
	description?: string;
	disciplines: Discipline[];
	expandMode?: "all" | "first" | "none";
	mode?: "neutral" | "primary";
}

export interface QuickStatProps {
	label: string;
	value: string;
	description?: string;
	icon?: React.ReactNode;
	variant?: "default" | "secondary";
}

export interface QuickStatsGridComponentProps {
	title?: string;
	stats: QuickStatProps[];
	columns?: 2 | 3 | 4;
	theme?: ThemeColors;
}

export interface CTASectionComponentProps {
	title: string;
	description?: string;
	button: ButtonConfig;
	backgroundImage?: ImageData;
	backgroundColor?: string;
	theme?: ThemeColors;
}

export interface RelatedCoursesComponentProps {
	title: string;
	courses: CarouselItemData[];
	showCarousel?: boolean;
	theme?: ThemeColors;
}
