import React from 'react'

const userDetails = ({params} : any) => {

  return (
    <div className='flex flex-col items-center justify-center border-4 rounded-lg p-4'>
        <div className='bg-green-400'> 
        {params.id}
        </div>
    </div>
  )
}

export default userDetails;