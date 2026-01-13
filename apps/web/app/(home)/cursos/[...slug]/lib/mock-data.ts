/**
 * Mock data com estrutura real de cursos
 * Usando dados de exemplo da Estácio
 *
 * Estes dados devem ser substituídos por chamadas reais à API
 */

import type {
	BlocksSection,
	BulletItem,
	CardItem,
	Course,
	CourseCardData,
	CourseHeader,
	Discipline,
	LearningModel,
	MediaWithTextSection,
} from "./types";

// ============================================================================
// Imagens do Curso
// ============================================================================

const courseImages = {
	administracaoCondominios: {
		url: "https://cdn.portal.estacio.br/Cabecalho_do_Curso_Administracao_de_Condominios_208f571d71.png",
		alt: "Administração de Condomínios",
	},
	objetivos: {
		url: "https://cdn.portal.estacio.br/Modulos_de_Midia_desktop_480x625_Administracao_de_Condominios_c0b5cbf728.png",
		alt: "Objetivos do Curso",
	},
	formacao: {
		url: "https://cdn.portal.estacio.br/Modulos_de_Midia_desktop_480x625_2_4f6c6c9eff.png",
		alt: "Formação Prática",
	},
	diferenciais: {
		url: "https://cdn.portal.estacio.br/Modulos_de_Midia_480x625_1_cc05720fbd.png",
		alt: "Diferenciais",
	},
};

// ============================================================================
// Cartões de Perfil Profissional
// ============================================================================

const profissionalCards: Record<string, Omit<CardItem, "id">> = {
	lideranca: {
		title: "Liderança",
		description:
			"Desenvolver habilidades de liderança para gerenciar equipes de manutenção, segurança e administração de condomínios, garantindo um ambiente harmonioso e eficiente.",
	},
	trabalhoEmEquipe: {
		title: "Trabalho em equipe",
		description:
			"Aprender a colaborar efetivamente com outros profissionais e moradores, promovendo um ambiente de convivência saudável e cooperativo.",
	},
	visaoAnalitica: {
		title: "Visão analítica",
		description:
			"Adquirir a capacidade de analisar situações e problemas de forma crítica, propondo soluções eficazes para a gestão do condomínio.",
	},
	comunicacao: {
		title: "Comunicação assertiva e Resolução de problemas",
		description:
			"Domínio de uma comunicação clara, objetiva e assertiva na resolução de problemas.",
	},
};

// ============================================================================
// Cartões de Área de Atuação
// ============================================================================

const areaAtuacaoCards = [
	{
		title: "Assistente de Administração de Condomínios",
		description:
			"Auxilia na gestão administrativa e financeira do condomínio, apoiando o síndico e a administração na organização de documentos e na comunicação com os moradores.",
		image: {
			url: "https://cdn.portal.estacio.br/Assistente_de_Administracao_de_Condominios_5c6777805f.png",
			alt: "Assistente de Administração",
		},
	},
	{
		title: "Auxiliar de Manutenção Predial",
		description:
			"Trabalha na coordenação e execução de atividades de manutenção preventiva e corretiva, garantindo a conservação do patrimônio.",
		image: {
			url: "https://cdn.portal.estacio.br/Auxiliar_de_Manutencao_Predial_c12af343d0.png",
			alt: "Auxiliar de Manutenção",
		},
	},
	{
		title: "Recepcionista de Condomínios",
		description:
			"Atua na recepção e atendimento aos moradores e visitantes, auxiliando na comunicação e na organização do condomínio.",
		image: {
			url: "https://cdn.portal.estacio.br/Recepcionista_de_Condominios_2998ed7bdf.png",
			alt: "Recepcionista de Condomínios",
		},
	},
	{
		title: "Assistente de Serviços Gerais",
		description:
			"Colabora com a administração do condomínio em diversas tarefas, como controle de acesso, organização de eventos e suporte administrativo.",
		image: {
			url: "https://cdn.portal.estacio.br/Assistente_de_Servicos_Gerais_2181ac53f9.png",
			alt: "Assistente de Serviços Gerais",
		},
	},
];

// ============================================================================
// Disciplinas do Curso
// ============================================================================

