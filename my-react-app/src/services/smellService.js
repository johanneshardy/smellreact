// src/services/smellService.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'smells';

export const smellService = {
  // Add new smell experience
  async addSmell(smellData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        title: smellData.title,
        description: smellData.description || '',
        category: smellData.category,
        intensity: smellData.intensity,
        latitude: smellData.location[0],
        longitude: smellData.location[1],
        address: smellData.address || '',
        contributor: smellData.contributor || 'Anonymous',
        timestamp: new Date().toISOString().split('T')[0], // Keep your format
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('✅ Smell added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error adding smell:', error);
      throw new Error(`Failed to add smell: ${error.message}`);
    }
  },

  // Get all smells
  async getAllSmells() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const smells = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          category: data.category,
          intensity: data.intensity,
          location: [data.latitude, data.longitude],
          address: data.address,
          timestamp: data.timestamp,
          contributor: data.contributor
        };
      });
      
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
      const q = query(
        collection(db, COLLECTION_NAME), 
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const smells = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          category: data.category,
          intensity: data.intensity,
          location: [data.latitude, data.longitude],
          address: data.address,
          timestamp: data.timestamp,
          contributor: data.contributor
        };
      });
      
      return smells;
    } catch (error) {
      console.error('❌ Error fetching smells by category:', error);
      throw new Error(`Failed to fetch smells by category: ${error.message}`);
    }
  },

  // Real-time listener for all smells
  subscribeToSmells(callback) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        orderBy('createdAt', 'desc')
      );
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const smells = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            category: data.category,
            intensity: data.intensity,
            location: [data.latitude, data.longitude],
            address: data.address,
            timestamp: data.timestamp,
            contributor: data.contributor
          };
        });
        
        console.log(`🔄 Real-time update: ${smells.length} smells`);
        callback(smells);
      }, (error) => {
        console.error('❌ Real-time listener error:', error);
      });
      
      return unsubscribe;
    } catch (error) {
      console.error('❌ Error setting up real-time listener:', error);
      throw new Error(`Failed to set up real-time updates: ${error.message}`);
    }
  },

  // Update smell
  async updateSmell(id, updateData) {
    try {
      const smellRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(smellRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      console.log('✅ Smell updated successfully');
    } catch (error) {
      console.error('❌ Error updating smell:', error);
      throw new Error(`Failed to update smell: ${error.message}`);
    }
  },

  // Delete smell
  async deleteSmell(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      console.log('✅ Smell deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting smell:', error);
      throw new Error(`Failed to delete smell: ${error.message}`);
    }
  },

  // Get smells near a location (basic implementation)
  async getNearbySmells(lat, lng, radiusKm = 5) {
    try {
      // Simple bounding box calculation
      const latDelta = radiusKm / 111.32; // Roughly 1 degree = 111.32 km
      const lngDelta = radiusKm / (111.32 * Math.cos(lat * Math.PI / 180));
      
      const minLat = lat - latDelta;
      const maxLat = lat + latDelta;
      const minLng = lng - lngDelta;
      const maxLng = lng + lngDelta;
      
      const allSmells = await this.getAllSmells();
      
      const nearbySmells = allSmells.filter(smell => {
        const [smellLat, smellLng] = smell.location;
        return smellLat >= minLat && smellLat <= maxLat &&
               smellLng >= minLng && smellLng <= maxLng;
      });
      
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