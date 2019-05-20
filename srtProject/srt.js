var fs = require('fs');
 
var contents = fs.readFileSync('TBEA.srt', 'utf8');
var lines = contents.toString().replace(/^\uFEFF/, '').replace(/\r/g,'').split('\n')

const SRT_STATE_SUBNUMBER=0
const SRT_STATE_TIME=1
const SRT_STATE_TEXT=2

var subs=[]
var state=SRT_STATE_SUBNUMBER
var line = []

for (var i = 0; i < lines.length;i++) {
    switch(state){
        case SRT_STATE_SUBNUMBER:
            line.push(lines[i]);
            state=SRT_STATE_TIME;
            break;
        case SRT_STATE_TIME:
            line.push(lines[i])
            state=SRT_STATE_TEXT;
            break;
        case SRT_STATE_TEXT:
            if (lines[i] === ''){
                line.push(lines[i]);
                subs.push(line);
                line=[];
                state=SRT_STATE_SUBNUMBER
                
            } else {
                line.push(lines[i]);
            }
            break;
    }
}
if (state === SRT_STATE_TEXT) {
    line.push(lines[i]);
    subs.push(line);  
}
subs.forEach(a => console.log(a))