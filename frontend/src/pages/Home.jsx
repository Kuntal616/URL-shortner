import React from 'react'
import UrlForm from '../components/UrlForm'

const Home = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            URL Shortener
          </h1>
          <p className="text-gray-600">
            Transform your long URLs into short, shareable links
          </p>
        </div>
        <UrlForm />
{/* 
        {shortUrl && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-2">
              Your shortened URL:
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition duration-200"
              >
                Copy
              </button>
            </div> 
            <button
              onClick={handleReset}
              className="mt-3 text-sm text-green-600 hover:text-green-700 underline"
            >
              Shorten another URL
            </button>
          </div>
        )}*/}
        
      </div>
    </div>
  )
}

export default Home