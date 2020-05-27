import React from 'react'
import { FaLinkedin, FaGithub, FaTwitter, FaDev, FaMedium } from 'react-icons/fa';
import Link from 'next/link';


const socials = [
    { href: 'https://twitter.com/m4nu56', icon: <FaTwitter size={'2em'} />, title: 'Twitter' },
    { href: 'https://github.com/m4nu56', icon: <FaGithub size={'2em'} />, title: 'Github' },
    {
        href: 'https://linkedin.com/in/emmanuelbalpe',
        icon: <FaLinkedin size={'2em'} />,
        title: 'LinkedIn',
    },
    { href: 'https://dev.to/m4nu56', icon: <FaDev size={'2em'} />, title: 'DEV.to' },
    { href: 'https://medium.com/@mnu', icon: <FaMedium size={'2em'} />, title: 'Medium' },
]

export default function Footer() {
    return (
        <div className={ 'text-center mt-10' }>
            {socials.map(({ title, href, icon }) =>
                <div key={title} style={{
                    display: 'inline-block',
                    padding: '5px'
                }}>
                    <a href={href} style={{ outline: 'none', textDecoration: 'none' }}>
                        {icon}
                    </a>
                </div>
            )}
            <div>
                &copy;{new Date().getFullYear()} Emmanuel Balpe. All Rights Reserved.
            Built with <a href="https://www.nextjs.org">NextJS</a>.
          </div>
        </div>
    )
}
