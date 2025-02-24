const readline = require("readline");

const codeLines = [
    ['a = 1 + 2;', 'console.log("1 + 2");', 'console.log(a);'],
    ['b = 3 + 4;', 'console.log("3 + 4");'],
    ['c = 5 + 6;', 'console.log("5 + 6");', 'console.log(c);']
];

function createProcesses(count) {
    let processes = [];
    for (let i = 0; i < count; i++) {
        let process = {
            id: i + 1,
            lines: [...codeLines[i % codeLines.length]],
            currentLine: 0
        };
        processes.push(process);
    }
    return processes;
}

function simulateExecution(processes) {
    let activeProcesses = processes.filter(p => p.currentLine < p.lines.length);
    while (activeProcesses.length > 0) {
        for (let process of activeProcesses) {
            console.log(`Proceso ${process.id}`);
            if (process.currentLine < process.lines.length) {
                console.log(`Línea de código: ${process.lines[process.currentLine]}`);
                process.currentLine++;
            }
            if (process.currentLine >= process.lines.length) {
                console.log(`Proceso ${process.id} Terminado`);
            }
        }
        activeProcesses = processes.filter(p => p.currentLine < p.lines.length);
    }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Ingrese el número de procesos a simular: ", (num) => {
    const processes = createProcesses(parseInt(num));
    simulateExecution(processes);
    rl.close();
});
