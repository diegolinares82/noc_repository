import {CronJob} from 'cron';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';

export class Server{
    public static start(){
        console.log('Server started...');
        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
             // new CheckService().execute('https://www.google.com/');
           const url='https://www.google.com/';
             new CheckService(
                ()=>console.log('sucess'),
                (error)=>console.log(error),
             ).execute(url);
            }
        );
       
    }
}
