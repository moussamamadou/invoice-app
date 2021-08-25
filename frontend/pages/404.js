import Link from 'next/Link'
import PublicLayout from "../components/PublicLayout"

export default function FourOhFour() {
    return(  
        <PublicLayout>
            <div className="404-container">
                <h1>404 - Page Not Found</h1>
                <div className="is-empty">
                    <div className="is-empty-container">
                        <img src="/assets/illustration-empty.svg" alt="" />
                        <h2>There is nothing here</h2>
                        <p>You are lost in the parallel invoice dimension</p>        
                        <Link href="/"><a>Go back home</a></Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}