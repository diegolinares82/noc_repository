
import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";
import { MongoDatabase } from "./data/mongo/init";

(async()=>{
    main();
})();


async function main(){
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
      });
    
    
      Server.start();
    /*await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME,
    })*/

   // const prisma = new PrismaClient()
    // const newLog= await prisma.logModel.create({
    //     data:{
    //         level:'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // })

    // console.log({newLog});

   /* const logs= await prisma.logModel.findMany({
        where:{
            level:'HIGH'
        }
    });

    console.log(logs);*/

    //Crear un registro

    // const newLog= await LogModel.create({
    //     message:'Test message desde mongo',
    //     origin:'App.ts',
    //     level:'low'
    // })

    // await newLog.save()
    // console.log(newLog);

    // const logs= await LogModel.find();
    // console.log(logs);
    //Server.start();

    
}