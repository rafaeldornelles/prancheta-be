import { connect, ConnectOptions } from "mongoose";
import { app } from "./app";

async function main(){
    try{
        const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
        const conection = await connect(url,  { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
        console.log('conexao ao banco de dados bem sucedida');

        const port = process.env.PORT;
        const env = process.env.NODE_ENV;
        app.listen(port, ()=> {
            console.log(`Rodando na porta ${port}`);
            console.log(`Express no modo: ${env}`);
        })


    }catch (e){
        console.log(`erro: ${e}`);
    }
}

main();