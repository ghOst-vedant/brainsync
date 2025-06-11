import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            "res.cloudinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "cdn.discordapp.com",
            "cdn.pixabay.com",
            "xdy0ec3d6a.ufs.sh",
        ],
    },
}

export default nextConfig
