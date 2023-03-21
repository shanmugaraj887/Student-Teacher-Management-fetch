import { useState } from "react"
import '../styles/adduserform.css'
import Button from '@mui/material/Button';

const AdduserFom = (props) => {
    const initialForm = { id: null, name: "", username: "", email: "", degree: "", major: "" }
    const [user, setUser] = useState(initialForm)


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })

    }



    return (
        <div style={{ marginTop: '35px' }} className="form-section">
            <form className="form-box" onSubmit={(event) => {
                event.preventDefault()
                if (!user.name || !user.username) return
                // props.addUser(user)
                fetch("https://638f3c7a9cbdb0dbe320f75c.mockapi.io/students", {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { "Content-type": "application/json" }
                }).then(() => props.getUsers())
                setUser(initialForm)
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
                <button style={{ background: "none", border: "none" }} ><Button variant="contained" >Submit</Button></button>
            </form>
        </div>

    )
}

export default AdduserFom