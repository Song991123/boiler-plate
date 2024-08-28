import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

const RegisterDiv = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const RegisterForm = styled.form `
  display: flex;
  flex-direction: column;
`;

function RegisterPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword){
          return alert('비밀번호와 비밀번호 확인이 다릅니다.');
        }
        console.log('Email : ', Email);
        console.log('Password : ', Password);

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body)).then(response => {
            if (response.payload.success) {
                navigate('/login');
            } else {
                alert('Failed to sign up');
            }
        })

    }
    return (
        <RegisterDiv>
            <RegisterForm onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}/>
                <label>Name</label>
                <input type='text' value={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input
                    type='password'
                    value={ConfirmPassword}
                    onChange={onConfirmPasswordHandler}/>
                <br/>
                <button>
                    회원 가입
                </button>
            </RegisterForm>
        </RegisterDiv>
    )
}

export default RegisterPage