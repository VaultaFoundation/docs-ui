// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// include(./redocly-versions.m4)

const redocusaurusSpecs = require('./redocusaurus.specs.js');

// @ts-ignore
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EOS Developer Documentation',
  tagline: 'Documentation for Developing on EOS Blockchain',
  url: 'https://docs.eosnetwork.com/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  // image under statics directory
  favicon: 'img/cropped-EOS-Network-Foundation-Site-Icon-1-150x150.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'eosnetwork', // Usually your GitHub org/user name.
  projectName: 'developer-documentation', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'], // , 'zh', 'ko'
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      zh: {
        label: '中文 Chinese',
        direction: 'ltr',
        htmlLang: 'zh-CN',
        calendar: 'gregory',
        path: 'zh',
      },
      ko: {
        label: '한국어 Korean',
        direction: 'ltr',
        htmlLang: 'ko-KR',
        calendar: 'gregory',
        path: 'ko',
      },
    },
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          // id: 'docs', // omitted => default instance
          lastVersion: 'current',
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./src/sidebars.js'),
          versions: {
            current: {
              label: 'latest',
              path: 'latest',
            },
          },
          admonitions: {
            tag: '> '
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleTagManager: {
          containerId: 'GTM-T4SWD2V'
        },
      }),
    ],
    [
      'redocusaurus',
      {
        specs: redocusaurusSpecs,
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#1890ff',
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'apis',
        path: 'apis',
        routeBasePath: 'apis',
        sidebarPath: require.resolve('./src/sidebars.js'),
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'manuals',
        path: 'manuals',
        routeBasePath: 'manuals',
        sidebarPath: require.resolve('./src/sidebars.js'),
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/latest/node-operation/migration-guides/v1-history-alternatives',
            from: '/leapforward/',
          },
          {
            to: '/docs/latest/eos-evm/',
            from: '/docs/latest/eos-evm/getting_started/',
          },
          // Redirect from multiple old paths to the new path
          // {
          //   to: '/docs/new/path',
          //   from: ['/docs/old/path', '/docs/older/path'],
          // },
        ],
      },
    ]
  ],

  staticDirectories: [
      "openapi",
      "static"
  ],

  // custom fields for nav bar
  customFields: {
    navbar: {
      logo: {
        alt: 'EOS Network',
        src: 'img/eosn_logo_light.png',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Learn',
          position: 'left',
          items: [
            {
              label: 'Smart Contracts', // This label is used for mobile view
              title: 'Smart Contracts',
              subtitle: 'Learn to develop EOS smart contracts',
              icon: '/icons/brief-case-icon.svg', //replace with required icon
              href: '/docs/latest/smart-contracts/',
            },
            {
              label: 'Node Operation',
              title: 'Node Operation',
              subtitle: 'Learn how to operate an EOS node',
              icon: '/icons/db-icon.svg',
              href: '/docs/latest/node-operation/',
            },
            {
              label: 'Web Development',
              title: 'Web Development',
              subtitle: 'Learn to integrate EOS into your web app',
              icon: '/icons/globe-icon.svg',
              href: '/docs/latest/web-applications/',
            },
            {
              label: 'EOS EVM',
              title: 'EOS EVM',
              subtitle: 'Learn to develop on EOS EVM',
              icon: '/icons/box-icon.svg',
              href: '/docs/latest/eos-evm/',
            }
          ],
        },
        {
          docId: 'courses',
          position: 'left',
          label: 'Courses',
          to: 'https://learn.eosnetwork.com/',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    main: {
      firstCards: [
        {
          icon: '/icons/docs-icon.svg',
          title: 'Learn The Basics',
          subtitle: 'Everything you need to know about blockchain to get you started',
          link: '/docs/latest/blockchain-basics/',
        },
        {
          icon: 'icons/emerald-icon.svg', // docs
          title: 'Smart Contracts',
          subtitle: 'Learn how to develop smart contracts on EOS',
          link: '/docs/latest/smart-contracts/getting-started/smart-contract-basics',
        }
      ],
      secondCards: [
        {
          icon: 'icons/molecules-icon.svg',
          title: 'Create a Token',
          subtitle: 'Learn how to develop fungible tokens',
          link: '/docs/latest/smart-contracts/tutorials/create-a-token',
          color: 'yellow',
        },
        {
          icon: '/icons/chat-icon.svg',
          title: 'Create an NFT',
          subtitle: 'Learn how to develop non-fungible tokens',
          link: '/docs/latest/smart-contracts/tutorials/create-an-nft',
          color: 'yellow',
        },
        {
          icon: '/icons/ref-icon.svg',
          title: 'Reference',
          subtitle: "Consult the API references explore the EOS RPC",
          link: '/docs/latest/apis-and-manuals',
        },
        {
          icon: '/icons/ethereum-logo.svg',
          title: 'EOS EVM',
          subtitle: 'Take advantage of the world\'s fastest EVM',
          link: '/docs/latest/eos-evm/',
        }
      ],
      wideCard: {
        title: 'EOS EVM',
        tagline:'A brand new home for EVM developers',
        subtitle: `Migrate your apps to the world's fastest and cheapest EVM using tools and frameworks you're already familiar with.`,
        buttonText:'MIGRATE NOW',
        icon: '/icons/brief-case-icon.svg', //replace with required icon
        href: '/docs/latest/eos-evm/smart-contracts/migrate-your-smart-contract/',
      },
      signUp: {
        title: 'Sign up for developer alerts',
        subtitle: `
          Don't be caught with your pants down. Breaking changes will happen. If you want to stay on top of things when they do make sure to sign up for developer alerts emails.
        `,
        action: 'https://eosnetwork.us8.list-manage.com/subscribe/post',
        buttonText: 'ALERT ME',
      },
      intakeForm: {
        title: "Boost Your App's Success!",
        subtitle: `
          Submit your app to our ecosystem page and reach a wider audience, gain exposure, and attract new users to your already built application.
        `,
        action: 'https://eosnetwork.com/#ecosystem-intake',
        buttonText: 'INTAKE FORM',
      },
    },
    featureFlags: {
      lang: true,
    }
  },

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          logo: {
            alt: 'EOS Network',
            src: 'img/eosn_logo_light.png',
          },
          // keep this items array as is, this is used just to let docosaurus know that something is there
          items: [
            {
              type: 'doc',
              docId: 'index',
              position: 'left',
              label: 'Welcome',
            },
          ]
        },
        colorMode: {
          disableSwitch: true,
        },
        algolia: {
          // The application ID provided by Algolia
          appId: 'XINC4ZXHCU',

          // Public API key: it is safe to commit it
          apiKey: 'f79cac8feb6c21d666ea50f725d69c0e',

          indexName: 'eosnetwork',

          // Optional: see doc section below
          contextualSearch: true,

          // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
          externalUrlRegex: 'docs.eosnetwork.com',

          // Optional: Algolia search parameters
          searchParameters: {},

          // Optional: path for search page that enabled by default (`false` to disable it)
          searchPagePath: 'search',

          //... other Algolia params
        },
        docs: {
          /* closes sibling categories when expanding a category */
          sidebar: {
            autoCollapseCategories: false,
            hideable: true,
          },
        },
        footer: {
          style: 'dark',
          logo: {
            alt: 'EOS Network',
            src: 'img/eosn_logo_white.svg',
            srcDark: 'img/eosn_logo.svg',
          },
          links: [
            {
              title: 'Terms',
              items: [
                {
                  label: 'Terms & Conditions, Privacy',
                  href: 'https://eosnetwork.com/terms-and-conditions',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'GitHub',
                  href: 'https://github.com/eosnetworkfoundation',
                  logo: '/icons/github-icon.svg',
                },
                {
                  label: 'Discord',
                  href: 'https://discord.gg/XjVqej4uT5',
                  logo: '/icons/discord-icon.svg',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} EOS Network Foundation.`,
        },
        prism: {
          theme: require('prism-react-renderer/themes/oceanicNext'),
          // theme: lightCodeTheme,
          // darkTheme: darkCodeTheme,
        },
      }),
  scripts: [
    {
      src: 'https://kit.fontawesome.com/d47eba6dcd.js',
      crossorigin: 'anonymous',
      async: true,
    }
  ],
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap"
  ],
};

module.exports = config;
