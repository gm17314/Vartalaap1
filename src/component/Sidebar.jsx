import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Friends from './Friends'

const Sidebar = () => {
const Sidebar=styled.div`
display: flex;
flex-direction: column;
width: 30%;
height: 100%;
background-color: rgba(10, 10, 10, 0.466);
border-right:1px solid rgb(96, 103, 134);
overflow: hidden;
`

  return (
    <Sidebar>
      <Navbar/>
      <Searchbar/>
      <Friends/>
    </Sidebar>
  )
}

export default Sidebar
