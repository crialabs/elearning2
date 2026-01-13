/**
 * Mapeamento de cores do JSON para CSS variables
 * Converte a paleta de cores da Estácio para variáveis CSS reutilizáveis
 */

import type { ThemeColors } from "./types";

export function mapThemeToCSSVariables(
	theme: ThemeColors,
): Record<string, string> {
	return {
		"--color-primary-pure": theme.primaryActionColorPure,
		"--color-primary-high": theme.primaryActionColorHigh,
		"--color-primary-low": theme.primaryActionColorLow,

		"--color-secondary-pure": theme.secondaryActionColorPure,
		"--color-secondary-high": theme.secondaryActionColorHigh,
		"--color-secondary-low": theme.secondaryActionColorLow,

		"--color-system-pure": theme.backgroundColorSystemPure,
		"--color-system-high": theme.backgroundColorSystemHigh,
		"--color-system-low": theme.backgroundColorSystemLow,

		"--color-public-01-pure": theme.backgroundColorPublic01Pure,
		"--color-public-01-high": theme.backgroundColorPublic01High,
		"--color-public-01-low": theme.backgroundColorPublic01Low,

		"--color-public-02-pure": theme.backgroundColorPublic02Pure,
		"--color-public-02-high": theme.backgroundColorPublic02High,
		"--color-public-02-low": theme.backgroundColorPublic02Low,

		"--color-public-03-pure": theme.backgroundColorPublic03Pure,

		"--color-neutral-dark-pure": theme.neutralColorDarkPure,
		"--color-neutral-dark-high": theme.neutralColorDarkHigh,
		"--color-neutral-dark-low": theme.neutralColorDarkLow,

		"--color-neutral-light-pure": theme.neutralColorLightPure,
		"--color-neutral-light-high": theme.neutralColorLightHigh,
		"--color-neutral-light-low": theme.neutralColorLightLow,

		"--color-feedback-positive-pure": theme.feedbackColorPositivePure,
		"--color-feedback-positive-high": theme.feedbackColorPositiveHigh,
		"--color-feedback-positive-low": theme.feedbackColorPositiveLow,

		"--color-feedback-negative-pure": theme.feedbackColorNegativePure,
		"--color-feedback-negative-high": theme.feedbackColorNegativeHigh,
		"--color-feedback-negative-low": theme.feedbackColorNegativeLow,

		"--color-feedback-warning-pure": theme.feedbackWarningPure,
		"--color-feedback-warning-high": theme.feedbackWarningHigh,
		"--color-feedback-warning-low": theme.feedbackWarningLow,

		"--color-footer-bg": theme.footerBackgroundColor,
		"--color-button-conversao-label": theme.buttonConversaoLabelColor,
		"--color-button-conversao-hover": theme.buttonConversaoBGColorHover,

		"--opacity-main": theme.mainOpacity,
		"--font-family-primary": theme.fontFamily,
		"--font-family-base": theme.fontFamilyBase,
	};
}

/**
 * Mapeia modo de seção (neutral/primary) para cores apropriadas
 */
export function getSectionColorsByMode(
	mode: "neutral" | "primary" | "Neutral" | "Primary" = "neutral",
	theme: ThemeColors,
): {
	bgColor: string;
	textColor: string;
	accentColor: string;
	buttonVariant: "default" | "secondary";
} {
	const normalizedMode = mode.toLowerCase() as "neutral" | "primary";

	if (normalizedMode === "primary") {
		return {
			bgColor: theme.primaryActionColorHigh,
			textColor: theme.neutralColorDarkPure,
			accentColor: theme.primaryActionColorPure,
			buttonVariant: "default",
		};
	}

	return {
		bgColor: "transparent",
		textColor: theme.neutralColorDarkPure,
		accentColor: theme.secondaryActionColorPure,
		buttonVariant: "secondary",
	};
}

/**
 * Retorna classe Tailwind baseada na cor CSS variable
 */
export function getCSSVariableClass(
	colorKey: string,
	type: "bg" | "text" | "border" = "text",
): string {
	const prefix =
		type === "bg" ? "bg-" : type === "border" ? "border-" : "text-";
	return `${prefix}[var(${colorKey})]`;
}

/**
 * Converte paleta theme em inline styles para aplicar em root
 */
export function generateThemeStyles(theme: ThemeColors): string {
	const vars = mapThemeToCSSVariables(theme);
	return Object.entries(vars)
		.map(([key, value]) => `${key}: ${value}`)
		.join("; ");
}
