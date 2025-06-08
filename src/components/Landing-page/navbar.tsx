import { ModeToggle } from "../ui/ModelToggle"
import Link from "next/link"
import { DM_Serif_Display } from "next/font/google"
import AuthButtons from "./AuthButtons"

const DM_400 = DM_Serif_Display({
    variable: "--font-dm-serif",
    subsets: ["latin"],
    weight: "400",
})

const Navbar = () => {
    return (
        <div>
            <nav className="flex items-center justify-between p-6 shadow-xl ">
                <Link
                    className={`text-2xl font-bold cursor-pointer ${DM_400.className}   text-gray-900 dark:text-gray-100`}
                    href={"/"}
                >
                    BrainSync
                </Link>
                <ul className="flex space-x-4 items-center justify-center">
                    <li>
                        <AuthButtons />
                    </li>
                    <li>
                        <ModeToggle />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
