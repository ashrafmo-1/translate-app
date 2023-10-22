let select = document.querySelectorAll('select');
// submit btn
let btn = document.querySelector('button');
// text textarea
let from = document.querySelector('#from-value')
let to = document.querySelector('#to-value')
// switch button
let change = document.querySelector('.change')

select.forEach((ele, id) =>{
    for(let langName in language ) {
        // select english id default language
        let defSelect;
        if(id == 0 && langName == 'en-GB') {
            defSelect = 'selected';
        } else if(id == 1 && langName == 'ar-SA'){
            defSelect = 'selected'
        }
        
        let option = `<option value="${langName}" ${defSelect}>${language[langName]}</option>`
        ele.insertAdjacentHTML('beforeend', option)
    }
});

btn.addEventListener('click', (elemnt) => {
    let textarea = from.value
    let selectFrom = select[0].value
    let selectTo = select[1].value

    // https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it
    let API = `https://api.mymemory.translated.net/get?q=${textarea}&langpair=${selectFrom}|${selectTo}`;
    fetch(API).then((res) => res.json()).then((data) => {
        console.log(data.responseData.translatedText)
        to.value = data.responseData.translatedText
        // catch error
    }).catch((err) => {
        console.error('un catch API', err);
    });
})

// change the values inputs for from to and to values for from

change.addEventListener('click', () => {
    // convert values
    let selectTextinputVal = from.value
    from.value = to.value
    to.value = selectTextinputVal

    // convert select language
    selectvalueName = select[0].value
    select[0].value = select[1].value
    select[1].value = selectvalueName
})

// copy text input

let copy = document.querySelector('.copyTo')

copy.addEventListener('ckick', () => {
    from[0].select()
    if (document.execCommand('copy')) {
        alert('Text has been copied to clipboard: ' + from.value);
    } else {
        // Fallback for browsers that do not support the Clipboard API
        alert('Sorry, copying to clipboard is not supported in your browser.');
    }

    window.getSelection().removeAllRanges();
})