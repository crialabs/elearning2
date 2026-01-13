# 🎨 Tokens Globals - Documentação dos Componentes

## Visão Geral

Todos os componentes da página de cursos foram refatorados para usar os **tokens globals** do design-system, seguindo as boas práticas do Ultracite.

---

## 🎯 Tokens Globals Utilizados

### Cores Semânticas

| Token                   | Uso               | Exemplo                          |
| ----------------------- | ----------------- | -------------------------------- |
| `text-foreground`       | Texto principal   | Títulos, textos normais          |
| `text-muted-foreground` | Texto secundário  | Descrições, subtítulos           |
| `bg-background`         | Fundo principal   | Fundo de seções                  |
| `bg-secondary`          | Fundo alternativo | Seções alternadas                |
| `bg-card`               | Fundo de cards    | Cards, containers                |
| `bg-primary`            | Cor de destaque   | Botões primários, badges         |
| `bg-muted`              | Fundo suave       | Estados hover, backgrounds leves |
| `border-border`         | Bordas            | Separadores, bordas de cards     |

### Tipografia

| Token                                        | Uso                          |
| -------------------------------------------- | ---------------------------- |
| `font-bold`                                  | Títulos principais (h1, h2)  |
| `font-semibold`                              | Títulos secundários (h3, h4) |
| `font-medium`                                | Ênfase em texto regular      |
| `text-lg`, `text-xl`, `text-2xl`, `text-3xl` | Tamanhos responsivos         |

### Espaçamento

| Token                                      | Uso                        |
| ------------------------------------------ | -------------------------- |
| `py-8`, `py-12`, `py-16`, `py-20`, `py-24` | Padding vertical em seções |
| `px-4`                                     | Padding horizontal (móvel) |
| `gap-6`, `gap-8`, `gap-12`                 | Espaço entre elementos     |
| `mb-4`, `mb-6`, `mb-12`                    | Margens inferiores         |

### Efeitos

| Token               | Uso                       |
| ------------------- | ------------------------- |
| `shadow-lg`         | Sombra em cards/imagens   |
| `hover:shadow-lg`   | Sombra no hover           |
| `transition-shadow` | Transição suave de sombra |
| `rounded-lg`        | Bordas arredondadas       |
| `overflow-hidden`   | Clip de conteúdo          |

---

## 📋 Mapeamento de Componentes

### 1. CourseHeader

```tsx
// Antes (❌)
<h1 className="text-4xl font-bold text-neutral-950">
<p className="text-lg text-neutral-600">

// Depois (✅)
<h1 className="text-4xl font-bold text-foreground">
<p className="text-lg text-muted-foreground">
```

**Tokens usados:**

- `bg-background` (seção)
- `text-foreground` (título)
- `text-muted-foreground` (descrição, subtextos)
- `bg-primary` (accent color do tema)

---

### 2. MediaWithText

```tsx
// Antes (❌)
<section className="bg-blue-50">
<h2 className="text-3xl font-bold text-neutral-950">
<div className="bg-blue-500"> /* bullet */

// Depois (✅)
<section className="bg-secondary">
<h2 className="text-3xl font-bold text-foreground">
<div className="bg-primary"> /* bullet */
```

**Tokens usados:**

- `bg-background` / `bg-secondary` (alternância de fundo)
- `text-foreground` / `text-muted-foreground` (textos)
- `bg-primary` (bullets numerados)
- `border-border` (bordas)

---

### 3. ItemGrid

```tsx
// Antes (❌)
<section className="bg-blue-50">
<Card className="bg-white border-0">
<p className="text-neutral-600">

// Depois (✅)
<section className="bg-secondary">
<Card className="bg-card border-border">
<p className="text-muted-foreground">
```

**Tokens usados:**

- `bg-background` / `bg-secondary` (contextual)
- `bg-card` / `border-border` (card styling)
- `text-foreground` / `text-muted-foreground` (hierarquia)

---

### 4. CarouselSection

```tsx
// Antes (❌)
<Card className="bg-white shadow-md">
<p className="text-neutral-600">

// Depois (✅)
<Card className="bg-card shadow-md hover:shadow-lg">
<p className="text-muted-foreground">
```

**Tokens usados:**

- `bg-card` (cards)
- `border-border` (separação)
- `shadow-lg` / `hover:shadow-lg` (efeitos)
- `text-muted-foreground` (descrições)

---

### 5. FAQSection

```tsx
// Antes (❌)
<AccordionItem className="border-neutral-200">
<div className="hover:bg-neutral-100">
<p className="text-neutral-600">

// Depois (✅)
<AccordionItem className="border-border">
<div className="hover:bg-muted">
<p className="text-muted-foreground">
```

**Tokens usados:**

