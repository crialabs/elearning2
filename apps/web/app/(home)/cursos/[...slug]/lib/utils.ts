/**
 * Funções utilitárias para manipulação de dados do curso
 */

import { type BreadcrumbItem, type ImageData, ThemeColors } from "./types";

/**
 * Converte slugs para breadcrumbs formatados
 */
export function formatBreadcrumbs(
	slugs: string[],
	labels: string[],
): BreadcrumbItem[] {
	return slugs.map((slug, index) => ({
		label: labels[index] || slug,
		slug: slug,
	}));
}

/**
 * Seleciona imagem apropriada baseado no device
 */
export function selectImage(
	desktop: ImageData,
	mobile?: ImageData,
	isMobile?: boolean,
): ImageData {
	if (isMobile && mobile) {
		return mobile;
	}
	return desktop;
}

/**
 * Formata duração do curso em texto legível
 */
export function formatDuration(duration: string | null | undefined): string {
	if (!duration) return "";

	const durationMap: Record<string, string> = {
		SEIS_MESES: "6 meses",
		TRES_MESES: "3 meses",
		DOZE_MESES: "12 meses",
		UM_ANO: "1 ano",
		DEZOITO_MESES: "18 meses",
		VINTE_E_QUATRO_MESES: "24 meses",
		NOVE_MESES: "9 meses",
		QUINZE_MESES: "15 meses",
	};

	return durationMap[duration] || duration;
}

/**
 * Formata tipo de certificação em texto legível
 */
export function formatCertification(
	certification: string | null | undefined,
): string {
	if (!certification) return "";

	const certificationMap: Record<string, string> = {
		PROFISSIONALIZANTE: "Profissionalizante",
		TECNICO: "Técnico",
		TECNICO_PROFISSIONALIZANTE: "Técnico Profissionalizante",
		GRADUACAO: "Graduação",
		POS_GRADUACAO: "Pós-Graduação",
	};

	return certificationMap[certification] || certification;
}

/**
 * Converte button type Estácio para variante de componente Button
 */
export function mapButtonType(
	type: string | null | undefined,
): "default" | "secondary" | "outline" | "ghost" {
	if (!type) return "default";

	const typeMap: Record<string, "default" | "secondary" | "outline" | "ghost"> =
		{
			primario_conversao: "default",
			secondary: "secondary",
			outline: "outline",
			ghost: "ghost",
			primary: "default",
		};

	return typeMap[type.toLowerCase()] || "default";
}

/**
 * Extrai meta tags do course data
 */
export function extractMetaTags(course: any): {
	title: string;
	description: string;
	image: string;
} {
	if (course.seo) {
		return {
			title: course.seo.metaTitle || course.pageName,
			description: course.seo.metaDescription || "",
			image: course.seo.metaImage?.url || "",
		};
	}

	return {
		title: course.pageName,
		description: "",
		image: "",
	};
}

/**
 * Formata valores de preço
 */
export function formatPrice(price: string | number): string {
	const numPrice = typeof price === "string" ? parseFloat(price) : price;
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(numPrice);
}

/**
 * Formata número de parcelas
 */
export function formatInstallments(
	value: number,
	totalParcelas: number,
): string {
	return `${totalParcelas}x de ${formatPrice(value)}`;
}

/**
 * Sanitiza slug para URL segura
 */
export function sanitizeSlug(slug: string): string {
	return slug
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]/g, "");
}

/**
 * Calcula contraste de cor (retorna se deve usar texto branco ou preto)
 */
export function getContrastColor(hexColor: string): "white" | "black" {
	const hex = hexColor.replace("#", "");
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.5 ? "black" : "white";
}

/**
 * Valida se URL é externa
 */
export function isExternalUrl(url: string): boolean {
	return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Garante que URL é válida
 */
export function normalizeUrl(url: string | undefined): string {
	if (!url) return "";
	if (isExternalUrl(url)) return url;
	return url.startsWith("/") ? url : `/${url}`;
}

/**
 * Extrai nome amigável de modalidade
 */
export function formatModality(modality: string | null | undefined): string {
	if (!modality) return "";

	const modalityMap: Record<string, string> = {
		"TOTAL EAD": "Digital (EAD)",
		"AO VIVO": "Ao vivo",
		PRESENCIAL: "Presencial",
		SEMIPRESENCIAL: "Semipresencial",
		FLEX: "Flex",
	};

	return modalityMap[modality] || modality;
}

/**
 * Agrupa disciplinas por semestre
 */
export function groupDisciplinesBySemester(
	disciplines: any[],
): Record<number, any[]> {
	return disciplines.reduce(
		(acc, discipline) => {
			const semester = discipline.semester || 1;
			if (!acc[semester]) acc[semester] = [];
			acc[semester].push(discipline);
			return acc;
		},
		{} as Record<number, any[]>,
	);
}

/**
 * Encontra a primeira seção de um tipo específico
 */
export function findFirstSection<T>(
	sections: any[],
	componentName: string,
): T | undefined {
	return sections.find((section) => section.componentName === componentName) as
		| T
		| undefined;
}

/**
 * Filtra todas as seções de um tipo específico
 */
export function filterSectionsByType<T>(
	sections: any[],
	componentName: string,
): T[] {
	return sections.filter(
		(section) => section.componentName === componentName,
	) as T[];
}
