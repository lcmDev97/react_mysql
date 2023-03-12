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
    axios.post('http://localhost:8000/auth/logout', { withCredentials: true })
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
  
  const getJwtValue = ()=>{
    let cookies = document.cookie.split(";")
    cookies.map((v)=>{
      let [name, value] = v.split("=")
      if(name === " jwt"){
        console.log(value)
      }
    })
  
  }

   const goLoginPage = ()=>{
    navigate('/login')
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
    <button onClick={getJwtValue}>testButton</button>

    </div>
  )
}
