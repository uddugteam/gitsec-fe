import Link from "next/link";
import {ReactNode} from "react";

const Navbar = ({links}: {links: ReactNode}) => {
    return (
        <header>
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">Gitsec</Link>
                    <button className="navbar-toggler m-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div aria-label="breadcrumb" className={"navbar-nav me-auto pt-lg-3"}>
                            {links}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;