import * as React from "react"
import Styles from "../components/GlobalStyle"

import Menu from "./Menu"

const Layout = ({  title, children }) => {
  return (
    <div>
      <Styles />
      <header>
        <Menu title={title} />
      </header>
      <main style={{paddingTop: "60px", width: "100%", overflowX: "hidden"}}>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
