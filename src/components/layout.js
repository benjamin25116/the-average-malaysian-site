import * as React from "react"
import GlobalStyles from "../components/GlobalStyle"
import styled from "styled-components"
import Variables from "./StyleConstants"

import Menu from "./Menu"
import Footer from "./Footer"

const Main = styled.main`
  padding-top: calc(${Variables.menu.height} + 1rem);
  width: 100%;
  overflow-x: hidden;
  background-color: ${props =>
    props.dark ? Variables.color.lightestGrey : "white"};
`

const Layout = ({ title, children, location }) => {
  const dark = location.pathname === "/writings" && true
  return (
    <div>
      <GlobalStyles />
      <header>
        <Menu title={title} />
      </header>
      <Main dark={dark}>{children}</Main>
      <Footer />
    </div>
  )
}

export default Layout
