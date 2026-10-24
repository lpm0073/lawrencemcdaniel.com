// options:
// Audio, BallTriangle, Bars, Blocks, Circles, CirclesWithBar, ColorRing, Comment,
// Discuss, Dna, FallingLines, FidgetSpinner, Grid, Hearts, InfinitySpin, LineWave,
// MagnifyingGlass, MutatingDots, Oval, ProgressBar, Puff, Radio, RevolvingDot,
// Rings, RotatingLines, RotatingSquare, RotatingTriangles, TailSpin, ThreeCircles,
// ThreeDots, Triangle, Vortex, Watch
import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="col-12 text-center">
      <ThreeDots color="#038fc5" height={100} width={100} />
    </div>
  )
}

export default Loading
