"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectCallBackHell = void 0;
function detectCallBackHell(ast, depth, fileName) {
    function traverse(node, depth) {
        if (node.type === 'CallExpression') {
            const callee = node.callee;
            if (callee.type === 'FunctionExpression' || 'ArrowFunctionExpression' || 'Identifier') {
                if (depth >= 3) { // Set your threshold here (e.g., 3 for three levels of nesting)
                    const location = callee.loc.start.line;
                    const detected = "Callback hell detected! AT Line no. => " + location + " In file: " + fileName;
                    console.log(detected.red);
                    process.exit(1);
                }
                for (const arg of node.arguments) {
                    traverse(arg, depth + 1);
                }
            }
        }
        else {
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    const child = node[key];
                    if (typeof child === 'object' && child !== null) {
                        if (Array.isArray(child)) {
                            for (const c of child) {
                                traverse(c, depth);
                            }
                        }
                        else {
                            traverse(child, depth);
                        }
                    }
                }
            }
        }
    }
    traverse(ast, 0);
    console.log('No callback hell detected. Code looks good!'.green);
}
exports.detectCallBackHell = detectCallBackHell;
