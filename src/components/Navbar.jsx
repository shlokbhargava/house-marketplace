import React from 'react'
import { Image } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container">

                <div className='navbar-brand'>
                    <Image alt="" src="/favicon.ico" width="25" height="25" className="d-inline-block align-top"/> &nbsp;House Marketplace
                </div>

                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button> */}

                <div>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item" onClick={() => navigate('/')}>
                            <span style={{ cursor: "pointer" }} className={pathMatchRoute('/') ? 'nav-link active' : 'nav-link'}>
                                <i className="far fa-compass"></i> Explore
                            </span>
                        </li>
                        <li className="nav-item" onClick={() => navigate('/offers')}>
                            <span style={{ cursor: "pointer" }} className={pathMatchRoute('/offers') ? 'nav-link active' : 'nav-link'}>
                                <i className="fas fa-tag"></i> Offers
                            </span>
                        </li>
                        <li className="nav-item" onClick={() => navigate('/profile')}>
                            <span style={{ cursor: "pointer" }} className={pathMatchRoute('/profile') ? 'nav-link active' : 'nav-link'}>
                                <i className="fas fa-user-circle"></i> Profile
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
