
let DesorganizarIntegrantes = [],
   integrante;

document.addEventListener("keydown",e => {
    if(e.target.matches("#Insert-paricipantes")){
       integrante = document.getElementById("Insert-paricipantes").value;
    }
    if(e.key === "Enter") {
        if(document.getElementById("Insert-paricipantes").value == ""){
            document.querySelector(".participantes-ingresados").classList.add("error");
        }else{
            document.querySelector(".participantes-ingresados").classList.remove("error");
            DesorganizarIntegrantes.push(integrante);
            document.getElementById("Insert-paricipantes").value = "";
            //Creacion de Listas
            let $li = document.createElement("li");
            $li.innerHTML = '<span id="icono" class="material-icons-outlined">cancel</span>' + integrante;
            document.querySelector(".visualizar-participantes").appendChild($li);
        }
        
    }
});



document.addEventListener("click", (e) =>{
    let repeticion;
    if(e.target.matches(".crear")){
       /******Validación form*******/ 
       if(document.querySelector(".repeticion").value > DesorganizarIntegrantes.length){
        document.querySelector(".repeticion").classList.add("borderErr");
        document.querySelector(".participantes-ingresados").classList.add("error");
       }else{
           document.querySelector(".repeticion").classList.remove("borderErr");
            if(DesorganizarIntegrantes.length == 0){
                    document.querySelector(".participantes-ingresados").classList.add("error");

                    setTimeout(() => {
                        document.querySelector(".participantes-ingresados").classList.remove("error");
                    }, 2000);
                }
                if(document.querySelector(".repeticion").value <= 0){
                    document.querySelector(".repeticion").classList.add("borderErr")
                    setTimeout(() => {
                        document.querySelector(".repeticion").classList.remove("borderErr");
                    }, 2000);
                }


                if(document.getElementById("insercion_listas").querySelector("ul")){
                    document.querySelector("body").removeChild(document.getElementById("insercion_listas"));
                    repeticion = document.querySelector(".repeticion").value;
            
                }else {
                    repeticion = document.querySelector(".repeticion").value;
                }
            }
            if(e.target.matches(".repeticion")){
                repeticion = 0;
            }
        }

    let integrantes = [];
    let arrayAleatorio = [];

    function genearAleatorio(){
        if(DesorganizarIntegrantes.length != arrayAleatorio.length){
            for(let i = 0; i<DesorganizarIntegrantes.length; i++){
                let NumAleatorio = Math.floor(Math.random()*DesorganizarIntegrantes.length);
                arrayAleatorio.push(NumAleatorio);
            }
        }
    }

    function eliminarRepetidos() {
        for(let j = 0; j <= arrayAleatorio.length; j++){ 
            for(let l = j+1; l <= arrayAleatorio.length; l++){
                if(arrayAleatorio[j] == arrayAleatorio[l]){
                    arrayAleatorio.splice(l,1)
                }
            }
        }
        if(DesorganizarIntegrantes.length != arrayAleatorio.length){
            numerosUnicosEnArray();
        }
    }

    function numerosUnicosEnArray(){
        if(DesorganizarIntegrantes.length != arrayAleatorio.length){
            let diferencia = DesorganizarIntegrantes.length - arrayAleatorio.length;
            for(let i = 0; i<diferencia; i++){
                let NumAleatorio = Math.floor(Math.random()*DesorganizarIntegrantes.length);
                arrayAleatorio.push(NumAleatorio);
            }
            eliminarRepetidos();
        }
    }

    function insertarElementos() {
        for(let int = 0; int < DesorganizarIntegrantes.length; int++) {
            let order = DesorganizarIntegrantes[(arrayAleatorio[int])];
            integrantes.push(order);
        }
    }

    function BucleDeInsecion2(){
        let inicio = 0;
        let length = Math.floor(integrantes.length/repeticion)
        const sumatoria = length; 
        for(let i=0; i<repeticion; i++){
            let $ul = document.createElement("ul");
            $ul.setAttribute("id",i);    
            let $titulo = document.createElement("h3");
            $titulo.textContent = "Grupo: "+(i+1);
            let $subdiv = document.createElement("div");
            $subdiv.setAttribute("id","grupos");

            $subdiv.appendChild($titulo,$ul);
            
            integrantes.slice(inicio, length).forEach(el => {
                let $li = document.createElement("li");
                $li.textContent = el;
                $ul.appendChild($li);
            });
    
            inicio = length; 
            length = length + sumatoria;
            
            if(!document.getElementById("insercion_listas")){
                let $div = document.createElement("div");
                $div.setAttribute("id","insercion_listas");
                document.querySelector(".content").insertAdjacentElement("afterend",$div);
            }
             document.getElementById("insercion_listas").appendChild($subdiv);
            $subdiv.appendChild($titulo);
            $subdiv.appendChild($ul);
        }
       
        if((integrantes.length % repeticion) != 0 && repeticion > (integrantes.length % repeticion)) {
           let IntegrantesFaltantes = integrantes.slice(- integrantes.length % repeticion);
           let listas = Array.from(document.getElementById("insercion_listas").querySelectorAll("ul"));
    
           for(let li = 0; li < IntegrantesFaltantes.length; li++){
                let $li = document.createElement("li");
                $li.textContent = IntegrantesFaltantes[li];
                listas[li].appendChild($li)
           }
         
        }

         /*******Eliminar Listas*******/
    let $li = document.querySelector(".visualizar-participantes").querySelector("li");
    if(e.target.matches("#icono")){
        let nombreElement = $li.textContent.slice(6);
        let posI = integrante.indexOf(nombreElement);
        let posA = arrayAleatorio.indexOf(nombreElement);
        let pos = DesorganizarIntegrantes.indexOf(nombreElement);
        integrantes.splice(posI,1);
        arrayAleatorio.splice(posA,1);
        DesorganizarIntegrantes.splice(pos,1);
        console.log(DesorganizarIntegrantes)

        document.querySelector(".visualizar-participantes").removeChild($li);
        
    }
    
   
    }

    genearAleatorio();
    eliminarRepetidos();
    insertarElementos();
    BucleDeInsecion2(); 
    

});


/****************Loader************** */

document.addEventListener("click",e=>{
    $loaded = document.querySelector(".lds-hourglass");
    if(e.target.matches(".crear")){
        $loaded.classList.add("active");
        document.getElementById("insercion_listas").classList.add("none");
    
    setTimeout(() => {
        $loaded.classList.remove("active");
        document.getElementById("insercion_listas").classList.remove("none");
        document.querySelector(".crear")
        scrollTo({
            behavior: "smooth",
            top:675,
        });
    }, 3000);
}
});


document.addEventListener("click",e=>{
    setTimeout(()=>{
        if(e.target.matches(".crear")&&document.getElementById("insercion_listas").childNodes.length <= 0) {
            let $p = document.createElement("p");
            $p.textContent = "Se deben de llenar todos los campos correctamente."
            $p.setAttribute("style","color:red; font-size:20px;")
            document.querySelector(".content-form").appendChild($p);
            setTimeout(()=> {
                document.querySelector(".content-form").removeChild($p);
            },3000)
        }          
    },3000);
});
 