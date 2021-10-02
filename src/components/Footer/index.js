import React from "react"
import styled from "styled-components"
import Variables from "../StyleConstants"

const Background = styled.footer`
  background-color: ${Variables.color.lighterGrey};
`
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-size: 0.9rem;
  text-align: center;
  p,
  a {
    color: ${Variables.color.lightGrey};
    font-family: ${Variables.font.sansSerif};
  }
`

export default function Footer() {
  return (
    <Background>
      <Container>
        <p>
          © the average malaysian,{` `}
          {new Date().getFullYear()} <br />
          Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </p>
      </Container>
    </Background>
  )
}
