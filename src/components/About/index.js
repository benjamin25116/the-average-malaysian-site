import React from "react"
import styled from "styled-components"
import Variables from "../StyleConstants"

const Container = styled.section`
  max-width: 768px;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: 568px) {
    align-items: center;
    flex-direction: row;
    padding: 2rem;
    gap: 2rem;
  }
`
const Title = styled.h2`
  color: ${Variables.color.lightGrey};
  text-align: left;

  margin: 0 0 1rem 0;
  @media (min-width: 568px) {
    text-align: right;
  }
`
const Body = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  line-height: 1.2rem;
  color: ${Variables.color.lightGrey};
`

export default function About() {
  return (
    <Container>
      <Title>the&nbsp;a.m.</Title>
      <Body>
        stands for “the average Malaysian”. This is the personal blog of two
        average Malaysians who are based in Kuala Lumpur. Here, we share our
        unique experiences, perspectives, and lessons learnt.
      </Body>
    </Container>
  )
}
