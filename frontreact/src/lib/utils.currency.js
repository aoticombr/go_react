

export function localStringToNumber( s ) {
  //  console.log('s.....................');
  //  console.log(s);
    let var1 = Number( String( s ).replace( /[$]+/g, "" ) )
    
 //   console.log('var1.....................');
 //   console.log(var1);
    let var2 = Number( String( var1).replace( /[^0-9.-]+/g, "" ) )
  // console.log('var2.....................');
  //  console.log(var2);
    return var2;
}

export  function onGenericoFocus( e ) {
            var value = e.target.value;
            e.target.value = value ? localStringToNumber( value ) : ''
}

export function onGenericoBlur( e ) {
            var value = e.target.value

            var options = {
                maximumFractionDigits: 2,
              //  currency: currency,
             //   type: "currency",
             //   currencyDisplay: "symbol"
            }

            e.target.value = ( value || value === 0 ) ?
                localStringToNumber( value ).toLocaleString( 'pt-BR', options ) :    '0.00'
}



