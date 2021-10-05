/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Variables from "../components/StyleConstants"

const Container = styled.div`
max-width: ${Variables.blog.maxWidth};
margin: 0 auto 2rem;
display: grid;
grid-template-columns: 1fr 3fr;
grid-template-rows: auto;
place-items: center start;

p {
  padding-left: 1rem;
  font-size: 1rem;
  line-height: 1.25rem;
  color: ${Variables.color.lightGrey};
}
`

const Bio = ({ benjamin, huey_lin }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            author {
              name
              summary
            }
          }
          social {
            youtube
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const [ben] = data.site.siteMetadata?.author.author.filter(
    author => author.name === "Benjamin"
  )
  const [lin] = data.site.siteMetadata?.author.author.filter(
    author => author.name === "Huey Lin"
  )
  const social = data.site.siteMetadata?.social

  if (benjamin) {
    return (
      <Container className="bio">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/ben.jpg"
          width={100}
          height={100}
          quality={95}
          alt="Profile picture"
        />
        {ben.name && (
          <p>
            Written by <strong>{ben.name}</strong>. {ben.summary || null}
            {` `}
            <a
              href={`https://www.youtube.com/channel/${social?.youtube || ``}`}
            >
              Check out their YouTube channel.
            </a>
          </p>
        )}
      </Container>
    )
  }
  if (huey_lin) {
    return (
      <Container className="bio">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/huey-lin.jpg"
          width={100}
          height={100}
          quality={95}
          alt="Profile picture"
        />
        {lin.name && (
          <p>
            Written by <strong>{lin.name}</strong> {lin.summary || null}
            {` `}
            <a
              href={`https://www.youtube.com/channel/${social?.youtube || ``}`}
            >
              Check out their YouTube channel.
            </a>
          </p>
        )}
      </Container>
    )
  }
  return (
    <Container className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/ben-huey-lin.jpg"
        width={100}
        height={100}
        quality={95}
        alt="Profile picture"
      />

      <p>
        Written by <strong>Ben and Huey Lin</strong> who lives and works in
        Sentul, Kuala Lumpur serving urban poor children.
        {` `}
        <a href={`https://www.youtube.com/channel/${social?.youtube || ``}`}>
          Check out their YouTube channel.
        </a>
      </p>
    </Container>
  )
}

export default Bio
