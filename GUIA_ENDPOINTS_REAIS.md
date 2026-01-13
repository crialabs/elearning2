/\*\*

- GUIA DE ENDPOINTS REAIS
-
- Mapeamento de URLs reais da Estácio com a estrutura de dados
- e como integrar com a aplicação.
  \*/

# 🔗 Endpoints Reais da Estácio

## 1. Endpoints da API

### Pegar dados de um curso

```bash
GET /api/v1/courses/{slug}
GET /api/v2/courses/{slug}

# Exemplo real
GET https://api.estacio.br/v1/courses/administracao-condominios
```

**Response esperado:**

```json
{
  "pageName": "course-detail",
  "courseName": "Administração de Condomínios",
  "slug": "administracao-condominios",
  "code": 12345,
  "type": "profissionalizante",
  "fullSlug": "cursos/administracao-condominios",
  "metadata": {
    "duration": "6 meses",
    "certification": "Profissionalizante",
    "category": "Gestão",
    "interestArea": "Administração"
  },
  "body": [
    /* ... seções ... */
  ],
  "seo": {
    /* ... */
  }
}
```

### Pegar lista de cursos

```bash
GET /api/v1/courses
GET /api/v1/courses?category=Gestão&limit=10&page=1

# Com filtros
GET https://api.estacio.br/v1/courses?searchTerm=Administração&sort=popularity
```

**Response esperado:**

```json
{
  "data": [
    {
      "slug": "administracao-condominios",
      "courseName": "Administração de Condomínios",
      "description": "...",
      "duration": "6 meses",
      "backgroundImage": { "url": "...", "alt": "..." }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150
  }
}
```

### Pegar seção específica

```bash
GET /api/v1/courses/{slug}/sections/{sectionId}
GET /api/v1/courses/{slug}/faq
GET /api/v1/courses/{slug}/disciplines
GET /api/v1/courses/{slug}/curriculum
```

## 2. Mapeamento de URLs Reais para Mock Data

| Mock Data                                   | Endpoint Real                                     | Descrição              |
| ------------------------------------------- | ------------------------------------------------- | ---------------------- |
| `courseImages.administracaoCondominios.url` | `GET /api/v1/courses/{slug}/images/hero`          | Imagem hero            |
| `courseImages.objetivos.url`                | `GET /api/v1/courses/{slug}/images/objectives`    | Imagem de objetivos    |
| `body[0]` (Header)                          | `GET /api/v1/courses/{slug}`                      | Seção header completa  |
| `body[4].cards`                             | `GET /api/v1/courses/{slug}/career-opportunities` | Cards de oportunidades |
| `body[7].cards`                             | `GET /api/v1/courses/{slug}/faq`                  | Perguntas frequentes   |
| `body[6].disciplines`                       | `GET /api/v1/courses/{slug}/curriculum`           | Grade de disciplinas   |
| `seo`                                       | `GET /api/v1/courses/{slug}/seo`                  | Metadados SEO          |

## 3. Implementação: Hook para Fetch de Dados

### Criar arquivo: `lib/hooks/useCourseData.ts`

```typescript
"use client";

import { useEffect, useState } from "react";
import type { Course } from "../types";
import { administracaoCondominiosCourse } from "../mock-data";

interface UseCourseDataResult {
  course: Course | null;
  isLoading: boolean;
  error: Error | null;
}

export function useCourseData(slug: string): UseCourseDataResult {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setIsLoading(true);
        setError(null);

        // Tentar API real
        const response = await fetch(
          `/api/v1/courses/${slug}`,
          { next: { revalidate: 3600 } } // Cache 1 hora
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = (await response.json()) as Course;
        setCourse(data);
      } catch (err) {
        // Fallback para mock data em caso de erro
        console.warn(`Failed to fetch course ${slug}, using mock data`, err);
        setCourse(administracaoCondominiosCourse);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourse();
  }, [slug]);

  return { course, isLoading, error };
}
```

### Usar em componente:

```typescript
"use client";

import { useCourseData } from "@/lib/hooks/useCourseData";
import CourseHeader from "@/components/CourseHeader";

export default function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { course, isLoading, error } = useCourseData(params.slug);

  if (isLoading) return <div>Carregando...</div>;
  if (error) console.warn("API error:", error);
  if (!course) return <div>Curso não encontrado</div>;

  return (
    <div>
      <CourseHeader {...course.body[0]} />
      {/* ... mais seções ... */}
    </div>
  );
}
```

## 4. Implementação: Server Component (Recomendado)

### Criar arquivo: `lib/api/getCourseData.ts`

