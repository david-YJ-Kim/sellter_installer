const { deprecate } = require("util");
const path = require("path");

const vbsFileNM = "run_background.vbs";
const batFileNM = "sellter_agent_start.bat";

const exec = require("child_process").execSync; // 프로그램 찾을때 쓸 프로세스

const doJob = () => {
    console.log("Process Manager Start it's job.!");

    // npmInitialize();

    executeVbsScript(vbsFileNM);

    console.log("Process Manager End It's Job.");
};

const executeVbsScript = (fileNM) => {
    // const cmd = process.env.SELLTER_BIN + path.sep + fileNM;
    // const cmd =
    // "C:\\Users\\tspsc\\AppData\\Local\\Sellter\\bin" + path.sep + fileNM;
    const cmd = process.env.SELLTER_BIN + path.sep + fileNM;
    console.log(cmd);

    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log(`exec error: ${err}`);
        } else {
            console.log("stdout:", cmd, "\n", stdout);
        }
    });
};

const npmInitialize = () => {
    const changeDirectoryCMD = `cd ${process.env.SELLTER_BIN}`;
    const doInitializeNPM = `call npm istall`;

    exec(changeDirectoryCMD, (err, stdout, stderr) => {
        if (err) {
            console.log(`exec error: ${err}`);
        } else {
            // console.log('stderr', stderr);
            console.log("stdout:", changeDirectoryCMD, "\n", stdout);

            exec(doInitializeNPM, (err, stdout, stderr) => {
                if (err) {
                    console.log(`exec error: ${err}`);
                } else {
                    console.log("stdout: ", doInitializeNPM, "\n", stdout);
                }
            });
        }
    });
};

// 1.
module.exports = { doJob };

// doJob();
