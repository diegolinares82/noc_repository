import {CronJob} from 'cron';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/checks/check-service';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { envs } from '../config/plugins/envs.plugin';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email.logs';
import { MongoLogDatSource } from '../infraestructure/datasources/mongo-log.datsource';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { PostgreLogDataSource } from '../infraestructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const emailService= new EmailService();

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
  );
  const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatSource(),
  );
  const postgresLogRepository = new LogRepositoryImpl(
    new PostgreLogDataSource(),
  );
export class Server{
    public static async start(){
        console.log('Server started...');
        //console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL)
        //Mandar email

        
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute('diegolinares82@gmail.com')
        //  const emailService= new EmailService();
        //  emailService.sendEmailWithFileSystemLogs(
        //      'diegolinares82@gmail.com'
            
        //  )
        

        // const logs= await LogRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs);

         CronService.createJob(
              '*/5 * * * * *',
             ()=>{
           // new CheckService().execute('https://www.google.com/');
             const url='https://www.google55555.com/';
              new CheckServiceMultiple(
               [fsLogRepository, postgresLogRepository, mongoLogRepository],
                  ()=>console.log('sucess'),
                  (error)=>console.log(error),
              ).execute(url);
              }
          );
       
    }
}
