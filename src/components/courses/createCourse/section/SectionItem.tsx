import { Divider } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

interface ISectionItemProps {
    title:string
    slug:string
    number:number
    handleDelete:Function
}
export default function SectionItem({title,slug,number,handleDelete}:ISectionItemProps) {
  return (
    <>
      <div className="row d-flex justify-content-start">
        <div className='col-md-3 align-content-center'><span className='text-danger w-50'>شماره سر فصل:</span> {number}</div>
        <div className='col-md-3 align-content-center'><span className='text-danger w-50'>عنوان:</span> {title}</div>
        <div className='col-md-3 align-content-center'><span className='text-danger w-50'>اسلاگ:</span> {slug}</div>
        <div className='col-md-3 align-content-center'><Delete className='text-danger mb-1' onClick={()=>handleDelete(slug)}/></div>
      </div>
      <Divider className='mb-2 bg-danger'/>
    </>
  );
}
