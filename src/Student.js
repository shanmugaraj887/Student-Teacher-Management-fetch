import React from 'react'
import Usertable from './tables/Usertable';
import { useState } from 'react';
import AdduserFom from './Forms/AdduserFom';
import Editform from './Forms/Editform';
import { useEffect } from 'react'

function Student() {



    const [users, setUsers] = useState([])

    const getUsers = () => {
        fetch("https://638f3c7a9cbdb0dbe320f75c.mockapi.io/students", {
            method: 'GET',
        })
            .then((data) => (data.json()))
            .then(res => setUsers(res))
    }

    const deleteUser = (id) => {
        fetch(`https://638f3c7a9cbdb0dbe320f75c.mockapi.io/students/${id}`, {
            method: "DELETE",
        }).then(() => getUsers())


    }
    useEffect(() => getUsers(), [])







    const [editing, setEditing] = useState(false)

    const initialForm = { id: null, name: "", username: "", email: "", degree: "", major: "" }
    const [currentUser, setCurrentUser] = useState(initialForm)

    const editRow = (user) => {

        setEditing(true)
        setCurrentUser({ id: user.id, name: user.name, username: user.username, email: user.email, degree: user.degree, major: user.major })

    }
    const updateuser = (id, updatedUser) => {
        setUsers(users.map((user) => (user.id == id ?
            (
                fetch(`https://638f3c7a9cbdb0dbe320f75c.mockapi.io/students/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedUser),
                    headers: { "Content-type": "application/json" }
                }).then(() => getUsers())
            )
            : user)))
    }

    return (
        <div className="App">

            {editing ? <Editform
                updateuser={updateuser}
                setEditing={setEditing}
                currentUser={currentUser}
                getUsers={getUsers}
            /> : <AdduserFom getUsers={getUsers} />
            }
            <Usertable users={users} editRow={editRow} deleteUser={deleteUser} />

        </div>
    );
}

export default Student



