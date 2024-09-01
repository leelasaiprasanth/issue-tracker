/** @type {import('next').NextConfig} */
const nextConfig = {};

// if the google account athentication and display does not work
// then use this
// =================================
// const nextConfig = {
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           {key: 'referrer-policy', value: 'no-referrer'},
//         ]
//       }
//     ]
//   }
// }

export default nextConfig;
