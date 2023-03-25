/**
 * @example
 * ```ts
 * from { Logger } import "tslog";
 * 
 * const serviceManager = new ServiceManager()
 *      .setService(new Logger());
 * 
 * const logger = serviceManager.getService(Logger);
 * ```
 */
export class ServiceManager {

    // key -> value
    private cache: Map<string, any> = new Map();

    public getService<T extends object>(aliasClass: { new(...args: any[]): T }): T {
        const value = this.cache.get(aliasClass.name);

        if (value === undefined)
            throw new ServiceNotFound();

        return value;
    }

    public addService<T extends object>(obj: T): ServiceManager {
        this.cache.set(obj.constructor.name, obj);
        return this;
    }
}


export class ServiceNotFound extends Error {
    constructor() {
        super("Service not found.");
    }
}

