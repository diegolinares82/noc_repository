import {CronJob} from 'cron';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/checks/check-service';
import { LogRepository } from '../domain/repository/log.repository';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)
export class Server{
    public static start(){
        console.log('Server started...');
        
        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
             // new CheckService().execute('https://www.google.com/');
           const url='https://localhost:3000';
             new CheckService(
                fileSystemLogRepository,
                ()=>console.log('sucess'),
                (error)=>console.log(error),
             ).execute(url);
            }
        );
       
    }
}
