import {isLogin, getUser} from "./auth.js";

export const split_paragraph = message => {
    let arr = message.split('\n');
    return arr.map((paragraph, i) => {
        return i + 1 < arr.length? {"type": "_p_", "value": paragraph}: {"type": "_div_", "value": paragraph};
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

export const filterResult = letters => {
    if (!isLogin()) return letters;
    const user = getUser();
    let filters = []

    letters.forEach(letter => {
        if (parseInt(letter.user) === parseInt(user.id)) filters.push(letter);
    });

    return filters;
}

const containNumber = (sentence, key) => {
    return sentence.toLowerCase().split(key.toLowerCase()).length - 1;
}

export const searchResult = (letters, keys) => {
    let calcs = {};    
    let lettersCopy = [...letters]

    const calcSimilarity = (letter, keys) => {
        if (keys.length == 0) return 0;
        if (calcs[letter.id] != undefined) return calcs[letter.id];

        let point = containNumber(letter.title, keys) * 100;
        point += containNumber(letter.message, keys) * 20;
    
        keys.split(' ').forEach(key => {
            point += containNumber(letter.title, key) * 5
            point += containNumber(letter.message, key)
        });
        calcs[letter.id] = point;
        return point;
    };

    lettersCopy.sort((a, b) => {
        if (calcSimilarity(a, keys) != calcSimilarity(b, keys))
            return calcSimilarity(b, keys) - calcSimilarity(a, keys);
        else {
            if (a.created_at < b.created_at) return 1;
            else return -1;
        }
    });
    
    return lettersCopy;    
}