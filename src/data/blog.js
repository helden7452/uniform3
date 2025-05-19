// @ts-nocheck
import { blogPosts } from './blog-posts';

// Define categories
export const categories = [
  {
    name: 'الزي الطبي',
    slug: 'medical-uniforms',
    description: 'كل ما يتعلق بالزي الطبي للمستشفيات والعيادات والمراكز الصحية'
  },
  {
    name: 'الأمن',
    slug: 'security',
    description: 'أزياء الأمن والحراسة لمختلف القطاعات والمناسبات'
  },
  {
    name: 'الزي المؤسسي',
    slug: 'corporate',
    description: 'الزي الموحد للشركات والمؤسسات التجارية'
  },
  {
    name: 'طاقم الطيران',
    slug: 'aviation',
    description: 'أزياء وتصاميم زي مضيفي الطيران والطيارين وطاقم الأرض'
  },
  {
    name: 'الضيافة',
    slug: 'hospitality',
    description: 'أزياء قطاع الضيافة والفنادق والمطاعم'
  }
];

// Get a category by its slug
export function getCategoryBySlug(slug) {
  const category = categories.find(cat => cat.slug === slug);
  return category || { name: 'غير موجود', slug: 'not-found', description: '' };
}

// Get posts by category
export function getPostsByCategory(categorySlug) {
  return blogPosts.filter(post => {
    // Map category names to slugs for comparison
    const categoryMapping = {
      'الزي الطبي': 'medical-uniforms',
      'الأمن': 'security',
      'الزي المؤسسي': 'corporate',
      'طاقم الطيران': 'aviation',
      'الضيافة': 'hospitality'
    };
    
    return categoryMapping[post.category] === categorySlug;
  });
}

// Get all blog categories with post counts
export function getAllCategoriesWithCount() {
  return categories.map(category => {
    const postCount = getPostsByCategory(category.slug).length;
    return {
      ...category,
      postCount
    };
  });
}

// Get a post by its slug
export function getPostBySlug(slug) {
  const post = blogPosts.find(post => post.slug === slug);
  return post || { 
    title: 'المقال غير موجود', 
    slug: 'not-found', 
    excerpt: '',
    content: '', 
    date: '', 
    category: '' 
  };
}

// Get related posts by category
export function getRelatedPosts(currentSlug, categoryName = '', limit = 3) {
  // Get posts with the same category, excluding the current one
  const sameCategoryPosts = blogPosts
    .filter(post => (categoryName ? post.category === categoryName : true) && post.slug !== currentSlug)
    .slice(0, limit);
  
  // If we don't have enough posts from the same category, add some random ones
  if (sameCategoryPosts.length < limit) {
    const randomPosts = blogPosts
      .filter(post => post.slug !== currentSlug && !sameCategoryPosts.find(p => p.slug === post.slug))
      .slice(0, limit - sameCategoryPosts.length);
    
    return [...sameCategoryPosts, ...randomPosts];
  }
  
  return sameCategoryPosts;
}

// Format date
export function formatDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ar-SA', options);
  } catch (error) {
    return dateString;
  }
}