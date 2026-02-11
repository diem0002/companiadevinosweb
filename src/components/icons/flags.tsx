
import React from "react";

export const FlagARG = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 600"
        className={className}
        aria-label="Argentina Flag"
    >
        <rect width="900" height="600" fill="#75aadb" />
        <rect width="900" height="200" y="200" fill="#fff" />
        <g transform="translate(450,300) scale(1.5)">
            <g fill="#f6b40e">
                <path d="M5.3-25.1c0 20.3-16.5 35.7-35.7 35.7 -18.7 0-35.7-15.8-35.7-35.7 0-19.8 17-35.7 35.7-35.7 19.3 0 35.7 15.8 35.7 35.7" />
            </g>
        </g>
    </svg>
);

export const FlagBRA = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 700"
        className={className}
        aria-label="Brazil Flag"
    >
        <rect width="1000" height="700" fill="#00923e" />
        <path d="M500 60L910 350 500 640 90 350Z" fill="#f8c100" />
        <circle cx="500" cy="350" r="175" fill="#28166f" />
        <path
            d="M500 350C500 350 700 250 850 450"
            stroke="#fff"
            strokeWidth="20"
            fill="none"
            opacity="0.8"
        />
    </svg>
);
