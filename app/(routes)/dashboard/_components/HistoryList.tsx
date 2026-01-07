"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'

function HistoryList() {

    const [HistoryList, setHistoryList] = useState([])

  return (
    <div>
      { HistoryList.length === 0 ? (
        <div className='w-full h-96 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg'>
            <Image src={"/medical-assistance.png"} alt="empty" width={150} height={150} />
            <h2 className="font-bold text-xl mt-5">No recent consultants</h2>
            <p className="text-gray-500">Your recent consultations will appear here</p>
            <Button className='mt-3' >+ Start a consultation</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          List
        </div>
      )}
    </div>
  )
}

export default HistoryList
