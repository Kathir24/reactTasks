import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap"

const LoginPage = ({ handleChange, state, auth }) => {
    const navigate = useNavigate()
    const handleUserPage = () => {
        if (state.loginUserName && state.loginUserName === 'kathir' && state.password === '111') {
            auth(true);
            navigate('/table');
        }
    }
    return (
        <div>
            <Form onSubmit={e => e.preventDefault()}>
                <div className='form'>
                    <div>
                        <h1 className="title">Login Form</h1>
                        <Form.Group >
                            <Form.Label className='label'>USERNAME</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                placeholder="Enter username"
                                name='loginUserName'
                                value={state.loginUserName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group  >
                            <Form.Label className='label'>PASSWORD</Form.Label>
                            <Form.Control
                                className="input"
                                type="password"
                                placeholder="Enter password"
                                name='password'
                                value={state.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                            <button type="submit" className='loginButton' onClick={() => handleUserPage('login')}>LogIn</button>
                    </div>
                </div>
            </Form>
        </div>
    )
}
export default LoginPage