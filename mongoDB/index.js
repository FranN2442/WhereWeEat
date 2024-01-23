import { run } from './database.js';

async function executeRun() {
    try {
        let res = await run();
        console.log("Resultado:", res);
    } catch (error) {
        console.error("Error:", error);
    }
}

executeRun();