const array=[
    [ '727',
      '00:39:07,694 --> 00:39:09,661',
      'Of course! I want her to feel safe.' ],
    [ '728',
      '00:39:09,696 --> 00:39:12,630',
      'I want her to be taken care of\nand I want her to be happy here.' ],
    [ '729',
      '00:39:12,666 --> 00:39:15,433',
      'Funny, you seem to have\na pretty good handle' ],
    [ '730',
      '00:39:15,468 --> 00:39:16,668',
      'on the things you want.' ]
]
//Functions for manipulating the above array

//Remove subtitle block 728
array.filter(block => block[0] !== '728').forEach(a => console.log(a))

//Concat all subtitle text ()
console.log(array.map(block => block[2]).reduce((acc,cur) => acc+'\n'+cur,''))
/*
Of course! I want her to feel safe.
I want her to be taken care of
and I want her to be happy here.
Funny, you seem to have
a pretty good handle
on the things you want.
*/
