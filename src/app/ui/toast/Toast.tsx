import type ToastData from '../../../features/app_context/ToastData'
import './Toast.css'

export default function Toast({toastData} : {toastData: ToastData}) {

    return <div className="toast-wrap">
        <div className='toast-text'>{toastData.message}</div>
    </div>
}