// next.config.js

module.exports = {
    async rewrites() {
      return [
        {
          source: '/pages/api/:path*', // Define your API routes here
          destination: 'https://api.ext.payconiq.com/v3/:path*', // Your API base URL
        },
      ];
    },
  };
  