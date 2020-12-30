import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { renderRichText } from "gatsby-source-contentful/rich-text"


export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      subtitle
      author
      createdAt(formatString: "Do MMMM, YYYY")
      image {
        fluid(maxWidth: 750) {
          ...GatsbyContentfulFluid
        }
      }
      body{
        raw
      }
     
    }
  }
`
const BlogPost = props => {
  return (
    <Layout>
      <SEO title={props.data.contentfulPost.title} />
      <div className="content">
        {props.data.contentfulPost.image && (
        <Img
          className="featured"
          fluid={props.data.contentfulPost.image.fluid}
          alt={props.data.contentfulPost.title}
        />
        )}
        <h1>{props.data.contentfulPost.title}</h1>
        <span className="meta">
          Posted on {props.data.contentfulPost.createdAt}
        </span>
        <p>
          {`By ${props.data.contentfulPost.author}`}
        </p>
        <br/>
        <br/>
        <p>
          {props.data.contentfulPost.subtitle}
        </p>
       {renderRichText(props.data.contentfulPost.body)}
      </div>
      <Link to="/blog/">Visit the Blog Page</Link>
    </Layout>
  )
}

export default BlogPost


