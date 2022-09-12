import React from 'react'

export const Child = (props) => {
  //console.log(props)
  return (
    <tr>
      <td>{props.hid}</td>
      <td>{props.hnombre}</td>
    </tr>
  )
}
