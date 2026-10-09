#!/usr/bin/env bun

/**
 * Local development environment setup.
 * Installs the dependencies and runs a quick format check.
 *
 * Usage (from the codebase folder): bun setup-dev-env.js
 */

import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Helper functions:
function printError(message) {
    console.error(`❌ ${message}`);
}

function commandExists(command) {
    try {
        execSync(`command -v ${command}`, { stdio: "ignore" });
        return true;
    }
    catch {
        return false;
    }
}

// Step functions:
function checkBun() {
    if (!commandExists("bun")) {
        printError("bun is not installed. Install it first:\n curl -fsSL https://bun.sh/install | bash");
        process.exit(1);
    }

    const bunVersion = execSync("bun --version", { encoding: "utf-8" }).trim();
    console.log(`✅ bun is installed: ${bunVersion}`);
}

function installDependencies() {
    try {
        execSync("bun install", { cwd: __dirname, stdio: "inherit" });
    }
    catch {
        printError("Failed to install the dependencies!");
        process.exit(1);
    }
    console.log("💽 Dependencies installed");
}

function checkFormatting() {
    try {
        execSync("bun run format:check", { cwd: __dirname, stdio: "ignore" });
        console.log('✅ Code formatting check passed');
    }
    catch {
        console.warn("🚨 Formatting needs attention, run 'bun run format' to fix it.");
    }
}


function main() {
    console.log("🚀 Setting up the development environment ...");
    console.log("==============================================");

    // 1. Check if bun is installed.
    console.log("🌞 Checking bun ...");
    checkBun();

    // 2. Install dependencies.
    console.log("----------------------------------------------");
    console.log("📦 Installing dependencies ...");
    installDependencies();

    // 3. Check the code formatting. It only warns, it never stops the setup.
    console.log("----------------------------------------------");
    console.log("🏸 Checking code formatting ...");
    checkFormatting();

    console.log("==============================================");
}

// The script execution starts here:
main();
