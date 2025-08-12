import {SyncLoader} from "react-spinners"
import '../../assets/styles/components/common/Loader.css'
const Loader=()=>{
    return (
        <>
        <div className="loader-container">
            <SyncLoader
                color="#36d7b7"
                size={12}
                speedMultiplier={0.8}
            />
        </div>
                        
        </>
    )
}

export default Loader;
