import React from "react"
import {useStaticQuery,graphql,Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = () => { 

 const data = useStaticQuery(
   graphql`
    query{
      allContentfulPost(sort: {fields: contentful_id, order: DESC}) {
        edges {
          node {
            id
            author
            createdAt(formatString: "DD MMMM, YYYY")
            slug
            subtitle
            title
            image{
              fluid(maxWidth: 750){
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
   `
 )
 

 return(
  <Layout>
    <SEO title="Blog" />
    <p>
    <Link to="/">Go back to the homepage</Link>
    </p>
    <div style={{textAlign:'center'}}>
    <ul style={{listStyle:'none'}}>
        {data.allContentfulPost.edges.map(edge => {
          return (
            <li style={{marginTop:'50px'}} key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.slug}/`}>{edge.node.title}</Link>
              </h2>
              <div className="meta">
                <span>Posted on {edge.node.createdAt}</span>
              </div>
              {edge.node.image && (
                <Img
                  className="featured"
                  fluid={edge.node.image.fluid}
                  alt={edge.node.title}
                />
              )}
              <p>
                {edge.node.subtitle}
              </p>
              <h5>
                {edge.node.author}
              </h5>
              <div className="button">
                <Link style={{textDecoration:'none',border:'2px solid gray',padding:'10px',}}to={`/blog/${edge.node.slug}/`}>Read More</Link>
              </div>
            </li>
          )
        })}
      </ul>
      </div>
  </Layout>
 )
}

export default Blog
