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
  const [selectedItemIds, setSelectedItemIds] = useState(new Set());
  const [allItems, setAllItems] = useState([]);
  const [currentWorkList, setCurrentWorkList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [leafletLib, setLeafletLib] = useState(null);
  const [floatingElements, setFloatingElements] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  // Generate floating elements like homepage
  useEffect(() => {
    const elements = [];
    const nudeColors = ['#C9A96E', '#B5A082', '#8B7355', '#A0916C', '#D4C4A8', '#E6D7C3'];
    for (let i = 0; i < 8; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 8,
        color: nudeColors[Math.floor(Math.random() * nudeColors.length)],
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2
      });
    }
    setFloatingElements(elements);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
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

  // Sample data
  const sampleItems = [
    { id: 0, name: "《上海博物馆藏颜真卿书法》", calligraphyStyle: "楷书", temporal: "唐", stele: { temporal: "唐" }, authors: [{ id: 1, author: "颜真卿", role: "书" }], location: [31.2304, 121.4737], city: "上海博物馆", district: "黄浦区" },
    { id: 1, name: "《中华艺术宫王羲之拓本》", calligraphyStyle: "行书", temporal: "晋", stele: { temporal: "晋" }, authors: [{ id: 2, author: "王羲之", role: "书" }], location: [31.1755, 121.4977], city: "中华艺术宫", district: "浦东新区" },
    { id: 2, name: "《复旦大学图书馆石门颂》", calligraphyStyle: "隶书", temporal: "汉", stele: { temporal: "汉" }, authors: [{ id: 3, author: "佚名", role: "书" }], location: [31.2989, 121.5015], city: "复旦大学", district: "杨浦区" },
    { id: 3, name: "《上海图书馆古籍部张迁碑》", calligraphyStyle: "隶书", temporal: "汉", stele: { temporal: "汉" }, authors: [{ id: 4, author: "佚名", role: "书" }], location: [31.2252, 121.4450], city: "上海图书馆", district: "徐汇区" },
    { id: 4, name: "《华东师范大学多宝塔碑》", calligraphyStyle: "楷书", temporal: "唐", stele: { temporal: "唐" }, authors: [{ id: 5, author: "颜真卿", role: "书" }], location: [31.2303, 121.4067], city: "华东师大", district: "普陀区" },
    { id: 5, name: "《豫园古迹泰山刻石》", calligraphyStyle: "篆书", temporal: "秦", stele: { temporal: "秦" }, authors: [{ id: 6, author: "李斯", role: "书" }], location: [31.2260, 121.4903], city: "豫园", district: "黄浦区" }
  ];

  const DYNASTY_ORDER = ['秦', '汉', '魏', '晋', '南北朝', '隋', '唐', '五代', '宋', '辽', '金', '元', '明', '清', '民国', '现代', '未知'];
  const FONT_ORDER = ['篆书', '隶书', '草书', '行书', '楷书', '未知'];

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

  // Update markers when items change
  useEffect(() => {
    if (leafletMapRef.current && leafletLib && allItems.length > 0) {
      markersRef.current.forEach(marker => leafletMapRef.current.removeLayer(marker));
      markersRef.current = [];

      allItems.forEach(item => {
        if (item.location) {
          const isSelected = selectedItemIds.has(item.id);

          const getMarkerColor = (style) => {
            switch (style) {
              case '篆书': return '#8B7355';
              case '隶书': return '#C9A96E';
              case '行书': return '#B5A082';
              case '楷书': return '#A0916C';
              case '草书': return '#D4C4A8';
              default: return '#E6D7C3';
            }
          };

          const marker = leafletLib.circleMarker(item.location, {
            radius: isSelected ? 15 : 10,
            fillColor: isSelected ? '#C9A96E' : getMarkerColor(item.calligraphyStyle),
            color: '#4A3728',
            weight: 3,
            opacity: 1,
            fillOpacity: isSelected ? 0.9 : 0.8
          }).addTo(leafletMapRef.current);

          marker.bindPopup(`
            <div style="font-family: 'Inter', sans-serif; max-width: 280px; color: #4A3728;">
              <h4 style="margin: 0 0 8px 0; color: #4A3728; font-size: 16px; font-weight: 700;">
                ${item.name}
              </h4>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #8B7355;">
                <strong>📍 位置:</strong> ${item.city}
              </p>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #8B7355;">
                <strong>✍️ 书体:</strong> ${item.calligraphyStyle}
              </p>
            </div>
          `);

          marker.on('click', () => {
            handleItemClick(item.id);
          });

          markersRef.current.push(marker);
        }
      });

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

  const handleItemClick = (itemId) => {
    const newSelection = new Set([itemId]);
    setSelectedItemIds(newSelection);
    const item = allItems.find(i => i.id === itemId);
    setSelectedItem(item);
    setCurrentWorkList([item]);

    if (item.location && leafletMapRef.current) {
      leafletMapRef.current.setView(item.location, 8, { animate: true });
    }
  };

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

  const ChartComponent = ({ title, type, categories }) => {
    const chartData = renderChart(type, categories);

    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border shadow-xl p-4 h-64 hover:shadow-2xl transition-all duration-300"
        style={{ borderColor: 'rgba(139, 115, 85, 0.2)' }}>
        <h3 className="text-sm font-semibold mb-3 text-center border-b pb-2"
          style={{ color: '#4A3728', borderColor: 'rgba(139, 115, 85, 0.2)' }}>
          {title}
        </h3>
        <div className="h-44 overflow-y-auto">
          {chartData.categories.map((category) => (
            <div key={category} className="mb-3">
              <div className="text-xs mb-2 font-medium" style={{ color: 'rgba(74, 55, 40, 0.8)' }}>{category}</div>
              <div className="flex flex-wrap gap-1.5">
                {chartData.data[category]?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="w-5 h-5 rounded-full border-2 shadow-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: selectedItemIds.has(item.id) ? '#C9A96E' : '#B5A082',
                      borderColor: 'rgba(139, 115, 85, 0.3)'
                    }}
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
    <div className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5F0E8 0%, #E6D7C3 25%, #D4C4A8 50%, #C9A96E 75%, #B5A082 100%)'
      }}>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full opacity-10 animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              backgroundColor: element.color,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Fun geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full opacity-15 animate-bounce"
          style={{ backgroundColor: '#C9A96E', animationDuration: '4s' }}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 opacity-10 rotate-45 animate-spin"
          style={{ backgroundColor: '#8B7355', animationDuration: '10s' }}></div>
      </div>

      {/* Navigation header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center space-x-2 transition-all duration-300 backdrop-blur-md px-6 py-3 rounded-full shadow-lg hover:shadow-xl border-2 font-medium hover:scale-105"
          style={{
            color: '#4A3728',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(139, 115, 85, 0.3)'
          }}
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Back to Home</span>
        </button>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #4A3728 0%, #8B7355 50%, #C9A96E 100%)' }}>
            Ancient Calligraphy Explorer ✨
          </h1>
        </div>

        <div className="w-12"></div>
      </div>

      {/* Main dashboard content */}
      <div className={`relative z-10 flex-1 p-6 grid grid-cols-12 grid-rows-12 gap-4 min-h-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Left panel - Charts */}
        <div className="col-span-2 row-span-12 bg-white/90 backdrop-blur-md rounded-3xl border shadow-2xl flex flex-col overflow-hidden"
          style={{ borderColor: 'rgba(139, 115, 85, 0.2)' }}>
          <div className="p-4 border-b" style={{ borderColor: 'rgba(139, 115, 85, 0.2)' }}>
            <h2 className="text-lg font-semibold flex items-center space-x-2" style={{ color: '#4A3728' }}>
              <span>📊</span>
              <span>Statistics</span>
            </h2>
          </div>
          <div className="flex-1 p-3 space-y-4 overflow-y-auto">
            <ChartComponent title="字体统计 ✍️" type="font" categories={FONT_ORDER} />
            <ChartComponent title="碑刻立朝代 🏛️" type="stele" categories={DYNASTY_ORDER} />
          </div>
        </div>

        {/* Middle panel - Map */}
        <div className="col-span-7 row-span-12 bg-white/90 backdrop-blur-md rounded-3xl border shadow-2xl overflow-hidden relative"
          style={{ borderColor: 'rgba(139, 115, 85, 0.2)' }}>
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border"
            style={{ borderColor: 'rgba(139, 115, 85, 0.2)' }}>
            <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#4A3728' }}>
              <span>🗺️</span>
              <span>Shanghai Cultural Sites</span>
            </span>
          </div>
          {!isMapReady ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center" style={{ color: 'rgba(74, 55, 40, 0.7)' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
                  style={{ borderColor: '#C9A96E' }}></div>
                <p>Loading map... 🗺️</p>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />
          )}
        </div>

        {/* Right panel - Work list and Details */}
        <div className="col-span-3 row-span-12 flex flex-col gap-4">
          {/* Work list */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border shadow-2xl flex flex-col overflow-hidden flex-1"
            style={{ borderColor: 'rgba(139, 115, 85, 0.2)' }}>
            <div className="backdrop-blur-sm px-4 py-3 border-b"
              style={{ backgroundColor: 'rgba(139, 115, 85, 0.1)', borderColor: 'rgba(139, 115, 85, 0.2)' }}>
              <h3 className="text-sm font-semibold flex items-center space-x-2" style={{ color: '#4A3728' }}>
                <span>📚</span>
                <span>作品列表</span>
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul>
                {currentWorkList.map((work) => (
                  <li
                    key={work.id}
                    onClick={() => handleItemClick(work.id)}
                    className="px-4 py-3 cursor-pointer text-sm transition-all duration-300 hover:scale-105 border-b"
                    style={{
                      backgroundColor: selectedItemIds.has(work.id) ? 'rgba(201, 169, 110, 0.2)' : 'transparent',
                      color: selectedItemIds.has(work.id) ? '#4A3728' : 'rgba(74, 55, 40, 0.8)',
                      borderColor: 'rgba(139, 115, 85, 0.1)'
                    }}
                  >
                    {work.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Details panel */}
          {selectedItem && (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl border shadow-2xl p-4 flex-1"
              style={{ borderColor: 'rgba(139, 115, 85, 0.2)' }}>
              <h3 className="text-lg font-bold text-center mb-4 flex items-center justify-center space-x-2"
                style={{ color: '#4A3728' }}>
                <span>🎨</span>
                <span>{selectedItem.name}</span>
              </h3>

              <div className="space-y-3">
                <div className="rounded-xl p-4 border"
                  style={{ backgroundColor: 'rgba(245, 240, 232, 0.8)', borderColor: 'rgba(139, 115, 85, 0.2)' }}>
                  <p className="text-sm flex items-center space-x-2 mb-2" style={{ color: 'rgba(74, 55, 40, 0.9)' }}>
                    <span className="font-semibold" style={{ color: '#C9A96E' }}>👨‍🎨 作者:</span>
                    <span style={{ color: '#8B7355' }}>
                      {selectedItem.authors?.map(a => `${a.author} (${a.role})`).join('、')}
                    </span>
                  </p>

                  <p className="text-sm flex items-center space-x-2 mb-2" style={{ color: 'rgba(74, 55, 40, 0.9)' }}>
                    <span className="font-semibold" style={{ color: '#C9A96E' }}>✍️ 书体:</span>
                    <span style={{ color: '#8B7355' }}>{selectedItem.calligraphyStyle}</span>
                  </p>

                  <p className="text-sm flex items-center space-x-2 mb-2" style={{ color: 'rgba(74, 55, 40, 0.9)' }}>
                    <span className="font-semibold" style={{ color: '#C9A96E' }}>🏮 朝代:</span>
                    <span style={{ color: '#8B7355' }}>{selectedItem.temporal}</span>
                  </p>

                  <p className="text-sm flex items-center space-x-2 mb-2" style={{ color: 'rgba(74, 55, 40, 0.9)' }}>
                    <span className="font-semibold" style={{ color: '#C9A96E' }}>📍 位置:</span>
                    <span style={{ color: '#8B7355' }}>{selectedItem.city}</span>
                  </p>

                  <p className="text-sm flex items-center space-x-2" style={{ color: 'rgba(74, 55, 40, 0.9)' }}>
                    <span className="font-semibold" style={{ color: '#C9A96E' }}>🏛️ 区域:</span>
                    <span style={{ color: '#8B7355' }}>{selectedItem.district}</span>
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