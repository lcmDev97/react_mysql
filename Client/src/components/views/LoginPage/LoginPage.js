import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LoginPage(props) {
  const dispatch = useDispatch()

  const goRegisterPage = () => {
    return navigate('/register')
   }
  const goLandingPage = () => {
    return navigate('/')
  }

  const [Nickname, setNickname] = useState("")
  const [Password, setPassword] = useState("")
  const navigate = useNavigate()
  
  const onNicknameHandler = (event)=>{
    setNickname(event.currentTarget.value)
  }
  const onPasswordHandler = (event)=>{
    setPassword(event.currentTarget.value)
  }

  
  const onSubmitHandler = (event)=>{
    event.preventDefault()
    
    let body = {
      nickname: Nickname,
      password: Password,
    }
    //원래 여기 axios 있어야 하는데, redux사용하면 이게 대신함.
    // Axios.post('http://localhost:8000/auth/register', body)
    

    dispatch(loginUser(body)).then((response)=>{
      // axios.defaults.headers.common['Authorization'] = `Bearer ${response.payload.accessToken}`
      if(response.payload.success === true){
        console.log(response)
        document.cookie = "isLogin=true"
        navigate('/')
      } else {
        alert('Error')
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{ display: "flex", flexDirection: "column" }}
      onSubmit={onSubmitHandler}
      >
        <label>Nickname</label>
        <input type="text" value={Nickname} onChange={onNicknameHandler} /> {/* type Email에서 text로 바꿈. */}
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button>
          Login
        </button>
        <button onClick={goRegisterPage}>
          Register
        </button>
        <button onClick={goLandingPage}>
          Home
        </button>
      </form>
    </div>
  )
}