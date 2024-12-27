import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'history', label: 'History' }
  ];

  return (
    <div className="border-b border-red-600">
      <nav className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-mono transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-300 text-white rounded-full'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;