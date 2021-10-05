import * as React from "react"
import { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import Variables from "../StyleConstants"

const Container = styled(motion.article)`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  width: 100%;
  height: calc(100vh - ${Variables.menu.height});
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
  display: grid;
  grid-template-columns: 60px auto 60px;
  grid-template-rows: auto;
`
const Heading = styled.h2`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
`
const Description = styled.span`
  color: white;
  margin-bottom: 0.5rem;
  @media (max-width: 567px) {
    font-size: 0.8rem;
  }
`
const StyledLink = styled(Link)`
  border: 1px solid white;
  border-radius: 0.15rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 2rem;
  text-align: center;

  :hover {
    color: ${Variables.color.darkGrey};
    border: 1px solid ${Variables.color.darkGrey};
  }
`
const Button = styled.button`
  background-color: transparent;
  font-weight: bold;
  border: none;
  color: white;
  height: 40px;
  padding-top: 0.35rem;
  border-top: 1px solid white;
  cursor: pointer;
  :hover {
    color: ${Variables.color.darkGrey};
    border-top: 1px solid ${Variables.color.darkGrey};
  }
`
const PrevPost = styled(Button)`
  transform: rotate(90deg);
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  place-self: end center;
`
const NextPost = styled(Button)`
  transform: rotate(-90deg);
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  place-self: end center;
`

const Info = styled(motion.section)`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: 0 0 30px black;
`

const Slider = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "D MMM, YYYY")
            title
            author
            thumbnail {
              childImageSharp {
                gatsbyImageData(placeholder: TRACED_SVG)
              }
            }
          }
        }
      }
    }
  `)

  const [order, setOrder] = useState({ prev: 2, current: 0, next: 1 })

  function handleClick(e) {
    e.target.innerText === "NEXT"
      ? setOrder({
          prev: order.current,
          current: order.next,
          next: order.prev,
        })
      : setOrder({
          prev: order.next,
          current: order.prev,
          next: order.current,
        })
  }

  const posts = data.allMarkdownRemark.nodes

  const slides = posts.map(post => {
    return (
      <Container
        key={post.frontmatter.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <HeroImage image={getImage(post.frontmatter.thumbnail)} alt="" />
        <Overlay>
          <PrevPost onClick={handleClick}>PREV</PrevPost>
          <Info
            key={post.fields.slug}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <Heading>{post.frontmatter.title}</Heading>
            <Description>{`by ${post.frontmatter.author}`}</Description>
            <Description>{`${post.frontmatter.date}`}</Description>
            <StyledLink to={`/writings` + post.fields.slug}>
              Read this
            </StyledLink>
          </Info>
          <NextPost onClick={handleClick}>NEXT</NextPost>
        </Overlay>
      </Container>
    )
  })

  return (
    <AnimatePresence exitBeforeEnter>{slides[order.current]}</AnimatePresence>
  )
}

export default Slider