```typescript
import type { Course } from "../types";
import { administracaoCondominiosCourse } from "../mock-data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.estacio.br/v1";

export async function getCourseData(slug: string): Promise<Course> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${slug}`, {
      next: { revalidate: 3600 }, // ISR: revalidate a cada 1 hora
      headers: {
        "Content-Type": "application/json",
        // Adicionar autenticação se necessário
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch course: ${response.statusText}`);
    }

    return (await response.json()) as Course;
  } catch (error) {
    console.error(`Error fetching course ${slug}:`, error);

    // Fallback para mock data
    return administracaoCondominiosCourse;
  }
}

export async function getCoursesListData(options?: {
  category?: string;
  limit?: number;
  page?: number;
  search?: string;
}) {
  const params = new URLSearchParams();

  if (options?.category) params.append("category", options.category);
  if (options?.limit) params.append("limit", options.limit.toString());
  if (options?.page) params.append("page", options.page.toString());
  if (options?.search) params.append("search", options.search);

  try {
    const response = await fetch(
      `${API_BASE_URL}/courses?${params.toString()}`,
      { next: { revalidate: 1800 } } // Cache 30 minutos
    );

    if (!response.ok) {
      throw new Error("Failed to fetch courses list");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching courses list:", error);
    return { data: [], pagination: { total: 0 } };
  }
}
```

### Usar em Server Component:

```typescript
import { getCourseData } from "@/lib/api/getCourseData";
import CourseHeader from "@/components/CourseHeader";

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourseData(params.slug);

  return (
    <div>
      <CourseHeader {...course.body[0]} />
      {/* ... mais seções ... */}
    </div>
  );
}
```

## 5. Variáveis de Ambiente

### `.env.local` (desenvolvimento)

```env
# Mock data (sem chamadas à API)
NEXT_PUBLIC_USE_MOCK_DATA=true

# API real (staging)
NEXT_PUBLIC_API_URL=https://staging-api.estacio.br/v1

# Autenticação (se necessário)
API_TOKEN=seu_token_aqui
```

### `.env.production` (produção)

```env
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_URL=https://api.estacio.br/v1
API_TOKEN=prod_token_aqui
```

## 6. Error Handling Robusto

```typescript
async function fetchCourseWithRetry(
  slug: string,
  maxRetries = 3
): Promise<Course> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await getCourseData(slug);
    } catch (error) {
      console.warn(
        `Attempt ${attempt}/${maxRetries} failed for course ${slug}`,
        error
      );

      if (attempt === maxRetries) {
        // Última tentativa falhou, usar mock
        return administracaoCondominiosCourse;
      }

      // Esperar antes de tentar novamente (backoff exponencial)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  throw new Error("Failed to fetch course after all retries");
}
```

## 7. Exemplo Completo: Estrutura de Página

```typescript
// app/(home)/cursos/[slug]/page.tsx

import type { Metadata } from "next";
import { getCourseData } from "@/lib/api/getCourseData";
import { notFound } from "next/navigation";
import CourseHeader from "@/components/CourseHeader";
import MediaWithText from "@/components/MediaWithText";
import ItemGrid from "@/components/ItemGrid";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const course = await getCourseData(params.slug);

  return {
    title: course.seo?.metaTitle,
    description: course.seo?.metaDescription,
    openGraph: {
      images: [course.seo?.metaImage?.url ?? ""],
    },
    keywords: course.seo?.keywords,
    canonicalUrl: course.seo?.canonicalURL,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const course = await getCourseData(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <main>
      {course.body.map((section) => {
        switch (section.componentName) {
          case "course-header":
            return <CourseHeader key={section.id} {...section} />;
          case "media-with-text.template-bullets":
            return <MediaWithText key={section.id} {...section} />;
          case "blocks.blocks-section":
            return <ItemGrid key={section.id} {...section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
```

## 8. Status das Integrações

| Recurso              | Status        | Notas                            |
| -------------------- | ------------- | -------------------------------- |
| Mock Data            | ✅ Ready      | Pronto para usar                 |
| Hook `useCourseData` | 📋 Template   | Copiar e adaptar                 |
| API Server Function  | 📋 Template   | Copiar e adaptar                 |
| Error Handling       | ✅ Example    | Implementado no template         |
| ISR Caching          | ✅ Configured | 1h para detail, 30min para lista |
| Retry Logic          | 📋 Template   | Adicionar conforme necessário    |

## 9. Próximos Passos

1. **Implementar API real**

   - Criar endpoints `/api/courses/{slug}`
   - Configurar database queries
   - Adicionar caching e validação

2. **Melhorar performance**

   - Implementar ISR (Incremental Static Regeneration)
   - Adicionar Redis cache
   - Otimizar imagens com Next.js Image

3. **Adicionar features**

   - Busca de cursos
   - Filtros por categoria
   - Relacionados dinâmicos
   - Comentários/reviews

4. **Analytics**
   - Rastrear visualizações
   - Eventos de clique em CTAs
   - Funil de inscrição

---

**Última atualização:** 13 de janeiro de 2026  
**Status:** 📋 Pronto para implementação  
**Próximo:** Integrar com backend em Node.js/Next.js
