
export const split_paragraph = message => {
    let arr = message.split('\n');
    return arr.map((paragraph, i) => {
        return arr[i+1]? {"type": "p", "value": paragraph}: {"type": "div", "value": paragraph};
    });
}

export const convert = message => {
    let st = 0, en = -2;
    let temp = [];
    let base = "";
    const open = "{{", end = "}}";

    while (true) {
        st = message.indexOf(open, en);
        if (st < 0) {
            if (en < message.length) {
                Array.prototype.push.apply(temp, split_paragraph(message.substring(en+2)));
                base += message.substring(en+2);
            }
            break;
        }
        Array.prototype.push.apply(temp, split_paragraph(message.substring(en+2, st)));
        base += message.substring(en+2, st);
        en = message.indexOf(end, st);
        if (en < 0) en = message.length;
        let value = message.substring(st+2, en).split('|')
        temp.push({"type": value[1] || "key", "value": value[0]});
        base += value;
    }
    
    return {"text": base, "html": temp};
}