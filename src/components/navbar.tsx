import { ModeToggle } from "./ui/ModelToggle"
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
                    {/* <li>
                        <a href="/" className={`hover:underline `}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/about" className="hover:underline">
                            About
                        </a>
                    </li> */}
                    {/* <li>
                        {!isHydrated ? (
                            <Button disabled variant="outline">
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                Loading
                            </Button>
                        ) : user ? (
                            <Button
                                variant={
                                    theme === "dark" ? "outline" : "default"
                                }
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                asChild
                                variant={
                                    theme === "dark" ? "outline" : "default"
                                }
                            >
                                <a href="/login">Login</a>
                            </Button>
                        )}
                    </li> */}
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
