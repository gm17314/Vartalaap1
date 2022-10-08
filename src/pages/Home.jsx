import React from 'react'
import styled from "styled-components";
import { Flex} from "../component/Common";
import Sidebar from '../component/Sidebar';
import Chatarea from '../component/Chatarea';
const Home = () => {
    const Home=styled(Flex)`
    height: 100vh;
    `
    const UserInterface=styled(Flex)`
    width: 78%;
    height: 83%;
    overflow: hidden;
    justify-content: flex-start;
    backdrop-filter: blur(12px) saturate(185%);
    -webkit-backdrop-filter: blur(12px) saturate(185%);
    background-color: rgba(255, 255, 255, 0.28);
    border-radius: 12px;
    `
  return (
    <>
      <Home>
        <UserInterface>
          <Sidebar/>
          <Chatarea/>
        </UserInterface>
      </Home>
    </>
  )
}

export default Home
