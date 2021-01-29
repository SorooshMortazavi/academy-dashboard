interface IPersianNumber{
    [index:string]:string
}
const persianNumbers:IPersianNumber={
    1:'۱',
    2:'۲',
    3:'۳',
    4:'۴',
    5:'۵',
    6:'۶',
    7:'۷',
    8:'۸',
    9:'۹',
}


export default function toPersianNumber(input:string){
    input.split('').map((char:string) =>{
        return persianNumbers[char] ? persianNumbers[char] : char
    })
}

