import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Card from "./Card"

const CardList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 1280px;
`

export default function CardIndex() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        nodes {
          excerpt
          timeToRead
          id
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
            />
          </li>
        )
      })}
    </CardList>
  )
}
