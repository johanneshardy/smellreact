// src/services/articleService.js
import { supabase } from '../supabase/config';

const TABLE_NAME = 'articles';

export const articleService = {
  // Add new article
  async addArticle(articleData) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([{
          title: articleData.title,
          category: articleData.category,
          content: articleData.content,
          excerpt: articleData.excerpt || articleData.content.substring(0, 150) + '...',
          author_name: articleData.name,
          author_email: articleData.email,
          image: articleData.image || null,
          thumbnail: articleData.thumbnail || null,
          reads: 0,
          likes: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      
      console.log('✅ Article added with ID:', data.id);
      return data;
    } catch (error) {
      console.error('❌ Error adding article:', error);
      throw new Error(`Failed to add article: ${error.message}`);
    }
  },

  // Get all articles
  async getAllArticles() {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        // Return fallback data when the database is not accessible
        return [{
          id: 1,
          title: "The Aroma of a Rainforest After Rain: Nature's Fresh Healing",
          category: "Nature",
          categoryColor: "bg-green-100 text-green-800",
          date: "July 15, 2025",
          image: "https://picsum.photos/seed/rainforest/800/450",
          thumbnail: "https://picsum.photos/seed/rainforest/300/200",
          excerpt: "Explore the unique phytoncides in rainforest air and how they affect our physical and mental health...",
          content: "A rainforest after rain is nature's most enchanting perfume factory. When raindrops hit leaves, soil, and moss, a unique fresh aroma fills the air - what we might call the 'forest bath' scent.",
          reads: 0,
          likes: 0
        }];
      }

      const articles = data.map(article => ({
        id: article.id,
        title: article.title,
        category: article.category,
        content: article.content,
        excerpt: article.excerpt,
        author_name: article.author_name,
        image: article.image,
        thumbnail: article.thumbnail,
        date: new Date(article.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        reads: article.reads,
        likes: article.likes
      }));
      
      console.log(`✅ Loaded ${articles.length} articles from database`);
      return articles;
    } catch (error) {
      console.error('❌ Error fetching articles:', error);
      throw new Error(`Failed to fetch articles: ${error.message}`);
    }
  },

  // Get articles by category
  async getArticlesByCategory(category) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const articles = data.map(article => ({
        id: article.id,
        title: article.title,
        category: article.category,
        content: article.content,
        excerpt: article.excerpt,
        author_name: article.author_name,
        image: article.image,
        thumbnail: article.thumbnail,
        date: new Date(article.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        reads: article.reads,
        likes: article.likes
      }));
      
      return articles;
    } catch (error) {
      console.error('❌ Error fetching articles by category:', error);
      throw new Error(`Failed to fetch articles by category: ${error.message}`);
    }
  },

  // Get article by ID
  async getArticleById(id) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error('Article not found');
      }

      const article = {
        id: data.id,
        title: data.title,
        category: data.category,
        content: data.content,
        excerpt: data.excerpt,
        author_name: data.author_name,
        image: data.image,
        thumbnail: data.thumbnail,
        date: new Date(data.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        reads: data.reads,
        likes: data.likes
      };

      // Increment read count
      await this.incrementReads(id);
      
      return article;
    } catch (error) {
      console.error('❌ Error fetching article:', error);
      throw new Error(`Failed to fetch article: ${error.message}`);
    }
  },

  // Increment article reads
  async incrementReads(id) {
    try {
      const { error } = await supabase.rpc('increment_article_reads', { article_id: id });
      if (error) throw error;
    } catch (error) {
      console.error('❌ Error incrementing reads:', error);
    }
  },

  // Toggle article like
  async toggleLike(id) {
    try {
      const { data, error } = await supabase.rpc('toggle_article_like', { article_id: id });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('❌ Error toggling like:', error);
      throw new Error(`Failed to toggle like: ${error.message}`);
    }
  },

  // Delete article
  async deleteArticle(id) {
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log('✅ Article deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting article:', error);
      throw new Error(`Failed to delete article: ${error.message}`);
    }
  }
};