- `border-border` (accordion items)
- `bg-muted` (hover states)
- `text-foreground` / `text-muted-foreground` (hierarquia)

---

### 6. CurriculumSection

```tsx
// Antes (❌)
<div className="bg-blue-500"> /* semester badge */
<span className="inline-block bg-neutral-200"> /* type badge */
<p className="text-neutral-600">

// Depois (✅)
<div className="bg-primary"> /* semester badge */
<span className="inline-block bg-muted"> /* type badge */
<p className="text-muted-foreground">
```

**Tokens usados:**

- `bg-primary` (semester indicators)
- `bg-muted` (type badges)
- `border-border` (table borders)
- `text-foreground` / `text-muted-foreground` (textos)

---

### 7. QuickStatsGrid

```tsx
// Antes (❌)
<Card className="border-blue-200 bg-blue-50">
<p className="text-blue-600"> /* icon */
<p className="text-2xl font-bold text-neutral-950">

// Depois (✅)
<Card className="bg-primary text-primary-foreground">
<p className="text-current"> /* icon adapts to bg */
<p className="text-2xl font-bold text-current">
```

**Tokens usados:**

- `bg-primary` / `bg-secondary` / `bg-card` (variantes)
- `text-primary-foreground` (texto sobre primário)
- `text-current` (herança automática)
- `text-muted-foreground` (descrições em card)

---

### 8. CTASection

```tsx
// Antes (❌)
<section style={{ backgroundColor: "#144BC8" }}>
<h2 className="text-white">
<p className="text-white/90">

// Depois (✅)
<section style={{ backgroundColor: bgColor }}>
<h2 className="text-white">
<p className="text-white/90">
```

**Tokens usados:**

- `bg-[color]` (inline style para tema dinâmico)
- `text-white` (contrast automático)
- Mantém flexibilidade de cores do tema

---

### 9. RelatedCourses

```tsx
// Antes (❌)
<section className="bg-white">
<div className="bg-neutral-50">
<p className="text-neutral-600">

// Depois (✅)
<section className="bg-background">
<div className="bg-card border-border">
<p className="text-muted-foreground">
```

**Tokens usados:**

- `bg-background` (seção)
- `bg-card` (course cards)
- `border-border` (card borders)
- `text-muted-foreground` (descrições)

---

## ✅ Boas Práticas Implementadas

### 1. **Sem Hardcoded Colors**

- ❌ ~~`text-neutral-950`~~ → ✅ `text-foreground`
- ❌ ~~`bg-blue-50`~~ → ✅ `bg-secondary`
- ❌ ~~`text-neutral-600`~~ → ✅ `text-muted-foreground`

### 2. **Componentes Semânticos**

- Uso direto de CSS custom properties via Tailwind
- Suporte automático a tema claro/escuro
- Manutenção centralizada (globals.css)

### 3. **Responsividade Consistente**

```tsx
// Padrão em todos os componentes
<h2 className="text-3xl sm:text-4xl font-bold">
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### 4. **Acessibilidade**

```tsx
// aria-hidden para elementos decorativos
<div aria-hidden="true" className="...">

// Contraste apropriado
<p className="text-foreground"> /* Alto contraste */
<p className="text-muted-foreground"> /* Secundário */
```

### 5. **Sem Inline Styles Desnecessários**

- Antes: `style={{ backgroundColor: "..." }}`
- Depois: Classe Tailwind ou variável CSS

### 6. **Type Safety**

```tsx
// Type annotations claras
const gridColsClass: Record<2 | 3 | 4, string> = { ... }
const bgClassName = mode === "primary" ? "bg-secondary" : "bg-background"
```

### 7. **Composição Limpa**

- Funções pequenas e focadas
- Sem lógica complexa desnecessária
- Props bem documentadas

---

## 🔄 Variações de Modo

Todos os componentes suportam `mode` para alternância de backgrounds:

```tsx
mode="primary" → bg-secondary (fundo alternado)
mode="neutral" → bg-background (fundo padrão)
```

---

## 📱 Responsividade

Padrão aplicado em todos os componentes:

```
Mobile:  1 coluna
Tablet:  2 colunas (md:)
Desktop: 3-4 colunas (lg:)
```

---

## 🎭 Dark Mode

Suporte automático via `dark:` variant:

```css
:root {
  --foreground: oklch(...);
}
.dark {
  --foreground: oklch(...);
}
```

Componentes adaptem automaticamente!

---

## 📌 Próximos Passos

- [ ] Adicionar testes unitários para componentes
- [ ] Implementar Storybook para documentação visual
- [ ] Adicionar animações com `tw-animate-css`
- [ ] Otimizar images com lazy loading
- [ ] Adicionar error boundaries

---

**Data:** 13 de janeiro de 2026  
**Status:** ✅ Refatoração Completa  
**Autor:** GitHub Copilot
