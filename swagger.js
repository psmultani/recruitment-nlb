const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/Routes/Api/index.ts']

/**
 * Run -> (npm run swagger-autogen) to autogenerate the Documentation
 */
swaggerAutogen(outputFile, endpointsFiles)
