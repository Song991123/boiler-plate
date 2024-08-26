import React, {useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const LandigDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;


function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/hello').then(response => console.log(response)).catch(error => {
      if (error.response) {
        // 서버가 2xx 외의 상태로 응답한 경우
        console.error('Response error:', error.response.status, error.response.data);
      } else if (error.request) {
        // 요청이 전송되었으나 응답이 없는 경우
        console.error('No response received:', error.request);
      } else {
        // 요청 설정 중에 오류가 발생한 경우
        console.error('Error setting up request:', error.message);
      }
    });
  },[]);

  const onClickHandler = () => {
    axios.get('/api/users/logout').then(response => {
      if(response.data.success){
        navigate('/login');
      }else{
        alert('로그아웃 실패')
      }
    })
  }
  
  return (
    <LandigDiv>
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </LandigDiv>
  )
}

export default LandingPage