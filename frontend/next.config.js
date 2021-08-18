module.exports = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/invoice',
        destination: '/',
        permanent: true    
      }

    ]
  }

}
