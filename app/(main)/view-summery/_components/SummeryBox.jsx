import React from 'react'
import ReactMarkdown from 'react-markdown'

const SummeryBox = ({summery}) => {
  return (
    <div className='h-[60vh] overflow-auto'>
      <ReactMarkdown>{summery}</ReactMarkdown>
    </div>
  )
}

export default SummeryBox
