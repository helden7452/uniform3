interface Author {
  name: string;
  role: string;
  image: string;
  bio: string;
}

// This would typically fetch data from an API or database
// For now, we'll return mock data
export async function getAllAuthors(): Promise<Author[]> {
  return [
    {
      name: 'فريق فخر الخليج',
      role: 'فريق المحتوى',
      image: '/images/author/team_fakhr_alkhaleej.jpg',
      bio: 'فريق متخصص من الخبراء في مجال الأزياء المهنية والموحدة، يقدم محتوى متميز يجمع بين الخبرة العملية والمعرفة النظرية في مختلف قطاعات الزي الموحد.'
    },
    {
      name: 'حسن الجبري',
      role: 'خبير أزياء الطيران',
      image: '/images/author/Adel_AlHarbi.jpg',
      bio: 'خبير متخصص في تصميم وتطوير أزياء الطيران بخبرة تزيد عن 15 عاماً في العمل مع كبرى شركات الطيران العالمية والإقليمية.'
    },
    {
      name: 'نورة الصالح',
      role: 'مستشارة أزياء طبية',
      image: '/images/author/Noorah_AlHudhaili.jpg',
      bio: 'مستشارة متخصصة في أزياء القطاع الصحي مع خبرة واسعة في تطوير حلول ملائمة للاحتياجات المتنوعة للطواقم الطبية.'
    },
    {
      name: 'أحمد الزهراني',
      role: 'خبير الاستدامة في الأزياء المؤسسية',
      image: '/images/author/Khalil_AlEnezi.jpg',
      bio: 'متخصص في تطوير حلول الأزياء المستدامة للشركات، مع تركيز على تقليل الأثر البيئي وتعزيز المسؤولية الاجتماعية.'
    },
    {
      name: 'سارة الحارثي',
      role: 'مصممة أزياء الضيافة',
      image: '/images/author/Sara_AlMaliki.jpg',
      bio: 'مصممة أزياء متخصصة في قطاع الضيافة والفنادق، مع خبرة في تصميم أزياء تجمع بين الأناقة والوظائف العملية.'
    },
    {
      name: 'محمد القحطاني',
      role: 'خبير أزياء الأمن والحماية',
      image: '/images/author/Ohood_AlQahtani.jpg',
      bio: 'متخصص في تطوير أزياء الأمن والحماية مع اهتمام خاص بدمج التقنيات المتطورة لتعزيز أداء وسلامة طواقم الأمن.'
    },
    {
      name: 'ليلى المهيري',
      role: 'مصممة أزياء الطيران المستقبلية',
      image: '/images/author/Danah_AlHofi.jpg',
      bio: 'مختصة في تطوير أزياء طاقم الضيافة الجوية المستقبلية، مع اهتمام خاص بالتكنولوجيا المدمجة والاستدامة.'
    },
    {
      name: 'سارة المهيري',
      role: 'خبيرة أزياء الفنادق الفاخرة',
      image: '/images/author/Nawal_AlShammari.jpg',
      bio: 'متخصصة في تصميم أزياء الفنادق الفاخرة، مع خبرة واسعة في دمج العناصر التراثية مع الأناقة المعاصرة.'
    }
  ];
} 