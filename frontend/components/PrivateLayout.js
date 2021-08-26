import React, {useContext} from 'react'
import Head from 'next/Head'
import Link from 'next/Link'
import { useRouter } from 'next/router';
import {ThemeContext} from './ThemeProvider';
import axios from 'axios';
import Image from 'next/image'
import profileImg from '../public/assets/icon-profile.svg'
import moonImg from '../public/assets/icon-moon.svg'
import sunImg from '../public/assets/icon-sun.svg'
import logoImg from '../public/assets/logo.svg'
import logoutImg from '../public/assets/icon-logout.svg'

export default function PublicLayout({children}) {
    const router = useRouter();
    const theme = useContext(ThemeContext);
  
    const onLogout = (e) => {
      e.preventDefault();
      axios.post('/api/logout').then(() => {
        router.push('/login')
      })
    }

    const toggleTheme = () => {
        theme.setThemeDark(!theme.themeDark);
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
                <Link href="/">
                    <a  className="logo">
                        <Image src={logoImg} alt="logo" className="logoImage" />
                    </a>
                </Link>
                <nav>
                    <ul>
                        <li>
                            <a className="themeToggle" onClick={toggleTheme}>
                                {theme.themeDark ? (
                                    <Image src={moonImg} alt="Light Mode"/>
                                ) : (
                                    <Image src={sunImg} alt="Dark Mode" />
                                )}                              
                            </a>
                        </li>
                        <li>
                            <a href="" className="themeToggle" href="/api/logout" onClick={onLogout}>
                                <Image src={logoutImg} alt="Log out" width={30} height={30}/>
                            </a>
                        </li>
                        <li>
                            <Link href="/user" >
                                <a className="profile-link">
                                    <Image src={profileImg} alt="Profile Image"  className="profileImage"/>
                                </a>
                            </Link>
                        </li>
                    </ul>                
                </nav>
            </header>
            <main>
                {/* <div className="main-container"> */}
                    <div className="main-wrapper">  
                        {children}
                    </div>
                {/* </div> */}
            </main>
        </>
    )
}
