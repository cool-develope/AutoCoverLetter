
export const convert = message => {
    let st = 0, en = -2;
    let temp = "";
    const open = "{{", end = "}}";

    while (true) {
        st = message.indexOf(open, en);
        if (st < 0) {
            if (en < message.length) temp += message.substring(en+2);
            break;
        }
        temp += message.substring(en+2, st);
        en = message.indexOf(end, st);
        if (en < 0) en = message.length;
        let value = message.substring(st+2, en).split('|')[0]
        temp += value;
    }

    return temp;
}