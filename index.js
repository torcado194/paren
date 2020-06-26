module.exports = function(str, splitDelim, beginChars = ['('], endChars = [')']){
    if(!Array.isArray(beginChars)){
        beginChars = [beginChars];
    }
    if(!Array.isArray(endChars)){
        endChars = [endChars];
    }
    let s = str,
        out = [],
        pointers = [out],
        start = 0,
        cur = 0;
    for(; cur < s.length; cur++){
        if(beginChars.includes(s[cur])){
            if(start < cur){
                pointers[0].push(s.slice(start, cur));
            }
            start = cur+1;
            let pointer = []
            pointers[0].push(pointer);
            pointers.unshift(pointer);
        } else if(endChars.includes(s[cur])){
            if(pointers.length === 1){
                //unmatched end, wrap anyway
                let wrap = start == cur ? [...pointers[0]] : [...pointers[0], s.slice(start, cur)];
                out = [wrap];
                pointers = [out];
                start = cur+1;
                continue;
            }
            if(start < cur){
                pointers[0].push(s.slice(start, cur));
            }
            start = cur+1;
            pointers.shift();
        }
    }
    if(start < s.length){
        pointers[0].push(s.slice(start, s.length));
    }

    function deepSplit(arr, delim){
        if(Array.isArray(arr)){
            let set = arr.map(v => deepSplit(v, delim));
            for(let i = 0; i < set.length; i++){
                if(set[i].s){
                    let c = set[i].s.length-1;
                    set.splice(i, 1, ...set[i].s)
                    i += c;
                }
            }
            return set;
        } else {
            return {s: arr.split(delim).filter((v,i,a) => (i !== 0 && i !== a.length-1) || v !== '')};
        }
    }

    if(splitDelim !== undefined && splitDelim !== null){
        out = deepSplit(out, splitDelim);
    }
    return out;
}