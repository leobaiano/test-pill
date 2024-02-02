import React from 'react';
import Image from "next/image";

interface ErrorProps {
    message: string | null;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="w-70 mx-auto">
            <div className="w-full ">
                <Image
                    src="/images/pill-farmacia-digital.svg"
                    alt="Logo da Pill Farmácia Digital"
                    className="logo"
                    priority
                    width={100}
                    height={0}
                />
            </div>
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-[30px] w-full" role="alert">
                <p className="font-bold">Ops!</p>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Error;
