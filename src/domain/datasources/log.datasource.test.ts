import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';


const newLog= new LogEntity({
    origin:'log.datasource.test.ts',
    message:'test-message',
    level:LogSeverityLevel.low
})

class MockLogDataSource implements  LogDataSource{
    async saveLog(log: LogEntity): Promise<void> {
        return ;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return [newLog]
    }

}

describe('log.datasource.ts LogDataSource',()=>{
    test('should test the abstract class',async()=>{
      const mockLogDataSource = new MockLogDataSource();
      expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource)  
      expect(typeof mockLogDataSource.saveLog).toBe('function')
      expect(typeof mockLogDataSource.getLogs).toBe('function')  

      await mockLogDataSource.saveLog(newLog);

      const logs= await mockLogDataSource.getLogs(LogSeverityLevel.high);
      expect(logs).toHaveLength(1)
      expect(logs[0]).toBeInstanceOf(LogEntity);
      
    })
})