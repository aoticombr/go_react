


export function CheckNumberNull(value) {
    // console.log('type='+typeof(value));
    // console.log('value='+value);
    // let aa = (typeof(value)==='number');
    // let bb = (value==='');
    // console.log(aa);
    // console.log(bb);
    return ((typeof(value)!=='number') &&(value===''));
  
}
  
export function CheckBoolNull(value) {
    console.log('type='+typeof(value));
    console.log('value='+value);
    let aa = (typeof(value)==='boolean');
    let bb = (value==='');
    console.log(aa);
    console.log(bb);
    return ((typeof(value)==='boolean') && (value!==true) && (value!==false));
  
}
