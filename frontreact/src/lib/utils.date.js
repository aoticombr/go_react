import  dateFormat from 'dateformat';

export function DtaToTextBr(pdata:any) {
    let vdata = (new Date(pdata));
    return vdata.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
}
export function DtaToTextEn2(pdata:any) {
  // let vdata = new Date(pdata);
  // return vdata.toUTCString();//Tue, 12 Apr 2022 04:00:00 GMT
  // return vdata.toString();//Tue Apr 12 2022 00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
  // return vdata.toDateString();//Tue Apr 12 2022
   //return vdata.toLocaleTimeString();//00:00:00
   //return vdata.toLocaleDateString();//12/04/2022
  // return vdata.toLocaleString();//12/04/2022 00:00:00
   //return vdata.toTimeString();//00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
  // return vdata.toTimeString();//00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
 //  return vdata.toDateString('en-US', {timeZone: 'UTC'})//Tue Apr 12 2022

  if (!pdata) 
    return '';  
  
  return  dateFormat(pdata, "dd/mm/yyyy");
}

export function IncDay(data, qtde){
  let tomorrow = new Date(data);
  tomorrow.setDate(tomorrow.getDate() + qtde);
  return tomorrow;
}


export function DtaToTextEn(pdata:any) {
   // let vdata = new Date(pdata);
   // return vdata.toUTCString();//Tue, 12 Apr 2022 04:00:00 GMT
   // return vdata.toString();//Tue Apr 12 2022 00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
   // return vdata.toDateString();//Tue Apr 12 2022
    //return vdata.toLocaleTimeString();//00:00:00
    //return vdata.toLocaleDateString();//12/04/2022
   // return vdata.toLocaleString();//12/04/2022 00:00:00
    //return vdata.toTimeString();//00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
   // return vdata.toTimeString();//00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
  //  return vdata.toDateString('en-US', {timeZone: 'UTC'})//Tue Apr 12 2022

   if (!pdata) 
     return '';  
   
   return  dateFormat(pdata, "yyyy-mm-dd");
}

export function RecortDate(pdata:any) {
  // let vdata = new Date(pdata);
  // return vdata.toUTCString();//Tue, 12 Apr 2022 04:00:00 GMT
  // return vdata.toString();//Tue Apr 12 2022 00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
  // return vdata.toDateString();//Tue Apr 12 2022
   //return vdata.toLocaleTimeString();//00:00:00
   //return vdata.toLocaleDateString();//12/04/2022
  // return vdata.toLocaleString();//12/04/2022 00:00:00
   //return vdata.toTimeString();//00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
  // return vdata.toTimeString();//00:00:00 GMT-0400 (Hor�rio Padr�o do Amazonas)
 //  return vdata.toDateString('en-US', {timeZone: 'UTC'})//Tue Apr 12 2022

  if (!pdata) 
    return '';  
    let createdAt1 = new Date(pdata);
    let createdAt2 = createdAt1.toISOString();
    let d = createdAt2.substr(0, 10);
    console.log('RecortDate');
    console.log(d);
    
  return  d;
}

