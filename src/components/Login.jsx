import {useReducer} from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, Container, FormFeedback } from "reactstrap";
import * as yup from "yup";

const axios = require('axios');

let schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().required().min(6)
});

let initialState = {
    email:'',
    password:'',
    emailError:'',
    passwordError:''
};

const Login = (props) =>{
    const loginReducer = (state,action) =>{
        const {type,payload} = action;

        switch(type){
            case "updateEmail":
                return {...state,email: payload.email};
            case "updatePassword":
                return {...state, password:payload.password};
            case "updateEmailError":
                return {...state, emailError:payload.emailErrors};
            case "updatePasswordError":
                return {...state, passwordError:payload.passwordErrors};
            default:
                return state;
        }
    }
    const [loginState, dispatch] = useReducer(loginReducer, initialState);
    console.log(loginState);

    const loginAPI = () =>{
        axios.post('https://reqres.in/api/login/', {
            email: loginState.email,
            password: loginState.password
        })
            .then((response) => {
                const {
                    data: { token },
                    status,
                } = response;
                if (status === 200) {
                    console.log(token);
                    props.history.push('/home');
                }
                else {
                    alert("Invalid Login Credentials!");
                }
            }, (error) => {
                console.log(error);
            });
    }

    const submitForm = (e) => { 
        e.preventDefault();
        schema.isValid({
            email: loginState.email,
            password: loginState.password
        }).then((valid)=>{
            const formValidate = validate();
                console.log("before formValidate:",loginState);
                if(!formValidate){
                    console.log("after formValidate:",loginState);
                }
            if(!valid){
                console.log(valid);
            }else{
                loginAPI();
            }
        })
    };

    const validate = async () =>{
        let emailErrors = "";
        let passwordErrors = "";

        if (!loginState.email.includes('@')) {
            console.log("email doesn't contain @")
            emailErrors = "Invalid Email!";
        }
        if(loginState.password.length < 6){
            passwordErrors = "Password must be atleast 6 characters long!"
        }
        if (loginState.password.length >= 6) {
            passwordErrors = "";
        }
        dispatch({ type: "updateEmailError", payload: { emailErrors } });
        dispatch({ type: "updatePasswordError", payload: {passwordErrors} });
        console.log("emailerror:", loginState.emailError);
        console.log("passworderror:", loginState.passwordError);
        if(emailErrors || passwordErrors){
            return false;
        }
        return true;
    }

    const handleEmailChange=async (e)=>{
        e.preventDefault();
        dispatch({type: "updateEmail", payload:{email:e.target.value}});
        console.log("email:",loginState.email)
    }

    const handlePasswordChange=async (e)=>{
        e.preventDefault();
        dispatch({type: "updatePassword", payload:{password:e.target.value}});
        console.log("password:",loginState.password)
    }

        return(
            <div>
                <Container className="bg-dark">
                    <Row className = "justify-content-center bg-dark">
                    <Form md={8} className="pd-0 bg-white shadow mb-3 rounded mb-0 col-md-6 align-self-center m-5 p-3" >
                        <div className="">
                            <h1 className="text-center text-dark">LogIn</h1> 
                        </div>
                        <div className="mt-4">
                        <Col>
                        <FormGroup className="rounded">
                        <Label className="text-dark ml-2" style={{fontSize:22}}><b>Email</b></Label>
                        <Input type="email"
                            className="text-dark"
                            id="loginEmail"
                            placeholder="abc@xyz.com"
                            value={loginState.email}
                            onChange = {handleEmailChange}
                            required
                            invalid = {loginState.emailError?true:false}
                        />
                        <FormFeedback>{loginState.emailError}</FormFeedback>
                        </FormGroup>
                        </Col> 
                        <Col>
                            <FormGroup className="rounded">
                            <Label className="text-dark ml-2" style={{fontSize:22}}><b>Password</b></Label>
                            <Input
                            type="password"
                            className="text-dark"
                            id="loginPassword"
                            placeholder="********"
                            value={loginState.password}
                            onChange={handlePasswordChange}
                            required  
                            invalid = {loginState.passwordError?true:false}
                            />
                            <FormFeedback>{loginState.passwordError}</FormFeedback>
                            </FormGroup>
                        </Col>
                        </div>
                    
                        <div className="">
                            <Button className="btn btn-primary ml-3"  style={{color:"white"}} onClick = {submitForm}>Login</Button>
                        </div>
                    </Form>
                    </Row>
                </Container>     
        </div>
        );
}

export default Login;