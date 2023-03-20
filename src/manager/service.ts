export class ServiceManager {

    // key -> value
    public cache: Map<string, any> = new Map();

    getService<T extends object>(aliasClass: { new(...args: any[]): T }): T {
        const value = this.cache.get(aliasClass.name);

        if (value === undefined)
            throw new ServiceNotFound();

        return value;
    }

    setService<T extends object>(obj: T) {
        this.cache.set(obj.constructor.name, obj);
    }
}


export class ServiceNotFound extends Error {
    constructor() {
        super("Service not found.");
    }
}
