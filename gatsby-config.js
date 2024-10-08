module.exports = {
  siteMetadata: {
    title: `the a.m.`,
    author: {
      author: [
        {
          name: `Ben`,
          summary: `Husband, father, child of God. Married to Huey Lin. Spent 8 years working as a teacher before transitioning into a creative role. Currently leading a team of creatives in a marketing startup as a Creative Director.`,
        },
        {
          name: `Huey Lin`,
          summary: `who chose to be a stay-at-home mom in this season to spend more time intentionally with her children. Married to Benjamin.`,
        },
      ],
    },

    description: `Personal blogs of Ben and Huey Lin, the self-proclaimed "average Malaysian". Here you will find stories, lessons, and encouragement from two average Malaysians to you.`,
    siteUrl: `https://www.theaveragemalaysian.com`,
    social: {
      youtube: `UC6cpBoxdvVpMNz2u_NMHMJw`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        serialize: ({ path }) => ({
          url: path,
        }),
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.theaveragemalaysian.com",
        sitemap: "https://www.theaveragemalaysian.com/sitemap/sitemap-0.xml",
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: "/404.html",
            disallow: "/404/",
            disallow: "/dev-404-page/",
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1280,
              tracedSVG: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-PM6M1D5J2K"],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          // anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Average Malaysian`,
        short_name: `the a.m.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#696969`,
        display: `minimal-ui`,
        // This path is relative to the root of the site.
        icon: `src/images/ben-huey-lin.jpg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
