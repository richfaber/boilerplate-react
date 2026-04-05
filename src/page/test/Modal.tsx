import { useModal } from '@/component/modal'

export default function ModalPage() {

  const { openModal } = useModal()

  const handler = {

    open() {

      openModal({

        id: 'helloModal',
        type: 'message',
        message: '안녕하세요!',
        onConfirm() {

          console.log('승인')

        }

      })

    },

    openInfinite() {

      openModal({

        type: 'message',
        message: '안녕하세요!',
        onCancel() {

          console.log('취소')

        }

      })

    }

  }

  return (
    <>
      <button type="button" onClick={handler.open}>모달 열기</button>
      <button type="button" onClick={handler.openInfinite}>Infinite</button>
    </>
  )

}