import React from 'react';

const MediaCard = ({ title, description, type = 'default', starred = false }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {type === 'add' ? (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          ) : (
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {starred && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </button>
          )}
          
          <button className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      
      {type !== 'add' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded">Source 1</span>
            <span className="text-gray-400">Active</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded">Source 2</span>
            <span className="text-green-500">●</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded">Source 3</span>
            <span className="text-red-500">●</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="bg-gray-100 px-2 py-1 rounded">Source 4</span>
            <span className="text-yellow-500">●</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCard;