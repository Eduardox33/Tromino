const dimension= parseInt(sessionStorage.getItem("d")) || -1;
if(dimension==-1){window.location.href="Tromino.html";}

let creador="";
for(let x=0;x<dimension;x++){
    creador+="<tr>";
    for(let y=0;y<dimension;y++){
        creador+=`<td onclick='select(${x},${y})' id=''></td>`;
    }
    creador+="</tr>";
}
tabla.innerHTML=creador;