import axios from "axios";

const URL = "https://zapwallet.onrender.com/health";

async function pingServer() {
  try {
    await axios.get(URL, { timeout: 4000 });
    console.log(`[${new Date().toISOString()}] Server is awake`);
  } catch (err) {
    console.log(`[${new Date().toISOString()}] Ping failed`);
  }
}

setInterval(pingServer, 5 * 60 * 1000); // every 5 minutes
pingServer(); // run immediately
