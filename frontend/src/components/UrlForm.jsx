import React from 'react'

const UrlForm = () => {
  return (
    <form  className='space-y-4'>
          <div>
            <label htmlFor='url' className='block text-sm font-medium text-gray-700 mb-2'>
              Enter your URL
            </label>
            <input
              type='text'
              id='url'
              placeholder='https://example.com/very-long-url'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200'
            />
          </div>

          {/* {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
              {error} 
             </div>
          )} */}

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center'
          >
            {/* {loading ? (
              <>
                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Shortening...
              </>
            ) : ( */}
              Shorten URL
             {/* )} */}
          </button>
        </form>
  )
}

export default UrlForm