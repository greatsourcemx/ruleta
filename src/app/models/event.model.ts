import { Player } from './player.model';
import { Gifts } from './gift.model';
import { Winner } from './winner.model';

export class Evento {
    constructor (
        public Id: number = 0,
        public Name: string = '',
        public Description: string = '',
        public EventDate: Date = new Date(),
        public players: Player[] = [],
        public CurrentWinner: Player = new Player(),
        public gifts: Gifts[] = [],
        public lastGifts: Gifts[] = [],
        public CurrentGift: Gifts = new Gifts(),
        public winners: Winner[] = [],
        ) { }
}
