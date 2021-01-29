import React from 'react'
import Http from '../../services/Http';
import Content from '../partials/Content'
import StudentList from './List';

export default function Students() {
    const [students, setStudents] = React.useState<any>([])
    const axiosHttp = new Http();
    React.useEffect(() => {
        axiosHttp.get<any>('api/v1/student')
            .then(res => {
                setStudents(res.data.students)
            })
            .catch(err => {
                //TODO: show error message to user.
                console.log('error')
            })
       
    }, [])

    const handleDeleteItems = (itemsIndex:number[]) => {
        console.log(itemsIndex)
    }

    return (
        <Content title='لیست دانشجو ها'>
            <StudentList rows={students} deleteItems={handleDeleteItems}/>
        </Content>
    )
}