const courseDisciplines: Discipline[] = [
	{
		name: "ANATOMIA DENTÁRIA E ESCULTURA",
		hours: 50,
		period: "obrigatória",
	},
	{
		name: "BASES BIOLÓGICAS E BIOQUÍMICA",
		hours: 33,
		period: "obrigatória",
	},
	{
		name: "BASES MORFOFUNCIONAIS DO CORPO",
		hours: 82,
		period: "obrigatória",
	},
	{
		name: "FUNDAMENTOS ÉTICOS E LEGAIS DA ODONTOLOGIA",
		hours: 16,
		period: "obrigatória",
	},
	{
		name: "INTEGRALIDADE DO CUIDADO EM SAÚDE",
		hours: 33,
		period: "obrigatória",
	},
	{
		name: "LABVIDA EM ODONTOLOGIA 1",
		hours: 5,
		period: "obrigatória",
	},
	{
		name: "PENSAMENTO CIENTÍFICO E INOVAÇÃO",
		hours: 33,
		period: "obrigatória",
	},
	{
		name: "BASES MORFOLÓGICAS DA ODONTOLOGIA",
		hours: 66,
		period: "obrigatória",
	},
	{
		name: "EXTENSIONISTA 01",
		hours: 83,
		period: "obrigatória",
	},
	{
		name: "FUNDAMENTOS DA CLÍNICA ODONTOLÓGICA",
		hours: 50,
		period: "obrigatória",
	},
	{
		name: "FUNDAMENTOS MICROBIOLÓGICOS E IMUNOLÓGICOS",
		hours: 16,
		period: "obrigatória",
	},
	{
		name: "INTERAÇÕES BIOLÓGICAS E PATOLÓGICAS",
		hours: 33,
		period: "obrigatória",
	},
	{
		name: "LABVIDA EM ODONTOLOGIA 2",
		hours: 5,
		period: "obrigatória",
	},
	{
		name: "BASES CIRÚRGICAS E REABILITADORAS",
		hours: 116,
		period: "obrigatória",
	},
	{
		name: "DIAGNÓSTICO BUCAL INTEGRADO",
		hours: 66,
		period: "obrigatória",
	},
	{
		name: "EXTENSIONISTA 02",
		hours: 83,
		period: "obrigatória",
	},
	{
		name: "FARMACOLOGIA E ANESTESIOLOGIA",
		hours: 33,
		period: "obrigatória",
	},
	{
		name: "LABVIDA EM ODONTOLOGIA 3",
		hours: 5,
		period: "obrigatória",
	},
	{
		name: "CLÍNICA DE RADIOLOGIA E DIAGNÓSTICO",
		hours: 99,
		period: "obrigatória",
	},
	{
		name: "EXTENSIONISTA 03",
		hours: 83,
		period: "obrigatória",
	},
];

// ============================================================================
// Dados do Curso: Administração de Condomínios
// ============================================================================

