// src/services/libraryService.js
import { supabase } from '../supabase/config';

const TABLE_NAME = 'smell_library';

export const libraryService = {
  // Add new scent to library
  async addScent(scentData) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([{
          name: scentData.name,
          category: scentData.category || 'other',
          description: scentData.description,
          image: scentData.image,
          thumbnail: scentData.thumbnail,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      
      console.log('✅ Scent added with ID:', data.id);
      return data;
    } catch (error) {
      console.error('❌ Error adding scent:', error);
      throw new Error(`Failed to add scent: ${error.message}`);
    }
  },

  // Get all scents
  async getAllScents() {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('name');

      if (error) throw error;

      console.log(`✅ Loaded ${data.length} scents from database`);
      return data;
    } catch (error) {
      console.error('❌ Error fetching scents:', error);
      throw new Error(`Failed to fetch scents: ${error.message}`);
    }
  },

  // Get scents by category
  async getScentsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('category', category)
        .order('name');

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching scents by category:', error);
      throw new Error(`Failed to fetch scents by category: ${error.message}`);
    }
  },

  // Search scents
  async searchScents(query) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('name');

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('❌ Error searching scents:', error);
      throw new Error(`Failed to search scents: ${error.message}`);
    }
  },

  // Get scent by ID
  async getScentById(id) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error('Scent not found');
      }

      return data;
    } catch (error) {
      console.error('❌ Error fetching scent:', error);
      throw new Error(`Failed to fetch scent: ${error.message}`);
    }
  },

  // Update scent
  async updateScent(id, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      console.log('✅ Scent updated successfully');
      return data;
    } catch (error) {
      console.error('❌ Error updating scent:', error);
      throw new Error(`Failed to update scent: ${error.message}`);
    }
  },

  // Delete scent
  async deleteScent(id) {
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log('✅ Scent deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting scent:', error);
      throw new Error(`Failed to delete scent: ${error.message}`);
    }
  }
};
