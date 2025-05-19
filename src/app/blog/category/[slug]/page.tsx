import { Metadata } from 'next';
import { getCategoryBySlug, getPostsByCategory } from '@/data/blog';
import { Container } from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const categoryData = getCategoryBySlug(params.slug);
  
  if (categoryData.slug === 'not-found') {
    return {
      title: 'الفئة غير موجودة',
      description: 'عذراً، لم يتم العثور على الفئة المطلوبة'
    };
  }

  return {
    title: `مقالات عن ${categoryData.name} | فخر الخليج`,
    description: `اكتشف مجموعتنا من المقالات المتعلقة بـ ${categoryData.name}. نصائح، اتجاهات، ومعلومات قيمة من خبراء فخر الخليج.`
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryData = getCategoryBySlug(params.slug);
  const posts = getPostsByCategory(params.slug);

  // If category doesn't exist
  if (categoryData.slug === 'not-found') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">الفئة غير موجودة</h1>
          <p className="text-lg text-gray-600 mb-6">عذراً، لم يتم العثور على الفئة المطلوبة</p>
          <a href="/blog" className="inline-block bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">
            العودة إلى المدونة
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumb 
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'المدونة', href: '/blog' },
          { label: categoryData.name, href: `/blog/category/${categoryData.slug}`, isCurrent: true }
        ]}
      />
      
      <Container className="mt-8 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{categoryData.name}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {categoryData.description || `مقالات ومحتوى متخصص في موضوعات ${categoryData.name}`}
          </p>
      </div>

        {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-4">لا توجد مقالات في هذه الفئة حالياً</h2>
            <p className="text-gray-600 mb-8">يرجى التحقق مرة أخرى قريباً للاطلاع على المحتوى الجديد</p>
            <a href="/blog" className="inline-block bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors">
              استعراض جميع المقالات
            </a>
        </div>
      )}
      </Container>
    </div>
  );
} 