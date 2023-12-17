
import { Blocks } from  'react-loader-spinner'

export default function Loading() {
  return (
    <div className='h-[100vh] w-auto flex items-center justify-center m-auto'>
<Blocks
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
/>
    </div>
  )
}
