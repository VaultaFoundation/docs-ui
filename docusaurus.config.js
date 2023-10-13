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
    locales: ['en', 'zh', 'ko'],
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
          sidebarPath: require.resolve('./src/docs-sidebars.js'),
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
    require.resolve("docusaurus-plugin-image-zoom"),
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'evm',
        path: 'evm',
        routeBasePath: 'evm',
        sidebarPath: require.resolve('./src/evm-sidebars.js'),
        // sidebarCollapsed: false,
        // ... other options
      },
    ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     include: ['**/*.md', '**/*.mdx'],
    //     id: 'native',
    //     path: 'docs',
    //     routeBasePath: 'native',
    //     sidebarPath: require.resolve('./src/sidebars.js'),
    //     // ... other options
    //   },
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'apis',
        path: 'apis',
        routeBasePath: 'apis',
        sidebarPath: require.resolve('./src/generic-sidebars.js'),
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'manuals',
        path: 'manuals',
        routeBasePath: 'manuals',
        sidebarPath: require.resolve('./src/generic-sidebars.js'),
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
            to: '/evm/quick-start/introduction',
            from: '/docs/latest/eos-evm/getting_started/',
          },
          {
            to: '/evm/quick-start/introduction',
            from: '/docs/latest/eos-evm/',
          },
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

      ],
    },
    main: {
      wideCard: {
        title: 'EOS EVM',
        tagline:'A brand new home for EVM developers',
        subtitle: `Migrate your apps to the world's fastest and cheapest EVM using tools and frameworks you're already familiar with.`,
        buttonText:'MIGRATE NOW',
        icon: '/icons/brief-case-icon.svg', //replace with required icon
        href: '/evm/smart-contracts/migrate-your-smart-contract',
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
        zoom: {
          selector: '.markdown :not(em) > img',
          config: {
            // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
            background: {
              light: 'rgb(255, 255, 255)',
              dark: 'rgb(50, 50, 50)'
            }
          }
        },
        navbar: {
          logo: {
            alt: 'EOS Network',
            src: 'img/eosn_logo_light.png',
          },
          // keep this items array as is, this is used just to let docosaurus know that something is there
          items: [
            {
              docId: 'native',
              position: 'left',
              label: 'Native',
              to: '/docs/latest/quick-start/introduction',
            },
            {
              docId: 'evm',
              position: 'left',
              label: 'EVM',
              to: '/evm/quick-start/introduction',
            },
            {
              docId: 'courses',
              position: 'left',
              label: 'Videos',
              to: 'https://learn.eosnetwork.com/',
            },
            {
              docId: 'eosnetwork',
              position: 'left',
              label: 'What is EOS?',
              to: 'https://eosnetwork.com/',
            },
            {
              type: 'localeDropdown',
              position: 'right',
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
            hideable: false,
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
          ],
          copyright: `Copyright © ${new Date().getFullYear()} EOS Network Foundation.`,
        },
        prism: {
          theme: require('prism-react-renderer/themes/oceanicNext'),
          additionalLanguages: ['solidity'],
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
