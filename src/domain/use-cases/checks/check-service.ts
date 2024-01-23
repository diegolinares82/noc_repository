import { LogEntity, LogEntityOptions, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from "../../repository/log.repository";


interface CheckServiceUseCase {
  execute( url: string ):Promise<boolean>;
}


type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;




export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}


  public async execute( url: string ): Promise<boolean> {

    try {
      const req = await fetch( url );
      if ( !req.ok ) {
        throw new Error( `Error on check service ${ url }` );
      }

      let lowOption:LogEntityOptions={
        level : LogSeverityLevel.low,
        message: `Service ${ url } working`,
        origin:'check-service'
      };
      
      const log = new LogEntity(lowOption);
      this.logRepository.saveLog( log );
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${ error }`;
      let highOption:LogEntityOptions={
        level : LogSeverityLevel.high,
        message: errorMessage,
        origin:'check-service'
      };
      
      
      const log = new LogEntity(highOption );
      this.logRepository.saveLog(log);
      
      this.errorCallback && this.errorCallback( errorMessage );

      return false;
    }

  }

}