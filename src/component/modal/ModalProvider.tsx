import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

import style from './Modal.module.scss'

type ModalItem = {
  id?: string
  type?: 'confirm' | 'message' | 'error'
  message: string
  onConfirm?: () => void
  onCancel?: () => void
}

type ModalContextType = {

  openModal: (modal: ModalItem) => void
  closeModal: (id: number) => void

}

const ModalContext = createContext<ModalContextType | null>(null)

export function useModal() {

  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal은 ModalProvider 안에서 사용해야 함')
  return context

}

function Modal({ modals, closeModal }: { modals: ModalItem[], closeModal: (id: string) => void }) {

  return createPortal(
    <>
      {modals.map(modal => (

        <div key={ modal.id } className={ style.modal }>

          <div className={ style.modalWrapper }>

            <div className={ style.header }>
              Header
            </div>

            <div className={ style.body }>
              { modal.message }
            </div>

            <div className={ style.footer }>

              <button onClick={() => {

                modal.onConfirm?.()
                closeModal(modal.id)
              
              }}>확인</button>

              <button onClick={() => {

                modal.onCancel?.()
                closeModal(modal.id)
              
              }}>취소</button>

            </div>

          </div>

        </div>

      ))}
    </>
    , document.body)

}

export function ModalProvider({ children }) {

  const [modals, setModals] = useState<ModalItem[]>([])

  function openModal(modal: ModalItem) {

    const id = modal.id ?? Date.now().toString()
    if(modal.id && modals.some(m => m.id=== modal.id) ) return

    setModals(prev => [...prev, { ...modal, id }])
  
  }

  function closeModal(id: string) {
    setModals(prev => prev.filter(m => m.id !== id))
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>

      { children }
      <Modal modals={ modals } closeModal={ closeModal } />
    
    </ModalContext.Provider>
  )

}
