import { useState, useEffect } from 'react';
import { libraryService } from '../services/libraryService';

const SubPage3 = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('nature');
  const [selectedScent, setSelectedScent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scents, setScents] = useState([]);
  const [filteredScents, setFilteredScents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newScent, setNewScent] = useState({
    name: '',
    category: 'nature',
    image: '',
    description: ''
  });
  const [editingScent, setEditingScent] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: 'nature',
    image: '',
    description: ''
  });

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Load scents from database
  useEffect(() => {
    const loadScents = async () => {
      setIsLoading(true);
      try {
        const data = await libraryService.getAllScents();
        setScents(data);
        setFilteredScents(data.filter(scent => scent.category === activeCategory));
        if (data.length > 0) {
          setSelectedScent(data[0]);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading scents:', err);
        setError('Failed to load scents. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadScents();
  }, []);

  // Handle category change
  useEffect(() => {
    const updateCategory = async () => {
      setIsLoading(true);
      try {
        const categoryScents = await libraryService.getScentsByCategory(activeCategory);
        setFilteredScents(categoryScents);
        if (categoryScents.length > 0 && !selectedScent) {
          setSelectedScent(categoryScents[0]);
        }
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load category scents.');
      } finally {
        setIsLoading(false);
      }
    };

    updateCategory();
  }, [activeCategory]);

  // Handle search
  useEffect(() => {
    const searchScents = async () => {
      if (!searchTerm.trim()) {
        setFilteredScents(scents.filter(scent => scent.category === activeCategory));
        return;
      }

      try {
        const results = await libraryService.searchScents(searchTerm);
        setFilteredScents(results);
      } catch (err) {
        console.error('Error searching scents:', err);
        setError('Search failed. Please try again.');
      }
    };

    const debounceTimer = setTimeout(searchScents, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, activeCategory, scents]);

  // Categories configuration
  const CATEGORIES = [
    { id: 'nature', name: 'Nature', icon: '🌿', color: 'bg-green-100 text-green-800' },
    { id: 'animal', name: 'Animal', icon: '🐾', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'food', name: 'Food', icon: '🍯', color: 'bg-orange-100 text-orange-800' },
    { id: 'urban', name: 'Urban', icon: '🏙️', color: 'bg-blue-100 text-blue-800' },
    { id: 'human', name: 'Human Activity', icon: '👥', color: 'bg-purple-100 text-purple-800' },
    { id: 'chemical', name: 'Chemical', icon: '🧪', color: 'bg-red-100 text-red-800' },
    { id: 'other', name: 'Other', icon: '🔮', color: 'bg-gray-100 text-gray-800' }
  ];

  // Sample data for when the API fails
  const FALLBACK_SCENTS = [
    {
      id: 'lotus',
      name: 'Lotus',
      category: 'nature',
      image: 'https://picsum.photos/seed/lotus/800/450',
      thumbnail: 'https://picsum.photos/seed/lotus/300/200',
      description: 'The lotus flower emits a delicate, subtle fragrance that is often described as clean and slightly sweet. It carries a fresh, airy quality, not overpowering but gently permeating the air.'
    },
    {
      id: 'canyon',
      name: 'Canyon',
      category: 'nature',
      image: 'https://picsum.photos/seed/canyon/800/450',
      thumbnail: 'https://picsum.photos/seed/canyon/300/200',
      description: 'The scent of a canyon carries the earthy aroma of aged rocks and dry soil, intertwined with faint notes of desert flora. A subtle, dusty fragrance that evokes vastness and solitude.'
    },
    {
      id: 'pine',
      name: 'Pine',
      category: 'nature',
      image: 'https://picsum.photos/seed/pine/800/450',
      thumbnail: 'https://picsum.photos/seed/pine/300/200',
      description: 'Pine trees release a sharp, invigorating fragrance filled with terpenes like pinene. It\'s a clean, foresty scent that brings to mind mountain air and Christmas trees.'
    },
    {
      id: 'horse',
      name: 'Horse',
      category: 'animal',
      image: 'https://picsum.photos/seed/horse/800/450',
      thumbnail: 'https://picsum.photos/seed/horse/300/200',
      description: 'The scent of horses is warm and earthy, a mixture of hay, leather, and the animal\'s natural musk.'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      category: 'food',
      image: 'https://picsum.photos/seed/coffee/400/200',
      thumbnail: 'https://picsum.photos/seed/coffee/50/50',
      description: 'The rich, complex aroma of coffee beans combines earthy, nutty, and slightly acidic notes. When brewed, it releases a warm, inviting fragrance.'
    },
    {
      id: 'subway',
      name: 'Subway',
      category: 'urban',
      image: 'https://picsum.photos/seed/subway/800/450',
      thumbnail: 'https://picsum.photos/seed/subway/300/200',
      description: 'The distinctive scent of subway systems combines metallic notes from the tracks and electrical ozone. It\'s an urban signature that varies by city.'
    },
    {
      id: 'perfume',
      name: 'Perfume',
      category: 'human',
      image: 'https://picsum.photos/seed/perfume/800/450',
      thumbnail: 'https://picsum.photos/seed/perfume/300/200',
      description: 'Fine perfume is a carefully crafted blend of top, middle, and base notes that evolves over time.'
    },
    {
      id: 'chlorine',
      name: 'Chlorine',
      category: 'chemical',
      image: 'https://picsum.photos/seed/chlorine/800/450',
      thumbnail: 'https://picsum.photos/seed/chlorine/300/200',
      description: 'Chlorine has a sharp, penetrating odor that\'s immediately recognizable from swimming pools and cleaning products.'
    },
    {
      id: 'leather',
      name: 'Leather',
      category: 'other',
      image: 'https://picsum.photos/seed/leather/800/450',
      thumbnail: 'https://picsum.photos/seed/leather/300/200',
      description: 'Quality leather has a rich, complex scent that combines animal hide with tanning processes. It\'s warm and sophisticated, with notes that can range from sweet and supple to deep and masculine, often associated with luxury and craftsmanship.'
    },
    {
      id: 'horse',
      name: 'Horse',
      category: 'animal',
      image: 'https://picsum.photos/seed/horse/800/450',
      thumbnail: 'https://picsum.photos/seed/horse/300/200',
      description: 'The scent of horses is warm and earthy, a mixture of hay, leather, and the animal\'s natural musk. It\'s a comforting, barnyard fragrance that evokes countryside and pastoral life.'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      category: 'food',
      image: 'https://picsum.photos/seed/coffee/800/450',
      thumbnail: 'https://picsum.photos/seed/coffee/300/200',
      description: 'The rich, complex aroma of coffee beans combines earthy, nutty, and slightly acidic notes. When brewed, it releases a warm, inviting fragrance that can instantly energize and comfort, with hints of caramel and chocolate depending on the roast.'
    }
  ];


  // Update filtered scents when category or search term changes
  useEffect(() => {
    if (!scents.length) return;

    let filtered = scents;
    
    // Filter by category if not searching
    if (!searchTerm && activeCategory) {
      filtered = scents.filter(scent => scent.category === activeCategory);
    }
    
    // Apply search filter if there's a search term
    if (searchTerm) {
      filtered = filtered.filter(scent =>
        scent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scent.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredScents(filtered);
    
    // Auto-select first scent if available
    if (filtered.length > 0) {
      setSelectedScent(filtered[0]);
    } else {
      setSelectedScent(null);
    }
  }, [activeCategory, searchTerm, scents]);

  const handleAddScent = async (e) => {
    e.preventDefault();
    
    if (!newScent.name || !newScent.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const timestamp = Date.now();
      const addedScent = await libraryService.addScent({
        name: newScent.name,
        category: activeCategory,
        description: newScent.description,
        image: newScent.image || `https://picsum.photos/seed/${timestamp}/800/450`,
        thumbnail: `https://picsum.photos/seed/${timestamp}/300/200`
      });

      // Update scents list
      setScents(prev => [addedScent, ...prev]);
      setFilteredScents(prev => [addedScent, ...prev]);
      setSelectedScent(addedScent);
      
      // Reset form and close modal
      setNewScent({
        name: '',
        category: 'nature',
        image: '',
        description: ''
      });
      setShowAddModal(false);
      
      alert('Scent added successfully!');
    } catch (err) {
      console.error('Error adding scent:', err);
      alert('Failed to add scent. Please try again.');
    } finally {
      setIsLoading(false);
    }
    setNewScent({ name: '', image: '', description: '' });
  };

  const handleEditClick = (scent) => {
    setEditingScent(scent);
    setEditForm({
      name: scent.name,
      category: scent.category,
      image: scent.image,
      description: scent.description
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const updatedScent = await libraryService.updateScent(editingScent.id, editForm);
      setScents(prevScents => 
        prevScents.map(scent => 
          scent.id === updatedScent.id ? updatedScent : scent
        )
      );
      setFilteredScents(prevScents => 
        prevScents.map(scent => 
          scent.id === updatedScent.id ? updatedScent : scent
        )
      );
      setEditingScent(null);
      setEditForm({
        name: '',
        category: 'nature',
        image: '',
        description: ''
      });
    } catch (error) {
      console.error('Error updating scent:', error);
      setError('Failed to update scent. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this scent?')) {
      try {
        setIsLoading(true);
        await libraryService.deleteScent(id);
        setScents(prevScents => prevScents.filter(scent => scent.id !== id));
        setFilteredScents(prevScents => prevScents.filter(scent => scent.id !== id));
        if (selectedScent?.id === id) {
          setSelectedScent(null);
        }
      } catch (error) {
        console.error('Error deleting scent:', error);
        setError('Failed to delete scent. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const currentCategory = CATEGORIES.find(cat => cat.id === activeCategory);

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
            {CATEGORIES.map((category, index) => (
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
                {index < CATEGORIES.length - 1 && (
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
                          src={scent.image}
                          alt={scent.name}
                          className="w-32 h-20 object-cover rounded-lg mr-4 shadow-sm"
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
                      className="w-full h-64 object-cover rounded-lg mb-4 shadow-md flex-shrink-0"
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

      {/* Edit Modal */}
      {editingScent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Scent</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingScent(null)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit and Delete buttons in the scent details */}
      {selectedScent && (
        <div className="flex justify-center gap-3 mt-8 mb-8">
          <button
            onClick={() => handleEditClick(selectedScent)}
            className="flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Scent
          </button>
          <button
            onClick={() => handleDeleteClick(selectedScent.id)}
            className="flex items-center px-6 py-3 text-base font-medium text-white bg-red-600 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete Scent
          </button>
        </div>
      )}
    </div>
  );
}

export default SubPage3;