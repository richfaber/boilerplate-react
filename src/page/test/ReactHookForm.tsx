import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

export default function ReactHookForm() {

  const { register, handleSubmit, getValues, trigger, formState: { errors } } = useForm<FormData>({ mode: 'onChange' })

  function onSubmit( data ) {

    console.log( data )

  }

  useEffect(() => {
    trigger()
  }, [])

  return(
    <>
      <form onSubmit={ handleSubmit(onSubmit) }>
          <div>
            <input placeholder="이메일" { ...register('email', {
              required: '이메일을 입력하세요',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '이메일 형식이 아닙니다' }
            })} />
            { errors.email && <p>{ errors.email.message }</p> }
          </div>

          <div>
            <input type="password" placeholder="비밀번호" { ...register('password', { required: '비밀번호를 입력하세요' } )} />
            { errors.password && <p>{ errors.password.message }</p> }
          </div>

          <div>
            <input type="password" placeholder="비밀번호 확인" { ...register('passwordConfirm', {
              required: '비밀번호 확인을 입력하세요',
              validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다'
            })} />
             { errors.passwordConfirm && <p>{ errors.passwordConfirm.message }</p> }
          </div>

          <button type="submit">가입</button>
      </form>
    </>
  )
}