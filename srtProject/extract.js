var fs = require('fs');
 
var contents = fs.readFileSync('TBEA.srt', 'utf8');
var lines = contents.toString().replace(/^\uFEFF/, '').replace(/\r/g,'').split('\n')

const SRT_STATE_SUBNUMBER=0
const SRT_STATE_TIME=1
const SRT_STATE_TEXT=2

var subs=[]
var state=SRT_STATE_SUBNUMBER
var line=[]

for (var i = 0; i < lines.length;i++) {
    switch(state){
        case SRT_STATE_SUBNUMBER:
            line.push(lines[i]);
            state=SRT_STATE_TIME;
            break;
        case SRT_STATE_TIME:
            line.push(lines[i]);
            state=SRT_STATE_TEXT;
            break;
        case SRT_STATE_TEXT:
            if (lines[i] === ''){
                subs.push(line);
                line=[];
                state=SRT_STATE_SUBNUMBER;
            }
            else {
                if (line.length === 3){
                    line[2]+='\n'+lines[i];
                }
                else {
                    line.push(lines[i]);
                }
            }
            break;
    }
}
//If file was missing the trailing newlines, we'll be in this state here
if (state === SRT_STATE_TEXT) {
    subs.push(line);  
}
subs.forEach(a => console.log(a))
