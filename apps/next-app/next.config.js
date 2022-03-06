const withTM = require('next-transpile-modules')([
  'ui',
  '@mui/material',
  '@mui/system',
])

const dotenv = require('dotenv')
dotenv.config({ path: '../../.env' })

const env = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    env[key] = process.env[key]
  }
})

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  env,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    }
    return config
  },
})
