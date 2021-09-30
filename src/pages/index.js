import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "../components/Slider"

const Home = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  

  return (
    <Layout title={siteTitle}>
      <Seo title="Home" />
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
      <Slider />
    </Layout>
  )
}

export default Home

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
`
