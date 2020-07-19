import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import client from "../client";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return client.fetch('*[_id == "global-config"] {lang}.lang[0]').then((lang) => {
      return { ...initialProps, lang };
    });
  }

  render() {
    return (
      <Html lang={this.props.lang || "en"}>
        <Head>
          <script
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
            })();`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
