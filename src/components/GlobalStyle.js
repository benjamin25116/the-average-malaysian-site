import React from "react"
import { createGlobalStyle } from "styled-components"
import Normalise from "./Normalise"
import Variables from "../components/StyleConstants"

const Style = createGlobalStyle`
main {
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;

  font-family: ${Variables.font.sansSerif};
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${Variables.font.serif};
}
`

export default function GlobalStyle() {
  return (
    <>
      <Normalise />
      <Style />
    </>
  )
}
