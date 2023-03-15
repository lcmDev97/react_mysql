import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000')
    .then(response => {console.log(response.data)})
  
  }, [])

  const onClickHandler = ()=>{
    axios.get('http://localhost:8000/auth/logout', { withCredentials: true })
    .then(response => {
      console.log(response.data)
    })
    .catch(()=>{
      alert("로그아웃에 실패했습니다.")
    })
    .finally(()=>{
      navigate('/login')
    })
  }
  

   const goLoginPage = ()=>{
    navigate('/login')
   }

   const onlyAdmin = ()=>{
    axios.get('http://localhost:8000/auth/admin-role', { withCredentials: true })
    .then(res=>{
      alert('admin님 어서옵쇼.')
    })
    .catch(res=>{
      alert('admin이 아닙니다.')
    })
   }

    // axios.get('http://localhost:8000/auth/testauth',{
    //   withCredentials: true,
    //   headers: {
    //     Authorization: `Bearer ${document.cookie}`
    //   }
    // })
    // .then(response => {
    //   console.log(response.data)
    // })

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h3>시작 페이지</h3>

    <button onClick={onClickHandler}>로그아웃</button>
    <button onClick={goLoginPage}>Login</button>
    <button onClick={onlyAdmin}>adminCheckBut</button>

    </div>
  )
}
