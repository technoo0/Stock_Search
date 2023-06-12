import { useState } from 'react'
import axios from 'axios'
import { SingleTicker } from "react-ts-tradingview-widgets";
import moment from 'moment';
function App() {
  const [results, setResults] = useState([])
  const onSubmitHandeler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    setResults([])
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/search?query=${e.target[0].value}`)
    let data = []
    res.data.hits.hits.forEach((hit) => {
      data.push(hit._source)
    })
    setResults(data)
  }

  return (
    <>
      <div className='container mx-auto flex-col'>
        <form className='mt-4' onSubmit={onSubmitHandeler}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only " >Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-200 focus:border-amber-200" placeholder="" required />
            <button type="submit" className="text-black absolute right-2.5 bottom-2.5 bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-100 font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>
        </form>

        <div className='flex-1 flex-col'>
          {results.map((result, i) =>

            <div key={i}>
              <a href={result.url} target="_blank">
                <div className='flex-1 flex justify-between rounded-lg bg-gray-50 p-4 mt-4'  >
                  <div className='flex space-x-4' >

                    <img src={result.urlToImage} className='rounded-lg w-40 md:w-64 object-cover '></img>
                    <div className='flex flex-col flex-1 justify-around'>
                      <div>

                        <p className='text-xs' >{result.source}</p>
                        <h1 className='text-2xl text-amber-600'>
                          {result.title}
                        </h1>
                        <h2>
                          {result.description}
                        </h2>
                      </div>
                      <div>

                        <p className='text-xs' >{moment(result.publishedAt).fromNow()}</p>
                      </div>
                    </div>
                  </div>
                  <div className='hidden md:inline'>

                    <SingleTicker width="250" symbol={result.Symbol}></SingleTicker>
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div >

    </>
  )
}

export default App
