import * as React from "react"
import { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

const Container = styled(motion.article)`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  width: 100%;
  height: calc(100vh - 60px);
  padding: 0 1rem 1rem;
`
const HeroImage = styled(GatsbyImage)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  border-radius: 0.15rem;
  z-index: 0;
  width: 100%;
`
const Overlay = styled(motion.div)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  z-index: 1;
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Heading = styled.h2`
  color: white;
  font-size: 2rem;
  text-align: center;
`
const StyledLink = styled(Link)`
  border: 1px solid white;
  border-radius: 0.15rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 2rem;
  max-width: 8rem;
  text-align: center;
`
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid white;
`
const PrevPost = styled(Button)`
  transform: rotate(90deg);
`
const NextPost = styled(Button)`
  transform: rotate(-90deg);
`

const Info = styled.section`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  /* border: 1px solid green; */
`

const Slider = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "D MMMM, YYYY")
            title
            author
            thumbnail {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes

  const cards = posts.map(post => {
    return (
      <Container
        key={post.frontmatter.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <HeroImage image={getImage(post.frontmatter.thumbnail)} />
        <Overlay
        key={post.fields.slug}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ type: "tween", duration: 0.5 }}
        >
          <PrevPost onClick={handleClick}>PREV</PrevPost>
          <Info>
            <Heading>{post.frontmatter.title}</Heading>
            <StyledLink to={`/writings` + post.fields.slug}>
              Read this
            </StyledLink>
          </Info>
          <NextPost onClick={handleClick}>NEXT</NextPost>
        </Overlay>
      </Container>
    )
  })

  const [current, setCurrent] = useState(0)

  function handleClick(e) {
    if (e.target.innerText === "NEXT") {
      setCurrent((current + 1) % cards.length)
      
    }
    if (e.target.innerText === "PREV") {
      setCurrent(Math.abs(current - 1) % cards.length)
    }
  }
  return <AnimatePresence exitBeforeEnter>{cards[current]}</AnimatePresence>
}

export default Slider
