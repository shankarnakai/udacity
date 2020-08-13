export interface Car {
    make: string;
    type: string;
    model: string;
    cost: number;
    id: number;
}

export const cars: Car[] = [
    { make: 'tesla', type: 'sedan', model: 'roadster', cost: 33, id: 0 },
    { make: 'tesla', type: 'suv', model: 'model 3', cost: 48, id: 1 },
    { make: 'toyota', type: 'sedan', model: 'prius', cost: 22, id: 2 },
    { make: 'honda', type: 'sedan', model: 'civic', cost: 22, id: 3 }
   ]

export function buildFilter(make: string, _type: string, model: string, cost: number, costOperator: string) {
    const includeFilter = (value, field) => car => car[field].includes(value)
    const makeFilter = includeFilter(make, 'make')
    const typeFilter = includeFilter(_type, 'type')
    const modelFilter = includeFilter(model, 'model')
    const costFilter = car => {
        switch(costOperator) {
            case ">":
                return car.cost > cost
            case ">=":
                return car.cost >= cost
            case "<":
                return car.cost < cost
            case "<=":
                return car.cost <= cost
            default: 
                return car.cost == cost
        }
    } 

    const _filters = []
    if(make) {
        _filters.push(makeFilter)
    }

    if(_type) {
        _filters.push(typeFilter)
    }

    if(model) {
        _filters.push(modelFilter)
    }

    if(cost) {
        _filters.push(costFilter)
    }

    if(_filters.length == 0) {
        return (car) => true
    }

    return (car) => {
        return !_filters.some((fn) => !fn(car))
    }
}
