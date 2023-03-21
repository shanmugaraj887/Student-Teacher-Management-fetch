import React from 'react'
import { useState } from 'react'
import AddTeacherForm from './Forms/AddTeacherForm';
import EditTeacherForm from './Forms/EditTeacherForm';
import { useEffect } from 'react'
import TeachersTable from './tables/TeachersTable';

function Teachers() {


    const [users, setUsers] = useState([])

    const getUsers = () => {
        fetch("https://638f3c7a9cbdb0dbe320f75c.mockapi.io/teachers", {
            method: 'GET',
        })
            .then((data) => (data.json()))
            .then(res => setUsers(res))
    }

    const deleteUser = (id) => {
        fetch(`https://638f3c7a9cbdb0dbe320f75c.mockapi.io/teachers/${id}`, {
            method: "DELETE",
        }).then(() => getUsers())


    }
    useEffect(() => getUsers(), [])


    const [editing, setEditing] = useState(false)

    const initialForm = { id: null, name: "", username: "", email: "", degree: "", department: "" }
    const [currentUser, setCurrentUser] = useState(initialForm)

    const editRow = (user) => {

        setEditing(true)
        setCurrentUser({ id: user.id, name: user.name, username: user.username, email: user.email, department: user.department })

    }
    const updateuser = (id, updatedUser) => {
        setUsers(users.map((user) => (user.id == id ?
            (
                fetch(`https://638f3c7a9cbdb0dbe320f75c.mockapi.io/teachers/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedUser),
                    headers: { "Content-type": "application/json" }
                }).then(() => getUsers())
            )
            : user)))
    }

    return (
        <div className="App">

            {editing ? <EditTeacherForm
                updateuser={updateuser}
                setEditing={setEditing}
                currentUser={currentUser}
                getUsers={getUsers}
            /> : <AddTeacherForm getUsers={getUsers} />
            }
            <TeachersTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
    );
}


export default Teachers