import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions{
    to:string|string[];
    subject:string;
    htmlBody:string;
    attachments?:Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
  }


  

export class EmailService{
    private transporter = nodemailer.createTransport({
        service:envs.MAILER_SERVICE,
        auth:{
            user:envs.MAILER_EMAIL,
            pass:envs.MAILER_SECRET_KEY,
        }
    });

    constructor(
       

    ){}

    async sendEmail(options:SendMailOptions):Promise<boolean>{
        const {to,subject,htmlBody, attachments=[]
              } = options;
        try{
            const sentInformation= this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments:attachments
            });
            const log= new LogEntity({
                level:LogSeverityLevel.low,
                message:'Email sent',
                origin:'email.service.ts'
            });
          
            console.log(sentInformation);
            return true;
        }
        catch(error){
            const log= new LogEntity({
                level:LogSeverityLevel.high,
                message:'Email was not sent',
                origin:'email.service.ts'
            });
            
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem velit non veniam ullamco ex eu laborum deserunt est amet elit nostrud sit. Dolore ullamco duis in ut deserunt. Ad pariatur labore exercitation adipisicing excepteur elit anim eu consectetur excepteur est dolor qui. Voluptate consectetur proident ex fugiat reprehenderit exercitation laboris amet Lorem ullamco sit. Id aute ad do laborum officia labore proident laborum. Amet sit aliqua esse anim fugiat ut eu excepteur veniam incididunt occaecat sit irure aliquip. Laborum esse cupidatat adipisicing non et cupidatat ut esse voluptate aute aliqua pariatur.</p>
        <p>Ver logs adjuntos</p>
        `;
    
        const attachments:Attachement[] = [
          { filename: 'logs-all.log', path: './logs/logs-all.log' },
          { filename: 'logs-high.log', path: './logs/logs-high.log' },
          { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];
    
        return this.sendEmail({
          to, subject, attachments, htmlBody
        });
    
      }
    

}