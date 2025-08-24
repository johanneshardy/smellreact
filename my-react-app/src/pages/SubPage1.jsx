import { useState, useEffect, useRef } from 'react';
import { smellService } from '../services/smellService';

// Import Leaflet locally
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons (Leaflet bundling issue)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configure default marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const SubPage1 = ({ onNavigate }) => {
  const [selectedSmellIds, setSelectedSmellIds] = useState(new Set());
  const [allSmells, setAllSmells] = useState([]);
  const [currentSmellList, setCurrentSmellList] = useState([]);
  const [selectedSmell, setSelectedSmell] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  // Database states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [mapError, setMapError] = useState(null);
  
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: 'nature',
    intensity: 5,
    location: null,
    address: '',
    author: ''
  });

  const [editingSmell, setEditingSmell] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: 'nature',
    intensity: 5,
    location: null,
    address: '',
    contributor: ''
  });

  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  const unsubscribeRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sample smell data (fallback)
  const sampleSmells = [
    { 
      id: 'sample-0', 
      title: "Rose Garden Café", 
      description: "Beautiful rose aroma mixed with coffee", 
      category: "nature", 
      intensity: 7, 
      location: [31.2304, 121.4737], 
      address: "People's Square, Shanghai",
      timestamp: "2024-01-15",
      contributor: "Alice"
    },
    { 
      id: 'sample-1', 
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
      id: 'sample-2', 
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
      id: 'sample-3', 
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
      id: 'sample-4', 
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
      id: 'sample-5', 
      title: "Jasmine Tea House", 
      description: "Delicate jasmine flower tea", 
      category: "nature", 
      intensity: 5, 
      location: [31.2260, 121.4903], 
      address: "Yu Garden, Shanghai",
      timestamp: "2024-01-10",
      contributor: "Frank"
    }
  ];

  // Load data from Firebase with real-time updates
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      setConnectionStatus('connecting');
      
      try {
        console.log("🔄 Loading smell data from Firebase...");
        const smells = await smellService.getAllSmells();
        
        if (smells.length > 0) {
          console.log(`✅ Loaded ${smells.length} smells from Firebase`);
          setAllSmells(smells);
          setCurrentSmellList(smells);
          setSelectedSmell(smells[0]);
          setConnectionStatus('connected');
        } else {
          console.log('📝 No data found, using sample data');
          setAllSmells(sampleSmells);
          setCurrentSmellList(sampleSmells);
          setSelectedSmell(sampleSmells[0]);
          setConnectionStatus('connected');
        }
        
        setError(null);
      } catch (err) {
        console.error('❌ Failed to load data:', err);
        setError('Failed to connect to database. Using offline data.');
        setConnectionStatus('offline');
        
        // Fallback to sample data
        setAllSmells(sampleSmells);
        setCurrentSmellList(sampleSmells);
        setSelectedSmell(sampleSmells[0]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();

    // Set up real-time listener
    try {
      const unsubscribe = smellService.subscribeToSmells((smells) => {
        console.log("🔄 Real-time update received");
        setAllSmells(smells);
        setCurrentSmellList(smells);
        if (smells.length > 0 && !selectedSmell) {
          setSelectedSmell(smells[0]);
        }
        setConnectionStatus('connected');
        setError(null);
      });
      
      unsubscribeRef.current = unsubscribe;
    } catch (err) {
      console.error('❌ Failed to set up real-time listener:', err);
      setConnectionStatus('offline');
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const SMELL_CATEGORIES = [
    { id: 'nature', name: 'Nature', icon: '🌿', color: 'bg-green-100 text-green-800' },
    { id: 'animal', name: 'Animal', icon: '🐾', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'food', name: 'Food', icon: '🍯', color: 'bg-orange-100 text-orange-800' },
    { id: 'urban', name: 'Urban', icon: '🏙️', color: 'bg-blue-100 text-blue-800' },
    { id: 'human', name: 'Human Activity', icon: '👥', color: 'bg-purple-100 text-purple-800' },
    { id: 'chemical', name: 'Chemical', icon: '🧪', color: 'bg-red-100 text-red-800' },
    { id: 'other', name: 'Other', icon: '🔮', color: 'bg-gray-100 text-gray-800' }
  ];
  const CATEGORY_COLORS = {
    'nature': '#32cd32',
    'animal': '#ffd700',
    'food': '#ff8c00',
    'urban': '#708090',
    'human': '#9932cc',
    'chemical': '#dc143c',
    'other': '#9370db'
  };

  // Initialize Leaflet map (much simpler now!)
  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current && !isLoading) {
      try {
        console.log("🗺️ Creating Leaflet map...");
        
        // Clear any existing content
        mapRef.current.innerHTML = '';
        
        // Create map
        const map = L.map(mapRef.current, {
          zoomControl: true,
          attributionControl: true
        });
        
        // Set view to Shanghai
        map.setView([31.2304, 121.4737], 11);
        
        // Add tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 20
        }).addTo(map);
        
        // Style the map container
        mapRef.current.style.height = '100%';
        mapRef.current.style.width = '100%';
        mapRef.current.style.borderRadius = '16px';
        mapRef.current.style.overflow = 'hidden';
        
        leafletMapRef.current = map;
        setMapError(null);
        
        console.log("✅ Map created successfully!");
        
        // Force resize after creation
        setTimeout(() => {
          if (leafletMapRef.current) {
            leafletMapRef.current.invalidateSize();
          }
        }, 100);

      } catch (error) {
        console.error('❌ Error creating map:', error);
        setMapError(`Map creation failed: ${error.message}`);
      }
    }

    return () => {
      if (leafletMapRef.current) {
        console.log("🗺️ Cleaning up map...");
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [isLoading]); // Only depend on isLoading

  // Handle map click for location selection and view reset
  useEffect(() => {
    if (leafletMapRef.current) {
      // Remove existing click handlers
      leafletMapRef.current.off('click');
      
      const handleMapClick = (e) => {
        if (showUploadForm) {
          // Handle location selection for upload form
          const newLocation = [e.latlng.lat, e.latlng.lng];
          console.log("📍 Location selected:", newLocation);
          
          setUploadData(prev => ({
            ...prev,
            location: newLocation
          }));
          
          // Remove existing temp marker
          if (window.tempMarker) {
            leafletMapRef.current.removeLayer(window.tempMarker);
          }
          
          // Add new temp marker
          window.tempMarker = L.circleMarker(newLocation, {
            radius: 15,
            fillColor: '#fcd71a',
            color: '#000000',
            weight: 4,
            opacity: 1,
            fillOpacity: 0.9
          }).addTo(leafletMapRef.current);
          
          window.tempMarker.bindPopup("📍 New smell location selected!").openPopup();
        } else {
          // Reset view when clicking on empty map area
          setSelectedSmell(null);
          setSelectedSmellIds(new Set());
          setCurrentSmellList(allSmells);
          if (leafletMapRef.current) {
            leafletMapRef.current.setView([31.2304, 121.4737], 11, { animate: true });
          }
        }
      };
      
      leafletMapRef.current.on('click', handleMapClick);
      
      // Clean up temp marker when upload form closes
      if (!showUploadForm && window.tempMarker) {
        leafletMapRef.current.removeLayer(window.tempMarker);
        window.tempMarker = null;
      }
    }
  }, [showUploadForm, allSmells]);

  // Update markers when smells change
  useEffect(() => {
    if (leafletMapRef.current && allSmells.length > 0) {
      console.log(`🗺️ Updating ${allSmells.length} markers on map`);
      
      // Clear existing markers
      markersRef.current.forEach(marker => {
        try {
          leafletMapRef.current.removeLayer(marker);
        } catch (e) {
          console.warn('Error removing marker:', e);
        }
      });
      markersRef.current = [];

      // Add new markers
      allSmells.forEach(smell => {
        if (smell.location && Array.isArray(smell.location) && smell.location.length === 2) {
          try {
            const isSelected = selectedSmellIds.has(smell.id);
            const categoryColor = CATEGORY_COLORS[smell.category] || '#9370db';

            const marker = L.circleMarker(smell.location, {
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
          } catch (error) {
            console.warn('Error adding marker for smell:', smell.title, error);
          }
        }
      });

      console.log(`✅ Added ${markersRef.current.length} markers to map`);
    }
  }, [allSmells, selectedSmellIds]);

  const handleSmellClick = (smellId) => {
    console.log("👃 Smell clicked:", smellId);
    const newSelection = new Set([smellId]);
    setSelectedSmellIds(newSelection);
    const smell = allSmells.find(s => s.id === smellId);
    setSelectedSmell(smell);
    setCurrentSmellList([smell]);

    if (smell.location && leafletMapRef.current) {
      leafletMapRef.current.setView(smell.location, 15, { animate: true });
    }
  };

  // Upload submit with Firebase
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadData.title || !uploadData.location) {
      alert('Please fill in the title and click on the map to select a location!');
      return;
    }

    setIsUploading(true);
    
    try {
      console.log("📤 Uploading new smell data...");
      
      const newSmellData = {
        title: uploadData.title,
        description: uploadData.description,
        category: uploadData.category || 'nature',
        intensity: uploadData.intensity,
        location: uploadData.location,
        address: uploadData.address || `Lat: ${uploadData.location[0].toFixed(4)}, Lng: ${uploadData.location[1].toFixed(4)}`,
        contributor: uploadData.author || "Anonymous"
      };
      
      await smellService.addSmell(newSmellData);
      
      console.log("✅ Smell data uploaded successfully!");
      
      // Clean up
      setShowUploadForm(false);
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
        address: '',
        author: ''
      });
      
      alert('Smell data uploaded successfully! 👃✨');
      
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert(`Failed to upload smell data: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (smell) => {
    setEditingSmell(smell);
    setEditForm({
      title: smell.title,
      description: smell.description,
      category: smell.category,
      intensity: smell.intensity,
      location: [smell.latitude, smell.longitude],
      address: smell.address,
      contributor: smell.contributor
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await smellService.updateSmell(editingSmell.id, editForm);
      // Fetch fresh data from the server
      const updatedSmells = await smellService.getAllSmells();
      setAllSmells(updatedSmells);
      setCurrentSmellList(updatedSmells);
      setSelectedSmell(null);
      setSelectedSmellIds(new Set());
      setEditingSmell(null);
      setEditForm({
        title: '',
        description: '',
        category: 'nature',
        intensity: 5,
        location: null,
        address: '',
        contributor: ''
      });
    } catch (error) {
      console.error('Error updating smell:', error);
      setError('Failed to update smell. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this smell experience?')) {
      try {
        setIsLoading(true);
        await smellService.deleteSmell(id);
        const updatedSmells = await smellService.getAllSmells();
        setAllSmells(updatedSmells);
        setCurrentSmellList(updatedSmells);
        setSelectedSmell(null);
        setSelectedSmellIds(new Set());
      } catch (error) {
        console.error('Error deleting smell:', error);
        setError('Failed to delete smell. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderChart = (type, categories) => {
    const data = {};

    allSmells.forEach(smell => {
      let category;
      if (type === 'category') {
        const cat = categories.find(c => c.id === (smell.category || 'other'));
        category = cat ? cat.name : 'Other';
      } else if (type === 'intensity') {
        category = smell.intensity >= 8 ? 'Strong (8-10)' : 
                  smell.intensity >= 5 ? 'Medium (5-7)' : 'Light (1-4)';
      }

      if (!data[category]) data[category] = [];
      data[category].push(smell);
    });

    return { data, categories: type === 'category' 
      ? categories.filter(cat => data[cat.name]).map(cat => cat.name)
      : categories.filter(cat => data[cat]) };
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

  // Connection status indicator
  const ConnectionStatus = () => {
    const statusConfig = {
      connecting: { color: '#fbbf24', icon: '🔄', text: 'Connecting...' },
      connected: { color: '#10b981', icon: '✅', text: 'Connected' },
      offline: { color: '#ef4444', icon: '⚠️', text: 'Offline' }
    };
    
    const config = statusConfig[connectionStatus] || statusConfig.offline;
    
    return (
      <div className="flex items-center space-x-2 text-white text-sm">
        <span>{config.icon}</span>
        <span>{config.text}</span>
      </div>
    );
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#fcd71a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-black mb-2">Loading Smell Map... 👃</h2>
          <p className="text-black">Initializing map and data...</p>
        </div>
      </div>
    );
  }

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

            {/* Page Title with Connection Status */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-white font-bold text-xl md:text-2xl mb-1">
                Smell Map Explorer 👃🗺️
              </h1>
              <ConnectionStatus />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUploadForm(!showUploadForm)}
                disabled={isUploading}
                className={`font-bold transition-colors duration-300 px-4 py-2 rounded-full ${
                  showUploadForm 
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUploading ? '⏳ Uploading...' : showUploadForm ? '❌ Cancel' : '➕ Add Smell'}
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
        
        {/* Error Banner */}
        {(error || mapError) && (
          <div className="bg-red-500 text-white text-center py-2 px-4">
            <span className="font-medium">⚠️ {error || mapError}</span>
          </div>
        )}
      </header>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="relative z-10 bg-yellow-300 border-b-4 border-black shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Add New Smell Experience 👃</h2>
              <button
                onClick={() => {
                  setShowUploadForm(false);
                  if (window.tempMarker && leafletMapRef.current) {
                    leafletMapRef.current.removeLayer(window.tempMarker);
                    window.tempMarker = null;
                  }
                  setUploadData({
                    title: '',
                    description: '',
                    category: 'nature',
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
                  disabled={isUploading}
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
                  disabled={isUploading}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-black mb-1">Author</label>
                <input
                  type="text"
                  value={uploadData.author}
                  onChange={(e) => setUploadData({...uploadData, author: e.target.value})}
                  className="w-full p-2 border-2 border-black rounded text-black"
                  placeholder="Your name (optional)"
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1">Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
                  className="w-full p-2 border-2 border-black rounded text-black"
                  disabled={isUploading}
                >
                  {SMELL_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
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
                  disabled={isUploading}
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
                  disabled={isUploading}
                />
              </div>

              <div className="text-sm text-black bg-orange-200 p-2 rounded border-2 border-black">
                📍 {uploadData.location 
                  ? `Selected: ${uploadData.location[0].toFixed(4)}, ${uploadData.location[1].toFixed(4)}` 
                  : 'Click on the map to select location *'}
              </div>

              <button
                type="submit"
                onClick={handleUploadSubmit}
                disabled={!uploadData.title || !uploadData.location || isUploading}
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded border-2 border-black hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isUploading ? '⏳ Uploading...' : 'Upload Smell Data 🚀'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main dashboard content */}
      <div className={`relative z-10 flex-1 p-6 grid grid-cols-12 grid-rows-12 gap-4 min-h-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Left panel - Charts */}
        <div className="col-span-2 row-span-12 bg-yellow-300 border-4 border-black rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b-4 border-black bg-orange-400">
            <h2 className="text-lg font-bold flex items-center space-x-2 text-black">
              <span>📊</span>
              <span>Smell Analytics</span>
            </h2>
            <div className="text-xs text-black mt-1">
              Total: {allSmells.length} smells
            </div>
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

          {/* Map Container */}
          <div className="w-full h-full relative">
            {mapError ? (
              <div className="w-full h-full flex items-center justify-center bg-yellow-300">
                <div className="text-center text-black max-w-md p-6">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="font-bold text-lg mb-2">Map Error</h3>
                  <p className="text-sm mb-4">{mapError}</p>
                  <button
                    onClick={() => {
                      setMapError(null);
                      window.location.reload();
                    }}
                    className="bg-orange-500 text-white px-4 py-2 rounded border-2 border-black hover:bg-orange-600 font-bold"
                  >
                    🔄 Reload Page
                  </button>
                </div>
              </div>
            ) : (
              <div 
                ref={mapRef} 
                className="w-full h-full"
                style={{ 
                  minHeight: '400px',
                  background: '#f0f0f0'
                }}
              />
            )}
          </div>
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
              {connectionStatus === 'connected' && (
                <div className="text-xs text-black mt-1">🔄 Live updates</div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              {currentSmellList.length === 0 ? (
                <div className="p-4 text-center text-black">
                  <div className="text-4xl mb-2">👃</div>
                  <p className="font-bold">No smells yet!</p>
                  <p className="text-sm">Add your first smell experience</p>
                </div>
              ) : (
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
                      <div className="text-xs opacity-60">by {smell.contributor}</div>
                    </li>
                  ))}
                </ul>
              )}
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

                {/* Edit and Delete buttons */}
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleEditClick(selectedSmell)}
                    className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded border-2 border-black hover:bg-blue-600 transition-colors duration-300"
                  >
                    ✏️ Edit Smell
                  </button>

                  <button
                    onClick={() => handleDeleteClick(selectedSmell.id)}
                    className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded border-2 border-black hover:bg-red-600 transition-colors duration-300"
                  >
                    🗑️ Delete Smell
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingSmell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Smell Experience</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
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
                  {SMELL_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Intensity (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editForm.intensity}
                  onChange={(e) => setEditForm({ ...editForm, intensity: parseInt(e.target.value, 10) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingSmell(null)}
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
    </div>
  );
};

export default SubPage1;