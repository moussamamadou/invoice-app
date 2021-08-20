import React from 'react'
import Head from 'next/Head'
import Link from 'next/Link'
import { useRouter } from 'next/router';
import axios from 'axios';

export default function PublicLayout({children}) {
    const router = useRouter();
  
    const onLogout = (e) => {
      e.preventDefault();
      axios.post('/api/logout').then(() => {
        router.push('/login')
      })
    }

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
            <header>
                <Link href="/" className="logoLink">
                    <img src="/assets/logo.svg" alt="logo" className="logoImage" />
                </Link>
                <nav>
                    <ul>
                        <li><a href="#" className="themeToggle"><img src="/assets/icon-moon.svg" alt="Dark Mode" /></a></li>
                        <li><a href="#" className="themeToggle" href="/api/logout" onClick={onLogout}><img src="/assets/icon-logout.svg" alt="Dark Mode" /></a></li>
                        <li><Link href="/user" className="profileLink"><img src="/assets/image-avatar.jpg" alt="Profile Image" className="profileImage" style={{height:'20px'}}/></Link></li>
                    </ul>                
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}
