// require("dotenv").config({
//     path: `.env.${process.env.NODE_ENV}`,
//   });

//   const contentfulConfig = {
//     spaceId: process.env.CONTENTFUL_SPACE_ID,
//     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
//   };

//   // if you want to use the preview API please define
//   // CONTENTFUL_HOST in your environment config
//   // the `host` property should map to `preview.contentful.com`
//   // https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//   if (process.env.CONTENTFUL_HOST) {
//     contentfulConfig.host = process.env.CONTENTFUL_HOST;
//   }

//   const { spaceId, accessToken } = contentfulConfig;

//   if (!spaceId || !accessToken) {
//     throw new Error(
//       "Contentful spaceId and the access token need to be provided."
//     );
//   }

const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Contentful starter',
  },
  // pathPrefix: "/gatsby-contentful-starter",
  plugins: [
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-resolve-src`,
    //   {
    //     resolve: "gatsby-source-contentful",
    //     options: contentfulConfig,
    //   },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/app/components'),
        containers: path.join(__dirname, 'src/app/containers'),
        images: path.join(__dirname, 'src/app/images'),
        translations: path.join(__dirname, 'src/app/translations'),
        tests: path.join(__dirname, 'src/app/tests'),
        utils: path.join(__dirname, 'src/app/utils'),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
};
