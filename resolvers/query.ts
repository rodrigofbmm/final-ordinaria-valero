import { GraphQLError } from "graphql";
import { ContactoModel, ContactoModelType } from "../db/Contacto.ts";

export const Query = {
    getContact: async(_: unknown, args:{id:string}): Promise<ContactoModelType> =>{
        const contacto = await ContactoModel.findById(args.id);
        if(!contacto){
            throw new GraphQLError(`no hay con este id: ${args.id}`);
        }
        return contacto;
    },
    getContacts: async(): Promise<ContactoModelType[]> =>{
        const contacto = await ContactoModel.find().exec();
        return contacto;
    }
};