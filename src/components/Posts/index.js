import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Card from "./Card"

const CardList = styled.ul`
  list-style: none;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1280px;

  @media (min-width: 415px) {
    padding-bottom: 1.5rem;
    gap: 1.5rem;
  }
`

export default function CardIndex() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        nodes {
          excerpt(pruneLength: 80)
          timeToRead
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "D MMM, YYYY")
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData(placeholder: TRACED_SVG)
              }
            }
            author
            category
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes

  return (
    <CardList>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <li key={post.id}>
            <Card
              slug={post.fields.slug}
              thumbnail={post.frontmatter.thumbnail}
              title={title}
              author={post.frontmatter.author}
              date={post.frontmatter.date}
              timeToRead={post.timeToRead}
              excerpt={post.excerpt}
              category={post.frontmatter.category}
            />
          </li>
        )
      })}
    </CardList>
  )
}
