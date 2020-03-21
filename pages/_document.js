import NextDocument, { Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
    render() {
        return (
            <html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@200;300;400&family=Barlow:wght@300;400&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
