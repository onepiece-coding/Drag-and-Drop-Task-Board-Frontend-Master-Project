
export function autoBind(
    target : any,
    methodName : string,
    descriptor : PropertyDescriptor
) {
    
    const method = descriptor.value;

    const createDescriptor : PropertyDescriptor = {
        configurable : true,
        get() {
            return method.bind(this);
        }
    }

    return createDescriptor;
}
