import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white px-[30px] flex items-center justify-between py-6 relative flex-row-reverse">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-blue-500 to-blue-800" />
      <a href="/" title="Pill Farmácia Digital">
        <Image
          src="/images/pill-farmacia-digital.svg"
          alt="Logo da Pill Farmácia Digital"
          priority
          width={100}
          height={0}
        />
      </a>
    </footer>
  );
};

export default Footer;