export const administracaoCondominiosCourse: Course = {
	pageName: "course-detail",
	courseName: "Administração de Condomínios",
	slug: "administracao-condominios",
	code: 1,
	type: "profissionalizante",
	fullSlug: "cursos/administracao-condominios",
	metadata: {
		duration: "6 meses",
		certification: "Profissionalizante",
		category: "Gestão",
		interestArea: "Administração",
	},
	body: [
		{
			componentName: "course-header",
			id: 1,
			title: "Administração de Condomínios",
			description:
				"Transforme sua carreira em 6 meses. Curso com conteúdo prático e direto, com foco total na empregabilidade.",
			certificationType: "Profissionalizante",
			modalTitle: "Administração de Condomínios",
			backgroundImage: {
				url: courseImages.administracaoCondominios.url,
				alt: courseImages.administracaoCondominios.alt,
			},
			breadcrumb: {
				slugs: ["home", "cursos", "administracao-condominios"],
				labels: ["Home", "Cursos", "Administração de Condomínios"],
			},
			card: {
				duration: "6 meses",
				progressBar: false,
			} as CourseCardData,
			learningModels: [
				{
					id: 1,
					title: "EaD",
					description: "Educação a Distância",
				},
				{
					id: 2,
					title: "100% Online",
					description: "Totalmente online",
				},
			] as LearningModel[],
			button: {
				type: "primary",
				label: "Comece agora",
				link: "/inscricao",
			},
		} as CourseHeader,
		{
			componentName: "media-with-text.template-bullets",
			id: 2,
			mode: "neutral",
			position: "Direita",
			templateTitle: "Objetivos do curso",
			dataSection: "objetivos",
			imageDesktop: {
				url: courseImages.objetivos.url,
				alt: courseImages.objetivos.alt,
			},
			imageMobile: {
				url: courseImages.objetivos.url,
				alt: courseImages.objetivos.alt,
			},
			templateBullets: {
				templateDescription:
					"Capacitar profissionais para gerenciar todos os aspectos de um condomínio",
				bullets: [
					{
						title: "Desenvolvimento de Habilidades de Gestão",
						description:
							"Capacitar a gerenciar todas as áreas de um condomínio, desde a administração financeira até a manutenção predial.",
					},
					{
						title: "Aprimoramento de Competências em Comunicação",
						description:
							"Ensinar técnicas de comunicação eficaz para resolver conflitos e melhorar a convivência entre os moradores.",
					},
					{
						title: "Conhecimento em Legislação",
						description:
							"Proporcionar um entendimento profundo das leis e regulamentos que regem a administração de condomínios.",
					},
				] as BulletItem[],
			},
			templateButton: [
				{
					type: "secondary",
					label: "Saiba mais",
					link: "/cursos/administracao-condominios/objetivos",
				},
			],
		} as MediaWithTextSection,
		{
			componentName: "media-with-text.template-bullets",
			id: 3,
			mode: "primary",
			position: "Esquerda",
			templateTitle: "Formação prática e direta",
			dataSection: "formacao",
			imageDesktop: {
				url: courseImages.formacao.url,
				alt: courseImages.formacao.alt,
			},
			imageMobile: {
				url: courseImages.formacao.url,
				alt: courseImages.formacao.alt,
			},
			templateBullets: {
				templateDescription:
					"Abordagem de conteúdo focado nos principais requisitos para sua atuação no mercado de trabalho.",
				bullets: [
					{
						title: "Flexibilidade",
						description:
							"O modelo de ensino digital (EaD) permite que o aluno concilie o curso com sua rotina.",
					},
					{
						title: "Acesso ao mercado de trabalho",
						description:
							"Desenvolva habilidades essenciais para atuar com confiança na sua profissão. Foco na rápida inserção no mercado, com ênfase na prática.",
					},
					{
						title: "Certificação profissional",
						description:
							"Ao final do curso, o aluno receberá um certificado que o habilita a atuar em diversas funções da área.",
					},
				] as BulletItem[],
			},
			templateButton: [
				{
					type: "primary",
					label: "Inscreva-se",
					link: "/inscricao",
				},
			],
		} as MediaWithTextSection,
		{
			componentName: "blocks.blocks-section",
			id: 4,
			mode: "Neutral",
			title: "Perfil profissional",
			description:
				"Desenvolva as competências necessárias para atuar com excelência na área de administração de condomínios.",
			cards: [
				{ id: 1, ...profissionalCards.lideranca },
				{ id: 2, ...profissionalCards.trabalhoEmEquipe },
				{ id: 3, ...profissionalCards.visaoAnalitica },
				{ id: 4, ...profissionalCards.comunicacao },
			] as CardItem[],
		} as BlocksSection,
		{
			componentName: "blocks.blocks-section",
			id: 5,
			mode: "Primary",
			title: "Área de atuação",
			description:
				"Conheça as principais funções e oportunidades de carreira para profissionais formados neste curso.",
			cards: areaAtuacaoCards.map((card, index) => ({
				id: index + 1,
				...card,
			})) as CardItem[],
		} as BlocksSection,
		{
			componentName: "media-with-text.template-bullets",
			id: 6,
			mode: "neutral",
			position: "Direita",
			templateTitle: "Diferenciais",
			dataSection: "diferenciais",
			imageDesktop: {
				url: courseImages.diferenciais.url,
				alt: courseImages.diferenciais.alt,
			},
			imageMobile: {
				url: courseImages.diferenciais.url,
				alt: courseImages.diferenciais.alt,
			},
			templateBullets: {
				templateDescription:
					"Destaque-se com conteúdo alinhado às exigências do mercado, potencialize o entendimento e aplicação das técnicas.",
				bullets: [
					{
						title: "Conteúdo alinhado às necessidades do mercado de trabalho",
						description:
							"Aprenda especificamente sobre a área e entenda como atuar de forma eficaz.",
					},
					{
						title: "Aprendizagem prática e aplicada",
						description:
							"Potencialize seus conhecimentos com recursos que só a Estácio oferece. Conte com o apoio de professores e ferramentas tecnológicas.",
					},
				] as BulletItem[],
			},
			templateButton: [
				{
					type: "primary",
					label: "Quero estudar",
					link: "/inscricao",
				},
			],
		} as MediaWithTextSection,
	],
	curriculum: {
		title: "Grade curricular",
		description: "Aqui você está no controle da sua formação.",
		disciplines: courseDisciplines,
		totalHours: 4008,
	},
	seo: {
		id: 1,
		metaTitle: "Curso de Administração de Condomínios - Estácio",
		metaDescription:
			"Transforme sua carreira em 6 meses com nosso curso profissionalizante de Administração de Condomínios. Formação prática e 100% online.",
		metaImage: {
			url: courseImages.administracaoCondominios.url,
			alt: "Administração de Condomínios",
		},
		keywords:
			"administração de condomínios, curso profissionalizante, gestão condominial",
		canonicalURL: "https://www.estacio.br/cursos/administracao-condominios",
	},
};

