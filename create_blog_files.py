import os
import sys

# Blog posts pendientes de crear, del archivo roadmap.md
pending_blogs = [
    "rank-insignia-security-uniforms",
    "nurse-uniform-evolution-saudi",
    "event-security-uniforms",
    "male-cabin-crew-uniforms",
    "mixed-gender-workplace-uniforms",
    "saudi-airlines-distinctive-uniform",
    "boutique-hotel-distinctive-uniforms",
    "customer-facing-roles-uniforms",
    "patient-friendly-uniforms",
    "security-equipment-carriage",
    "aviation-uniform-fabrics-altitude",
    "hotel-management-stylish-uniforms",
    "customized-medical-uniforms",
    "corporate-capsule-wardrobe",
    "regional-airlines-local-identity",
    "comfort-safety-cabin-crew-uniforms",
    "vintage-retro-aviation-uniforms",
    "hotel-brands-uniforms-consistency",
    "fabric-technology-corporate-wear",
    "modern-pharmacist-uniforms",
    "islamic-tourism-hotel-uniforms",
    "school-security-personnel-uniforms",
    "digital-prints-security-uniforms",
    "ground-staff-coordination-uniforms",
    "uniform-implementation-strategy",
    "emergency-department-uniforms",
    "corporate-accessories-guidelines",
    "seasonal-hotel-uniforms-collection",
    "healthcare-uniform-saudi-weather",
    "aviation-uniforms-rank-indicators",
    "security-uniform-psychology",
    "smart-fabrics-hospitality-uniforms",
]

# Plantilla básica para cada archivo
template = '''import type { Metadata } from 'next';
import { ArticleHero } from '@/components/ArticleHero';
import { Container } from '@/components/Container';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleBreadcrumb } from '@/components/ArticleBreadcrumb';
import { AuthorCard } from '@/components/AuthorCard';
import { getAllAuthors } from '@/utils/getAllAuthors';
import Image from 'next/image';
import { MDXProvider } from '@/components/MDXProvider';

export const metadata: Metadata = {{
  title: 'BLOG_TITLE | فخر الخليج',
  description: 'BLOG_DESCRIPTION',
  openGraph: {{
    title: 'BLOG_TITLE | فخر الخليج',
    description: 'BLOG_DESCRIPTION',
    images: [
      {{
        url: '/images/BLOG_CATEGORY/BLOG_IMAGE.jpg',
        width: 1200,
        height: 630,
        alt: 'BLOG_ALT_TEXT',
      }},
    ],
  }},
}};

export default async function Article() {{
  const authors = await getAllAuthors();
  const teamAuthor = authors.find((author) => author.name === 'فريق فخر الخليج');

  return (
    <>
      <ArticleHero
        title="BLOG_TITLE"
        image={{{{
          src: '/images/BLOG_CATEGORY/BLOG_IMAGE.jpg',
          alt: 'BLOG_ALT_TEXT',
          width: 1024,
          height: 576,
        }}}}
      />
      
      {/* Resto del componente - esqueleto básico */}
      <Container className="mt-8 sm:mt-10 lg:mt-12">
        <ArticleBreadcrumb
          breadcrumbs={[
            {{ label: 'الرئيسية', href: '/' }},
            {{ label: 'المدونة', href: '/blog' }},
            {{ label: 'BLOG_BREADCRUMB', href: '/blog/BLOG_SLUG', isCurrent: true }}
          ]}
        />
      </Container>

      <div className="bg-white py-8 sm:py-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            <ArticleBody className="lg:w-2/3">
              <MDXProvider>
                <main className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-lead:text-slate-500 prose-a:font-semibold prose-a:underline">
                  <h2 className="text-xl font-bold mb-6">BLOG_TITLE</h2>
                  
                  <p className="text-lg leading-relaxed mb-6">
                    Contenido del blog aquí...
                  </p>
                </main>
              </MDXProvider>
            </ArticleBody>

            <aside className="lg:w-1/3 space-y-8">
              {{teamAuthor && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">كاتب المقال</h3>
                  <AuthorCard author={{teamAuthor}} />
                </div>
              )}}
              
              {/* Sidebar content */}
              <div className="bg-primary-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">خدمات ذات صلة</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/RELATED_SERVICE_1" className="flex items-center text-primary hover:text-primary-dark">
                      <span className="ml-2">⟨</span>
                      <span>RELATED_SERVICE_1_TEXT</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}}
'''

def create_blog_directory_and_file(blog_slug):
    # Crear el directorio si no existe
    directory = f'src/app/blog/{blog_slug}'
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Directorio creado: {directory}")
    
    # Crear el archivo page.tsx con la plantilla básica
    file_path = f'{directory}/page.tsx'
    
    # Personalizar la plantilla con el slug del blog
    content = template.replace('BLOG_SLUG', blog_slug)
    content = content.replace('BLOG_TITLE', blog_slug.replace('-', ' ').title())
    content = content.replace('BLOG_ALT_TEXT', blog_slug.replace('-', ' ').title())
    content = content.replace('BLOG_BREADCRUMB', blog_slug.replace('-', ' ').title())
    
    # Determinar categoría de blog e imagen
    if 'security' in blog_slug:
        category = 'security_uniforms'
    elif 'medical' in blog_slug or 'healthcare' in blog_slug or 'nurse' in blog_slug or 'pharmacist' in blog_slug:
        category = 'healthcare_uniforms'
    elif 'aviation' in blog_slug or 'airline' in blog_slug or 'cabin-crew' in blog_slug:
        category = 'aviation_uniforms'
    elif 'hotel' in blog_slug or 'resort' in blog_slug or 'hospitality' in blog_slug:
        category = 'hospitality_uniforms'
    elif 'corporate' in blog_slug:
        category = 'corporate_uniforms'
    else:
        category = 'general_uniforms'
    
    content = content.replace('BLOG_CATEGORY', category)
    content = content.replace('BLOG_IMAGE', blog_slug.replace('-', '_'))
    
    # Descripción genérica del blog
    description = f'Exploración de {blog_slug.replace("-", " ")} y su importancia en el sector de los uniformes profesionales.'
    content = content.replace('BLOG_DESCRIPTION', description)
    
    # Servicios relacionados genéricos
    content = content.replace('RELATED_SERVICE_1', f'/{category}')
    content = content.replace('RELATED_SERVICE_1_TEXT', f'Servicios de {category.replace("_", " ").title()}')
    
    # Escribir el archivo
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"Archivo creado: {file_path}")

def main():
    # Crear directorios y archivos para cada blog pendiente
    for blog_slug in pending_blogs:
        create_blog_directory_and_file(blog_slug)

if __name__ == "__main__":
    main() 