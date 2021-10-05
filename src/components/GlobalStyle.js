import React from "react"
import { createGlobalStyle } from "styled-components"
import Normalise from "./Normalise"
import Variables from "../components/StyleConstants"

const Style = createGlobalStyle`

main {
  font-family: ${Variables.font.sansSerif};
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${Variables.font.serif};
  color: ${Variables.color.darkerGrey};
}

h1 {
  line-height: 2.5rem;
  margin-bottom: 0.8rem;
}

p {
  line-height: 2rem;
  font-size: 1.1rem;
}

blockquote {
  padding: 1rem 0;
  p{
    font-family: ${Variables.font.sanSerif};
    font-size: 1.8rem;
    font-style: italic;
    line-height: 2.5rem;
    color: ${Variables.color.lightGrey};
  }
  strong {
    font-size: 1.2rem;
    color: ${Variables.color.darkGrey};
  }
}

.bio-avatar {
  width: 100px;
}

a {
  text-decoration: underline;
  color: inherit;
  :hover {
    text-decoration: none;
  }
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
