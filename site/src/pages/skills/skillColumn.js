import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import drawCircle from './drawCircle'

/*
 Canvas animated drawing in React: http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/
 */

const SkillColumn = (props) => {
  const thisClassName = 'fa p-3 ' + props.icon + ' fa-2x'
  const ref = useRef()
  const keyName = 'skill-column-' + props.key

  useEffect(() => drawCircle(ref))

  return (
    <React.Fragment>
      <div key={keyName} className="col-lg-2 col-md-4 col-sm-6 px-1 mb-5">
        <div className="skill-column text-center">
          <div className="skill-pct text-center">
            <div className="skill-pct-text">{props.pct}%</div>
            <canvas ref={ref} />
          </div>
          <h4 className="skill-title mt-4">{props.title}</h4>
          <p className="skill-description px-2">{props.description}</p>
          <div className="skill-icon">
            <i className={thisClassName}></i>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SkillColumn
