import { Operation } from './operations/operation.type'

export class Change {
    constructor(private readonly forward: Operation, private readonly reverse: Operation ){}

    up(){return this.forward.apply()};
    down(){ return this.reverse.apply()}
}
