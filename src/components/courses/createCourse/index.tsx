import React from 'react'
import CourseContext from '../context';
import CreateCourse from './CreateCourse';

export default function index() {
    return (
        <CourseContext>
            <CreateCourse/>
        </CourseContext>
    )
}
