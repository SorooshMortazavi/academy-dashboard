import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom';
import Courses from '../components/courses/Courses';
import Students from '../components/students';

interface IRoute{
    path:string
    component:any
}
const routes:IRoute[] = [
    { path:'/courses', component:Courses },
    { path:'/students', component:Students },
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