import { useNavigate } from "react-router-dom"
import style from "./Login.module.scss"



async function handleSignIn({ e, request }) {

  const token = 'testToken'
  localStorage.setItem('accessToken', token)

  return Promise.resolve(true)

}


export default function Login() {

  const navigate = useNavigate()

  async function onSubmit(e) {

    if (e) e.preventDefault()

    const result = await handleSignIn(e)
    if (result) navigate('/Home')

  }

  return (
    <>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <fieldset>

          <legend>로그인폼</legend>
          <input type="text" defaultValue="1234" placeholder="로그인 아이디 입력" />
          <input type="password" defaultValue="1234" placeholder="비밀번호 입력" />

          <button type="submit">로그인</button>

        </fieldset>

      </form>
    </>
  )

}