import { useState, useEffect, useRef } from 'react';

// Dynamically load Leaflet if not already loaded
const loadLeaflet = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.L) {
      resolve(window.L);
      return;
    }

    if (!document.querySelector('link[href*="leaflet"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';
      document.head.appendChild(cssLink);
    }

    if (!document.querySelector('script[src*="leaflet"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => resolve(window.L);
      script.onerror = reject;
      document.head.appendChild(script);
    } else {
      const checkLeaflet = () => {
        if (window.L) {
          resolve(window.L);
        } else {
          setTimeout(checkLeaflet, 100);
        }
      };
      checkLeaflet();
    }
  });
};

const SubPage1 = ({ onNavigate }) => {
  const [selectedSmellIds, setSelectedSmellIds] = useState(new Set());
  const [allSmells, setAllSmells] = useState([]);
  const [currentSmellList, setCurrentSmellList] = useState([]);
  const [selectedSmell, setSelectedSmell] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [leafletLib, setLeafletLib] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: 'floral',
    intensity: 5,
    location: null,
    address: ''
  });

  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load Leaflet library
  useEffect(() => {
    loadLeaflet()
      .then((L) => {
        setLeafletLib(L);
        setIsMapReady(true);
      })
      .catch((error) => {
        console.error('Failed to load Leaflet:', error);
      });
  }, []);

  // Sample smell data
  const sampleSmells = [
    { 
      id: 0, 
      title: "Rose Garden Café", 
      description: "Beautiful rose aroma mixed with coffee", 
      category: "floral", 
      intensity: 7, 
      location: [31.2304, 121.4737], 
      address: "People's Square, Shanghai",
      timestamp: "2024-01-15",
      contributor: "Alice"
    },
    { 
      id: 1, 
      title: "Street Food Paradise", 
      description: "Amazing grilled meat and spices", 
      category: "food", 
      intensity: 9, 
      location: [31.1755, 121.4977], 
      address: "Lujiazui, Shanghai",
      timestamp: "2024-01-14",
      contributor: "Bob"
    },
    { 
      id: 2, 
      title: "Ocean Breeze Pier", 
      description: "Fresh salty sea air", 
      category: "nature", 
      intensity: 6, 
      location: [31.2989, 121.5015], 
      address: "Yangpu District, Shanghai",
      timestamp: "2024-01-13",
      contributor: "Carol"
    },
    { 
      id: 3, 
      title: "Pine Forest Path", 
      description: "Deep earthy pine scent", 
      category: "nature", 
      intensity: 8, 
      location: [31.2252, 121.4450], 
      address: "Xujiahui Park, Shanghai",
      timestamp: "2024-01-12",
      contributor: "David"
    },
    { 
      id: 4, 
      title: "Vanilla Bakery", 
      description: "Sweet vanilla and fresh bread", 
      category: "food", 
      intensity: 8, 
      location: [31.2303, 121.4067], 
      address: "Putuo District, Shanghai",
      timestamp: "2024-01-11",
      contributor: "Eve"
    },
    { 
      id: 5, 
      title: "Jasmine Tea House", 
      description: "Delicate jasmine flower tea", 
      category: "floral", 
      intensity: 5, 
      location: [31.2260, 121.4903], 
      address: "Yu Garden, Shanghai",
      timestamp: "2024-01-10",
      contributor: "Frank"
    }
  ];

  // Load data from localStorage or use sample data
  const loadSmellData = () => {
    try {
      const savedData = localStorage.getItem('smellMapData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Ensure we have valid data structure
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          return parsedData;
        }
      }
    } catch (error) {
      console.warn('Error loading smell data from localStorage:', error);
    }
    // Return sample data if no saved data or error
    return sampleSmells;
  };

  // Save data to localStorage
  const saveSmellData = (data) => {
    try {
      localStorage.setItem('smellMapData', JSON.stringify(data));
      console.log('✅ Smell data saved to localStorage');
    } catch (error) {
      console.error('Error saving smell data to localStorage:', error);
      alert('Warning: Could not save data. Your data might not persist after page reload.');
    }
  };

  // Get next available ID
  const getNextId = (smells) => {
    if (smells.length === 0) return 0;
    return Math.max(...smells.map(smell => smell.id)) + 1;
  };

  const SMELL_CATEGORIES = ['floral', 'food', 'nature', 'urban', 'chemical', 'other'];
  const CATEGORY_COLORS = {
    'floral': '#ff69b4',
    'food': '#ff8c00', 
    'nature': '#32cd32',
    'urban': '#708090',
    'chemical': '#dc143c',
    'other': '#9370db'
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current && isMapReady && leafletLib) {
      try {
        leafletMapRef.current = leafletLib.map(mapRef.current, {
          zoomControl: true,
          attributionControl: true
        }).setView([31.2304, 121.4737], 11);

        const cartoLayer = leafletLib.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 20
        });

        cartoLayer.addTo(leafletMapRef.current);
        mapRef.current.style.borderRadius = '16px';
        mapRef.current.style.overflow = 'hidden';

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [isMapReady, leafletLib]);

  // Handle map click for location selection
  useEffect(() => {
    if (leafletMapRef.current && leafletLib) {
      // Remove existing click handlers
      leafletMapRef.current.off('click');
      
      if (showUploadForm) {
        // Add click handler for new smell locations
        const handleMapClick = (e) => {
          const newLocation = [e.latlng.lat, e.latlng.lng];
          setUploadData(prev => ({
            ...prev,
            location: newLocation
          }));
          
          // Add temporary marker to show selected location
          if (window.tempMarker) {
            leafletMapRef.current.removeLayer(window.tempMarker);
          }
          
          window.tempMarker = leafletLib.circleMarker(newLocation, {
            radius: 15,
            fillColor: '#fcd71a',
            color: '#000000',
            weight: 4,
            opacity: 1,
            fillOpacity: 0.9
          }).addTo(leafletMapRef.current);
          
          window.tempMarker.bindPopup("📍 New smell location selected!").openPopup();
        };
        
        leafletMapRef.current.on('click', handleMapClick);
      }
      
      // Clean up temp marker when upload form closes
      if (!showUploadForm && window.tempMarker) {
        leafletMapRef.current.removeLayer(window.tempMarker);
        window.tempMarker = null;
      }
    }
  }, [showUploadForm, leafletMapRef.current, leafletLib]);

  // Update markers when smells change
  useEffect(() => {
    if (leafletMapRef.current && leafletLib && allSmells.length > 0) {
      markersRef.current.forEach(marker => leafletMapRef.current.removeLayer(marker));
      markersRef.current = [];

      allSmells.forEach(smell => {
        if (smell.location) {
          const isSelected = selectedSmellIds.has(smell.id);
          const categoryColor = CATEGORY_COLORS[smell.category] || '#9370db';

          const marker = leafletLib.circleMarker(smell.location, {
            radius: isSelected ? 15 : (smell.intensity + 5),
            fillColor: isSelected ? '#fcd71a' : categoryColor,
            color: '#000000',
            weight: 3,
            opacity: 1,
            fillOpacity: isSelected ? 0.9 : 0.7
          }).addTo(leafletMapRef.current);

          marker.bindPopup(`
            <div style="font-family: 'Archivo Black', sans-serif; max-width: 280px; color: #000000;">
              <h4 style="margin: 0 0 8px 0; color: #000000; font-size: 16px; font-weight: 700;">
                ${smell.title} 👃
              </h4>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #333333;">
                <strong>📍 Location:</strong> ${smell.address}
              </p>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #333333;">
                <strong>🏷️ Category:</strong> ${smell.category}
              </p>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #333333;">
                <strong>💪 Intensity:</strong> ${smell.intensity}/10
              </p>
              <p style="margin: 0; font-size: 12px; color: #666;">
                <em>"${smell.description}"</em>
              </p>
            </div>
          `);

          marker.on('click', () => {
            handleSmellClick(smell.id);
          });

          markersRef.current.push(marker);
        }
      });
    }
  }, [allSmells, selectedSmellIds, leafletLib]);

  // Initialize data from localStorage
  useEffect(() => {
    const loadedSmells = loadSmellData();
    setAllSmells(loadedSmells);
    setCurrentSmellList(loadedSmells);
    if (loadedSmells.length > 0) {
      setSelectedSmell(loadedSmells[0]);
    }
  }, []);

  const handleSmellClick = (smellId) => {
    const newSelection = new Set([smellId]);
    setSelectedSmellIds(newSelection);
    const smell = allSmells.find(s => s.id === smellId);
    setSelectedSmell(smell);
    setCurrentSmellList([smell]);

    if (smell.location && leafletMapRef.current) {
      leafletMapRef.current.setView(smell.location, 15, { animate: true });
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (uploadData.title && uploadData.location) {
      const newSmell = {
        id: allSmells.length,
        title: uploadData.title,
        description: uploadData.description,
        category: uploadData.category,
        intensity: uploadData.intensity,
        location: uploadData.location,
        address: uploadData.address || `Lat: ${uploadData.location[0].toFixed(4)}, Lng: ${uploadData.location[1].toFixed(4)}`,
        timestamp: new Date().toISOString().split('T')[0],
        contributor: "You"
      };
      
      setAllSmells([...allSmells, newSmell]);
      setCurrentSmellList([...allSmells, newSmell]);
      setShowUploadForm(false);
      
      // Clean up temporary marker
      if (window.tempMarker && leafletMapRef.current) {
        leafletMapRef.current.removeLayer(window.tempMarker);
        window.tempMarker = null;
      }
      
      // Reset form
      setUploadData({
        title: '',
        description: '',
        category: 'floral',
        intensity: 5,
        location: null,
        address: ''
      });
      
      // Show success message
      alert('Smell data uploaded successfully! 👃✨');
    } else {
      alert('Please fill in the title and click on the map to select a location!');
    }
  };

  const renderChart = (type, categories) => {
    const data = {};

    allSmells.forEach(smell => {
      let category;
      if (type === 'category') {
        category = smell.category || 'other';
      } else if (type === 'intensity') {
        category = smell.intensity >= 8 ? 'Strong (8-10)' : 
                  smell.intensity >= 5 ? 'Medium (5-7)' : 'Light (1-4)';
      }

      if (!data[category]) data[category] = [];
      data[category].push(smell);
    });

    return { data, categories: categories.filter(cat => data[cat]) };
  };

  const ChartComponent = ({ title, type, categories }) => {
    const chartData = renderChart(type, categories);

    return (
      <div className="bg-yellow-300 border-4 border-black rounded-lg shadow-xl p-4 h-64 hover:shadow-2xl transition-all duration-300">
        <h3 className="text-sm font-bold mb-3 text-center border-b-2 border-black pb-2 text-black">
          {title}
        </h3>
        <div className="h-44 overflow-y-auto">
          {chartData.categories.map((category) => (
            <div key={category} className="mb-3">
              <div className="text-xs mb-2 font-bold text-black">{category}</div>
              <div className="flex flex-wrap gap-1.5">
                {chartData.data[category]?.map((smell) => (
                  <button
                    key={smell.id}
                    onClick={() => handleSmellClick(smell.id)}
                    className="w-5 h-5 rounded-full border-2 border-black shadow-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: selectedSmellIds.has(smell.id) ? '#fcd71a' : CATEGORY_COLORS[smell.category] || '#9370db'
                    }}
                    title={smell.title}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
              <h1 className="text-white font-bold text-xl md:text-2xl">
                Smell Map Explorer 👃🗺️
              </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUploadForm(!showUploadForm)}
                className={`font-bold transition-colors duration-300 px-4 py-2 rounded-full ${
                  showUploadForm 
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {showUploadForm ? '❌ Cancel' : '➕ Add Smell'}
              </button>
              
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

      {/* Upload Form - Top Panel Below Header */}
      {showUploadForm && (
        <div className="relative z-10 bg-yellow-300 border-b-4 border-black shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Add New Smell Experience 👃</h2>
              <button
                onClick={() => {
                  setShowUploadForm(false);
                  // Clean up temp marker
                  if (window.tempMarker && leafletMapRef.current) {
                    leafletMapRef.current.removeLayer(window.tempMarker);
                    window.tempMarker = null;
                  }
                  // Reset form
                  setUploadData({
                    title: '',
                    description: '',
                    category: 'floral',
                    intensity: 5,
                    location: null,
                    address: ''
                  });
                }}
                className="text-black hover:text-red-600 font-bold text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-black mb-1">Smell Title *</label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                  className="w-full p-2 border-2 border-black rounded text-black"
                  placeholder="e.g., Coffee Shop Aroma"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-black mb-1">Description</label>
                <input
                  type="text"
                  value={uploadData.description}
                  onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                  className="w-full p-2 border-2 border-black rounded text-black"
                  placeholder="Describe the smell..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1">Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
                  className="w-full p-2 border-2 border-black rounded text-black"
                >
                  {SMELL_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1">Intensity: {uploadData.intensity}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={uploadData.intensity}
                  onChange={(e) => setUploadData({...uploadData, intensity: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-black mb-1">Address (Optional)</label>
                <input
                  type="text"
                  value={uploadData.address}
                  onChange={(e) => setUploadData({...uploadData, address: e.target.value})}
                  className="w-full p-2 border-2 border-black rounded text-black"
                  placeholder="e.g., Starbucks, Nanjing Road"
                />
              </div>

              <div className="text-sm text-black bg-orange-200 p-2 rounded border-2 border-black">
                📍 {uploadData.location 
                  ? `Selected: ${uploadData.location[0].toFixed(4)}, ${uploadData.location[1].toFixed(4)}` 
                  : 'Click on the map to select location *'}
              </div>

              <button
                type="submit"
                form="uploadForm"
                onClick={handleUploadSubmit}
                disabled={!uploadData.title || !uploadData.location}
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded border-2 border-black hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
              >
                Upload Smell Data 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main dashboard content - no need to adjust padding anymore */}
      <div className={`relative z-10 flex-1 p-6 grid grid-cols-12 grid-rows-12 gap-4 min-h-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Left panel - Charts */}
        <div className="col-span-2 row-span-12 bg-yellow-300 border-4 border-black rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b-4 border-black bg-orange-400">
            <h2 className="text-lg font-bold flex items-center space-x-2 text-black">
              <span>📊</span>
              <span>Smell Analytics</span>
            </h2>
          </div>
          <div className="flex-1 p-3 space-y-4 overflow-y-auto">
            <ChartComponent title="Categories 🏷️" type="category" categories={SMELL_CATEGORIES} />
            <ChartComponent title="Intensity Levels 💪" type="intensity" categories={['Light (1-4)', 'Medium (5-7)', 'Strong (8-10)']} />
          </div>
        </div>

        {/* Middle panel - Map */}
        <div className="col-span-7 row-span-12 bg-yellow-300 border-4 border-black rounded-lg shadow-2xl overflow-hidden relative">
          
          {showUploadForm && (
            <div className="absolute top-4 right-4 z-10 bg-yellow-400 border-2 border-black rounded-lg px-3 py-2 shadow-lg animate-pulse">
              <span className="text-xs font-bold text-black">
                👆 Click map to set location!<br/>
                {uploadData.location ? '✅ Location set!' : '❌ No location yet'}
              </span>
            </div>
          )}

          {!isMapReady ? (
            <div className="w-full h-full flex items-center justify-center bg-yellow-300">
              <div className="text-center text-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black mx-auto mb-4"></div>
                <p className="font-bold">Loading smell map... 👃🗺️</p>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />
          )}
        </div>

        {/* Right panel - Smell list and Details */}
        <div className="col-span-3 row-span-12 flex flex-col gap-4">
          {/* Smell list */}
          <div className="bg-yellow-300 border-4 border-black rounded-lg shadow-2xl flex flex-col overflow-hidden flex-1">
            <div className="bg-orange-400 px-4 py-3 border-b-4 border-black">
              <h3 className="text-sm font-bold flex items-center space-x-2 text-black">
                <span>👃</span>
                <span>Smell Experiences ({allSmells.length})</span>
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul>
                {currentSmellList.map((smell) => (
                  <li
                    key={smell.id}
                    onClick={() => handleSmellClick(smell.id)}
                    className="px-4 py-3 cursor-pointer text-sm transition-all duration-300 hover:scale-105 border-b-2 border-black font-medium"
                    style={{
                      backgroundColor: selectedSmellIds.has(smell.id) ? '#fcd71a' : '#ffeb3b',
                      color: 'black'
                    }}
                  >
                    <div className="font-bold">{smell.title}</div>
                    <div className="text-xs opacity-75">{smell.category} • {smell.intensity}/10</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Details panel */}
          {selectedSmell && (
            <div className="bg-yellow-300 border-4 border-black rounded-lg shadow-2xl p-4 flex-1">
              <h3 className="text-lg font-bold text-center mb-4 flex items-center justify-center space-x-2 text-black">
                <span>👃</span>
                <span>{selectedSmell.title}</span>
              </h3>

              <div className="space-y-3">
                <div className="rounded-lg p-4 border-2 border-black bg-orange-200">
                  <p className="text-sm flex items-center space-x-2 mb-2 text-black">
                    <span className="font-bold text-orange-600">📝 Description:</span>
                  </p>
                  <p className="text-sm mb-3 text-black italic">"{selectedSmell.description}"</p>

                  <p className="text-sm flex items-center space-x-2 mb-2 text-black">
                    <span className="font-bold text-orange-600">🏷️ Category:</span>
                    <span className="text-black capitalize">{selectedSmell.category}</span>
                  </p>

                  <p className="text-sm flex items-center space-x-2 mb-2 text-black">
                    <span className="font-bold text-orange-600">💪 Intensity:</span>
                    <span className="text-black">{selectedSmell.intensity}/10</span>
                  </p>

                  <p className="text-sm flex items-center space-x-2 mb-2 text-black">
                    <span className="font-bold text-orange-600">📍 Location:</span>
                    <span className="text-black">{selectedSmell.address}</span>
                  </p>

                  <p className="text-sm flex items-center space-x-2 mb-2 text-black">
                    <span className="font-bold text-orange-600">📅 Date:</span>
                    <span className="text-black">{selectedSmell.timestamp}</span>
                  </p>

                  <p className="text-sm flex items-center space-x-2 text-black">
                    <span className="font-bold text-orange-600">👤 By:</span>
                    <span className="text-black">{selectedSmell.contributor}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubPage1;