import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const auth = getAuth()

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
            const user = userCredential.user
    
            updateProfile(auth.currentUser, {
                displayName: name,
            })

            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)
    
            navigate('/')
            toast.success(`Welcome ${user.displayName}`)
        } catch (error) {
            toast.error('Invalid credentials')
        }

        setLoading(false)
    }

    return (
        <div className='signInPage'>
            <div className='signInForm'>
                <FormContainer>
                    <div className='form'>
                        <h3 className='text-center mt-2'>Welcome!</h3>
                        <br />
                        <Form onSubmit={onSubmit}> 
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder='Name' id='name' value={name} onChange={onChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder='Email' id='email' value={email} onChange={onChange} />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' value={password} onChange={onChange} />
                                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                                        <i className="fas fa-eye"></i>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <div className="d-grid gap-2 mb-3 mt-3">
                                <Button type='submit' className="btn btn-info">Sign Up</Button>
                            </div>

                            <h6 className='text-center'>OR</h6>
                        </Form>

                        <Link to='/sign-in' style={{ textDecoration: 'none' }}>
                            <div className="d-grid gap-2 mt-3 mb-3">
                                <Button className="btn btn-info">Sign In</Button>
                            </div>
                        </Link>

                        {loading && 
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                        }
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}

export default SignUp
