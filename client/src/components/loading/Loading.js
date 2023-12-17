
import { RotatingLines } from  'react-loader-spinner'

export default function Loading() {
  return (
    <div className='h-[100vh] w-auto flex items-center justify-center m-auto'>
      <RotatingLines
  strokeColor="black"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>
    </div>
  )
}
