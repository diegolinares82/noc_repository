import {CronJob} from 'cron';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/checks/check-service';
import { LogRepository } from '../domain/repository/log.repository';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { envs } from '../config/plugins/envs.plugin';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email.logs';

const emailService= new EmailService();

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)
export class Server{
    public static start(){
        console.log('Server started...');
        console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL)
        //Mandar email

        
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute('diegolinares82@gmail.com')
        //  const emailService= new EmailService();
        //  emailService.sendEmailWithFileSystemLogs(
        //      'diegolinares82@gmail.com'
            
        //  )
        


        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //      // new CheckService().execute('https://www.google.com/');
        //    const url='https://localhost:3000';
        //      new CheckService(
        //         fileSystemLogRepository,
        //         ()=>console.log('sucess'),
        //         (error)=>console.log(error),
        //      ).execute(url);
        //     }
        // );
       
    }
}
