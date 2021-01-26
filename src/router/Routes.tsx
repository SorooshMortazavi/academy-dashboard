import React from 'react'
import {Switch,Route} from 'react-router-dom';
import Courses from '../components/courses/Courses';

interface IRoute{
    path:string
    component:any
}
const routes:IRoute[] = [
    { path:'/courses', component:Courses }
]

 function Routes() {
    return (
        <Switch>
            {routes.map((route) =>{
                return <Route key={route.path}  path={route.path} component={route.component}/>
            } )}
        </Switch>
    )
}

export default Routes