import { CronJob } from "cron";


type CronTime= string | Date;
type OnTick = () => void;

export class CronService{
    static createJob(crontTime:CronTime, onTick:OnTick){
        const job = new CronJob(
            crontTime, // cronTime
            onTick, // onTick
           
        );
        job.start();
        return job;
    }
}