window.addEventListener("load", () => {
    const botonEnviar=document.getElementById("enviar")
    botonEnviar.addEventListener("click", ()=>{
        const query=document.getElementById("query")
        const valor=query.value
        const tipoBusqueda = document.querySelector("input:checked[type=radio]").value
        switch(tipoBusqueda){
            case "series":
                buscarSerie(valor);
                break;
            case "disney":
                buscarDisney(valor);
                break;
        }
        
    });

    const botonCerrar=document.querySelector(".close")
    botonCerrar.addEventListener("click",()=>{
        const dialogo=document.getElementById("dialogo-datos")
        dialogo.removeAttribute("open")        
    })
})

function buscarSerie(valor){
    fetch("https://api.tvmaze.com/search/shows?q=" + valor).then(response => {
        return response.json()
    }).then(datos => {
        
        const listado = datos.map(registro =>{ 
            const { show: { name, summary, image, officialSite}} = registro;
            const fila = document.createElement("div")
            const primeraColumna = document.createElement("div")
            const parrafoNombre=document.createElement("p")
            parrafoNombre.style.fontWeight = "bold";
            const textoNombre = document.createTextNode(`Nombre: ${name}`)
            const parrafoSitioWeb=document.createElement("p")
            const a = document.createElement("a")
            a.setAttribute("href",officialSite)
            a.setAttribute("target","_blank")
            const urltexto = document.createTextNode(`Sitio Web: `)
            const textoEnlace=document.createTextNode(`Sitio Web`)
            const segundaColumna = document.createElement("div")
            const imagen=document.createElement("img")

            fila.appendChild(primeraColumna)
            fila.classList.add("row")
            fila.classList.add("mt-4")
            primeraColumna.appendChild(parrafoNombre)
            primeraColumna.classList.add("col-6")
            parrafoNombre.appendChild(textoNombre)
            primeraColumna.appendChild(parrafoSitioWeb)
            parrafoSitioWeb.appendChild(urltexto)
            parrafoSitioWeb.appendChild(a)
            a.appendChild(textoEnlace)
            fila.appendChild(segundaColumna)
            
            const boton=document.createElement("button")
            boton.setAttribute("type","button")
            boton.innerText = "Ver Detalles";
            boton.addEventListener("click",()=>{
                abrirDialogo({"titulo": name,
                            "resumen": summary
                });
            })
            primeraColumna.appendChild(boton)

            segundaColumna.appendChild(imagen)
            if(image) {
                imagen.setAttribute("src", image.medium)
            } else {
                imagen.setAttribute("src", "imgs/generica.jpeg")
            }
            
            segundaColumna.classList.add("col-6")

            return fila
           
        })
        const resultado = document.getElementById("resultado")  
        resultado.innerHTML = ""
        listado.forEach(item => resultado.appendChild(item))
    
    
    })
        

}

function buscarDisney(valor){
    fetch("https://api.disneyapi.dev/character?name=" + valor).then(response => {
        return response.json()
    }).then(datos => {
        const listado = datos.data.map(registro => {
            const { name, imageUrl} = registro;
            const fila = document.createElement("div")
            const primeraColumna = document.createElement("div")
            const parrafoNombre=document.createElement("p")
            const textoNombre = document.createTextNode(`Nombre: ${name}`)
            const segundaColumna = document.createElement("div")
            const imagen=document.createElement("img")

            fila.appendChild(primeraColumna)
            fila.classList.add("row")
            fila.classList.add("mt-4")
            primeraColumna.appendChild(parrafoNombre)
            primeraColumna.classList.add("col-6")
            parrafoNombre.appendChild(textoNombre)

            const boton=document.createElement("button")
            boton.setAttribute("type","button")
            boton.innerText = "Ver Detalles";

            const resumen = `Programas de TV: ${registro.tvShows.join(", ")}`;


            boton.addEventListener("click",()=>{
                abrirDialogo({"titulo": name,
                            "resumen": resumen
                });
            })
            primeraColumna.appendChild(boton)

            fila.appendChild(segundaColumna)
            segundaColumna.appendChild(imagen)
            segundaColumna.classList.add("col-6")
            if(imageUrl){
                imagen.setAttribute("src", imageUrl)
                
            }else{
                imagen.setAttribute("src", "/img/generica.jpeg")
            }
            
            
            return fila;
        })
        
        const resultado = document.getElementById("resultado")  
        resultado.innerHTML = "";
        listado.forEach(fila => resultado.appendChild(fila))
    
    
    })
        

}

const abrirDialogo = (datos) => {
    const dialogo=document.getElementById("dialogo-datos")
    dialogo.setAttribute("open", true)
    const titulo=dialogo.querySelector("h2");
    titulo.innerText=datos.titulo;
    const detalles=document.getElementById("detalles")
    detalles.innerHTML=datos.resumen;

}
