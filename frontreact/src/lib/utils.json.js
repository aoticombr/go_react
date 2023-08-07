

export function getDescJson(list, value) {
    return list.find((f) => {return f.id === value}).label;
}
export function getDescJson2(list, value) {
  return list.find((f) => {return String(f.key) === String(value)}).label;
}

export function getTotal(list, field) {
  //  console.log('total........1'); 
    let total = 0;
    let x = 0; 
    for (x = 0; x < list.length; x++) {
        total += Number(list[x][field]);  
    }
    return total;
}

export function setValueJson(list, row, modo) {

    if ((modo === 'edit') |  (modo === 'delete')) {
        let a = 0;
        for (a = 0; a < list.length; a++) { 
          if (list[a]['id'] === row['id']) {
            list[a] = row;
          }
        }
    } else {
        list.push(row);
    }
}



