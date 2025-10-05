"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function HamburgerButton({
  size = 24,
  color = "black",
  onToggle,
}: {
  size?: number;
  color?: string;
  onToggle?: (isOpen: boolean) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { resolvedTheme} = useTheme()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        onToggle?.(!isOpen);
    };

    const lineProps = {
        stroke: color,
        strokeWidth: 2,
        vectorEffect: "non-scaling-stroke" as const,
        strokeLinecap: "round" as const,
    };

    return (
        <button
        onClick={toggleMenu}
        className="relative flex items-center justify-center w-10 h-10 focus:outline-none"
        aria-label="Toggle menu"
        >
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="overflow-visible "
        >
            <motion.line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            {...lineProps}
            variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            stroke={resolvedTheme === "light" ? "black": "white"}
            />
            <motion.line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            {...lineProps}
            variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
            }}
            transition={{ duration: 0.2 }}
            stroke={resolvedTheme === "light" ? "black": "white"}
            />
            <motion.line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            {...lineProps}
            variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            stroke={resolvedTheme === "light" ? "black": "white"}
            />
        </motion.svg>
        </button>
    );
}
