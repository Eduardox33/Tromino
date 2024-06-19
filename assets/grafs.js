function grafo(){

    let tileMap = [];
    if(tabla.rows.length!==8){return alert("Solo funciona en 8x8");}

    const s = sessionStorage.getItem("s") || -1;
    if(s===-1){return alert("Recuerda seleccionar tipo de solución");}
    if(s==="2"){return alert("Solo funciona con solución inductiva");}

    for(let x=0;x<tabla.rows.length;x++){
        let agg=[];
        for(let y=0;y<tabla.rows.length;y++){
            agg.push(tabla.rows[x].cells[y].innerText);
        }
        tileMap.push(agg);
    }

    let centroides = [];
    let nivel = Math.log(tabla.rows.length)/Math.log(2);
    let tileColores = new Array(nivel).fill(0).map(() => new Array(nivel).fill(0));

    function dentroLimites(x, y, mapa) {
        return 0 <= x && x < mapa.length && 0 <= y && y < mapa[0].length;
    }

    for (let i = 0; i < tileMap.length; i++) {
        for (let j = 0; j < tileMap[i].length; j++) {
            if (i > 0 && j > 0) {
                if (tileMap[i-1][j] === tileMap[i][j] && tileMap[i][j-1] === tileMap[i][j]) {
                    centroides.push([i, j, tileMap[i][j]]);
                }
            }
            if (i > 0 && j < tileMap[i].length - 1) {
                if (tileMap[i-1][j] === tileMap[i][j] && tileMap[i][j+1] === tileMap[i][j]) {
                    centroides.push([i, j, tileMap[i][j]]);
                }
            }
            if (i < tileMap.length - 1 && j > 0) {
                if (tileMap[i+1][j] === tileMap[i][j] && tileMap[i][j-1] === tileMap[i][j]) {
                    centroides.push([i, j, tileMap[i][j]]);
                }
            }
            if (i < tileMap.length - 1 && j < tileMap[i].length - 1) {
                if (tileMap[i+1][j] === tileMap[i][j] && tileMap[i][j+1] === tileMap[i][j]) {
                    centroides.push([i, j, tileMap[i][j]]);
                }
            }
        }
    }

    let listVecinosOrden = [];

    for (let i = 0; i < centroides.length; i++) {
        let vecinos = new Set();
        let x = centroides[i][0];
        let y = centroides[i][1];
        let tileType = centroides[i][2][0];

        if (tileType === "A") {
            if (dentroLimites(x, y + 1, tileMap)) {
                vecinos.add(tileMap[x][y + 1]);
            }
            if (dentroLimites(x + 1, y - 1, tileMap)) {
                vecinos.add(tileMap[x + 1][y - 1]);
            }
            if (dentroLimites(x + 1, y - 2, tileMap)) {
                vecinos.add(tileMap[x + 1][y - 2]);
            }
            if (dentroLimites(x, y - 2, tileMap)) {
                vecinos.add(tileMap[x][y - 2]);
            }
            if (dentroLimites(x - 1, y - 2, tileMap)) {
                vecinos.add(tileMap[x - 1][y - 2]);
            }
            if (dentroLimites(x - 1, y - 1, tileMap)) {
                vecinos.add(tileMap[x - 1][y - 1]);
            }
            if (dentroLimites(x - 2, y - 1, tileMap)) {
                vecinos.add(tileMap[x - 2][y - 1]);
            }
            if (dentroLimites(x - 2, y, tileMap)) {
                vecinos.add(tileMap[x - 2][y]);
            }
            if (dentroLimites(x - 2, y + 1, tileMap)) {
                vecinos.add(tileMap[x - 2][y + 1]);
            }
            if (dentroLimites(x - 1, y + 1, tileMap)) {
                vecinos.add(tileMap[x - 1][y + 1]);
            }
            if (dentroLimites(x, y + 1, tileMap)) {
                vecinos.add(tileMap[x][y + 1]);
            }
            if (dentroLimites(x + 1, y + 1, tileMap)) {
                vecinos.add(tileMap[x + 1][y + 1]);
            }
        } else if (tileType === "B") {
            if (dentroLimites(x + 1, y, tileMap)) {
                vecinos.add(tileMap[x + 1][y]);
            }
            if (dentroLimites(x + 1, y - 1, tileMap)) {
                vecinos.add(tileMap[x + 1][y - 1]);
            }
            if (dentroLimites(x, y - 1, tileMap)) {
                vecinos.add(tileMap[x][y - 1]);
            }
            if (dentroLimites(x - 1, y - 1, tileMap)) {
                vecinos.add(tileMap[x - 1][y - 1]);
            }
            if (dentroLimites(x - 2, y - 1, tileMap)) {
                vecinos.add(tileMap[x - 2][y - 1]);
            }
            if (dentroLimites(x - 2, y, tileMap)) {
                vecinos.add(tileMap[x - 2][y]);
            }
            if (dentroLimites(x - 2, y + 1, tileMap)) {
                vecinos.add(tileMap[x - 2][y + 1]);
            }
            if (dentroLimites(x - 1, y + 1, tileMap)) {
                vecinos.add(tileMap[x -1][y + 1]);
            }
            if (dentroLimites(x - 1, y + 2, tileMap)) {
                vecinos.add(tileMap[x - 1][y + 2]);
            }
            if (dentroLimites(x, y + 2, tileMap)) {
                vecinos.add(tileMap[x][y + 2]);
            }
            if (dentroLimites(x + 1, y + 2, tileMap)) {
                vecinos.add(tileMap[x + 1][y + 2]);
            }
            if (dentroLimites(x + 1, y + 1, tileMap)) {
                vecinos.add(tileMap[x + 1][y + 1]);
            }
        } else if (tileType === "C") {
            if (dentroLimites(x - 1, y, tileMap)) {
                vecinos.add(tileMap[x - 1][y]);
            }
            if (dentroLimites(x - 1, y + 1, tileMap)) {
                vecinos.add(tileMap[x - 1][y + 1]);
            }
            if (dentroLimites(x, y + 1, tileMap)) {
                vecinos.add(tileMap[x][y + 1]);
            }
            if (dentroLimites(x + 1, y + 1, tileMap)) {
                vecinos.add(tileMap[x + 1][y + 1]);
            }
            if (dentroLimites(x + 2, y + 1, tileMap)) {
                vecinos.add(tileMap[x + 2][y + 1]);
            }
            if (dentroLimites(x + 2, y, tileMap)) {
                vecinos.add(tileMap[x + 2][y]);
            }
            if (dentroLimites(x + 2, y - 1, tileMap)) {
                vecinos.add(tileMap[x + 2][y - 1]);
            }
            if (dentroLimites(x + 1, y - 1, tileMap)) {
                vecinos.add(tileMap[x + 1][y - 1]);
            }
            if (dentroLimites(x + 1, y - 2, tileMap)) {
                vecinos.add(tileMap[x + 1][y - 2]);
            }
            if (dentroLimites(x, y - 2, tileMap)) {
                vecinos.add(tileMap[x][y - 2]);
            }
            if (dentroLimites(x - 1, y - 2, tileMap)) {
                vecinos.add(tileMap[x - 1][y - 2]);
            }
            if (dentroLimites(x - 1, y - 1, tileMap)) {
                vecinos.add(tileMap[x - 1][y - 1]);
            }
        } else if (tileType === "D") {
            if (dentroLimites(x - 1, y, tileMap)) {
                vecinos.add(tileMap[x - 1][y]);
            }
            if (dentroLimites(x - 1, y + 1, tileMap)) {
                vecinos.add(tileMap[x - 1][y + 1]);
            }
            if (dentroLimites(x - 1, y + 2, tileMap)) {
                vecinos.add(tileMap[x - 1][y + 2]);
            }
            if (dentroLimites(x, y + 2, tileMap)) {
                vecinos.add(tileMap[x][y + 2]);
            }
            if (dentroLimites(x + 1, y + 2, tileMap)) {
                vecinos.add(tileMap[x + 1][y + 2]);
            }
            if (dentroLimites(x + 1, y + 1, tileMap)) {
                vecinos.add(tileMap[x + 1][y + 1]);
            }
            if (dentroLimites(x + 2, y + 1, tileMap)) {
                vecinos.add(tileMap[x + 2][y + 1]);
            }
            if (dentroLimites(x + 2, y, tileMap)) {
                vecinos.add(tileMap[x + 2][y]);
            }
            if (dentroLimites(x + 2, y - 1, tileMap)) {
                vecinos.add(tileMap[x + 2][y - 1]);
            }
            if (dentroLimites(x + 1, y - 1, tileMap)) {
                vecinos.add(tileMap[x + 1][y - 1]);
            }
            if (dentroLimites(x, y - 1, tileMap)) {
                vecinos.add(tileMap[x][y - 1]);
            }
            if (dentroLimites(x - 1, y - 1, tileMap)) {
                vecinos.add(tileMap[x - 1][y - 1]);
            }
        }
        listVecinosOrden.push([...vecinos]);
    }

    let colors = ['red', 'blue', 'purple', 'green'];
    let trominoColors = {};
    let tn= {'red':'1','blue':'2','purple':"3",'green':'4'};
    function findValidColor(neighborsColors) {
        for (let color of colors) {
            if (!neighborsColors.includes(color)) {
                return color;
            }
        }
        return null;
    }

    function assignColors(index = 0) {
        if (index === centroides.length) {
            return true;
        }
        let centroide = centroides[index];
        let vecinos = listVecinosOrden[index];
        let tromino = centroide[2];
        let neighborsColors = vecinos.map(neighbor => trominoColors[neighbor]).filter(color => color !== undefined);
        for (let color of colors) {
            if (!neighborsColors.includes(color)) {
                trominoColors[tromino] = color;
                if (assignColors(index + 1)) {
                    return true;
                }
                delete trominoColors[tromino];
            }
        }
        return false;
    }

    if (assignColors()) {
        let trominoKeys = Object.keys(trominoColors).sort();
    } 

    if(Object.keys(trominoColors).length!==21){return alert("Recuerda buscar una solución primero");}
    
    for(let x=0;x<tabla.rows.length;x++){
        for(let y=0;y<tabla.rows.length;y++){
            if(tabla.rows[x].cells[y].innerText==="x"){continue;}
            tabla.rows[x].cells[y].bgColor=trominoColors[tabla.rows[x].cells[y].innerText];
        }
    }
    trominoColors["x"]="x";tn["x"]="x";

    let grafos=document.getElementById("grafos");
    grafos.style.scale="1";
    grafos.innerHTML="";
    let tab="<tr><td style='padding:0.5em;' >Ficha</td><td style='padding:0.5em;' >Valor</td><td style='padding:0.5em;' >Conexiones</td><td style='padding:0.5em;' >Valores Conexiones</td></tr>";
    for(x in centroides){
        let l=listVecinosOrden[x].join();
        let n=[]
        for(e in listVecinosOrden[x]){
            n.push(tn[trominoColors[listVecinosOrden[x][e]]]);
        }
        let ns=n.join();
        console.log(`${centroides[x][2]} = ${tn[trominoColors[centroides[x][2]]]} ---> [${l}] = [${ns}]`);
        tab+=`<tr><td style='padding:0.5em;' >${centroides[x][2]}</td><td style='padding:0.5em;' >${tn[trominoColors[centroides[x][2]]]}</td><td style='padding:0.5em;' >[${l}]</td><td style='padding:0.5em;' >[${ns}]</td></tr>`;
    }
    grafos.innerHTML+=tab;
}   
