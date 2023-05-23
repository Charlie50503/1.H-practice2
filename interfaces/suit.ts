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
  value: number;
  type: SuitType;
};

export const suits:Suit[] = [
  {
    value: new SuitValue(1).value,
    type:'Clubs'
  },
  {
    value: new SuitValue(2).value,
    type:'Diamonds'
  },
  {
    value: new SuitValue(3).value,
    type:'Hearts'
  },
  {
    value: new SuitValue(4).value,
    type:'Spades'
  },
]