// ============================================================================
// Cursos Relacionados
// ============================================================================

export const relatedCourses = [
	{
		title: "Gestão de Imóveis",
		description: "Especialize-se em gestão profissional de imóveis",
		image: {
			url: "https://cdn.portal.estacio.br/curso-gestao-imoveis.png",
			alt: "Gestão de Imóveis",
		},
		link: "/cursos/gestao-imoveis",
	},
	{
		title: "Administração Geral",
		description: "Fundamentos de administração para diversos segmentos",
		image: {
			url: "https://cdn.portal.estacio.br/curso-administracao-geral.png",
			alt: "Administração Geral",
		},
		link: "/cursos/administracao-geral",
	},
	{
		title: "Comunicação Empresarial",
		description: "Desenvolva habilidades de comunicação profissional",
		image: {
			url: "https://cdn.portal.estacio.br/curso-comunicacao-empresarial.png",
			alt: "Comunicação Empresarial",
		},
		link: "/cursos/comunicacao-empresarial",
	},
];

// ============================================================================
// Dados Completos para Compatibilidade (page.tsx)
// ============================================================================

export const realCourseData = {
	theme: {
		menuButton: {
			neutral: { color: { focus: "#121212" } },
			primary: {
				color: { open: "#FFFFFF", close: "#FFFFFF", focus: "#FFFFFF" },
				opacity: 0.72,
			},
		},
		menuSubItem: {
			neutral: { color: "#121212" },
			primary: { color: "#FFFFFF" },
		},
		chronometer: {
			secondary: {
				backgroundColor: "#46C8C8",
				backgroundColorCounter: "#D0F1F1",
				button: {
					backgroundColor: "#EE325D",
					borderColor: "#EE325D",
					hover: { backgroundColor: "#FD8FA8", borderColor: "#FD8FA8" },
				},
			},
			primary: {
				backgroundColor: "#0057A8",
				backgroundColorCounter: "#D0E8F2",
				button: {
					backgroundColor: "#EE325D",
					borderColor: "#EE325D",
					hover: { backgroundColor: "#FD8FA8", borderColor: "#FD8FA8" },
				},
			},
		},
		campaignTrigger: {
			secondary: { backgroundColor: "#46C8C8" },
			primary: { backgroundColor: "#0057A8" },
		},
		neutralColorDarkPure: "#121212",
		neutralColorDarkHigh: "#404040",
		neutralColorDarkLow: "#9A9A9A",
		neutralColorLightPure: "#FFFFFF",
		neutralColorLightHigh: "#F5F5F5",
		neutralColorLightLow: "#E0E0E0",
		feedbackColorPositivePure: "#05A854",
		feedbackColorPositiveHigh: "#C8E6C9",
		feedbackColorPositiveLow: "#F1F8F4",
		feedbackColorNegativePure: "#D22822",
		feedbackColorNegativeHigh: "#FFCDD2",
		feedbackColorNegativeLow: "#FFEBEE",
		feedbackWarningHigh: "#FFF3CD",
		feedbackWarningPure: "#FFC107",
		feedbackWarningLow: "#FFF8DC",
		primaryActionColorPure: "#0057A8",
		primaryActionColorHigh: "#D0E8F2",
		primaryActionColorLow: "#F0F6FC",
		backgroundColorSystemPure: "#FFFFFF",
		backgroundColorSystemHigh: "#F5F5F5",
		backgroundColorSystemLow: "#E0E0E0",
		backgroundColorPublic01Pure: "#0057A8",
		backgroundColorPublic01High: "#D0E8F2",
		backgroundColorPublic01Low: "#F0F6FC",
		backgroundColorPublic02Pure: "#46C8C8",
		backgroundColorPublic02High: "#D0F1F1",
		backgroundColorPublic02Low: "#F0FFFE",
		secondaryActionColorPure: "#46C8C8",
		secondaryActionColorHigh: "#D0F1F1",
		secondaryActionColorLow: "#F0FFFE",
		backgroundColorPublic03Pure: "#EE325D",
		mainOpacity: "1",
		logo: "logo",
		srcLogo: "https://cdn.portal.estacio.br/logo.svg",
		altLogo: "Estácio",
		logoWidth: "120px",
		fontFamily: "Poppins, sans-serif",
		fontFamilyBase: "Inter, sans-serif",
		footerBackgroundColor: "#121212",
		buttonConversaoLabelColor: "#FFFFFF",
		buttonConversaoBGColorHover: "#0057A8",
	},
	pageProps: {
		course: administracaoCondominiosCourse,
	},
};
