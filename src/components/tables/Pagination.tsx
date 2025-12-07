import React from 'react'

type Props = {
  page: number
  total: number
  onPrev: () => void
  onNext: () => void
  count: number
}

export default function Pagination({page,total,onPrev,onNext,count}:Props){
  return (
    <div className="flex justify-between items-center mt-4">
      
      <div className="text-sm">
        Page {page} / {total} • {count} Result(s)
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={page === 1}  
          className={`px-3 py-1 border rounded 
            ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Prev
        </button>

        <button
          onClick={onNext}
          disabled={page === total}
          className={`px-3 py-1 border rounded 
            ${page === total ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
