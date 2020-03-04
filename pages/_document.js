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
                        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Quicksand:300,400,500&display=swap"
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
