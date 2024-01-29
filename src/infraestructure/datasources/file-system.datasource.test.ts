import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
describe('FilesystemDataSource',()=>{

    console.log(__dirname)
    const logPath= path.join(__dirname,'../../../logs')

    beforeEach(()=>{
        if(fs.existsSync(logPath)){
            try{
                fs.rmSync(logPath,{recursive:true,force:true})
            }
            catch(error){
                console.error('Error al eliminar el directorio',error);
            }
        }
        else{
            console.log("EL DIRECTORIO NO EXISTE")
        }
        
    })

    test('should create log files if they do not exists',()=>{
        new FileSystemDataSource();
        const file=fs.readdirSync(logPath);
        expect(file).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ])
    })

    test('should save a log in logs-all.log',()=>{
       const LogDataSource = new FileSystemDataSource();
       const log= new LogEntity({
        message:'test',
        level:LogSeverityLevel.low,
        origin:'file-system.datasource.test.ts'
       });

       LogDataSource.saveLog(log)
       const allLogs= fs.readFileSync(`${logPath}/logs-all.log`,'utf-8');
       console.log(allLogs);
       expect(allLogs).toContain(JSON.stringify(log));
    })

    test('should save a log in logs-all and logs-medium.log',()=>{
        const LogDataSource = new FileSystemDataSource();
        const log= new LogEntity({
         message:'test',
         level:LogSeverityLevel.medium,
         origin:'file-system.datasource.test.ts'
        });
 
        LogDataSource.saveLog(log)
        const allLogs= fs.readFileSync(`${logPath}/logs-all.log`,'utf-8');
        const medium= fs.readFileSync(`${logPath}/logs-medium.log`,'utf-8');
        console.log(allLogs);
        expect(allLogs).toContain(JSON.stringify(log));
     })

     test('should return all logs',async()=>{
        const logDataSource= new FileSystemDataSource();
        const logLow= new LogEntity({
            message:'log-low',
            level:LogSeverityLevel.low,
            origin:'low'
        });
        const logMedium= new LogEntity({
            message:'log-medium',
            level:LogSeverityLevel.low,
            origin:'medium'
        })
        const logHigh= new LogEntity({
            message:'log-high',
            level:LogSeverityLevel.high,
            origin:'high'
        })
         await logDataSource.saveLog(logLow);
         await logDataSource.saveLog(logMedium);
         await logDataSource.saveLog(logHigh);

         const logsLow= await logDataSource.getLogs(LogSeverityLevel.low);
         const medium= await logDataSource.getLogs(LogSeverityLevel.medium);
         const high= await logDataSource.getLogs(LogSeverityLevel.high);

         expect(logsLow).toEqual(expect.arrayContaining([logLow,logMedium,logHigh]));
         expect(medium).toEqual(expect.arrayContaining([]));
         expect(high).toEqual(expect.arrayContaining([logHigh]));
     });

     test('should not thrown an error if path exists',()=>{
        new FileSystemDataSource();
        new FileSystemDataSource();
        expect(true).toBeTruthy();

     })

     test('should  thrown and error if severity level is not defined',async()=>{
        const logDatasource = new FileSystemDataSource();
       const customSeverityLevel='SUPER_MEGA_HIGH' as LogSeverityLevel;
       try{
        await logDatasource.getLogs(customSeverityLevel)
        expect(true).toBeFalsy()
    }
       catch(error){
        const errorString=`${error}`
        console.log(errorString);
        expect(errorString).toContain(`${customSeverityLevel} not implemented`)
       }

     })
    
})