import { Link } from 'react-router-dom'

const testPages = Object.keys(import.meta.glob('@/page/test/*.tsx'))
  .map(path => path.match(/\/([^/]+)\.tsx$/)?.[1])
  .filter(Boolean)

export default function Index() {

  return (
    <>
      <h2>Index</h2>
      <Link to="/home">Home 이동 (로그인필요)</Link>

      <h2>Test Pages</h2>
      <ul>
        { 
          testPages.map(name => (
            <li key={name}>
              <Link to={`/test/${name}`}>{name}</Link>
            </li>
          )) 
        }
      </ul>
    </>
  )

}