type Props = {
    _id: number;
    nombre: string;
    apellidos: string;
    email: string;
    tipoDiscapacidad: string;
};

class Person {
    _id: number;
    nombre: string;
    apellidos: string;
    email: string;
    tipoDiscapacidad: string;

    constructor(props: Props) {
        this._id = props._id;
        this.nombre = props.nombre;
        this.apellidos = props.apellidos;
        this.email = props.email;
        this.tipoDiscapacidad = props.tipoDiscapacidad;
    }
}

export default Person;
  