//Diaz Ayrton - Backend JS
class Usuario{
    constructor(nombre,apellido,libros=[],mascotas=[]){
        this.nombre=nombre
        this.apellido=apellido
        this.libros=libros
        this.mascotas=mascotas
    }
    getfullName(){
        return console.log(`Mi nombre es ${this.nombre} ${this.apellido}`);
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
        console.log("Se añadio una nueva mascota: ",mascota)
        this.countMascotas();
    }
    countMascotas(){
        return console.log('Cantidad de mascotas: ',this.mascotas.length);
    }
    addBook(nombre,autor){
        const nuevoLibro ={
            nombreLibro: nombre,
            autorLibro: autor,
        }
        this.libros.push(nuevoLibro);
        console.log("Se añadio el libro: ",nuevoLibro.nombreLibro)
        this.getBookNames();
    }
    getBookNames(){
        const nombreLibros=[]
        for(const libro of this.libros){
            nombreLibros.push(libro.nombreLibro)
        }
        return console.log(nombreLibros);
    }

}

const usuario1 = new Usuario('Ayrton', 'Diaz',
[{nombreLibro:'El señor de los anillos',autorLibro:'Tolkien'},
{nombreLibro:'Jurassic Park',autorLibro:'Steven Spielberg'}],
['Scubi','BoladeNieve'])


//Devuelve Nombre
// usuario1.getfullName();

//Devuelve Nombre de Libros
// usuario1.getBookNames();

//Devuelve cantidad de mascotas
// usuario1.countMascotas();

//Añade un libro
// usuario1.addBook('Juan de los Palotes','Juan')

//Agrega una mascota
// usuario1.addMascota('Steve')
