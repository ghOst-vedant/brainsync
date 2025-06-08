//  {!session ? <NavbarWrapper /> : null}

import NavbarWrapper from "@/components/Landing-page/NavbarWrapper"
import React from "react"

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <NavbarWrapper />
            {children}
        </main>
    )
}

export default HomePageLayout
