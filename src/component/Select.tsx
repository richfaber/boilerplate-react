import type React from "react"

export type Item = {
  value: string | number
  label: string
}

export type Prop = {
  items: Item[]
} & React.ComponentProps<'select'>

export function Select({ children, items, ...rest }: Prop) {

  return (
    <select { ...rest }>
      { children }
      {
        items.map(( item, idx ) => {

          return (
            <option key={ idx } value={ item.value }>{ item.label }</option>
          )

        })
      }
      
    </select>
  )


}