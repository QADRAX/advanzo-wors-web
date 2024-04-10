import clc from 'cli-color';

export function log(message: string, type?: 'info' | 'warning' | 'critical' | 'app') {

    let levelCode: string = '';
    switch(type){
        case 'critical':
            levelCode = clc.red(type);
            break;
        case 'info':
            levelCode = clc.blue(type);
            break;
        case 'warning':
            levelCode = clc.yellow(type);
            break;
        case 'app':
            levelCode = clc.green(type);
        default:
            break;
    }

    console.log(`${clc.black.bgGreenBright(" ADVZ WARS ")} ${levelCode} ${message}`);
}