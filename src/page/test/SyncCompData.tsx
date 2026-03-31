import { useState } from "react"

function Comp1({ data1, onIncrease }) {

  return (
    <>
      <p>컴포넌트1 { data1 }</p>
      <button type="button" onClick={ () => onIncrease() }>이벤트연동 증가</button>
    </>
  )
}

function Comp2({ children, data2 }) {
  
  return (
    <>
      <p>컴포넌트2 { data2 }</p>
      <p>{ children }</p>
    </>
  )
}

export default function SyncCompData() {
  
  const [v, setV] = useState(20)

  function increase() {
    setV(v + 1)
  }

  return (
    <>
      <Comp1 data1={ v } onIncrease={ increase }></Comp1>

      <Comp2 data2={ v }>
        <button type="button" onClick={ () => increase() }>children 내부에서 증가</button>
      </Comp2>

      <button type="button" onClick={ () => increase() }>페이지 에서 증가</button>

    </>
  )
  
}