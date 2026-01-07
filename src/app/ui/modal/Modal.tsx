import type { ReactNode } from 'react'
import type ModalData from '../../../features/app_context/ModalData'
import './Modal.css'

export default function Modal({ modalData, setModalData }: { modalData: ModalData | null, setModalData: React.Dispatch<React.SetStateAction<ModalData | null>> }) {

    const onCancel = () => {
        if (modalData?.isCancellable) {
            if (modalData?.onCancel) {
                modalData?.onCancel()
            }
            setModalData(null)
        }
    }

    return modalData == null
        ? <></>
        : <div className='app-modal' onClick={onCancel}>
            <div className='app-modal-dlg' onClick={e => e.stopPropagation()}>
                <div className='app-modal-head'>
                    <div className='app-modal-close' role='button' onClick={onCancel}><i className="bi bi-x"></i></div>
                    <div className='app-modal-title'>{modalData.title}</div>
                </div>
                <div className='app-modal-content'>
                    {modalData.children}
                </div>
            </div>
        </div>
}