import serialize from 'serialize-javascript'
import favicon from './assets/images/favicon.png'

import { HtmlOptions } from './types'

export default ({ body, data }: HtmlOptions): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.12.1/css/all.css"
          integrity="sha384-TxKWSXbsweFt0o2WqfkfJRRNVaPdzXJ/YLqgStggBVRREXkwU7OKz+xXtqOU4u8+"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="/main.css" media="screen" />
        ${
          process.env.NODE_ENV === 'production'
            ? `<link rel="stylesheet" type="text/css" href="/1.css" media="screen" />`
            : ''
        }
        <link type="favicon" herf="${favicon}" />
      </head>
      <body>
        <div id="app">${body}</div>
        <script>
          window.INITIAL_STATE = ${serialize(data)}
        </script>
      </body>
      <script src="/client.js"></script>
      ${process.env.NODE_ENV === 'production' ? `<script src="/1.client.js"></script>` : ''}
    </html>
  `
}
