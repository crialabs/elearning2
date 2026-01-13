/\*\*

- EXEMPLO RÁPIDO: Integração em 5 minutos
-
- Copie e cole este código na sua página para começar a usar
  \*/

# 🚀 Quick Start: 5 Minutos

## Opção 1: Mock Data (Agora mesmo)

### 1️⃣ Importar dados

```typescript
// app/(home)/cursos/[slug]/page.tsx
import { administracaoCondominiosCourse } from "@/lib/mock-data";
```

### 2️⃣ Passar para componentes

```typescript
export default function CoursePage() {
  const course = administracaoCondominiosCourse;

  return (
    <main>
      <CourseHeader {...course.body[0]} />
      <MediaWithText {...course.body[1]} />
      <MediaWithText {...course.body[2]} />
      <ItemGrid {...course.body[3]} />
      <ItemGrid {...course.body[4]} />
      <MediaWithText {...course.body[5]} />
      <CurriculumSection {...course.body[6]} />
      <FAQSection {...course.body[7]} />
    </main>
  );
}
```

### 3️⃣ Pronto! ✅

Sua página está funcionando com dados reais da Estácio.

---

## Opção 2: Com Dados da API (Recomendado)

### 1️⃣ Criar function para fetch

```typescript
// lib/api/courses.ts
import type { Course } from "@/lib/types";
import { administracaoCondominiosCourse } from "@/lib/mock-data";

export async function getCourse(slug: string): Promise<Course> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error("API error");
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return administracaoCondominiosCourse; // Fallback
  }
}
```

### 2️⃣ Usar em Server Component

```typescript
// app/(home)/cursos/[slug]/page.tsx
import { getCourse } from "@/lib/api/courses";

export default async function CoursePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const course = await getCourse(slug);

  return (
    <main>
      {course.body.map((section) => (
        <Section key={section.id} data={section} />
      ))}
    </main>
  );
}
```

### 3️⃣ Pronto! ✅

Sua página agora fetcha dados da API com fallback automático.

---

## Opção 3: Com Renderização Dinâmica (Client)

### 1️⃣ Criar hook

```typescript
// lib/hooks/useCourse.ts
"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/lib/types";
import { administracaoCondominiosCourse } from "@/lib/mock-data";

export function useCourse(slug: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await fetch(`/api/courses/${slug}`);
        setCourse(await res.json());
      } catch (error) {
        setCourse(administracaoCondominiosCourse);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [slug]);

  return { course, loading };
}
```

### 2️⃣ Usar em Client Component

```typescript
"use client";

import { useCourse } from "@/lib/hooks/useCourse";

export default function CoursePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { course, loading } = useCourse(slug);

  if (loading) return <div>Carregando...</div>;
  if (!course) return <div>Erro ao carregar</div>;

  return (
    <main>
      {course.body.map((section) => (
        <Section key={section.id} data={section} />
      ))}
    </main>
  );
}
```

### 3️⃣ Pronto! ✅

Sua página carrega dados dinamicamente com loading state.

---

## 📋 Comparação: Qual escolher?

| Opção                | Quando usar     | Prós                | Contras                |
| -------------------- | --------------- | ------------------- | ---------------------- |
| **Mock Data**        | Desenvolvimento | ✅ Rápido, sem API  | ❌ Dados estáticos     |
| **Server Component** | Recomendado     | ✅ SEO, ISR, rápido | ❌ Sem loading state   |
| **Client Hook**      | Dinâmico        | ✅ Loading state    | ❌ Sem SEO, mais lento |

**Recomendação:** Use Server Component (Opção 2) para produção.

---

## 🔧 Configuração de Ambiente

### `.env.local`

```env
# URL da sua API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### `.env.production`

```env
# URL da API em produção
NEXT_PUBLIC_API_URL=https://api.estacio.br/v1
```

---

## 📊 Dados Disponíveis

### Acessar sections

```typescript
const course = administracaoCondominiosCourse;

// Qualquer uma das 8 seções
const header = course.body[0]; // CourseHeader
const objectives = course.body[1]; // MediaWithText
const training = course.body[2]; // MediaWithText
const profile = course.body[3]; // ItemGrid
const areas = course.body[4]; // ItemGrid
const differentials = course.body[5]; // MediaWithText
const curriculum = course.body[6]; // CurriculumSection
const faq = course.body[7]; // FAQSection
```

### Acessar metadados

```typescript
// SEO
course.seo.metaTitle;
course.seo.metaDescription;
course.seo.canonicalURL;

