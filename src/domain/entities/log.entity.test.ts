import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('LogEntity',()=>{

    const dataObj={

        message:'Hola mundo',
        level:LogSeverityLevel.high,
        origin:'log.entity.test.ts'
    }
    test('should create al LogEntity instance',()=>{
      
        
        const log= new LogEntity(dataObj);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);

        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
        
    })

    test('should create a LogEntity instance from json ',()=>{
        const json= `{"message":"https://www.google55555.com/ is not ok. TypeError: fetch failed","level":"high","createdAt":"2024-01-26T14:11:10.073Z","origin":"check-service"}`;
        const log= LogEntity.fromJson(json);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("https://www.google55555.com/ is not ok. TypeError: fetch failed");
        expect(log.level).toBe(LogSeverityLevel.high);

        expect(log.origin).toBe("check-service");
        expect(log.createdAt).toBeInstanceOf(Date);
        


        
    })

    test('should create a LogEntity instance from Object ',()=>{
        const log= LogEntity.fromObject(dataObj);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Hola mundo");
        expect(log.level).toBe(LogSeverityLevel.high);

        expect(log.origin).toBe("log.entity.test.ts");
        expect(log.createdAt).toBeInstanceOf(Date);

        
    })
})