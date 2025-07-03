import React, { useState, useEffect, useRef } from 'react';

// Dynamically load Leaflet if not already loaded
const loadLeaflet = () => {
  return new Promise((resolve, reject) => {
    // Check if Leaflet is already loaded
    if (typeof window !== 'undefined' && window.L) {
      resolve(window.L);
      return;
    }

    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';
      document.head.appendChild(cssLink);
    }

    // Load Leaflet JS
    if (!document.querySelector('script[src*="leaflet"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => resolve(window.L);
      script.onerror = reject;
      document.head.appendChild(script);
    } else {
      // Script exists but might not be loaded yet
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
  const [selectedItemIds, setSelectedItemIds] = useState(new Set());
  const [allItems, setAllItems] = useState([]);
  const [currentWorkList, setCurrentWorkList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMapReady, setIsMapReady] = useState(false);
  const [leafletLib, setLeafletLib] = useState(null);
  
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

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

  // Enhanced mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sample data with Shanghai locations and coordinates
  const sampleItems = [
    { id: 0, name: "《上海博物馆藏颜真卿书法》", calligraphyStyle: "楷书", temporal: "唐", stele: { temporal: "唐" }, authors: [{ id: 1, author: "颜真卿", role: "书" }], location: [31.2304, 121.4737], city: "上海博物馆", district: "黄浦区" },
    { id: 1, name: "《中华艺术宫王羲之拓本》", calligraphyStyle: "行书", temporal: "晋", stele: { temporal: "晋" }, authors: [{ id: 2, author: "王羲之", role: "书" }], location: [31.1755, 121.4977], city: "中华艺术宫", district: "浦东新区" },
    { id: 2, name: "《复旦大学图书馆石门颂》", calligraphyStyle: "隶书", temporal: "汉", stele: { temporal: "汉" }, authors: [{ id: 3, author: "佚名", role: "书" }], location: [31.2989, 121.5015], city: "复旦大学", district: "杨浦区" },
    { id: 3, name: "《上海图书馆古籍部张迁碑》", calligraphyStyle: "隶书", temporal: "汉", stele: { temporal: "汉" }, authors: [{ id: 4, author: "佚名", role: "书" }], location: [31.2252, 121.4450], city: "上海图书馆", district: "徐汇区" },
    { id: 4, name: "《华东师范大学多宝塔碑》", calligraphyStyle: "楷书", temporal: "唐", stele: { temporal: "唐" }, authors: [{ id: 5, author: "颜真卿", role: "书" }], location: [31.2303, 121.4067], city: "华东师大", district: "普陀区" },
    { id: 5, name: "《豫园古迹泰山刻石》", calligraphyStyle: "篆书", temporal: "秦", stele: { temporal: "秦" }, authors: [{ id: 6, author: "李斯", role: "书" }], location: [31.2260, 121.4903], city: "豫园", district: "黄浦区" },
    { id: 6, name: "《龙华寺祭侄文稿》", calligraphyStyle: "行书", temporal: "唐", stele: { temporal: "唐" }, authors: [{ id: 7, author: "颜真卿", role: "书" }], location: [31.1628, 121.4478], city: "龙华寺", district: "徐汇区" },
    { id: 7, name: "《上海交大苏轼寒食诗帖》", calligraphyStyle: "行书", temporal: "宋", stele: { temporal: "宋" }, authors: [{ id: 8, author: "苏轼", role: "书" }], location: [31.0252, 121.4337], city: "上海交大", district: "闵行区" },
    { id: 8, name: "《朱家角古镇兰亭序》", calligraphyStyle: "行书", temporal: "晋", stele: { temporal: "晋" }, authors: [{ id: 2, author: "王羲之", role: "书" }], location: [31.1045, 121.0533], city: "朱家角", district: "青浦区" },
    { id: 9, name: "《静安寺大字报石刻》", calligraphyStyle: "楷书", temporal: "明", stele: { temporal: "明" }, authors: [{ id: 9, author: "董其昌", role: "书" }], location: [31.2196, 121.4451], city: "静安寺", district: "静安区" },
    { id: 10, name: "《新天地石库门题字》", calligraphyStyle: "行书", temporal: "清", stele: { temporal: "清" }, authors: [{ id: 10, author: "金农", role: "书" }], location: [31.2223, 121.4717], city: "新天地", district: "黄浦区" },
    { id: 11, name: "《同济大学建筑系收藏》", calligraphyStyle: "草书", temporal: "明", stele: { temporal: "明" }, authors: [{ id: 11, author: "祝允明", role: "书" }], location: [31.2818, 121.5081], city: "同济大学", district: "杨浦区" }
  ];

  const DYNASTY_ORDER = ['秦', '汉', '魏', '晋', '南北朝', '隋', '唐', '五代', '宋', '辽', '金', '元', '明', '清', '民国', '现代', '未知'];
  const FONT_ORDER = ['篆书', '隶书', '草书', '行书', '楷书', '未知'];

  // Initialize Leaflet map with detailed Shanghai view
  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current && isMapReady && leafletLib) {
      try {
        // Initialize the map centered on Shanghai with higher zoom
        leafletMapRef.current = leafletLib.map(mapRef.current, {
          zoomControl: true,
          attributionControl: true
        }).setView([31.2304, 121.4737], 11); // Center on Shanghai with detailed zoom

        // Add multiple tile layers for better detail
        const osmLayer = leafletLib.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
          opacity: 0.7
        });

        const cartoLayer = leafletLib.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 20
        });

        // Use the dark theme layer by default
        cartoLayer.addTo(leafletMapRef.current);

        // Add layer control
        const baseMaps = {
          "Dark Theme": cartoLayer,
          "Street Map": osmLayer
        };
        leafletLib.control.layers(baseMaps).addTo(leafletMapRef.current);

        // Add Shanghai districts overlay
        const shanghaiDistricts = {
          "黄浦区": [31.2304, 121.4737],
          "徐汇区": [31.1880, 121.4371],
          "长宁区": [31.2204, 121.4244],
          "静安区": [31.2290, 121.4483],
          "普陀区": [31.2495, 121.3957],
          "虹口区": [31.2646, 121.5059],
          "杨浦区": [31.2590, 121.5177],
          "浦东新区": [31.2443, 121.5967],
          "闵行区": [31.1129, 121.3824],
          "宝山区": [31.4047, 121.4890],
          "嘉定区": [31.3765, 121.2655],
          "青浦区": [31.1518, 121.1226],
          "松江区": [31.0322, 121.2275],
          "金山区": [30.7417, 121.3421],
          "奉贤区": [30.9180, 121.4748],
          "崇明区": [31.6225, 121.3972]
        };

        // Add district labels
        Object.entries(shanghaiDistricts).forEach(([district, coords]) => {
          leafletLib.marker(coords, {
            icon: leafletLib.divIcon({
              className: 'district-label',
              html: `<div style="background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(4px);">${district}</div>`,
              iconSize: [60, 20],
              iconAnchor: [30, 10]
            })
          }).addTo(leafletMapRef.current);
        });

        // Style the map container
        mapRef.current.style.borderRadius = '12px';
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

  // Update markers when items change
  useEffect(() => {
    if (leafletMapRef.current && leafletLib && allItems.length > 0) {
      // Clear existing markers
      markersRef.current.forEach(marker => leafletMapRef.current.removeLayer(marker));
      markersRef.current = [];

      // Add new markers with enhanced styling for Shanghai locations
      allItems.forEach(item => {
        if (item.location) {
          const isSelected = selectedItemIds.has(item.id);
          
          // Create custom icon based on calligraphy style
          const getMarkerColor = (style) => {
            switch(style) {
              case '篆书': return '#8b5cf6'; // Purple
              case '隶书': return '#059669'; // Green  
              case '行书': return '#dc2626'; // Red
              case '楷书': return '#2563eb'; // Blue
              case '草书': return '#ea580c'; // Orange
              default: return '#6b7280'; // Gray
            }
          };

          const marker = leafletLib.circleMarker(item.location, {
            radius: isSelected ? 15 : 10,
            fillColor: isSelected ? '#fbbf24' : getMarkerColor(item.calligraphyStyle),
            color: 'white',
            weight: 3,
            opacity: 1,
            fillOpacity: isSelected ? 0.9 : 0.8
          }).addTo(leafletMapRef.current);

          // Enhanced popup with more Shanghai-specific details
          marker.bindPopup(`
            <div style="font-family: 'Inter', sans-serif; max-width: 280px; color: #374151;">
              <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">
                ${item.name}
              </h4>
              <div style="margin-bottom: 12px; padding: 8px; background: #f3f4f6; border-radius: 6px;">
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #4b5563;">
                  <strong style="color: #1f2937;">📍 位置:</strong> ${item.city}
                </p>
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #4b5563;">
                  <strong style="color: #1f2937;">🏛️ 区域:</strong> ${item.district}
                </p>
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #4b5563;">
                  <strong style="color: #1f2937;">✍️ 书体:</strong> 
                  <span style="background: ${getMarkerColor(item.calligraphyStyle)}; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: 600;">
                    ${item.calligraphyStyle}
                  </span>
                </p>
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #4b5563;">
                  <strong style="color: #1f2937;">🏮 朝代:</strong> ${item.temporal}
                </p>
                ${item.authors ? `
                  <p style="margin: 0; font-size: 13px; color: #4b5563;">
                    <strong style="color: #1f2937;">👨‍🎨 作者:</strong> ${item.authors.map(a => `${a.author} (${a.role})`).join('、')}
                  </p>
                ` : ''}
              </div>
              <div style="text-align: center;">
                <button onclick="window.selectItem && window.selectItem(${item.id})" 
                        style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                  查看详情
                </button>
              </div>
            </div>
          `, {
            maxWidth: 300,
            className: 'custom-popup'
          });

          // Add click handler
          marker.on('click', () => {
            handleItemClick(item.id);
          });

          // Add hover effects
          marker.on('mouseover', function() {
            this.setStyle({
              radius: isSelected ? 18 : 13,
              weight: 4
            });
          });

          marker.on('mouseout', function() {
            this.setStyle({
              radius: isSelected ? 15 : 10,
              weight: 3
            });
          });

          markersRef.current.push(marker);
        }
      });

      // Add global function for popup buttons
      window.selectItem = (itemId) => {
        handleItemClick(itemId);
      };
    }
  }, [allItems, selectedItemIds, leafletLib]);

  useEffect(() => {
    setAllItems(sampleItems);
    setCurrentWorkList(sampleItems);
    setSelectedItem(sampleItems[0]);
  }, []);

  const renderChart = (type, categories) => {
    const data = {};
    
    sampleItems.forEach(item => {
      let category;
      if (type === 'font') {
        category = item.calligraphyStyle || '未知';
      } else if (type === 'stele') {
        category = item.stele?.temporal || '未知';
      } else {
        category = item.temporal || '未知';
      }
      
      if (!data[category]) data[category] = [];
      data[category].push(item);
    });

    return { data, categories: categories.filter(cat => data[cat]) };
  };

  const handleItemClick = (itemId) => {
    const newSelection = new Set([itemId]);
    setSelectedItemIds(newSelection);
    const item = allItems.find(i => i.id === itemId);
    setSelectedItem(item);
    setCurrentWorkList([item]);

    // Center map on selected item
    if (item.location && leafletMapRef.current) {
      leafletMapRef.current.setView(item.location, 8, { animate: true });
    }
  };

  const ChartComponent = ({ title, type, categories }) => {
    const chartData = renderChart(type, categories);
    
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-4 h-64">
        <h3 className="text-sm font-semibold text-white mb-3 text-center border-b border-white/20 pb-2">
          {title}
        </h3>
        <div className="h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
          {chartData.categories.map((category, categoryIndex) => (
            <div key={category} className="mb-3">
              <div className="text-xs text-white/80 mb-2 font-medium">{category}</div>
              <div className="flex flex-wrap gap-1.5">
                {chartData.data[category]?.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-5 h-5 rounded-full border-2 border-white/30 shadow-lg transition-all duration-300 hover:scale-110 transform-gpu ${
                      selectedItemIds.has(item.id) 
                        ? 'bg-amber-400 shadow-amber-400/50 animate-pulse' 
                        : 'bg-blue-400 hover:bg-blue-300 hover:shadow-blue-400/50'
                    }`}
                    title={item.name}
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
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex flex-col relative overflow-hidden">
      {/* Animated background effects matching homepage */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 via-transparent to-purple-800/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 animate-pulse"></div>
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl transition-all duration-[3000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px)`,
            top: '10%',
            right: '10%'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-8 blur-2xl transition-all duration-[4000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, #34d399 0%, #60a5fa 50%, #a78bfa 100%)',
            transform: `translate(-${mousePosition.x * 0.3}px, ${mousePosition.y * 0.4}px)`,
            bottom: '15%',
            left: '15%'
          }}
        />
      </div>

      {/* Navigation header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <button 
          onClick={() => onNavigate('home')}
          className="group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:shadow-xl border border-white/30 hover:border-white/50"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium text-sm">Back to Home</span>
        </button>
        
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200">
          Ancient Stones Dashboard
        </h1>
        
        <div className="w-12"></div>
      </div>

      {/* Main dashboard content */}
      <div className="relative z-10 flex-1 p-6 grid grid-cols-12 grid-rows-12 gap-4 min-h-0">
        
        {/* Left panel - Charts */}
        <div className="col-span-2 row-span-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/20">
            <h2 className="text-lg font-semibold text-white">Statistics</h2>
          </div>
          <div className="flex-1 p-3 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
            <ChartComponent title="字体统计" type="font" categories={FONT_ORDER} />
            <ChartComponent title="碑刻立朝代" type="stele" categories={DYNASTY_ORDER} />
            <ChartComponent title="帖拓印朝代" type="print" categories={DYNASTY_ORDER} />
          </div>
        </div>

        {/* Middle panel - Leaflet Map */}
        <div className="col-span-7 row-span-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden relative">
          {!isMapReady ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white/70">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading map...</p>
              </div>
            </div>
          ) : (
            <div 
              ref={mapRef} 
              className="w-full h-full"
              style={{ minHeight: '400px' }}
            />
          )}
        </div>

        {/* Top right - Work list */}
        <div className="col-span-3 row-span-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-slate-800/60 backdrop-blur-sm text-white px-4 py-3 rounded-t-2xl border-b border-white/20">
            <h3 className="text-sm font-semibold">作品列表</h3>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
            <ul className="divide-y divide-white/10">
              {currentWorkList.map((work) => (
                <li
                  key={work.id}
                  onClick={() => handleItemClick(work.id)}
                  className={`px-4 py-3 cursor-pointer text-sm transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${
                    selectedItemIds.has(work.id)
                      ? 'bg-amber-400/20 text-amber-200 backdrop-blur-sm'
                      : 'hover:bg-blue-500/20 hover:text-blue-200 text-white/80'
                  }`}
                >
                  {work.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom right - Details */}
        <div className="col-span-3 row-span-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/20">
            <h3 className="text-lg font-bold text-white text-center border-b border-white/20 pb-2 mb-4">
              {selectedItem ? `《${selectedItem.name}》` : 'Select an Item'}
            </h3>
          </div>
          
          {selectedItem && (
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
              <div className="space-y-4">
                {/* Image placeholder with glass effect */}
                <div className="w-full h-48 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-dashed border-white/30 flex items-center justify-center">
                  <div className="text-center text-white/70">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Image placeholder</p>
                  </div>
                </div>

                {/* Item details with glass morphism */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 space-y-2">
                  {selectedItem.authors && (
                    <p className="text-sm text-white/90">
                      <span className="font-semibold text-amber-200">作者:</span>{' '}
                      <span className="text-blue-200">
                        {selectedItem.authors.map(a => `${a.author} (${a.role})`).join('、')}
                      </span>
                    </p>
                  )}
                  
                  {selectedItem.calligraphyStyle !== "unknown" && (
                    <p className="text-sm text-white/90">
                      <span className="font-semibold text-amber-200">书体:</span>{' '}
                      <span className="text-blue-200">{selectedItem.calligraphyStyle}</span>
                    </p>
                  )}
                  
                  {selectedItem.temporal !== "unknown" && (
                    <p className="text-sm text-white/90">
                      <span className="font-semibold text-amber-200">朝代:</span>{' '}
                      <span className="text-blue-200">{selectedItem.temporal}</span>
                    </p>
                  )}

                  {selectedItem.city && (
                    <p className="text-sm text-white/90">
                      <span className="font-semibold text-amber-200">位置:</span>{' '}
                      <span className="text-blue-200">{selectedItem.city}</span>
                    </p>
                  )}

                  {selectedItem.district && (
                    <p className="text-sm text-white/90">
                      <span className="font-semibold text-amber-200">区域:</span>{' '}
                      <span className="text-blue-200">{selectedItem.district}</span>
                    </p>
                  )}
                </div>

                {/* Content section */}
                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-semibold text-amber-200 mb-3">帖详细</h4>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 max-h-32 overflow-y-auto text-sm text-white/80 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                    <p className="mb-2">
                      <span className="text-amber-200 font-medium">收藏机构:</span> {selectedItem.city}
                    </p>
                    <p className="mb-2">
                      <span className="text-amber-200 font-medium">所在区域:</span> {selectedItem.district}
                    </p>
                    <p className="mb-2">
                      <span className="text-amber-200 font-medium">书法特色:</span> 
                      {selectedItem.calligraphyStyle === '篆书' && ' 古朴庄重，笔画匀称，具有较强的装饰性'}
                      {selectedItem.calligraphyStyle === '隶书' && ' 蚕头燕尾，波磔分明，结体扁方'}
                      {selectedItem.calligraphyStyle === '行书' && ' 流畅自然，介于楷草之间，实用性强'}
                      {selectedItem.calligraphyStyle === '楷书' && ' 端正工整，笔画清晰，法度严谨'}
                      {selectedItem.calligraphyStyle === '草书' && ' 笔画连绵，变化丰富，意境深远'}
                    </p>
                    <p>
                      <span className="text-amber-200 font-medium">历史价值:</span> 
                      该作品具有重要的书法艺术价值和历史文献价值，是研究{selectedItem.temporal}代书法艺术的珍贵资料。
                    </p>
                  </div>
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