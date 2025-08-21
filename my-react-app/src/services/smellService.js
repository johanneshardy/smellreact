// src/services/smellService.js
import { supabase } from '../supabase/config';

const TABLE_NAME = 'smells';

export const smellService = {
  // Add new smell experience
  async addSmell(smellData) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([{
          title: smellData.title,
          description: smellData.description || '',
          category: smellData.category,
          intensity: smellData.intensity,
          latitude: smellData.location[0],
          longitude: smellData.location[1],
          address: smellData.address || '',
          contributor: smellData.contributor || 'Anonymous',
          timestamp: new Date().toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      
      console.log('✅ Smell added with ID:', data.id);
      return data.id;
    } catch (error) {
      console.error('❌ Error adding smell:', error);
      throw new Error(`Failed to add smell: ${error.message}`);
    }
  },

  // Get all smells
  async getAllSmells() {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const smells = data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        intensity: item.intensity,
        location: [item.latitude, item.longitude],
        address: item.address,
        timestamp: item.timestamp,
        contributor: item.contributor
      }));
      
      console.log(`✅ Loaded ${smells.length} smells from database`);
      return smells;
    } catch (error) {
      console.error('❌ Error fetching smells:', error);
      throw new Error(`Failed to fetch smells: ${error.message}`);
    }
  },

  // Get smells by category
  async getSmellsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const smells = data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        intensity: item.intensity,
        location: [item.latitude, item.longitude],
        address: item.address,
        timestamp: item.timestamp,
        contributor: item.contributor
      }));
      
      return smells;
    } catch (error) {
      console.error('❌ Error fetching smells by category:', error);
      throw new Error(`Failed to fetch smells by category: ${error.message}`);
    }
  },

  // Real-time listener for all smells
  subscribeToSmells(callback) {
    try {
      const subscription = supabase
        .channel('public:smells')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: TABLE_NAME 
          }, 
          async (payload) => {
            // Fetch the latest data to maintain consistency with the data format
            const { data } = await this.getAllSmells();
            callback(data);
          }
        )
        .subscribe();

      console.log('✅ Real-time subscription initialized');
      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('❌ Error setting up real-time listener:', error);
      throw new Error(`Failed to set up real-time updates: ${error.message}`);
    }
  },

  // Update smell
  async updateSmell(id, smellData) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({
          title: smellData.title,
          description: smellData.description || '',
          category: smellData.category,
          intensity: smellData.intensity,
          latitude: smellData.location ? smellData.location[0] : undefined,
          longitude: smellData.location ? smellData.location[1] : undefined,
          address: smellData.address || '',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) throw error;
      console.log('✅ Smell updated successfully');
      return data[0];
    } catch (error) {
      console.error('❌ Error updating smell:', error);
      throw new Error(`Failed to update smell: ${error.message}`);
    }
  },

  // Delete smell
  async deleteSmell(id) {
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log('✅ Smell deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting smell:', error);
      throw new Error(`Failed to delete smell: ${error.message}`);
    }
  },

  // Get smells near a location (using Postgres geo functions)
  async getNearbySmells(lat, lng, radiusKm = 5) {
    try {
      const { data, error } = await supabase.rpc('get_nearby_smells', {
        latitude: lat,
        longitude: lng,
        radius_km: radiusKm
      });

      if (error) throw error;

      const nearbySmells = data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        intensity: item.intensity,
        location: [item.latitude, item.longitude],
        address: item.address,
        timestamp: item.timestamp,
        contributor: item.contributor
      }));
      
      console.log(`✅ Found ${nearbySmells.length} smells within ${radiusKm}km`);
      return nearbySmells;
    } catch (error) {
      console.error('❌ Error finding nearby smells:', error);
      throw new Error(`Failed to find nearby smells: ${error.message}`);
    }
  },

  // Get database statistics
  async getStatistics() {
    try {
      const allSmells = await this.getAllSmells();
      
      const stats = {
        totalSmells: allSmells.length,
        categoryCounts: {},
        averageIntensity: 0,
        contributors: new Set()
      };
      
      let totalIntensity = 0;
      
      allSmells.forEach(smell => {
        // Category counts
        stats.categoryCounts[smell.category] = (stats.categoryCounts[smell.category] || 0) + 1;
        
        // Average intensity
        totalIntensity += smell.intensity;
        
        // Contributors
        stats.contributors.add(smell.contributor);
      });
      
      stats.averageIntensity = allSmells.length > 0 ? totalIntensity / allSmells.length : 0;
      stats.uniqueContributors = stats.contributors.size;
      
      console.log('✅ Database statistics:', stats);
      return stats;
    } catch (error) {
      console.error('❌ Error getting statistics:', error);
      throw new Error(`Failed to get statistics: ${error.message}`);
    }
  }
};