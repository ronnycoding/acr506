import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import client from '../client'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return client.fetch('*[_id == "global-config"] {lang}.lang[0]').then((lang) => {
      return {...initialProps, lang}
    })
  }

  render () {
    return (
      <Html lang={this.props.lang || 'en'}>
        <Head>
          <link rel='apple-touch-icon' sizes='57x57' href='/static/favicon/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/static/favicon/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/static/favicon/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/static/favicon/apple-icon-76x76.png' />
          <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='/static/favicon/apple-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='/static/favicon/apple-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='/static/favicon/apple-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/static/favicon/apple-icon-152x152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/static/favicon/apple-icon-180x180.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/static/favicon/android-icon-192x192.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/static/favicon/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='/static/favicon/favicon-96x96.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/static/favicon/favicon-16x16.png'
          />
          <link rel='manifest' href='/static/favicon/manifest.json' />
          <link rel='sitemap' type='application/xml' title='Sitemap' href='/static/sitemap/sitemap.xml' />
          <meta name='msapplication-TileColor' content='#000000' />
          <meta name='msapplication-TileImage' content='/static/favicon/ms-icon-144x144.png' />
          <meta name='theme-color' content='#000000' />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `(function () {
                var options = {
                    whatsapp: "+50689438510", // WhatsApp number
                    call: "+50689438510", // Call phone number
                    call_to_action: "Llama o escribenos al Whatsapp.", // Call to action
                    button_color: "#000000", // Color of button
                    position: "right", // Position may be 'right' or 'left'
                    order: "whatsapp,call", // Order of buttons
                };
                var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
                var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
                s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
                var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
            })();`
            }}
          />
          <script async src='https://www.googletagmanager.com/gtag/js?id=UA-173925310-1' />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-173925310-1');
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
