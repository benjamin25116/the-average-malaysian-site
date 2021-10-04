import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Variables from "../components/StyleConstants"

const maxWidth = "667px"

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
`
const Header = styled.header`
max-width: ${maxWidth};
margin: 0 auto;
`
const Description = styled.span`
color: ${Variables.color.lightGrey};
display: block;
margin-bottom: 1rem;
`
const Post = styled.section`
max-width: ${maxWidth};
margin: 0 auto;
padding: 2rem 0;

h2 {
  margin-top: 3rem;
  margin-bottom: 0rem;
}
`
const Nav = styled.nav`
max-width: ${maxWidth};
margin: 0 auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;

    a {
      color: ${Variables.color.darkerGrey};
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }
`

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const image = getImage(post.frontmatter.thumbnail)

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        url={`https://www.theaveragemalaysian.com/writings${post.fields.slug}`}
        type="article"
      />
      <Container>
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <Header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <Description>{`By ${post.frontmatter.author} • ${post.frontmatter.date} • ${post.timeToRead}-minute read`}</Description>
            <GatsbyImage image={image} alt="" />
          </Header>
          {/* <pre>{JSON.stringify(post.html, null, 2)}</pre> */}
          <Post
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <footer>
            {data.markdownRemark.frontmatter.author === "Benjamin" ? (
              <Bio benjamin />
            ) : (
              <Bio huey_lin />
            )}
          </footer>
        </article>
        <Nav className="blog-post-nav">
          <ul>
            <li>
              {previous && (
                <Link to={`/writings` + previous.fields.slug} rel="prev">
                  <span>&#10094;</span> {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={`/writings` + next.fields.slug} rel="next">
                  {next.frontmatter.title} <span>&#10095;</span>
                </Link>
              )}
            </li>
          </ul>
        </Nav>
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200)
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        author
        date(formatString: "D MMMM, YYYY")
        thumbnail {
          childImageSharp {
            gatsbyImageData(placeholder: TRACED_SVG)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
