import React from "react"
import styled from "styled-components"
import Variables from "../StyleConstants"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const StyledArticle = styled.article`
  background-color: white;
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  box-shadow: 0 0 3px ${Variables.color.lighterGrey};

  :hover {
    background-color: ${Variables.color.lighterBrown};
    h3 {
      border-bottom: 2px solid white;
    }
  }
`

const StyledHeader = styled.header`
  h3 {
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 0.5rem;
    padding: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${Variables.color.lighterBrown};
    font-size: 0.8rem;
    line-height: 1rem;
    color: ${Variables.color.darkerGrey};
  }
  span {
    display: inline-block;
    font-size: 0.7rem;
    text-transform: uppercase;

    margin: 0;
    padding-right: 0.8rem;
  }
  @media (min-width: 415px) {
    h3 {
      line-height: 1.75rem;
    }
    span {
      margin-bottom: 0.8rem;
    }
  }
`
const StyledSection = styled.section`
  display: none;
  @media (min-width: 415px) {
    display: block;
  }

  p {
    margin: 0;
    line-height: 1.15rem;
    font-size: 0.9rem;
    color: ${Variables.color.darkerGrey};
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${Variables.color.darkGrey};
`
const CardImage = styled(GatsbyImage)`
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  z-index: 0;
`
const CardInfo = styled.div`
  padding: 1rem;
  grid-row: 1 / 3;
  grid-column: 2 / 3;

  @media (min-width: 415px) {
    padding: 1.5rem;
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
  category,
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
            <span>{`${author} • ${date}`}</span>
            <span>{`${timeToRead}-minute read • ${category}`}</span>
          </StyledHeader>
          {category === "writing" && (
            <StyledSection>
              <p
                dangerouslySetInnerHTML={{
                  __html: excerpt,
                }}
                itemProp="description"
              />
            </StyledSection>
          )}
        </CardInfo>
      </StyledArticle>
    </StyledLink>
  )
}
