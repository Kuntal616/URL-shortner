import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

function Dashboard() {
  return (<>
     <div className="min-h-screen   bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            URL Shortener
          </h1>
          <p className="text-gray-600">
            Transform your long URLs into short, shareable links
          </p>
        </div>
        <UrlForm compact={false} />
      </div>
    </div>
        {/* <UserUrl /> */}
        </>
  )
}

export default Dashboard