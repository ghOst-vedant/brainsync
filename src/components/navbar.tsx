import React from "react"
import { ModeToggle } from "./ui/ModelToggle"

const Navbar = () => {
    return (
        <div>
            <nav className="flex items-center justify-between p-6 shadow-xl ">
                <div className="text-lg font-bold">BrainSync</div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="hover:underline">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/about" className="hover:underline">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="/login" className="hover:underline">
                            Login
                        </a>
                    </li>
                    <li>
                        <ModeToggle/>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
