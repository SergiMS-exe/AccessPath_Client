import { TypesOfDisabilitiesValue } from "./Valoracion";

type Props = {
    _id: string;
    nombre: string;
    apellidos: string;
    email: string;
    tipoDiscapacidad: TypesOfDisabilitiesValue;
    saved?: string[];
};

class Person {
    _id: string;
    nombre: string;
    apellidos: string;
    email: string;
    tipoDiscapacidad: TypesOfDisabilitiesValue;
    saved: string[];

    constructor(props: Props) {
        this._id = props._id;
        this.nombre = props.nombre;
        this.apellidos = props.apellidos;
        this.email = props.email;
        this.tipoDiscapacidad = props.tipoDiscapacidad;
        if (props.saved)
            this.saved = props.saved;
        else
            this.saved = []
    }

    save(item: string): void {

        this.saved.push(item)
    }

    unSave(item: string): void {
        const index = this.saved.indexOf(item);

        if (index > -1) {
            this.saved.splice(index, 1);
        }
    }
}

export default Person;
