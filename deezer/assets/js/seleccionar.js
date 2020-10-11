$(document).ready(function(){
    parametro=window.location.search;
    console.log(parametro);
    pg=parametro.substring(8,parametro.length-3);
    console.log(pg);
    parametro=new URLSearchParams(parametro);
    console.log(parametro);
    
    
    if (parametro.has('q') || parametro.has('url') ){
        resultados();
    }

    if(parametro.has('categoria')){
        genero();
    }

})