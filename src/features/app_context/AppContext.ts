import { createContext } from "react"
import type ModalData from "./ModalData"
import type ToastData from "./ToastData"
import type { UserType } from "../../entities/user/model/UserType"

type AppContextType = {
    user: UserType | null,
    setUser: (input: UserType | null) => void,
    showToast: (data: ToastData) => void,
    showModal: (data: ModalData) => void,
    clearModal: () => void,
    setBusy: (isBusy: boolean) => void,
    isBusy: boolean,
    // cart: CartType,
    // setCart: (input: CartType) => void
}

const AppContext = createContext<AppContextType>({
    user: null,
    setUser: (_) => {
        throw "Not Implemented 'setUser'"
    },
    showToast: (_) => {
        throw "Not Implemented 'showToast'"
    },
    showModal: (_) => {
        throw "Not Implemented 'showModal'"
    },
    clearModal: () => {
        throw "Not Implemented 'clearModal'"
    },
    setBusy: (_) => {
        throw "Not Implemented 'setBusy'"
    },
    isBusy: false,
    // cart: {items:[], price: 0},
    // setCart: (_) => {
    //     throw "Not Implemented 'setCart'"
    // }
})

export { AppContext }