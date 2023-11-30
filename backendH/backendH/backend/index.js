const { createServer, initServer } = require("./server");

const run = async () => {
    const server = await createServer()
    
    initServer(server)
    
}

run()