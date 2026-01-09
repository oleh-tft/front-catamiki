import { useEffect, useState } from "react"
import type { UserType } from "../../entities/user/model/UserType"
import { AppContext } from "../../features/app_context/AppContext"
import type ModalData from "../../features/app_context/ModalData"
import type ToastData from "../../features/app_context/ToastData"
import Modal from "./modal/Modal"
import './App.css'
import Toast from "./toast/Toast"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../../features/layout/Layout"
import Category from "../../pages/category/Category"
import Home from "../../pages/home/Home"
import NotFound from "../../pages/not_found/NotFound"
import Privacy from "../../pages/privacy/Privacy"
import Product from "../../pages/product/Product"
import Profile from "../../pages/profile/Profile"
import type AuctionCartType from "../../entities/auction/model/AuctionCartType"
import AuctionDao from "../../entities/auction/api/AuctionDao"

declare global {
  interface Number {
    toTimeRemaining: () => string
  }
}

Number.prototype.toTimeRemaining = function (): string {
  const secondsRemaining = this.valueOf()
  if (secondsRemaining <= 0) {
    return "The end date has passed.";
  }

  const totalMinutes = Math.floor(secondsRemaining / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const remainingHours = totalHours % 24;
  const remainingMinutes = totalMinutes % 60;

  if (totalDays > 0) {
    return `${totalDays} day${totalDays !== 1 ? 's' : ''} left`;
  } else if (remainingHours > 0) {
    return `${remainingHours} hour${remainingHours !== 1 ? 's' : ''} left`;
  } else {
    return `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} left`;
  }
}

function App() {
  const [user, setUser] = useState<UserType | null>(null)
  const [toastData, setToastData] = useState<ToastData | null>(null)
  const [toastQueue, setToastQueue] = useState<Array<ToastData>>([])
  const [modalData, setModalData] = useState<ModalData | null>(null)
  const [isBusy, setBusy] = useState<boolean>(false)
  const [cart, setCart] = useState<AuctionCartType>(AuctionDao.restoreSaved())

  const dequeueToast = () => {
    setToastQueue(q => q.slice(0, q.length - 1))
  }

  const showToast = (data: ToastData) => {
    setToastQueue([data, ...toastQueue])
  }

  const showModal = (data: ModalData) => {
    setModalData(data)
  }

  const clearModal = () => {
    setModalData(null)
  }

  useEffect(() => {
    if (toastQueue.length == 0) {
      setToastData(null)
    } else {
      let lastToastData = toastQueue[toastQueue.length - 1]
      if (toastData != lastToastData) {
        setToastData(lastToastData)
        setTimeout(dequeueToast, lastToastData.timeout ?? 2000)
      }
    }

  }, [toastQueue])

  useEffect(() => {
    const savedUser = window.localStorage.getItem("cm-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      }
      catch (err) {
        console.error("User restore error: ", err)
      }
    }

    return () => { }
  }, [])

  useEffect(() => {
    AuctionDao.save(cart)
  }, [cart])

  return <AppContext.Provider value={{ setBusy, isBusy, user, setUser, showToast, showModal, clearModal, cart, setCart }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="profile" element={<Profile />} />
          <Route path='l/:slug' element={<Product />} />
          <Route path='c/:slug' element={<Category />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      <Modal modalData={modalData} setModalData={setModalData} />
    </BrowserRouter>

    <div className="toaster">
      {toastQueue.map((td, i) => <Toast toastData={td} key={i} />)}
    </div>


    {isBusy &&
      <div className='preloader'>
        <div className='preloader-content'>
          <img className="preloader-spinner" src="/img/Spinner.svg" alt="loading" />
        </div>
      </div>
    }

  </AppContext.Provider>
}

export default App
