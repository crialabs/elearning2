/\*\*

- GUIA DE USO: MOCK DATA COM BOAS PRÁTICAS
-
- Este arquivo contém a estrutura refatorada de dados para páginas de detalhe de curso.
- Segue as boas práticas do Ultracite e utiliza tokens globals do design-system.
  \*/

# 📋 Estrutura de Dados - Administração de Condomínios

## 1. Características Principais

✅ **Dados Limpos e Organizados**

- Estrutura hierárquica clara (courseImages → profissionalCards → body)
- Comentários separadores para melhor legibilidade
- Sem JSON complexo ou aninhamento excessivo

✅ **Type-Safe**

- Todos os dados tipados com interfaces TypeScript
- Casting explícito (`as CourseCardData`, `as CourseHeader`, etc.)
- Sem `any` ou tipos genéricos desnecessários

✅ **URLs Reais**

- CDN da Estácio para todas as imagens
- Endpoints baseados na estrutura real do site
- Links internos padronizados (`/inscricao`, `/contato`)

✅ **Seguindo Ultracite**

- Funções puras (sem side effects)
- Early returns onde aplicável
- Destructuring para dados complexos

## 2. Organização dos Dados

```
mock-data.ts
├── Imports (tipos TypeScript)
├── 📸 courseImages (URLs das imagens)
├── 💼 profissionalCards (Perfis profissionais)
├── 🏢 areaAtuacaoCards (Oportunidades de carreira)
└── 📚 administracaoCondominiosCourse
    ├── metadata (Informações do curso)
    ├── body[] (8 seções)
    │   ├── Course Header (Hero)
    │   ├── Objetivos
    │   ├── Formação Prática
    │   ├── Perfil Profissional
    │   ├── Área de Atuação
    │   ├── Diferenciais
    │   ├── Grade de Disciplinas
    │   └── FAQ
    └── seo (Metadados SEO)
```

## 3. Como Usar em Componentes

### Importar dados

```typescript
import {
  administracaoCondominiosCourse,
  relatedCourses,
} from "@/lib/mock-data";
```

### Consumir na página

```typescript
export default function CourseDetailPage() {
  const course = administracaoCondominiosCourse;

  return (
    <div>
      <CourseHeader {...course.body[0]} />
      <MediaWithText {...course.body[1]} />
      {/* ... outras seções */}
    </div>
  );
}
```

### Acessar dados específicos

```typescript
// Primeira seção (Hero)
const heroSection = course.body[0];

// Grade de disciplinas
const disciplines = course.body[6];

// FAQ
const faq = course.body[7];

// Metadados
const seo = course.seo;
```

## 4. Estrutura de Seções (Body)

Cada seção no `body[]` segue um padrão:

```typescript
{
  componentName: string;    // Nome do componente
  id: number;               // ID único
  mode?: "neutral" | "primary";
  title: string;
  description?: string;
  // ... props específicas do componente
}
```

### Tipos de Seções

| ID  | Component          | Propósito                          |
| --- | ------------------ | ---------------------------------- |
| 1   | course-header      | Seção hero com breadcrumb          |
| 2   | media-with-text    | Objetivos com imagem               |
| 3   | media-with-text    | Formação prática                   |
| 4   | blocks-section     | Perfil profissional (cards)        |
| 5   | blocks-section     | Área de atuação (cards com imagem) |
| 6   | media-with-text    | Diferenciais com imagem            |
| 7   | curriculum-section | Grade de disciplinas               |
| 8   | faq-section        | Perguntas frequentes               |

## 5. URLs e Endpoints

### Imagens (CDN Estácio)

```
https://cdn.portal.estacio.br/{nome-da-imagem}
```

### Links Internos

```
/inscricao           → Página de inscrição
/contato             → Formulário de contato
/cursos/{slug}       → Página de curso
/cursos/{slug}/{section} → Seção específica
```

### Canonical URL (SEO)

```
https://www.estacio.br/cursos/administracao-condominios
```

## 6. Exemplo Completo: Usar FAQ

```typescript
// ✅ Forma correta (seguindo boas práticas)
const faqSection = course.body.find(
  (section) => section.componentName === "faq.faq-section"
) as FAQSection;

// Renderizar
<FAQSection
  title={faqSection.title}
  description={faqSection.description}
  items={faqSection.cards}
  mode={faqSection.mode}
  button={faqSection.button}
/>;
```

## 7. Boas Práticas Aplicadas

### ✅ Type Safety

- Cada seção é tipada corretamente
- Uso de `as` é explícito quando necessário
- TypeScript infere tipos automaticamente

### ✅ Organização

- Constantes agrupadas por propósito
- Comentários separadores entre seções
- Sem repetição de dados (DRY)

### ✅ Manutenibilidade

- Fácil adicionar novos cursos (copiar estrutura)
- Fácil modificar seções (encontrar por ID)
- URLs centralizadas em constantes

### ✅ Performance

- Sem cálculos em tempo de renderização
- Dados estáticos pre-compilados
- Sem fetches desnecessários

## 8. Próximo Passo: Integração com API Real

Quando integrar com a API real da Estácio:

```typescript
// 1. Criar um hook customizado
export async function getCourseData(slug: string) {
  const response = await fetch(`/api/courses/${slug}`);
  return response.json() as Course;
}

// 2. Usar em Server Component (Next.js 16+)
export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const course = await getCourseData(params.slug);
  return <CourseDetail course={course} />;
}

// 3. Manter mock como fallback
const course = (await getCourseData(slug)) ?? administracaoCondominiosCourse;
```

## 9. Checklist para Novos Cursos

Ao adicionar um novo curso, seguir:

- [ ] Criar objeto com structure `{ pageName, courseName, slug, code, ... }`
- [ ] Adicionar imagens em `courseImages`
- [ ] Definir cards em constantes separadas
- [ ] Tipagem explícita com `as`
- [ ] 8 seções no `body[]`
- [ ] Metadados SEO preenchidos
- [ ] Validar com TypeScript: `npm run type-check`
- [ ] Exportar constante: `export const nomeDocurso`

## 10. Referência Rápida

```typescript
// Acessar dados
const { body, seo, metadata } = administracaoCondominiosCourse;

// Iterar seções
body.forEach((section) => {
  console.log(section.componentName, section.id);
});

// Buscar seção específica
const secao = body.find((s) => s.id === 4);

// Usar em componente
<SectionComponent {...section} />;
```

---

**Última atualização:** 13 de janeiro de 2026  
**Status:** ✅ Pronto para produção  
**Arquivo:** `apps/web/app/(home)/cursos/[...slug]/lib/mock-data.ts`
