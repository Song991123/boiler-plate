import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

const LoginDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

function LoginPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log('Email : ', Email);
    console.log('Password : ', Password);

    let body = {
      email : Email,
      password : Password
    }

    dispatch(loginUser(body)).then(response => {
      if(response.payload.loginSuccess){
        navigate('/');
      }else{
        alert('Error');
      }
    })


  }

  return (
    <LoginDiv>
      <LoginForm onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button>
          Login
        </button>
      </LoginForm>
    </LoginDiv>
  )
}

export default LoginPage