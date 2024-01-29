import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "../../data/mongo"
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { MongoLogDatSource } from "./mongo-log.datsource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('Pruebas en MongoLogDataSource',()=>{
    
    const logDataSource= new MongoLogDatSource();

    const log= new LogEntity({
        level:LogSeverityLevel.medium,
        message:'test-message',
        origin:'mongo-log.datasource.test.ts'
    })
    beforeAll(async()=>{
        await MongoDatabase.connect({
            dbName:envs.MONGO_DB_NAME,
            mongoUrl:envs.MONGO_URL,
        })
    })

    afterAll(async()=>{
        await LogModel.deleteMany();
        mongoose.connection.close();
    })
    
    test('should create a log',async()=>{

     
        const logSpy= jest.spyOn(console,'log');
        
        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo log created",expect.any(String))
    })

    
    test('should get logs',async()=>{
        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.medium)
        
    })
})