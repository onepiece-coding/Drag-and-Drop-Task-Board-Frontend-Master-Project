
export function autoBind(
    target : any,
    methodName : string,
    descriptor : PropertyDescriptor
) {

    console.log(target, methodName);

    const method = descriptor.value;

    const createDescriptor : PropertyDescriptor = {
        configurable : true,
        get() {
            return method.bind(this);
        }
    }

    return createDescriptor;
}
