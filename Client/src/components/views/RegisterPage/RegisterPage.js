import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch()

  const [Nickname, setNickname] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const goLandingPage = () => {
    return navigate('/')
  }

  const onNicknameHandler = (event)=>{
    setNickname(event.currentTarget.value)
  }
  const onPasswordHandler = (event)=>{
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event)=>{
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event)=>{
    event.preventDefault()
    
    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    }

    let body = {
      nickname: Nickname,
      password: Password,
    }
    //원래 여기 axios 있어야 하는데, redux사용하면 이게 대신함.
    dispatch(registerUser(body))
    .then((response)=>{
      console.log("회원가입 성공: dispatch의 response값",response)
    })
    .catch((error)=>{
      alert(error)
    })
    .finally(()=>{
      navigate('/login')
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
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button>
          회원 가입
        </button>
        <button onClick={goLandingPage}>
          Home
        </button>
      </form>
    </div>
  )
}
