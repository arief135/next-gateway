require('ts-node/register');

const globalTeardown = async () => {
    console.log('Global Teardown')
}

export default globalTeardown