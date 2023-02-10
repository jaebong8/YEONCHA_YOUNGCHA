/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // async redirects() {
    //     return [
    //         {
    //             source: "/auth/login",
    //             destination: "/auth/signin",
    //             permanent: true,
    //         },
    //         {
    //             source: "/",
    //             destination: "/auth/signin",
    //             permanent: true,
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
