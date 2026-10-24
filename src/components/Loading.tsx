/**
 * The spinner that a page shows while its data loads: three pulsing dots,
 * drawn with CSS (Loading.css), so that it needs no library.
 */
import './Loading.css'

const Loading = () => {
  return (
    <div className="col-12 text-center">
      <div className="loading-dots" role="status" aria-label="three-dots-loading">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export default Loading
