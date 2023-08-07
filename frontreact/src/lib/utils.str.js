export function QuotedStr1(pStr: string):string{
    
    return "'"+pStr+"'";
}

export function QuotedStr2(pStr: string):string{
    return '"'+pStr+'"';
}

export function EmptyNull(value:any) {
 
    if (!value) 
      return 'null';  
    
    return value;
 }
