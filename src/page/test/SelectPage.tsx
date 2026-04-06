import { useState } from 'react'
import { Select } from '@/component/Select'

const items = [
  { label: '셀렉트1', value: '1' },
  { label: '셀렉트2', value: '2' },
  { label: '셀렉트3', value: '3' },
]

export default function CarouselPage() {

  const [selectValue, setSelectValue] = useState('2')
  const handler = {

    confirm(e) {

      console.log(e.currentTarget.value)
      setSelectValue(e.currentTarget.value)

    }

  }


  return (
    <Select
      items={ items }
      onChange={ handler.confirm }
      value={ selectValue }
    />
  )

}
