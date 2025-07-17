import { useState, useEffect } from 'react';

const SubPage2 = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeSection, setActiveSection] = useState('today');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    name: '',
    email: '',
    title: '',
    category: '',
    content: '',
    terms: false
  });
  const [charCount, setCharCount] = useState(0);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Sample articles data
  const articles = [
    {
      id: 1,
      title: "The Aroma of a Rainforest After Rain: Nature's Fresh Healing",
      category: "Nature",
      categoryColor: "bg-green-100 text-green-800",
      date: "July 15, 2025",
      number: "127",
      image: "https://picsum.photos/id/152/800/450",
      thumbnail: "https://picsum.photos/id/152/300/200",
      excerpt: "Explore the unique phytoncides in rainforest air and how they affect our physical and mental health...",
      content: "A rainforest after rain is nature's most enchanting perfume factory. When raindrops hit leaves, soil, and moss, a unique fresh aroma fills the air - what we might call the 'forest bath' scent.",
      reads: 2384,
      likes: 42
    },
    {
      id: 2,
      title: "The Scientific Connection Between Coffee Aroma and Brain Activity",
      category: "Food",
      categoryColor: "bg-orange-100 text-orange-800",
      date: "July 12, 2025",
      number: "126",
      image: "https://picsum.photos/id/431/800/450",
      thumbnail: "https://picsum.photos/id/431/300/200",
      excerpt: "Research shows that the aroma of coffee itself can improve alertness and cognitive abilities...",
      content: "Recent studies reveal that coffee's aroma alone can enhance brain function and improve alertness even without caffeine consumption.",
      reads: 1942,
      likes: 38
    },
    {
      id: 3,
      title: "How Lavender Scent Improves Sleep Quality",
      category: "Nature",
      categoryColor: "bg-purple-100 text-purple-800",
      date: "July 8, 2025",
      number: "125",
      image: "https://picsum.photos/id/106/800/450",
      thumbnail: "https://picsum.photos/id/106/300/200",
      excerpt: "How linalool, the main component in lavender, helps people fall asleep faster and improve sleep quality...",
      content: "Lavender's linalool compound has been scientifically proven to regulate the nervous system and promote better sleep patterns.",
      reads: 1756,
      likes: 52
    }
  ];

  const categories = [
    { name: 'Nature', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
    { name: 'Animal', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
    { name: 'Food', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
    { name: 'Urban', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
    { name: 'Human Activity', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200' },
    { name: 'Chemical', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
    { name: 'Other', color: 'bg-pink-100 text-pink-800 hover:bg-pink-200' }
  ];

  const handleSubmitChange = (field, value) => {
    setSubmitForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'content') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (!submitForm.name || !submitForm.email || !submitForm.title || !submitForm.category || !submitForm.content || !submitForm.terms) {
      alert('Please fill in all required fields and agree to the terms.');
      return;
    }
    
    if (submitForm.content.length < 500) {
      alert('Article content must be at least 500 words.');
      return;
    }
    
    alert('Submission successful! We will review your article within 3 business days.');
    setSubmitForm({
      name: '',
      email: '',
      title: '',
      category: '',
      content: '',
      terms: false
    });
    setCharCount(0);
  };

  const navItems = [
    { id: 'today', label: 'SCENT OF THE DAY' },
    { id: 'archive', label: 'ARCHIVE' },
    { id: 'submit', label: 'SUBMIT A SCENT' },
    { id: 'about', label: 'ABOUT US' }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#fcd71a]">
      {/* Navigation Header */}
      <header className="relative z-10 bg-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 pl-2 pr-2 md:pl-4 md:pr-4 lg:px-8">
              <img src='/src/assets/writing-center-logo.png' alt="Logo" className='w-16 h-16' />
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
                    className={`w-full text-left px-4 py-3 text-white hover:bg-orange-600 hover:text-yellow-200 font-bold transition-colors duration-300 rounded-lg ${
                      activeSection === item.id ? 'text-yellow-200' : ''
                    }`}
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
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Today's Article Section */}
          {activeSection === 'today' && (
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Article */}
                <div className="lg:col-span-2">
                  <article className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="p-6 md:p-8">
                      <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                          {articles[0].category}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          {articles[0].title}
                        </h2>
                        <div className="flex items-center text-gray-500 text-sm mb-6">
                          <span className="flex items-center mr-4">
                            📅 {articles[0].date}
                          </span>
                          <span className="flex items-center">
                            📝 Article #{articles[0].number}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <img 
                          src={articles[0].image} 
                          alt={articles[0].title}
                          className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="prose max-w-none text-gray-700 mb-8">
                        <p className="mb-4 text-lg leading-relaxed">
                          {articles[0].content}
                        </p>
                        <p className="mb-4">
                          This scent primarily consists of "phytoncides" - natural antimicrobial substances that trees and plants release to protect themselves. Studies show that inhaling these substances can reduce levels of the stress hormone cortisol and enhance immune system function.
                        </p>
                        <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600 my-6 bg-green-50 p-4 rounded-r-lg">
                          "Nature's most healing fragrances often require no artificial synthesis."
                        </blockquote>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
                            👍 Like ({articles[0].likes})
                          </button>
                          <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            🔖 Bookmark
                          </button>
                        </div>
                        
                        <div className="flex space-x-3">
                          <span className="text-gray-500">Share:</span>
                          <button className="text-gray-600 hover:text-green-600 transition-colors">📱</button>
                          <button className="text-gray-600 hover:text-blue-600 transition-colors">🐦</button>
                          <button className="text-gray-600 hover:text-red-600 transition-colors">📧</button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                
                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Popular Scents */}
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      🔥 Popular Scents
                    </h3>
                    <div className="space-y-4">
                      {articles.map((article, index) => (
                        <div key={article.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 hover:text-orange-600 transition-colors cursor-pointer">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Reads: {article.reads.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      🏷️ Scent Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category.name}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${category.color}`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Newsletter */}
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      📧 Subscribe
                    </h3>
                    <p className="mb-4 text-white/90">
                      Subscribe to our daily scent newsletter and never miss an olfactory adventure.
                    </p>
                    <form className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-white/90 transition-colors"
                      >
                        Subscribe to Daily Scents
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Archive Section */}
          {activeSection === 'archive' && (
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  📚 Archive
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-xl font-semibold mb-4">Browse by Year</h3>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">2025</span>
                          <span>📅</span>
                        </div>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="text-orange-600 font-medium">July (15 articles)</div>
                          <div className="text-gray-600">June (20 articles)</div>
                          <div className="text-gray-600">May (18 articles)</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">2024</span>
                          <span>📅</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-semibold mb-4">Featured Articles</h3>
                    <div className="space-y-4">
                      {articles.map(article => (
                        <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:shadow-md transition-all">
                          <div className="flex gap-4">
                            <img 
                              src={article.thumbnail} 
                              alt={article.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${article.categoryColor}`}>
                                {article.category}
                              </span>
                              <h4 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors mb-2">
                                {article.title}
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{article.date}</span>
                                <span>Article #{article.number}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Submit Section */}
          {activeSection === 'submit' && (
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  ✍️ Submit a Scent Story
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-4">Submission Guidelines</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Content must be related to scents, olfactory experiences, perfumes, etc.
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Original works are preferred; if reposting, please indicate the source
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          Recommended word count: 500-3,000 words
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          High-quality images can be included (optional)
                        </li>
                      </ul>
                      
                      <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                        <h4 className="font-medium mb-2">Popular Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Olfactory Science', 'Perfume Reviews', 'Scent Memories', 'Natural Scents', 'Culture and Scents'].map(topic => (
                            <span key={topic} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                          <input
                            type="text"
                            value={submitForm.name}
                            onChange={(e) => handleSubmitChange('name', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                        <input
                          type="text"
                          value={submitForm.title}
                          onChange={(e) => handleSubmitChange('title', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={submitForm.category}
                          onChange={(e) => handleSubmitChange('category', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map(cat => (
                            <option key={cat.name} value={cat.name.toLowerCase()}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Article Content</label>
                        <textarea
                          value={submitForm.content}
                          onChange={(e) => handleSubmitChange('content', e.target.value)}
                          rows="6"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Please enter your article content (minimum 500 words)"
                          required
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                          Word count: {charCount}
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={submitForm.terms}
                          onChange={(e) => handleSubmitChange('terms', e.target.checked)}
                          className="mt-1 mr-2"
                          required
                        />
                        <label className="text-sm text-gray-600">
                          I confirm that the submitted content is original and agree to Smell Daily's Terms
                        </label>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitForm({
                              name: '',
                              email: '',
                              title: '',
                              category: '',
                              content: '',
                              terms: false
                            });
                            setCharCount(0);
                          }}
                          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Submit Article
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* About Section */}
          {activeSection === 'about' && (
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  ℹ️ About Smell Daily
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Explore the World of Scents</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Smell Daily is a platform dedicated to sharing knowledge, experiences, and culture related to scents. We believe that every scent has a unique story behind it, and every olfactory experience can evoke deep memories and emotions.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        We publish one original scent-related article every day, covering various fields such as scientific research, cultural history, lifestyle experiences, and perfume reviews. Through words and images, we lead readers to explore the fascinating world of scents.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                      <ul className="space-y-2">
                        {[
                          'Disseminate scent science knowledge to help people better understand olfactory experiences',
                          'Document and share unique scent cultures and traditions from around the world',
                          'Connect people passionate about scents to build a community for sharing',
                          'Awaken people\'s attention to the beautiful details in life through the power of scent'
                        ].map((mission, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">🌿</span>
                            <span className="text-gray-700">{mission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <span className="text-orange-500 mr-3">📧</span>
                          <span className="text-gray-700">contact@smelldaily.com</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-orange-500 mr-3">📱</span>
                          <span className="text-gray-700">WeChat: SmellDaily</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-orange-500 mr-3">🐦</span>
                          <span className="text-gray-700">Twitter: @SmellDaily</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-orange-500 mr-3">📷</span>
                          <span className="text-gray-700">Instagram: @smell_daily</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-center">Subscribe to Us</h3>
                      <p className="text-gray-600 text-center mb-4">Get daily scent updates and never miss any exciting content</p>
                      
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
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-medium mb-3 text-center">Follow Us</h4>
                        <div className="flex justify-center space-x-4">
                          <button className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors">
                            📱
                          </button>
                          <button className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors">
                            🐦
                          </button>
                          <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                            📧
                          </button>
                          <button className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-200 transition-colors">
                            📷
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SubPage2;