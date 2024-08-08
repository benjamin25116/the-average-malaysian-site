import React from "react"
import styled from "styled-components"
import Variables from "../StyleConstants"

const Background = styled.footer`
  background-color: ${Variables.color.lightestGrey};
  min-height: ${Variables.footer.minHeight};
`
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
  p,
  a {
    color: ${Variables.color.lightGrey};
    font-family: ${Variables.font.sansSerif};
    font-size: 0.8rem;
    line-height: 1rem;
    margin: 0;
  }
`

export default function Footer() {
  return (
    <Background>
      <Container>
        <p>
          © the average malaysian,{` `}
          {new Date().getFullYear()} <br />
        </p>
      </Container>
    </Background>
  )
}
