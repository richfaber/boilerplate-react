
import style from "./Error.module.scss"

export default function Error() {
  const errorCode = 404

  return (
    <>
      <p>{ errorCode } 에러</p>
    </>
  )
  
}