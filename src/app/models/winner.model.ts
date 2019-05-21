import { Player } from './player.model';
import { Gifts } from './gift.model';

export class Winner {
    constructor (
        public id: number = 0,
        public player: Player = new Player(),
        public gift: Gifts = new Gifts()
    ) { }
}
