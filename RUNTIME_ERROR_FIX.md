# 🐛 Fix: Runtime Error - Null Safety em Formatadores

## ✅ Status: Corrigido

O erro `null is not an object (evaluating 'type.toLowerCase')` foi resolvido adicionando validações nullsafe em funções formatadoras.

---

## 📝 Problema

### Erro Reportado

```
Runtime Error: null is not an object (evaluating 'type.toLowerCase')
at mapButtonType (utils.ts:82:17)
at CarouselSection (carousel-section/index.tsx:85:23)
```

### Causa Root

O JSON dos dados reais do curso contém muitos items com valores `null`:

- `button.type = null`
- `card.description = null`
- etc.

As funções formatadoras não verificavam se o valor era `null/undefined` antes de chamar operações de string.

---

## 🔧 Solução Implementada

### 1. **mapButtonType()** - Protegida

```typescript
// ANTES: ❌ Quebrava se type fosse null
export function mapButtonType(type: string): ... {
    return typeMap[type.toLowerCase()] || "default";
}

// DEPOIS: ✅ Retorna padrão se null
export function mapButtonType(type: string | null | undefined): ... {
    if (!type) return "default";
    return typeMap[type.toLowerCase()] || "default";
}
```

### 2. **formatDuration()** - Protegida

```typescript
// ANTES: ❌ Quebrava se duration fosse null
export function formatDuration(duration: string): string {
    const durationMap = { ... };
    return durationMap[duration] || duration;
}

// DEPOIS: ✅ Retorna string vazia se null
export function formatDuration(duration: string | null | undefined): string {
    if (!duration) return "";
    const durationMap = { ... };
    return durationMap[duration] || duration;
}
```

### 3. **formatCertification()** - Protegida

```typescript
// ANTES: ❌ Quebrava se certification fosse null
export function formatCertification(certification: string): string {
    const certificationMap = { ... };
    return certificationMap[certification] || certification;
}

// DEPOIS: ✅ Retorna string vazia se null
export function formatCertification(certification: string | null | undefined): string {
    if (!certification) return "";
    const certificationMap = { ... };
    return certificationMap[certification] || certification;
}
```

### 4. **formatModality()** - Protegida

```typescript
// ANTES: ❌ Quebrava se modality fosse null
export function formatModality(modality: string): string {
    const modalityMap = { ... };
    return modalityMap[modality] || modality;
}

// DEPOIS: ✅ Retorna string vazia se null
export function formatModality(modality: string | null | undefined): string {
    if (!modality) return "";
    const modalityMap = { ... };
    return modalityMap[modality] || modality;
}
```

---

## ✅ Mudanças Realizadas

| Função                  | Antes                   | Depois                                       |
| ----------------------- | ----------------------- | -------------------------------------------- |
| `mapButtonType()`       | `type: string`          | `type: string \| null \| undefined`          |
| `formatDuration()`      | `duration: string`      | `duration: string \| null \| undefined`      |
| `formatCertification()` | `certification: string` | `certification: string \| null \| undefined` |
| `formatModality()`      | `modality: string`      | `modality: string \| null \| undefined`      |

---

## 🎯 Comportamento Após Correção

### Antes (❌ Crash)

```
carousel-section renderiza item
→ item.button.type = null
→ mapButtonType(null)
→ null.toLowerCase()
→ RUNTIME ERROR: null is not an object
```

### Depois (✅ Funcionando)

```
carousel-section renderiza item
→ item.button.type = null
→ mapButtonType(null)
→ if (!null) return "default"
→ Retorna "default"
→ Button renderiza com variante padrão
→ ✅ Sem erros
```

---

## 📋 Checklist

- ✅ `mapButtonType()` adicionado validação nullsafe
- ✅ `formatDuration()` adicionado validação nullsafe
- ✅ `formatCertification()` adicionado validação nullsafe
- ✅ `formatModality()` adicionado validação nullsafe
- ✅ Página.tsx compilando sem erros
- ✅ Carregamento sem runtime errors
- ✅ Carousel renderizando corretamente

---

## 🚀 Resultado Final

Todas as seções da página agora renderizam corretamente mesmo com valores nulos nos dados:

- ✅ CourseHeader
- ✅ MediaWithText (3 seções)
- ✅ ItemGrid (Perfil Profissional)
- ✅ CarouselSection (3 carousels - **agora sem crash**)
- ✅ FAQSection

---

## 💡 Lições Aprendidas

1. **Sempre validar dados da API** - Mesmo que esperados, podem vir `null/undefined`
2. **Type-safe é importante** - TypeScript pode evitar esse tipo de erro
3. **Funções puras devem ser robustas** - Tratarem casos extremos (null, undefined, strings vazias)

---

**Data:** 13 de janeiro de 2026  
**Status:** ✅ Corrigido  
**Arquivo:** `lib/utils.ts`  
**Commit:** Null safety em formatadores
