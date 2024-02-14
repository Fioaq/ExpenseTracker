import TopNav from "@/components/nav/page";
import { Fragment } from "react";


export default function Layout({ children }) {
    return (
        <Fragment>
            <TopNav>
                {children}
            </TopNav>
        </Fragment>
    )
}