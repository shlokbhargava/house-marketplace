import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'

function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    return (
        <div className='signInPage'>
            <div className='signInForm'>
                <FormContainer>
                    <div className='form'>
                        <h3 className='text-center mt-2'>Welcome Back!</h3>
                        <br />
                        <Form> 
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

                            <Link style={{ textDecoration: 'none', color: '#287bb5', fontWeight: '500' }} to='/forgot-passport'>Forgot Password</Link>

                            <div className="d-grid gap-2 mb-3 mt-3">
                                <Button type='submit' className="btn btn-info">Sign In</Button>
                            </div>

                            <h6 className='text-center'>OR</h6>
                        </Form>

                        <Link to='/sign-up' style={{ textDecoration: 'none' }}>
                            <div className="d-grid gap-2 mt-3 mb-3">
                                <Button className="btn btn-info">Sign Up</Button>
                            </div>
                        </Link>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}

export default SignIn
