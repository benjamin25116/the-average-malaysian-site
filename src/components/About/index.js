import React from "react"
import styled from "styled-components"
import Variables from "../StyleConstants"

const Container = styled.section`
  max-width: 768px;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
`
const Title = styled.h2`
  color: ${Variables.color.lightGrey};
  text-align: right;
`
const Body = styled.p`
  color: ${Variables.color.lightGrey};
`

export default function About() {
  return (
    <Container>
      <Title>the&nbsp;a.m.</Title>
      <Body>
        stands for “the average malaysian”. It's a term we've all heard of, but really, <em>there is no such thing</em>. The "average malaysian" is made up of diverse people, each with their unique experience, perspective and culture. Here you will find stories, lessons, and encouragement from one "average malaysian" to another. 
      </Body>
    </Container>
  )
}
