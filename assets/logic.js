const tabla=document.getElementById("tabla");
let letrasc="transparent";
let As=0,Bs=0,Cs=0,Ds=0;

const Rojo=[253,40,40];
const Rosado=[244,0,255];
const Azul=[0,43,220];
const Verde=[0,230,0];

function dim(n){
    sessionStorage.setItem("d",n);
    window.location.href="Tabla.html";}

function pintar(){
    for(var i=0,row; row=tabla.rows[i];i++){
        for(var j=0,file;file=row.cells[j];j++){
            const color=file.innerHTML;
            if(color==="x"){file.bgColor="white";}
            else if(color=="1"){file.bgColor="green";}
            else if(color=="2"){file.bgColor="purple";}
            else if(color=="3"){file.bgColor="blue";}
            else if(color=="4"){file.bgColor="red";}
        }
    }
}

function select(x,y){
    for(var i=0,row; row=tabla.rows[i];i++){
        for(var j=0,file;file=row.cells[j];j++){
            file.innerText="";
        }
    }
    tabla.rows[x].cells[y].innerText="x";
    solucionar(x,y);
}

function rgbToHex(r,g,b) {
    r=Math.max(0,Math.min(255, r));
    g=Math.max(0,Math.min(255, g));
    b=Math.max(0,Math.min(255, b));

    let hexR=r.toString(16).padStart(2,'0');
    let hexG=g.toString(16).padStart(2,'0');
    let hexB=b.toString(16).padStart(2,'0');

    return `#${hexR}${hexG}${hexB}`;
}

function solucionar(tX,tY){
    
    const s = sessionStorage.getItem("s") || -1;
    if(s===-1){return alert("Recuerda seleccionar tipo de solución");}
    if(s==="2"){return resolverr(tX,tY);}

    function getCentro(startX, endX, startY, endY) {
        return [(startX+endX)>>1,(startY+endY)>>1];
    }
        
    function ponerTrominos(tileMap,x1,y1,x2,y2,x3,y3,tipoTromino) {
        colocarTromino(tileMap,x1,y1,tipoTromino);
        colocarTromino(tileMap,x2,y2,tipoTromino);
        colocarTromino(tileMap,x3,y3,tipoTromino);

        if(tipoTromino.startsWith("A"))
            {
            tabla.rows[x1].cells[y1].bgColor=rgbToHex(Rojo[0],Rojo[1]+(As%10)*10,Rojo[2]+(As%10)*10);
            tabla.rows[x2].cells[y2].bgColor=rgbToHex(Rojo[0],Rojo[1]+(As%10)*10,Rojo[2]+(As%10)*10);
            tabla.rows[x3].cells[y3].bgColor=rgbToHex(Rojo[0],Rojo[1]+(As%10)*10,Rojo[2]+(As%10)*10);
            As++;
            }
        else if(tipoTromino.startsWith("B"))
            {tabla.rows[x1].cells[y1].bgColor=rgbToHex(Azul[0]+(Bs%10)*10,Azul[1]+(Bs%10)*10,Azul[2]);
            tabla.rows[x2].cells[y2].bgColor=rgbToHex(Azul[0]+(Bs%10)*10,Azul[1]+(Bs%10)*10,Azul[2]);
            tabla.rows[x3].cells[y3].bgColor=rgbToHex(Azul[0]+(Bs%10)*10,Azul[1]+(Bs%10)*10,Azul[2]);
            Bs++;
            }
        else if(tipoTromino.startsWith("C"))
            {tabla.rows[x1].cells[y1].bgColor=rgbToHex(Rosado[0]+(Cs%10)*10,Rosado[1]+(Cs%10)*20,Rosado[2]+(Cs%10)*10);
            tabla.rows[x2].cells[y2].bgColor=rgbToHex(Rosado[0]+(Cs%10)*10,Rosado[1]+(Cs%10)*20,Rosado[2]+(Cs%10)*10);
            tabla.rows[x3].cells[y3].bgColor=rgbToHex(Rosado[0]+(Cs%10)*10,Rosado[1]+(Cs%10)*20,Rosado[2]+(Cs%10)*10);
            Cs++;
            }
        else if(tipoTromino.startsWith("D"))
            {tabla.rows[x1].cells[y1].bgColor=rgbToHex(Verde[0]+(Ds%10)*10,Verde[1]+(Ds%10)*10,Verde[3]);
            tabla.rows[x2].cells[y2].bgColor=rgbToHex(Verde[0]+(Ds%10)*10,Verde[1]+(Ds%10)*10,Verde[3]);
            tabla.rows[x3].cells[y3].bgColor=rgbToHex(Verde[0]+(Ds%10)*10,Verde[1]+(Ds%10)*10,Verde[3]);
            Ds++;
            }
    }

    function colocarTromino(tileMap,x,y,tipoTromino){
        tileMap[x][y]=tipoTromino;
    }

    function resolver(nivel, tileMap, startX, endX, startY, endY, tileX, tileY) {
        const [centroX,centroY] = getCentro(startX,endX,startY,endY);
    
        let primerCuadranteX= centroX, primerCuadranteY = centroY;
        let segundoCuadranteX= centroX+1, segundoCuadranteY = centroY;
        let tercerCuadranteX= centroX, tercerCuadranteY = centroY+1;
        let cuartoCuadranteX= centroX+1, cuartoCuadranteY = centroY+ 1;
    
        if (tileX<=centroX){
            if (tileY<=centroY){
                ponerTrominos(tileMap, centroX, centroY + 1, centroX + 1, centroY + 1, centroX + 1, centroY, `A${(As%36).toString(36)}`);
                As++;
                primerCuadranteX= tileX;
                primerCuadranteY= tileY;
            }else{
                ponerTrominos(tileMap, centroX, centroY, centroX + 1, centroY, centroX + 1, centroY + 1, `B${(Bs%36).toString(36)}`);
                Bs++;
                segundoCuadranteX= tileX;
                segundoCuadranteY= tileY;
            }
        } else {
            if (tileY<=centroY) {
                ponerTrominos(tileMap, centroX, centroY, centroX, centroY + 1, centroX + 1, centroY + 1, `C${(Cs%36).toString(36)}`);
                Cs++;
                tercerCuadranteX= tileX;
                tercerCuadranteY= tileY;
            } else {
                ponerTrominos(tileMap, centroX, centroY, centroX + 1, centroY, centroX, centroY + 1, `D${(Ds%36).toString(36)}`);
                Ds++;
                cuartoCuadranteX= tileX;
                cuartoCuadranteY= tileY;
            }
        }
    
        if (nivel===1){
            return;
        }else{
            resolver(nivel-1, tileMap, startX, centroX, startY, centroY, primerCuadranteX, primerCuadranteY);
            resolver(nivel-1, tileMap, startX, centroX, centroY, endY, segundoCuadranteX, segundoCuadranteY);
            resolver(nivel-1, tileMap, centroX, endX, startY, centroY, tercerCuadranteX, tercerCuadranteY);
            resolver(nivel-1, tileMap, centroX, endX, centroY, endY, cuartoCuadranteX, cuartoCuadranteY);
        }
    }
    
    function resolverTromino(nivel, tileX, tileY) {
        const tamano= Math.pow(2, nivel);
        const tileMap= [...Array(tamano)].map((_, i) => {
            return [...Array(tamano)].map((_, j) => {
                return (i === tileX && j === tileY) ? 'x' : '0';
            });
        });
        resolver(nivel, tileMap, 0, tamano- 1, 0, tamano- 1, tileX, tileY);
        mostrarTablero(tileMap);   
    }
    
    function mostrarTablero(tileMap) {
        for (let i=0; tileMap[i]; i++) {
            for (let j=0;tileMap[j]; j++) {
                tabla.rows[i].cells[j].innerText =tileMap[i][j];
            }
        }
        pintar();
    }
    resolverTromino(Math.log(dimension)/Math.log(2), tX, tY);
}

