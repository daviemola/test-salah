/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/spectre.css/dist/spectre.min.css"
          /> */}
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css"
          /> */}
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
