import React from 'react'
import Head from 'next/head'

export default function PublicLayout({children}) {
    return (
        <>
            <Head>
                <title>Invoice App</title>
                <meta name="description" content="This is an invoice app. It was devellopped for the frontend mentor challenges"></meta>
                <meta property="og:type" content="wab-app" />
                <meta property="og:title" content="Invoice App" />
                <meta property="og:description" content="This is an invoice app. It was devellopped for the frontend mentor challenges" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0"></meta>
            </Head>
            <main>
                {children}
            </main>
        </>
    )
}
