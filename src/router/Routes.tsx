import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom';
import Courses from '../components/courses/Courses';
import CreateCourse from "../components/courses/createCourse";
import Students from '../components/students';
import AddVideo from '../components/video/addVideo';

interface IRoute{
    path:string
    component:any
}
const routes:IRoute[] = [
    { path:'/courses', component:Courses },
    { path:'/students', component:Students },
    {path:'/createCourse',component:CreateCourse},
    {path:'/addVideo',component:AddVideo}
]

 function Routes() {
    return (
        <Switch>
            <Redirect exact path='/' to='/courses' />
            {routes.map((route) =>{
                return <Route key={route.path}  path={route.path} component={route.component}/>
            } )}
        </Switch>
    )
}

export default Routes