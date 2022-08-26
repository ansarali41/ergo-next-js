import Head from 'next/head';
import React from 'react';

const Header = () => {
    return (
        <div>
            <Head>
                <title>Ergo Sapiens</title>
                {/* font family cdn start */}
                {/* Montserrat font */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" rel="stylesheet" />
                {/* Oxanium font  */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@600&display=swap" rel="stylesheet" />
                {/* font family cdn end */}
            </Head>
        </div>
    );
};

export default Header;
