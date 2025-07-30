import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';
import { uploadService } from '../services/uploadService';

const SubPage2 = ({ onNavigate }) => {
  // State management
  const [isVisible, setIsVisible] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeSection, setActiveSection] = useState('today');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitForm, setSubmitForm] = useState({
    name: '',
    email: '',
    title: '',
    category: 'nature',
    content: '',
    terms: false
  });
  const [charCount, setCharCount] = useState(0);

  // Categories configuration
  const CATEGORIES = [
    { id: 'nature', name: 'Nature', icon: '🌿', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
    { id: 'animal', name: 'Animal', icon: '🐾', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
    { id: 'food', name: 'Food', icon: '🍯', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
    { id: 'urban', name: 'Urban', icon: '🏙️', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
    { id: 'human', name: 'Human Activity', icon: '👥', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200' },
    { id: 'chemical', name: 'Chemical', icon: '🧪', color: 'bg-red-100 text-red-800 hover:bg-red-200' },
    { id: 'other', name: 'Other', icon: '🔮', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' }
  ];

  // Navigation items
  const navItems = [
    { id: 'today', label: 'SCENT OF THE DAY' },
    { id: 'archive', label: 'ARCHIVE' },
    { id: 'submit', label: 'SUBMIT A SCENT' },
    { id: 'about', label: 'ABOUT US' }
  ];

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Load articles from database
  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        const data = await articleService.getAllArticles();
        if (data && data.length > 0) {
          setArticles(data);
          setActiveArticle(data[0]);
          setError(null);
        } else {
          throw new Error('No articles found');
        }
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Failed to load articles. Please try again later.');
        // Use sample data as fallback
        const fallbackData = [{
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
        setArticles(fallbackData);
        setActiveArticle(fallbackData[0]);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleSubmitChange = (field, value) => {
    setSubmitForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'content') {
      setCharCount(value.length);
    }
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setSelectedImage(url);
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!submitForm.name || !submitForm.email || !submitForm.title || !submitForm.content || !submitForm.terms) {
      alert('Please fill in all required fields and agree to the terms.');
      return;
    }

    try {
      setIsLoading(true);
      let imageUrl = selectedImage;
      let thumbnailUrl = selectedImage;

      const newArticle = await articleService.addArticle({
        title: submitForm.title,
        category: submitForm.category,
        content: submitForm.content,
        excerpt: submitForm.content.substring(0, 150) + '...',
        name: submitForm.name,
        email: submitForm.email,
        image: imageUrl || `https://picsum.photos/seed/${Date.now()}/800/450`,
        thumbnail: thumbnailUrl || `https://picsum.photos/seed/${Date.now()}/300/200`
      });

      setArticles(prevArticles => [newArticle, ...prevArticles]);
      
      setSubmitForm({
        name: '',
        email: '',
        title: '',
        category: 'nature',
        content: '',
        terms: false
      });
      setCharCount(0);
      setSelectedImage(null);
      setImagePreview(null);
      
      alert('Article submitted successfully!');
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Failed to submit article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#fcd71a]">
      {/* Navigation Header */}
      <header className="relative z-10 bg-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 pl-2 pr-2 md:pl-4 md:pr-4 lg:px-8">
              <img src="/src/assets/writing-center-logo.png" alt="Logo" className="w-16 h-16" />
              <div className="text-white font-bold text-lg">
                UM-SJTU<br />
                Writing Center
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-white hover:text-yellow-200 font-bold transition-colors duration-300 ${
                    activeSection === item.id ? 'text-yellow-200' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu + Back Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-yellow-200 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              
              <button
                onClick={() => onNavigate('home')}
                className="text-white hover:text-yellow-200 font-bold transition-colors duration-300 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-full"
              >
                ← Back to Home
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="space-y-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-white hover:text-yellow-200 font-bold transition-colors duration-300 px-4 py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={`relative z-10 p-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Today Section */}
            {activeSection === 'today' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Scent of the Day</h2>
                {articles[0] && (
                  <article 
                    className="bg-gray-50 rounded-xl p-6 cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:scale-[1.01]"
                    onClick={() => {
                      setActiveArticle(articles[0]);
                      setShowArticleModal(true);
                    }}
                  >
                    <img 
                      src={articles[0].image} 
                      alt={articles[0].title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{articles[0].title}</h3>
                    <p className="text-gray-600 mb-4">{articles[0].excerpt}</p>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${articles[0].categoryColor}`}>
                        {articles[0].category}
                      </span>
                      <span className="text-gray-500 text-sm">{articles[0].date}</span>
                    </div>
                  </article>
                )}
              </div>
            )}

            {/* Archive Section */}
            {activeSection === 'archive' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Article Archive</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map(article => (
                    <article 
                      key={article.id} 
                      className="bg-gray-50 rounded-xl p-4 cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                      onClick={() => {
                        setActiveArticle(article);
                        setShowArticleModal(true);
                      }}
                    >
                      <img 
                        src={article.thumbnail} 
                        alt={article.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-bold mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs ${article.categoryColor}`}>
                          {article.category}
                        </span>
                        <span className="text-gray-500 text-xs">{article.date}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Section */}
            {activeSection === 'submit' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Submit Your Story</h2>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={submitForm.name}
                        onChange={(e) => handleSubmitChange('name', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={submitForm.email}
                        onChange={(e) => handleSubmitChange('email', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={submitForm.title}
                      onChange={(e) => handleSubmitChange('title', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={submitForm.category}
                      onChange={(e) => handleSubmitChange('category', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <div className="space-y-2">
                      <input
                        type="url"
                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        value={selectedImage || ''}
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      {imagePreview && (
                        <div className="relative w-full h-40">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                            onError={() => {
                              setImagePreview(null);
                              alert('Invalid image URL. Please check the URL and try again.');
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      value={submitForm.content}
                      onChange={(e) => handleSubmitChange('content', e.target.value)}
                      rows="6"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    ></textarea>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {charCount} characters
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={submitForm.terms}
                      onChange={(e) => handleSubmitChange('terms', e.target.checked)}
                      className="mt-1"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the terms and conditions and confirm this is my original work.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Story'}
                  </button>
                </form>
              </div>
            )}

            {/* About Section */}
            {activeSection === 'about' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">About Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Our Story</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Our platform was born from a passion to explore and document the fascinating world of scents. 
                        Our journey began in 2024 when a group of scent enthusiasts, scientists, and writers came 
                        together to create a space dedicated to sharing the stories and science behind everyday smells.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                      <ul className="space-y-2">
                        {[
                          'Share knowledge about scents to help people understand olfactory experiences',
                          'Document unique scent cultures and traditions from around the world',
                          'Connect people passionate about scents to build a community',
                          'Awaken attention to life\'s beautiful details through scent'
                        ].map((mission, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">🌿</span>
                            <span className="text-gray-700">{mission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-center">Join Us</h3>
                      <p className="text-gray-600 text-center mb-4">
                        Get updates and never miss exciting content
                      </p>
                      
                      <form className="space-y-3">
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                        <button
                          type="submit"
                          className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Subscribe Now
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Article Modal */}
      {showArticleModal && activeArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            {/* Close button */}
            <button
              onClick={() => setShowArticleModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Article header image */}
              <div className="relative h-64 md:h-96">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{activeArticle.title}</h2>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm bg-opacity-90 ${activeArticle.categoryColor}`}>
                      {activeArticle.category}
                    </span>
                    <span>{activeArticle.date}</span>
                  </div>
                </div>
              </div>

              {/* Article content */}
              <div className="p-6 md:p-8">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {activeArticle.content}
                  </p>
                </div>

                {/* Article metadata */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>
                      Written by <span className="font-medium">{activeArticle.author_name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>{activeArticle.reads || 0} reads</span>
                      <span>•</span>
                      <span>{activeArticle.likes || 0} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubPage2;
