# 🚀 Quick Reference - Tokens Globals

## Mapeamento Rápido de Tokens

```
TEXTO
├─ text-foreground         → Títulos, texto principal
├─ text-muted-foreground   → Descrições, subtítulos
├─ text-primary-foreground → Texto em fundo primário
└─ text-current            → Herança automática da cor pai

FUNDO
├─ bg-background    → Fundo base das seções
├─ bg-secondary     → Fundo alternado
├─ bg-card          → Cards, containers
├─ bg-muted         → Hover states, badges
└─ bg-primary       → Botões, destaque

BORDAS
├─ border-border    → Bordas de elementos
└─ border-0         → Sem borda

SOMBRAS
├─ shadow-lg        → Sombra padrão
├─ hover:shadow-lg  → Sombra no hover
└─ transition-shadow → Transição suave

ESPAÇAMENTO
├─ py-8, py-12, py-16, py-20, py-24   → Vertical
├─ px-4, px-6                          → Horizontal
├─ gap-4, gap-6, gap-8, gap-12        → Grid gaps
└─ mb-4, mb-6, mb-12                  → Bottom margins

TAMANHO
├─ h-96, sm:h-125 → Alturas responsivas
├─ rounded-lg     → Bordas arredondadas
└─ overflow-hidden → Clip de conteúdo
```

---

## ✅ Checklist para Componentes

Ao trabalhar com componentes, sempre use:

```
TEXTO
☐ text-foreground        (títulos)
☐ text-muted-foreground  (descrições)
☐ font-bold              (títulos)
☐ font-semibold          (subtítulos)

FUNDO
☐ bg-background          (seções)
☐ bg-secondary           (alternado)
☐ bg-card                (cards)
☐ bg-muted               (hover)

INTERAÇÕES
☐ bg-primary             (botões)
☐ hover:shadow-lg        (efeitos)
☐ transition-*           (animações)

RESPONSIVIDADE
☐ grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
☐ py-12 sm:py-20
☐ px-4
☐ gap-6

ACESSIBILIDADE
☐ aria-hidden="true"     (elementos decorativos)
☐ Contraste apropriado
☐ alt text em imagens
```

---

## 🎨 Padrões por Tipo de Componente

### Seção

```tsx
<section className="w-full py-12 sm:py-20 bg-background">
  <div className="container mx-auto px-4">{/* conteúdo */}</div>
</section>
```

### Card

```tsx
<Card className="bg-card border-border">
  <CardHeader>
    <CardTitle className="text-foreground">Título</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Descrição</p>
  </CardContent>
</Card>
```

### Botão

```tsx
<Button
  size="lg"
  variant="default" // ou secondary, outline, ghost
  className="bg-primary"
>
  CTA Text
</Button>
```

### Lista

```tsx
<ul className="space-y-4">
  {items.map((item) => (
    <li key={item.id} className="flex gap-3">
      <div className="shrink-0 h-6 w-6 rounded-full bg-primary" />
      <div>
        <h3 className="text-foreground font-medium">{item.title}</h3>
        <p className="text-muted-foreground text-sm">{item.desc}</p>
      </div>
    </li>
  ))}
</ul>
```

### Grid Responsivo

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <div key={item.id} className="bg-card rounded-lg p-4">
      {/* conteúdo */}
    </div>
  ))}
</div>
```

---

## 🔄 Antes/Depois Rápido

| Antes                | Depois                  |
| -------------------- | ----------------------- |
| `text-neutral-950`   | `text-foreground`       |
| `text-neutral-600`   | `text-muted-foreground` |
| `bg-white`           | `bg-background`         |
| `bg-blue-50`         | `bg-secondary`          |
| `bg-neutral-50`      | `bg-card`               |
| `bg-neutral-100`     | `bg-muted`              |
| `bg-blue-500`        | `bg-primary`            |
| `border-neutral-200` | `border-border`         |
| `flex-shrink-0`      | `shrink-0`              |
| `h-[500px]`          | `h-125`                 |

---

## 🎯 Dark Mode (Automático)

```tsx
// Sem necessidade de dark: prefix
// CSS variables já handle tudo automaticamente

// Modo claro
<h1 className="text-foreground">
  → texto preto

// Modo escuro (em .dark container)
<h1 className="text-foreground">
  → texto branco (automático!)
```

---

## 📱 Responsive Shortcuts

```
Base (mobile)     → nenhum prefix
md: (768px+)      → md:
lg: (1024px+)     → lg:
xl: (1280px+)     → xl:
2xl: (1536px+)    → 2xl:

Exemplo:
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
py-8 md:py-12 lg:py-20
px-4 md:px-6 lg:px-8
```

---

## 🔧 Troubleshooting

### ❌ Problema: Cor não muda em dark mode

**✅ Solução:** Use `text-foreground` em vez de `text-gray-900`

### ❌ Problema: Contraste ruim

**✅ Solução:** Use `text-muted-foreground` apenas em textos secundários

### ❌ Problema: Cards com borda feia

**✅ Solução:** Use `border-border` em vez de `border-gray-200`

### ❌ Problema: Botões com cor errada

**✅ Solução:** Use `bg-primary` e deixe o variant do Button fazer o resto

### ❌ Problema: Hover state não funciona

**✅ Solução:** Use `hover:shadow-lg` ou `hover:bg-muted`

---

## 📊 Grid Column Counts

```
2 colunas:  grid-cols-1 md:grid-cols-2
3 colunas:  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
4 colunas:  grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

---

## 🎨 Espaçamento Padrão

```
Seções:    py-8 | py-12 | py-16 | py-20 | py-24
Móvel:     px-4
Tablet:    px-6
Desktop:   container mx-auto px-4
Gap:       gap-4 | gap-6 | gap-8 | gap-12
```

---

## ✨ Next.js Image

```tsx
import Image from "next/image";

<Image
  src={url}
  alt={alt}
  fill // fill container
  className="object-cover"
  priority // carrega rápido
/>;
```

---

## 🔗 Referências

- **Design System:** `@repo/design-system`
- **Globals:** `packages/design-system/styles/globals.css`
- **Documentação:** `TOKENS_GLOBALS_GUIDE.md`
- **Visual Guide:** `TOKENS_VISUAL_GUIDE.md`

---

**Quick Reference - 13/01/2026 ✅**
