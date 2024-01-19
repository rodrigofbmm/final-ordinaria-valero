import { GraphQLError, __Directive } from "graphql";
import { ContactoModel, ContactoModelType } from "../db/Contacto.ts";

export const Mutation = {
    addContact: async(_: unknown,args:{nombre: string,telefono: string}): Promise<ContactoModelType> =>{
        try{
        let options = {
            method: 'GET',
            headers:{'X-Api-Key': '4nFTv0zA+3ht7SRrdAm9kw==Z0y9esxwJIJPxUFB'}
        }
        const url = `https://api.api-ninjas.com/v1/validatephone?number=${args.telefono.toString()}`;
        const data = await fetch(url,options);
        const json = await data.json();

        if(data.status != 200){
            throw new Error("el telefono no es valido");
        }

        const a = json.is_valid;

        if(a != true){
            throw new Error("el telefono no es valido");
        }

        const telefono = (await ContactoModel.findOne({telefono: args.telefono})) as unknown as ContactoModelType;

        if (telefono){
            throw new GraphQLError(`ya existe este telefono`)
        }

        const contacto = {
            id: __Directive.toString(),
            nombre: args.nombre,
            telefono: args.telefono,
            pais: json.country,
            hora: json.timezone
        }
       
        const newcontacto = await ContactoModel.create(contacto);
        
        return newcontacto;

    }catch(Error){
        throw Error;
    }
        
    },
    deleteContact: async (_: unknown,args:{id: string}): Promise<ContactoModelType> =>{
        const contacto = (await ContactoModel.findByIdAndDelete(args.id))as unknown as ContactoModelType;
        if(!contacto){
            throw new GraphQLError(`no hay con esta id `);
        }
        return contacto;
        
    },
    updateContact: async (_: unknown,args:{id: string,nombre: string,telefono: string}): Promise<ContactoModelType> =>{

        const telefono = (await ContactoModel.findOne({telefono: args.telefono})) as unknown as ContactoModelType;

        if (telefono){
            throw new GraphQLError(`ya existe este telefono`)
        }
        
        const contacto = await ContactoModel.findByIdAndUpdate(args.id,
            {nombre: args.nombre, telefono: args.telefono},
            {new: true, runValidators:true},
        );

        if(!contacto){
            throw new GraphQLError(`no hay con esta id `);
        }
        let options = {
            method: 'GET',
            headers:{'X-Api-Key': '4nFTv0zA+3ht7SRrdAm9kw==Z0y9esxwJIJPxUFB'}
        }
        const url = `https://api.api-ninjas.com/v1/validatephone?number=${args.telefono.toString()}`;
        const data = await fetch(url,options);
        const json = await data.json();

        if(data.status != 200){
            throw new Error("el telefono no es valido");
        }


        const a = json.is_valid;

        if(a != true){
            throw new Error("el telefono no es valido");
        }
        return contacto;
        
    },
};
