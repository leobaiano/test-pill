import React from 'react';
import Image from "next/image";


const Header: React.FC = () => {
    return (
        <header className="bg-white px-[30px] flex items-center justify-between py-6 relative">
            <a href="/" title="Pill Farmácia Digital">
                <Image
                    src="/images/pill-farmacia-digital.svg"
                    alt="Logo da Pill Farmácia Digital"
                    className="logo"
                    priority
                    width={100}
                    height={0}
                />
            </a>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-800 via-blue-500 to-white" />
        </header>
    );
};

export default Header;
