/\*\*

- Página de Detalhe de Curso - Componentes Reutilizáveis
-
- Esta implementação proporciona componentes reutilizáveis para construir
- páginas de detalhe de cursos dinâmicas baseadas em dados JSON.
-
- ## Uso Principal
-
- Os componentes são utilizados na página principal (page.tsx) que recebe
- dados estruturados do CMS/API e os distribui para os componentes apropriados.
-
- ## Componentes Disponíveis
-
- ### CourseHeader
- Hero section com informações principais do curso.
- Props: title, description, image, breadcrumbs, duration, learningModels, button
-
- ### MediaWithText
- Seção com imagem e conteúdo textual/bullets em layout alternado.
- Props: title, description, image, bullets, position, variant, button
-
- ### ItemGrid
- Grid de cards com informações estruturadas.
- Props: title, description, items, columns, variant, mode
-
- ### CarouselSection
- Carousel horizontal com cards ou items customizáveis.
- Props: title, description, items, variant, mode
-
- ### FAQSection
- Accordion com perguntas e respostas.
- Props: title, description, items, mode, textCta, button
-
- ### CurriculumSection
- Accordion com semestres e disciplinas em tabela.
- Props: title, description, disciplines, expandMode, mode
-
- ### QuickStatsGrid
- Grid de estatísticas/informações rápidas.
- Props: title, stats, columns, theme
-
- ### CTASection
- Seção de chamada à ação com fundo colorido.
- Props: title, description, button, backgroundImage, backgroundColor, theme
-
- ### RelatedCourses
- Carousel ou grid de cursos relacionados.
- Props: title, courses, showCarousel, theme
-
- ## Estrutura de Dados
-
- Os dados devem estar estruturados conforme o interface Course (lib/types.ts).
- Cada seção do course.body contém um componentName que indica qual componente usar.
-
- ## Customização
-
- ### Temas
- Use lib/theme-mapper.ts para converter paletas de cores em CSS variables.
-
- ### Estilos
- Componentes usam Tailwind CSS com classes padrão. Customize via:
- - Props variant e mode para variantes pré-definidas
- - className props para estilos adicionais
- - CSS variables para cores dinâmicas
-
- ## Boas Práticas
-
- 1.  Mantenha data binding na página principal (page.tsx)
- 2.  Componentes devem ser presentacionais, sem lógica de dados complexa
- 3.  Use types.ts para manter tipagem consistente
- 4.  Exporte components de index.tsx para fácil importação
- 5.  Considere lazy loading para componentes abaixo da fold
-
- ## Performance
-
- - Imagens otimizadas com next/image
- - Carousels com infinite scroll desabilitado por padrão
- - Lazy loading de images em seções abaixo da fold
- - Code splitting por componente
-
- ## SEO
-
- - Semântica HTML apropriada (section, article, nav)
- - Meta tags gerenciadas no layout pai
- - Structured data (JSON-LD) injetado via scripts
- \*/

export { CourseHeader } from './course-header';
export { MediaWithText } from './media-with-text';
export { ItemGrid } from './item-grid';
export { CarouselSection } from './carousel-section';
export { FAQSection } from './faq-section';
export { CurriculumSection } from './curriculum-section';
export { QuickStatsGrid } from './quick-stats';
export { CTASection } from './cta-section';
export { RelatedCourses } from './related-courses';