// Metadata
course.metadata.duration; // "6 meses"
course.metadata.certification; // "Profissionalizante"
course.metadata.category; // "Gestão"
```

---

## ✨ Exemplo Completo: Página Funcional

```typescript
/**
 * app/(home)/cursos/[slug]/page.tsx
 * Página de detalhe de curso - Exemplo Completo
 */

import { getCourse } from "@/lib/api/courses";
import CourseHeader from "@/components/CourseHeader";
import MediaWithText from "@/components/MediaWithText";
import ItemGrid from "@/components/ItemGrid";
import CurriculumSection from "@/components/CurriculumSection";
import FAQSection from "@/components/FAQSection";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const course = await getCourse(params.slug);

  return {
    title: course.seo.metaTitle,
    description: course.seo.metaDescription,
    keywords: course.seo.keywords,
    canonicalUrl: course.seo.canonicalURL,
  };
}

export default async function CoursePage({ params }: PageProps) {
  const course = await getCourse(params.slug);

  return (
    <main className="w-full">
      {/* 1. Hero Header */}
      <CourseHeader {...course.body[0]} />

      {/* 2. Objetivos */}
      <section className="bg-background">
        <MediaWithText {...course.body[1]} />
      </section>

      {/* 3. Formação */}
      <section className="bg-muted">
        <MediaWithText {...course.body[2]} />
      </section>

      {/* 4. Perfil Profissional */}
      <section className="bg-background">
        <ItemGrid {...course.body[3]} />
      </section>

      {/* 5. Área de Atuação */}
      <section className="bg-secondary">
        <ItemGrid {...course.body[4]} />
      </section>

      {/* 6. Diferenciais */}
      <section className="bg-background">
        <MediaWithText {...course.body[5]} />
      </section>

      {/* 7. Grade de Disciplinas */}
      <section className="bg-muted">
        <CurriculumSection {...course.body[6]} />
      </section>

      {/* 8. FAQ */}
      <section className="bg-background">
        <FAQSection {...course.body[7]} />
      </section>
    </main>
  );
}
```

---

## 🎯 Checklist de Implementação

```
[ ] 1. Copiar dados de mock-data.ts
[ ] 2. Importar em sua página
[ ] 3. Passar para componentes
[ ] 4. Testar no navegador
[ ] 5. Verificar TypeScript (npm run type-check)
[ ] 6. Rodar Ultracite (npm run lint)
[ ] 7. Testar responsividade
[ ] 8. Pronto para produção!
```

---

## 🐛 Troubleshooting

### Erro: "Module not found"

```typescript
// ❌ Errado
import { administracaoCondominiosCourse } from "lib/mock-data";

// ✅ Correto
import { administracaoCondominiosCourse } from "@/lib/mock-data";
```

### Erro: "Cannot read property 'body'"

```typescript
// ❌ Errado
const header = course[0];

// ✅ Correto
const header = course.body[0];
```

### Type Error em componente

```typescript
// ✅ Adicionar type assertion
<CourseHeader {...(course.body[0] as CourseHeader)} />;

// Ou melhor ainda, verificar tipo
if (course.body[0].componentName === "course-header") {
  return <CourseHeader {...course.body[0]} />;
}
```

---

## 📚 Próximos Passos

### Curto prazo (hoje)

1. ✅ Implementar uma das 3 opções acima
2. ✅ Testar em navegador
3. ✅ Validar TypeScript

### Médio prazo (essa semana)

1. Implementar API real (`/api/v1/courses/{slug}`)
2. Substituir URLs mockadas por reais
3. Adicionar cache ISR

### Longo prazo (próximas semanas)

1. Busca de cursos
2. Filtros e categorias
3. Relacionados dinâmicos
4. Analytics

---

## 💬 Perguntas Frequentes

**P: Preciso alterar a estrutura de dados?**  
R: Não. Já está otimizada e segue as interfaces existentes.

**P: Posso usar múltiplos cursos?**  
R: Sim. Adicione novos exports ao `mock-data.ts` e use o parametro `slug` para seleção.

**P: Como adicionar mais seções?**  
R: Adicione novo item ao `body[]` array com `componentName` apropriado.

**P: Preciso de autenticação para API?**  
R: Sim, adicione header no fetch: `Authorization: Bearer ${token}`

---

## ✅ Validação Rápida

```bash
# 1. Verificar TypeScript
npm run type-check

# 2. Verificar linting
npm run lint

# 3. Buildar
npm run build

# 4. Testar
npm run dev
# Abrir: http://localhost:3000/cursos/administracao-condominios
```

---

**Tempo total de implementação:** 5-15 minutos  
**Dificuldade:** ⭐ Fácil  
**Suporte:** Consultar GUIA_MOCK_DATA.md para detalhes
