import { Select } from '@/component/Select'

const items = [
  { label: '셀렉트1', value: 1 },
  { label: '셀렉트2', value: 2 },
  { label: '셀렉트3', value: 3 },
]

export default function CarouselPage() {

  const handler = {

    confirm(e) {

      console.log(e.currentTarget.value)

    }

  }

  return (
    <Select
      items={ items }
      onChange={ handler.confirm }
      value={ 2 }
    />
  )

}
