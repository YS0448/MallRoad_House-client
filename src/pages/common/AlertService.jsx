import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';


const autoCloseTime = 3000
export const Toast = ()=>{
    return(
        <ToastContainer 
            position="top-center"
            autoClose= {autoCloseTime}
            hideProgressBar={false}
            newestOnTop={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            // theme="dark"
        />
    );
}

export const showToast = (type="default", message)=>{
    // toast[type](message);
    // Type = success, error, warning, info, default, loading
    return new Promise (resolve=>{
        toast[type](message, {
            onClose: resolve,
            autoClose: autoCloseTime
        })
    })
}

export const showSwal = (icon='success', title='Success', text='', timer='2000')=>{
    return Swal.fire({
        icon,
        title,
        text,
        timer,
        showConfirmButton: true,
    });
}