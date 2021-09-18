import * as React from "react"
import Styles from "../components/GlobalStyle"

import Menu from "./menu/Menu"

const Layout = ({ location, title, children }) => {
  return (
    <div>
      <Styles />
      <header>
        <Menu location={location} title={title} />
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
