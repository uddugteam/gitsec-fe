import {ReactNode} from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Layout = ({children, links}: {children: ReactNode, links: ReactNode}) => {
    return (
        <>
            <Navbar links={links}/>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Layout;