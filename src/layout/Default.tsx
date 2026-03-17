
import "@/resource/styles/layout/_default.scss"

export default function Default({ children }) {

  return (<>
    <div data-layout="default">
      <div className="specific">{ children }</div>
    </div>
  </>)

}