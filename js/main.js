let select = document.querySelectorAll('select');
// submit btn
let btn = document.querySelector('button');
// text textarea
let from = document.querySelector('#from-value')
let to = document.querySelector('#to-value')

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