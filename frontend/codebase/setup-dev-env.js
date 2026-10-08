#!/usr/bin/env bun

/**
 * Local development environment setup.
 * Installs the dependencies and runs a quick format check.
 *
 * Usage (from the codebase folder): bun setup-dev-env.js
 */

import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);


// Functions:
function commandExists(command) {
    try {
        execSync(`command -v ${command}`, { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}

function main() {
    console.log("🚀 Setting up the development environment ...");
    console.log("==============================================");

    // 1. Check if bun is installed
    if (!commandExists("bun")) {
        printError("bun is not installed. Install it first:");
        console.log("  curl -fsSL https://bun.sh/install | bash");
        console.log("Then open a new terminal and run this script again.");
        process.exit(1);
    }
}

// The script execution starts here:
main();