function toggle(){
    if(letrasc==="transparent"){letrasc="black";}
    else{letrasc="transparent";}
    tabla.style.color=letrasc;
}

function induc(){
    sessionStorage.setItem("s",1);
}
function ran(){
    sessionStorage.setItem("s",2);
}

function print(m){
    for(r in m){
        console.log(m[r].join());
    }
}

function resolverr(X,Y){

    if(tabla.rows.length!==8){
        alert("Random solo funciona en 8x8");
        return window.location.href="Tromino.html";}

    function find(m){
        for(let x=0,r;r=m[x];x++){
            for(let y=0,c;c=r[y];y++){
                if(c==="x"){return y;}
            }
        }
        return -1;
    }
    
    function rellenar(X,Y){
        let rec=[
            ["0","0","0","0"],
            ["0","0","0","0"],
            ["0","0","0","0"],
            ["0","0","0","0"]
        ];
        rec[X][Y]="x"
        let upper=[rec[0],rec[1]];
        let below=[rec[2],rec[3]];
        if(find(below)===-1){
            below[0]=["4","0","0","3"]
            below[1]=["4","4","3","3"];
            if (find(upper)>1){
                below[0][1]="4";below[0][2]="4";
                upper[1][0]="1";upper[1][1]="4";
                upper[0][0]="1";upper[0][1]="1";
            }else{
                below[0][1]="3";below[0][2]="3";
                upper[1][3]="2";upper[1][2]="3";
                upper[0][3]="2";upper[0][2]="2";
            }
        }else{
            upper[0]=["1","1","2","2"];
            upper[1]=["1","0","0","2"];
            if(find(below)>1){
                 upper[1][1]="1";upper[1][2]="1";
                 below[0][1]="1";below[0][0]="4";
                 below[1][0]="4";below[1][1]="4"
            }else{
                upper[1][1]="2";upper[1][2]="2";
                below[0][2]="2";below[0][3]="3";
                below[1][2]="3";below[1][3]="3";
            }
        }
        rec=[upper[0],upper[1],below[0],below[1]];
        return rec;
    }
    
    let mapa=[
    ["0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0"]];
    let cuadrante;
    mapa[X][Y]="x";
    
    if(X<4&&Y<4){cuadrante=1;}
    else if(X>3&&Y<4){cuadrante=2;}
    else if(X>3&&Y>3){cuadrante=3;}
    else if(X<4&&Y>3){cuadrante=4;}
    
    let c1=[
        ["0","0","0","0","1","1","2","2"],
        ["0","0","0","0","1","1","1","2"],
        ["0","0","0","0","4","1","1","1"],
        ["0","0","0","0","4","4","1","3"],
        ["1","1","3","1","1","3","3","3"],
        ["1","3","3","1","3","3","1","1"],
        ["1","1","3","1","1","3","1","3"],
        ["1","3","3","1","3","3","3","3"]]
    let c2=[
        ["1","1","4","2","2","1","1","3"],
        ["1","4","4","4","2","1","3","3"],
        ["4","4","4","3","1","1","1","1"],
        ["4","4","3","3","1","3","1","3"],
        ["0","0","0","0","3","3","3","3"],
        ["0","0","0","0","1","1","1","1"],
        ["0","0","0","0","1","3","1","3"],
        ["0","0","0","0","3","3","3","3"]]
    let c3=[
        ["2","2","4","2","2","4","2","2"],
        ["4","2","4","4","2","4","4","2"],
        ["4","4","4","2","2","4","2","2"],
        ["1","1","4","4","2","4","4","2"],
        ["1","3","2","2","0","0","0","0"],
        ["3","3","3","2","0","0","0","0"],
        ["4","3","3","3","0","0","0","0"],
        ["4","4","3","3","0","0","0","0"]]
    let c4=[
        ["1","1","2","2","0","0","0","0"],
        ["1","2","2","2","0","0","0","0"],
        ["2","2","2","3","0","0","0","0"],
        ["4","2","3","3","0","0","0","0"],
        ["4","4","1","1","3","1","1","3"],
        ["2","2","1","3","3","1","3","3"],
        ["4","2","1","1","3","1","1","3"],
        ["4","4","1","3","3","1","3","3"]]
    
    let dx=0,dy=0;
    
    if(cuadrante===1){mapa=c1;}    
    else if(cuadrante===2){X-=4;mapa=c2;dx=4}
    else if(cuadrante===3){X-=4;Y-=4;mapa=c3;dx=4;dy=4}
    else if(cuadrante===4){Y-=4;mapa=c4;dy=4}
    
    rec=rellenar(X,Y);
    for(let x=0;rec[x];x++){
        for(let y=0;rec[x][y];y++){
            mapa[x+dx][y+dy]=rec[x][y];
        }
    }
    
    
    for(let x=0,row;row=mapa[x];x++){
        for(let y=0,cell;cell=row[y];y++){
            if(cell==="0"){
                
                const isInBounds = (map, x, y) => {
    return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
}

                const caso1 = isInBounds(mapa, x, y) && isInBounds(mapa, x, y+1) && isInBounds(mapa, x+1, y) &&
              mapa[x][y] === "0" && mapa[x][y+1] === "0" && mapa[x+1][y] === "0";

                const caso2 = isInBounds(mapa, x, y) && isInBounds(mapa, x, y-1) && isInBounds(mapa, x+1, y) &&
              mapa[x][y] === "0" && mapa[x][y-1] === "0" && mapa[x+1][y] === "0";

                const caso3 = isInBounds(mapa, x, y) && isInBounds(mapa, x-1, y) && isInBounds(mapa, x, y-1) &&
              mapa[x][y] === "0" && mapa[x-1][y] === "0" && mapa[x][y-1] === "0";

                const caso4 = isInBounds(mapa, x, y) && isInBounds(mapa, x-1, y) && isInBounds(mapa, x, y+1) &&
              mapa[x][y] === "0" && mapa[x-1][y] === "0" && mapa[x][y+1] === "0";
                
                if(caso1){  
                        mapa[x][y]="1";
                        mapa[x][y+1]="1";
                        mapa[x+1][y]="1";
                    }else if(caso2){
                            mapa[x][y]="2";
                            mapa[x][y-1]="2";
                            mapa[x+1][y]="2";
                    }else if(caso3){
                            mapa[x][y]="3";
                            mapa[x-1][y]="3";
                            mapa[x][y-1]="3";
                    }else if(caso4){
                            mapa[x][y]="4";
                            mapa[x-1][y]="4";
                            mapa[x][y+1]="4";
                    }
            }
        }
    }
    mostrar(mapa);
    function mostrar(m){
        for (let i=0; m[i]; i++) {
            for (let j=0;m[j]; j++) {
                tabla.rows[i].cells[j].innerText =m[i][j];
            }
        }
        pintar();
    }
}    