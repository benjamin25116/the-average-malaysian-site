import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Variables from "../StyleConstants"

const StyledArticle = styled.article`
  background-color: white;
  width: 100%;
  max-width: 500px;
  
`
const StyledHeader = styled.header`
  h3 {
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 1rem;
    padding: 0.8rem 0;
    border-bottom: 2px solid #e9c49a;
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
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${Variables.color.darkGrey};
`
const ImageWrapper = styled.div` 
`
const InfoWrapper = styled.div`
padding: 1.5rem; 

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
        <ImageWrapper>
          <GatsbyImage image={getImage(thumbnail)} alt="" />
        </ImageWrapper>
        <InfoWrapper>
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
        </InfoWrapper>
      </StyledArticle>
    </StyledLink>
  )
}
