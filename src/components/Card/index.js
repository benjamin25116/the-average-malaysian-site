import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Variables from "../StyleConstants"

const StyledArticle = styled.article`
  background-color: white;
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`
const StyledHeader = styled.header`
  h3 {
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 1rem;
    padding: 0.8rem 0;
    border-bottom: 2px solid ${Variables.color.lightBrown};
    line-height: 1.75rem;
    color: ${Variables.color.lightGrey};
  }
  span {
    font-size: 0.9rem;
    font-style: italic;
  }
`
const StyledSection = styled.section`
  min-height: 90px;
  p {
    line-height: 1.35rem;
    color: ${Variables.color.lightGrey}
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${Variables.color.darkGrey};
`
const CardImage = styled(GatsbyImage)`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  
  @media(min-width: 568px){
    grid-row: 1 / 3;
    grid-column: 1 / 2;
  }
  `
const CardInfo = styled.div`
  padding: 1.5rem;
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  
  @media(min-width: 568px){
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }
`

export default function Card({
  slug,
  thumbnail,
  title,
  author,
  date,
  timeToRead,
  excerpt,
}) {
  return (
    <StyledLink to={`/writings` + slug} itemProp="url">
      <StyledArticle
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <CardImage image={getImage(thumbnail)} alt="" />

        <CardInfo>
          <StyledHeader>
            <h3 itemProp="headline">{title}</h3>
            <span>{`by ${author}`}</span>
            <br />
            <span>{`${date} • ${timeToRead}-minute read`}</span>
          </StyledHeader>
          <StyledSection>
            <p
              dangerouslySetInnerHTML={{
                __html: excerpt,
              }}
              itemProp="description"
            />
          </StyledSection>
        </CardInfo>
      </StyledArticle>
    </StyledLink>
  )
}
