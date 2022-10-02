import React from 'react'

interface Props {
  date: string;
  weight: string;
}

const Item: React.FC<Props> = ({ date, weight }) => {
  return (
    <div className='rounded-xl border border-black p-4 mt-3'>
      <div>Date: {date}</div>
      <div>Weight: {weight}</div>
    </div>
  )
}

export default Item