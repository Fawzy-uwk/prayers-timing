import { ClockLoader } from 'react-spinners';
function Loader() {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <ClockLoader
                color="#00612b"
                cssOverride={{}}
                size={100}
                speedMultiplier={2}
            />
        </div>
    )
}

export default Loader
