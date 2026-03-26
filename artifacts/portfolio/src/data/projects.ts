export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "Summer Collection Launch",
    category: "Fashion",
    // Unsplash fashion model in natural lighting
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1080&h=1350&fit=crop&q=80"
  },
  {
    id: "p2",
    title: "Minimalist Skincare Ad",
    category: "Beauty",
    // Unsplash skincare/beauty minimalist shot
    imageUrl: "https://images.unsplash.com/photo-1615397323214-386d5e1bd125?w=1080&h=1350&fit=crop&q=80"
  },
  {
    id: "p3",
    title: "Premium Audio Campaign",
    category: "Tech",
    // Unsplash premium headphones/tech
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1080&h=1350&fit=crop&q=80"
  },
  {
    id: "p4",
    title: "Urban Streetwear Promo",
    category: "Apparel",
    // Unsplash streetwear fashion
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1080&h=1350&fit=crop&q=80"
  },
  {
    id: "p5",
    title: "Fitness App User Acquisition",
    category: "Lifestyle",
    // Unsplash fitness lifestyle
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1080&h=1350&fit=crop&q=80"
  },
  {
    id: "p6",
    title: "Artisan Coffee Roasters",
    category: "Food & Beverage",
    // Unsplash premium coffee shot
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1080&h=1350&fit=crop&q=80"
  },
  {
    id: "p7",
    title: "Luxury Watch Retargeting",
    category: "E-commerce",
    // Unsplash luxury watch
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1080&h=1350&fit=crop&q=80"
  },
  {
    id: "p8",
    title: "Boutique Fragrance Ad",
    category: "Beauty",
    // Unsplash perfume bottle
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1080&h=1350&fit=crop&q=80"
  },
  {
    id: "p9",
    title: "Modern Furniture Collection",
    category: "Home & Decor",
    // Unsplash modern interior design
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1080&h=1350&fit=crop&q=80"
  }
];
