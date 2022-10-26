// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Realtime Cursor",
  tagline:
    "A react component that integrates Figma-like cursor chat into your application",
  url: "https://react-realtime-cursor.netlify.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "React Realtime Cursor",
        logo: {
          alt: "React Realtime Cursor Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            position: "left",
            docId: "introduction",
            label: "Docs",
          },
          {
            type: "doc",
            position: "left",
            docId: "api",
            label: "API",
          },
          {
            href: "https://github.com/7nohe/react-realtime-cursor",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs/introduction",
              },
              {
                label: "Guides",
                to: "/docs/category/guides",
              },
            ],
          },
          {
            title: "API",
            items: [
              {
                label: "API",
                to: "/docs/api",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/7nohe/react-realtime-cursor",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://twitter.com/daiki7nohe" target="_blank" rel="noopener noreferrer">@7nohe</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
