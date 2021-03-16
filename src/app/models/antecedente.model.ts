export class antecedenteModel {
    paciente:
        {tipo_documento:String,
        numero_documento:String,
        nombre:String,
        apellido:String
        }
    ;
    antecedente:
     {  id:String,
        alergias:String,
        enfermedades:String,
        enfermedades_familiares:String,
        cirugias:String,
        medicamentos:String,
        otros:String,
        paciente:String,
    }
}