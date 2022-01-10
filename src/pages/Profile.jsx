import React, { useEffect, useState } from 'react'
import { getAuth, updatePassword, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { Container, Tab, Tabs, Form, Row, Col, Button, InputGroup } from 'react-bootstrap'

function Profile() {
    const [showPassword, setShowPassword] = useState(false)
    const [editName, setEditName] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    const auth = getAuth()
    
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        password: ''
    })
    
    const { name, email, password } = formData
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onEditName = async () => {
        setEditName(false)

        try {
            await updateProfile(auth.currentUser, {
                displayName: name
            })

            const userRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, {
                name
            })

            toast.success('Name updated')
        } catch (error) {
            toast.error('Could not update the name')
        }
    }

    const onEditPassword = async () => {
        setEditPassword(false)

        try {
            if (password.length > 1) {
                const user = auth.currentUser
                const newPassword = password
            
                await updatePassword(user, newPassword)
    
                toast.success('Password updated')
            }
        } catch (error) {
            console.log(error);
            toast.error('Could not update the password. Please login again and try')
        }
    }

    return (
        <Container className='mt-3'>
            <Tabs defaultActiveKey="personalDetails" className="mb-3">
                <Tab eventKey="personalDetails" title="Personal Details">
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={{ span: 2 }}>Email</Form.Label>
                            <Col sm="8">
                                <Form.Control plaintext readOnly defaultValue={email} />
                            </Col>
                            <Col sm={{ offset: 1, span: 1 }}>
                                <Button disabled><i className="far fa-edit"></i></Button>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={{ span: 2 }}>Name</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" id='name' onChange={onChange} value={name} disabled={!editName} />
                            </Col>
                            <Col sm={{ offset: 1, span: 1 }}>
                                { editName ? <Button onClick={onEditName}><i className="fas fa-save"></i></Button> : <Button onClick={() => setEditName(true)}><i className="far fa-edit"></i></Button> }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={{ span: 2 }}>Password</Form.Label>
                            <Col sm="8">
                                <InputGroup>
                                    <Form.Control type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' onChange={onChange} value={password} disabled={!editPassword} />
                                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                                        <i className="fas fa-eye"></i>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col sm={{ offset: 1, span: 1 }}>
                                { editPassword ? <Button onClick={onEditPassword}><i className="fas fa-save"></i></Button> : <Button onClick={() => setEditPassword(true)}><i className="far fa-edit"></i></Button> }
                            </Col>
                        </Form.Group>
                    </Form>
                </Tab>
                <Tab eventKey="listings" title="Listings">
                    
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Profile
