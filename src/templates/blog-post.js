import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Variables from "../components/StyleConstants"

const maxWidth = Variables.blog.maxWidth

const Wrapper = styled.div`
  padding: 2rem 1rem;
  max-width: ${maxWidth};
  margin: 0 auto;
`
const Header = styled.header`
  max-width: ${maxWidth};
  margin: 0 auto;
  a {
    display: block;
    color: ${Variables.color.lightGrey};
    margin-bottom: 1rem;
  }
`
const Heading = styled.h1`
  text-align: center;
`
const Description = styled.span`
  color: ${Variables.color.lightGrey};
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  text-align: center;
`
const Post = styled.article`
  max-width: ${maxWidth};
  margin: 0 auto;
  padding: 2rem 0;

  :first-letter {
    font-weight: 700;
    font-size: 3rem;
  }

  ul,
  ol {
    padding-left: 20px;
  }

  li {
    line-height: 1.75rem;
    font-size: 1.1rem;
  }

  li::marker {
    content: "• ";
    font-size: 1.75rem;
    padding-right: 10px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
    margin-top: 3rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
    margin-top: 2.5rem;
  }

  blockquote {
    border-left: 3px solid ${Variables.color.lightGrey};
    font-style: italic;
    padding: 0px 30px;
  }

  blockquote > p {
    font-size: 1.5rem;
    line-height: 2rem;
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
    li {
      width: 40%;
    }

    .nextLink {
      display: flex;
      justify-content: flex-end;
    }

    a {
      color: ${Variables.color.lightGrey};
    }
  }
`
const PrevArrow = styled.span`
  padding-right: 0.5rem;
`
const NextArrow = styled.span`
  padding-left: 0.5rem;
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
      <Wrapper>
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <Header>
            <Heading itemProp="headline">{post.frontmatter.title}</Heading>
            <Description>{`By ${post.frontmatter.author} • ${post.frontmatter.date}`}</Description>
            <Description>{`${post.timeToRead}-minute read`}</Description>
            <Link
              style={{ textAlign: "center", marginTop: "1rem" }}
              to="/writings"
            >
              Back to all writings
            </Link>
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
                <Link
                  className="previousLink"
                  to={`/writings` + previous.fields.slug}
                  rel="prev"
                >
                  <PrevArrow>&#10094;</PrevArrow> {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  className="nextLink"
                  to={`/writings` + next.fields.slug}
                  rel="next"
                  style={{ textAlign: "right" }}
                >
                  {next.frontmatter.title} <NextArrow>&#10095;</NextArrow>
                </Link>
              )}
            </li>
          </ul>
        </Nav>
      </Wrapper>
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
            gatsbyImageData(placeholder: BLURRED)
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
