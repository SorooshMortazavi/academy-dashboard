import React from 'react'
import SectionItem from './SectionItem'

interface ISections {
    sections:any[]
    handleDelete:Function
}
export default function index({sections,handleDelete}:ISections) {
    return (
        <div className="pt-4">
            {sections.map(section => {
              return <SectionItem {...section} handleDelete={handleDelete}/>      
            })}
        </div>
    )
}
