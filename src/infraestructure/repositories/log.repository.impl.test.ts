import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogRepositoryImpl } from './log.repository.impl';
describe('LogRepositoryImpl',()=>{
    
    const mockLogDataSource={
        saveLog:jest.fn(),
        getLogs:jest.fn()
    }

    const logRepository= new LogRepositoryImpl(mockLogDataSource);
    
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    test('saveLog should call the datasource with arguments',async()=>{
        const log= {
            level:LogSeverityLevel.high,
            message:'hola'
        }as LogEntity;
        await logRepository.saveLog(log);
        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);

    });

    test('getLogs should call the datasource with arguments',async()=>{
        const lowSeverity= LogSeverityLevel.low
        await logRepository.getLogs(LogSeverityLevel.low);
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
    });
})