# render-i18n
A collection of i18n render callback components for
your app to dynamically import (and code split)

In format \[ISO 396-1\]-\[ISO-3166\]. EX. en-gb

## Dependencies

1. As the name implies, this assumes you are using `react-intl` to 
internationalize your app.
1. You should be using either `react-intl.macro` or 

## Getting started

`yarn add lazy-react-intl`

And somewhere near the top of your `App.js` component (most likely):

```
import { FormattedMessage, IntlProvider, addLocaleData } from 'react-intl'
import LazyLoadIntl from 'lazy-react-intl'

const messagesByLocale = {
  de: require('./messages/de.json'),
  fr: require('./messages/fr.json'),
  en: require('./messages/en.json'),
}

const supportedLocales = {
  fr: () => import(/* webpackChunkName: "fr" */ 'lazy-react-intl/lib/fr'),
  de: () => import(/* webpackChunkName: "de" */ 'lazy-react-intl/lib/de'),
  en: () => import(/* webpackChunkName: "en" */ 'lazy-react-intl/lib/en'),
}

// ... Later, in your render function

return (
  <LazyLoadIntl
    locale={locale}
    bundle={supportedLocales[locale]}
    addLocaleData={addLocaleData}
  >
    <IntlProvider
      locale={locale}
      messages={messagesByLocale[locale]}
    >
    
      {/* The rest of your app, such as... */}
      <FormattedMessage
        {...messages.App}
      />
      
    </IntlProvider>
  </LazyLoadIntl>
)

```

Remember to pass `addLocaleData` to LazyLoadIntl.

## Compiling messages

1. Via [`react-intl.macro`](https://github.com/evenchange4/react-intl.macro#readme)
```diff
// Component.js
-import { defineMessages } from 'react-intl';
+import { defineMessages } from 'react-intl.macro';

const messages = defineMessages({
  'Component.greet': {
    id: 'Component.greet',
    defaultMessage: 'Hello, {name}!',
    description: 'Greeting to welcome the user to the app',
  },
});
```


2. Via [`babel-plugin-react-intl`](https://github.com/yahoo/babel-plugin-react-intl#usage)
```
{
  "presets": ["react-app"],
  "plugins": [
    ["react-intl", {
      "messagesDir": "./i18n/"
    }]
  ]
}
```

## Managing messages

We recommend using `react-intl-translations-manager`.
We use the following script to:
1. Compile all our `*.messages.json` files into one per language.
2. Manage new or removed messages over time.

In [website/scripts/messages.js]()
```
const messages = require('react-intl-translations-manager').default;
messages({
  messagesDirectory: 'i18n/src',
  translationsDirectory: 'src/messages/',
  languages: [
    'en',
    'fr',
    'de'
  ]
});

```

Add an npm script to your package.json:
```
  "version": "0.2.2",
  "scripts": {
    "messages": "node scripts/messages.js"
  },
```

## Contribution Guide

Just make sure to use conventional commits.

### Release process

1. `yarn ci:prepublish`
1. `yarn ci:version`
1. `yarn ci:publish`

## Notes


## To do:

- [ ] Remove `addLocaleData` and make react-intl a peerDep
- [ ] Demonstrate server side rendering
- [ ] And fetching messages (probably from public folder) 