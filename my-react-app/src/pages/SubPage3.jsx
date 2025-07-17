import { useState, useEffect } from 'react';

const SubPage3 = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('nature');
  const [selectedScent, setSelectedScent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScents, setFilteredScents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newScent, setNewScent] = useState({
    name: '',
    image: '',
    description: ''
  });

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Smell library data
  const smellLibrary = {
    nature: [
      {
        id: 'lotus',
        name: 'Lotus',
        image: 'https://picsum.photos/seed/lotus/400/200',
        thumbnail: 'https://picsum.photos/seed/lotus/50/50',
        description: 'The lotus flower emits a delicate, subtle fragrance that is often described as clean and slightly sweet. It carries a fresh, airy quality, not overpowering but gently permeating the air—like a soft whisper of sweetness blended with a hint of green, earthy freshness. Unlike heavy or cloying scents, its aroma feels light and pure, evoking a sense of tranquility, often associated with calm waters and serene natural settings where the flower blooms.'
      },
      {
        id: 'canyon',
        name: 'Canyon',
        image: 'https://picsum.photos/seed/canyon/400/200',
        thumbnail: 'https://picsum.photos/seed/canyon/50/50',
        description: 'The scent of a canyon carries the earthy aroma of aged rocks and dry soil, intertwined with faint notes of desert flora. A subtle, dusty fragrance that evokes vastness and solitude, with a hint of minerals carried by the wind.'
      },
      {
        id: 'aurora',
        name: 'Aurora',
        image: 'https://picsum.photos/seed/aurora/400/200',
        thumbnail: 'https://picsum.photos/seed/aurora/50/50',
        description: 'An aurora\'s scent is elusive—cold, crisp air with a faint electric tang, reminiscent of ozone after a lightning strike. It carries the freshness of polar winds and the ethereal quality of the night sky in remote, untouched places.'
      },
      {
        id: 'pine',
        name: 'Pine',
        image: 'https://picsum.photos/seed/pine/400/200',
        thumbnail: 'https://picsum.photos/seed/pine/50/50',
        description: 'Pine trees release a sharp, invigorating fragrance filled with terpenes like pinene. It\'s a clean, foresty scent that brings to mind mountain air, Christmas trees, and the resilience of evergreen forests.'
      },
      {
        id: 'waterfall',
        name: 'Waterfall',
        image: 'https://picsum.photos/seed/waterfall/400/200',
        thumbnail: 'https://picsum.photos/seed/waterfall/50/50',
        description: 'The air around waterfalls carries a misty, refreshing scent—cool, oxygen-rich, and faintly mineral. It combines the purity of rushing water with the earthy tones of the surrounding vegetation and rocks.'
      },
      {
        id: 'rainbow',
        name: 'Rainbow',
        image: 'https://picsum.photos/seed/rainbow/400/200',
        thumbnail: 'https://picsum.photos/seed/rainbow/50/50',
        description: 'While rainbows themselves have no scent, the air after a rainstorm—when rainbows often appear—carries petrichor, the earthy fragrance of rain on dry ground, mixed with the fresh, clean aroma of washed air.'
      }
    ],
    animal: [
      {
        id: 'horse',
        name: 'Horse',
        image: 'https://picsum.photos/seed/horse/400/200',
        thumbnail: 'https://picsum.photos/seed/horse/50/50',
        description: 'The scent of horses is warm and earthy, a mixture of hay, leather, and the animal\'s natural musk. It\'s a comforting, barnyard fragrance that evokes countryside and pastoral life.'
      },
      {
        id: 'cat',
        name: 'Cat',
        image: 'https://picsum.photos/seed/cat/400/200',
        thumbnail: 'https://picsum.photos/seed/cat/50/50',
        description: 'A cat\'s scent is subtle and clean, often described as slightly sweet and warm. Well-groomed cats have a pleasant, neutral smell that many find comforting and familiar.'
      }
    ],
    food: [
      {
        id: 'coffee',
        name: 'Coffee',
        image: 'https://picsum.photos/seed/coffee/400/200',
        thumbnail: 'https://picsum.photos/seed/coffee/50/50',
        description: 'The rich, complex aroma of coffee beans combines earthy, nutty, and slightly acidic notes. When brewed, it releases a warm, inviting fragrance that can instantly energize and comfort, with hints of caramel and chocolate depending on the roast.'
      },
      {
        id: 'bread',
        name: 'Fresh Bread',
        image: 'https://picsum.photos/seed/bread/400/200',
        thumbnail: 'https://picsum.photos/seed/bread/50/50',
        description: 'The aroma of freshly baked bread is warm, yeasty, and comforting. It carries notes of wheat, with a slightly sweet undertone and a crusty, golden exterior that speaks of home and nourishment.'
      },
      {
        id: 'vanilla',
        name: 'Vanilla',
        image: 'https://picsum.photos/seed/vanilla/400/200',
        thumbnail: 'https://picsum.photos/seed/vanilla/50/50',
        description: 'Pure vanilla has a sweet, creamy fragrance with floral undertones and a hint of spice. It\'s warm and comforting, often associated with baking and desserts, but also sophisticated in its complexity.'
      }
    ],
    urban: [
      {
        id: 'subway',
        name: 'Subway',
        image: 'https://picsum.photos/seed/subway/400/200',
        thumbnail: 'https://picsum.photos/seed/subway/50/50',
        description: 'The distinctive scent of subway systems combines metallic notes from the tracks, electrical ozone, and the collective human presence. It\'s an urban signature that varies by city but always speaks of movement and metropolitan life.'
      },
      {
        id: 'gasoline',
        name: 'Gasoline',
        image: 'https://picsum.photos/seed/gasoline/400/200',
        thumbnail: 'https://picsum.photos/seed/gasoline/50/50',
        description: 'Gasoline has a sharp, chemical odor that\'s immediately recognizable. Despite its artificial nature, many find it oddly appealing—sweet yet acrid, with hydrocarbon notes that evoke road trips and mechanical power.'
      }
    ],
    human: [
      {
        id: 'perfume',
        name: 'Perfume',
        image: 'https://picsum.photos/seed/perfume/400/200',
        thumbnail: 'https://picsum.photos/seed/perfume/50/50',
        description: 'Fine perfume is a carefully crafted blend of top, middle, and base notes that evolves over time. It can range from light and floral to deep and musky, designed to complement and enhance the wearer\'s natural scent.'
      },
      {
        id: 'newborn',
        name: 'Newborn Baby',
        image: 'https://picsum.photos/seed/newborn/400/200',
        thumbnail: 'https://picsum.photos/seed/newborn/50/50',
        description: 'The scent of a newborn baby is delicate and pure—a soft, powdery fragrance mixed with the natural sweetness of new life. It\'s often described as one of the most comforting and primal scents humans can experience.'
      }
    ],
    chemical: [
      {
        id: 'chlorine',
        name: 'Chlorine',
        image: 'https://picsum.photos/seed/chlorine/400/200',
        thumbnail: 'https://picsum.photos/seed/chlorine/50/50',
        description: 'Chlorine has a sharp, penetrating odor that\'s immediately recognizable from swimming pools and cleaning products. It\'s clean and sterile, with a slightly burning sensation that speaks of purification and sanitation.'
      },
      {
        id: 'ammonia',
        name: 'Ammonia',
        image: 'https://picsum.photos/seed/ammonia/400/200',
        thumbnail: 'https://picsum.photos/seed/ammonia/50/50',
        description: 'Ammonia has a pungent, alkaline odor that\'s sharp and irritating to the nose. It\'s the smell of strong cleaning products and certain industrial processes, immediately recognizable and impossible to ignore.'
      }
    ],
    other: [
      {
        id: 'leather',
        name: 'Leather',
        image: 'https://picsum.photos/seed/leather/400/200',
        thumbnail: 'https://picsum.photos/seed/leather/50/50',
        description: 'Quality leather has a rich, complex scent that combines animal hide with tanning processes. It\'s warm and sophisticated, with notes that can range from sweet and supple to deep and masculine, often associated with luxury and craftsmanship.'
      },
      {
        id: 'rubber',
        name: 'Rubber',
        image: 'https://picsum.photos/seed/rubber/400/200',
        thumbnail: 'https://picsum.photos/seed/rubber/50/50',
        description: 'Rubber has a distinctive industrial smell that\'s slightly sweet and elastic. It\'s the scent of tires, rubber bands, and various manufactured products, immediately recognizable and tied to modern industrial life.'
      }
    ]
  };

  const categories = [
    { id: 'nature', name: 'Nature', icon: '🌿', color: 'bg-green-100 text-green-800' },
    { id: 'animal', name: 'Animal', icon: '🐾', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'food', name: 'Food', icon: '🍯', color: 'bg-orange-100 text-orange-800' },
    { id: 'urban', name: 'Urban', icon: '🏙️', color: 'bg-blue-100 text-blue-800' },
    { id: 'human', name: 'Human Activity', icon: '👥', color: 'bg-purple-100 text-purple-800' },
    { id: 'chemical', name: 'Chemical', icon: '🧪', color: 'bg-red-100 text-red-800' },
    { id: 'other', name: 'Other', icon: '🔮', color: 'bg-gray-100 text-gray-800' }
  ];

  // Filter scents based on search and category
  useEffect(() => {
    let scents = smellLibrary[activeCategory] || [];
    
    if (searchTerm) {
      const allScents = Object.values(smellLibrary).flat();
      scents = allScents.filter(scent =>
        scent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scent.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredScents(scents);
    
    // Auto-select first scent if available
    if (scents.length > 0) {
      setSelectedScent(scents[0]);
    } else {
      setSelectedScent(null);
    }
  }, [activeCategory, searchTerm]);

  const handleAddScent = (e) => {
    e.preventDefault();
    
    if (!newScent.name || !newScent.image || !newScent.description) {
      alert('Please fill in all fields');
      return;
    }
    
    const id = newScent.name.toLowerCase().replace(/\s+/g, '-');
    const scentToAdd = {
      id,
      name: newScent.name,
      image: newScent.image,
      thumbnail: newScent.image,
      description: newScent.description
    };
    
    // Add to library (in real app, this would be saved to database)
    if (!smellLibrary[activeCategory]) {
      smellLibrary[activeCategory] = [];
    }
    smellLibrary[activeCategory].push(scentToAdd);
    
    setFilteredScents([...smellLibrary[activeCategory]]);
    setSelectedScent(scentToAdd);
    setShowAddModal(false);
    setNewScent({ name: '', image: '', description: '' });
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);

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

            {/* Page Title */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-white font-bold text-lg">
                SMELL LIBRARY
              </h1>
            </div>

            {/* Search + Back Button */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search scents..."
                  className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
              
              <button
                onClick={() => onNavigate('home')}
                className="text-white hover:text-yellow-200 font-bold transition-colors duration-300 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-full"
              >
                ← Back to Home
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Quick Navigation Bar */}
      <div className={`relative z-10 bg-white shadow-sm border-b border-gray-200 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {categories.map((category, index) => (
              <div key={category.id} className="flex items-center">
                <button
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-orange-100 text-orange-800 font-bold'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </button>
                {index < categories.length - 1 && (
                  <span className="text-gray-300 mx-2">/</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 p-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Section Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{currentCategory?.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{currentCategory?.name}</h2>
                  <p className="text-sm text-gray-600">{filteredScents.length} scents available</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <span>➕</span>
                <span>Add Smell</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex" style={{ height: '600px' }}>
              {/* Left: Scent List */}
              <div className="w-2/3 p-6 overflow-y-auto border-r border-gray-200">
                {filteredScents.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">👃</div>
                    <p className="text-gray-500 font-medium">No scents found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search or add a new scent</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredScents.map((scent) => (
                      <div
                        key={scent.id}
                        onClick={() => setSelectedScent(scent)}
                        className={`flex items-center max-w-[800px] rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedScent?.id === scent.id
                            ? 'bg-orange-50 border-l-4 border-orange-500 shadow-md'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <img
                          src={scent.thumbnail}
                          alt={scent.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4 shadow-sm"
                        />
                        <div className="w-full overflow-hidden pr-4">
                          <h3 className="font-medium text-gray-900">{scent.name}</h3>
                          <p className="text-sm text-gray-600 w-full truncate">
                            {scent.description.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Scent Detail */}
              <div className="w-1/3 p-6 bg-gray-50">
                {selectedScent ? (
                  <div className="h-full flex flex-col">
                    <img
                      src={selectedScent.image}
                      alt={selectedScent.name}
                      className="w-full h-48 object-cover rounded-lg mb-4 shadow-md flex-shrink-0"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center flex-shrink-0">
                      <span className="mr-2">👃</span>
                      {selectedScent.name}
                    </h3>
                    <div className="flex-1 overflow-hidden">
                      <div className="h-full overflow-y-auto pr-2">
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {selectedScent.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                    <div className="text-6xl mb-4">👃</div>
                    <p className="font-medium">Select a scent from the left list</p>
                    <p className="text-sm">to view detailed information</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Smell Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Smell</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddScent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newScent.name}
                  onChange={(e) => setNewScent({...newScent, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter smell name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newScent.image}
                  onChange={(e) => setNewScent({...newScent, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter image URL"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newScent.description}
                  onChange={(e) => setNewScent({...newScent, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows="4"
                  placeholder="Describe the scent..."
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add Smell
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubPage3;