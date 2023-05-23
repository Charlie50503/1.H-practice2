class SuitValue {
  private _n: number;
  constructor(n: number) {
    if (n < 0 || n > 4) {
      throw new Error("Number out of range");
    }
    this._n = n;
  }
  
  get value(): number {
    return this._n;
  }
}
export type SuitType =
  | 'Clubs'
  | 'Diamonds'
  | 'Hearts'
  | 'Spades';



export type Suit = {
  value: SuitValue;
  type: SuitType;
};

export const suits:Suit[] = [
  {
    value: new SuitValue(1),
    type:'Clubs'
  },
  {
    value: new SuitValue(2),
    type:'Diamonds'
  },
  {
    value: new SuitValue(3),
    type:'Hearts'
  },
  {
    value: new SuitValue(4),
    type:'Spades'
  },
]