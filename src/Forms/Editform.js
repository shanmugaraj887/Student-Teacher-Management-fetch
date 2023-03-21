import { useState } from 'react';
import Button from '@mui/material/Button';
import '../styles/editform.css'

const Editform = (props) => {

    const [user, setUser] = useState(props.currentUser)


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })

    }



    return (
        <div className="form-section">
            <form className="form-box" onSubmit={(event) => {
                event.preventDefault()
                if (!user.name || !user.username) return
                props.updateuser(user.id, user)
                console.log(props.updateuser(user.id, user))

            }}>
                <label>Name</label>
                <input onChange={handleInputChange} type="text" name="name" value={user.name} />
                <label>Username</label>
                <input onChange={handleInputChange} type="text" name="username" value={user.username} />
                <label>Email</label>
                <input onChange={handleInputChange} type="email" name="email" value={user.email} />
                <label>Degree</label>
                <input onChange={handleInputChange} type="text" name="degree" value={user.degree} />
                <label>Major</label>
                <input onChange={handleInputChange} type="text" name="major" value={user.major} />

                <div>
                </div>
                <div><button style={{ background: "none", border: 'none' }}><Button variant="contained">Submit</Button></button>
                    <button style={{ background: "none", border: 'none' }} onClick={() => {
                        props.setEditing(false)
                    }}><Button variant='contained' color='error' >cancel</Button></button></div>
            </form>
        </div>

    )
}

export default Editform