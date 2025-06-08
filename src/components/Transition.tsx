// components/Transition.jsx
"use client" // Important for client-side animations

import { motion, AnimatePresence, easeIn } from "framer-motion"
import { usePathname } from "next/navigation" // For Next.js 13+ App Router
import { ReactNode } from "react"

const variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75 },
        easeIn: "easeIn",
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.75 },
        easeout: "easeout",
    },
}

const Transition = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname() // Get current path for AnimatePresence key

    return (
        <AnimatePresence mode="wait">
            {/* Use mode="wait" to ensure exit animation completes before new page enters */}
            <motion.div
                key={pathname} // Key AnimatePresence by pathname to trigger re-render on route change
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                style={{ position: "relative", width: "100%" }} // Ensure proper positioning
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

// components/PageWrapper.tsx

export default function TransitionWrapper({
    children,
}: {
    children: ReactNode
}) {
    return <Transition>{children}</Transition>
}
