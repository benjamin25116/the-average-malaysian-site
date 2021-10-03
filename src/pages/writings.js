import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Variables from "../components/StyleConstants"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Posts from "../components/Posts/"

const Heading = styled.h2`
  color: ${Variables.color.darkGrey};
  text-align: center;
  width: 100%;
`

const Writings = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  

  return (
    <Layout title={siteTitle} location={location}>
      <Seo title="All posts" />
      <Heading>all writings</Heading>
     <Posts/>
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
  }
`
