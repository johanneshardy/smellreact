export const uploadService = {
  async validateImageUrl(url) {
    try {
      if (!url) {
        throw new Error('No URL provided');
      }

      // Basic URL validation
      try {
        new URL(url);
      } catch {
        throw new Error('Invalid URL format');
      }

      // Verify it's an image URL by checking common image extensions
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const hasValidExtension = validExtensions.some(ext => 
        url.toLowerCase().includes(ext)
      );

      if (!hasValidExtension) {
        throw new Error('URL must point to an image file (jpg, jpeg, png, gif, or webp)');
      }

      return {
        url: url,
        path: url
      };
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }
};
