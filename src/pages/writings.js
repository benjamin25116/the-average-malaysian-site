import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Variables from "../components/StyleConstants"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Card from "../components/Card/"

const Heading = styled.h2`
  color: ${Variables.color.darkGrey};
  text-align: center;
  width: 100%;
`
const PostWrapper = styled.ul`
list-style: none;
margin: 0;
padding: 0;
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 2rem;
width: 100%;

`

const Writings = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout title={siteTitle} location={location}>
      <Seo title="All posts" />
      <Heading>writings</Heading>
      <PostWrapper>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.fields.slug}>
              <Card
                slug={post.fields.slug}
                thumbnail={post.frontmatter.thumbnail}
                title={title}
                author={post.frontmatter.author}
                date={post.frontmatter.date}
                timeToRead={post.timeToRead}
                excerpt={post.excerpt}
              />
            </li>
          )
        })}
      </PostWrapper>
    </Layout>
  )
}

export default Writings

export const pageQuery = graphql`
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
          thumbnail {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG)
            }
          }
          author
        }
      }
    }
  }
`
