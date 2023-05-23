class RankValue {
  private _n: number;
  constructor(n: number) {
    // 最小 2 最大 14
    if (n < 1 || n > 15) {
      throw new Error("Number out of range");
    }
    this._n = n;
  }
  
  get value(): number {
    return this._n;
  }
}


export type RankType =
  | 'Two'
  | 'Three'
  | 'Four'
  | 'Five'
  | 'Six'
  | 'Seven'
  | 'Eight'
  | 'Nine'
  | 'Ten'
  | 'Jack'
  | 'Queen'
  | 'King'
  | 'Ace';

export type Rank = {
  value: number;
  type: RankType;
};

export const ranks: Rank[] = [
  {
    value: new RankValue(2).value,
    type: 'Two',
  },
  {
    value: new RankValue(3).value,
    type: 'Three',
  },
  {
    value: new RankValue(4).value,
    type: 'Four',
  },
  {
    value: new RankValue(5).value,
    type: 'Five',
  },
  {
    value: new RankValue(6).value,
    type: 'Six',
  },
  {
    value: new RankValue(7).value,
    type: 'Seven',
  },
  {
    value: new RankValue(8).value,
    type: 'Eight',
  },
  {
    value: new RankValue(9).value,
    type: 'Nine',
  },
  {
    value: new RankValue(10).value,
    type: 'Ten',
  },
  {
    value: new RankValue(11).value,
    type: 'Jack',
  },
  {
    value: new RankValue(12).value,
    type: 'Queen',
  },
  {
    value: new RankValue(13).value,
    type: 'King',
  },
  {
    value: new RankValue(14).value,
    type: 'Ace',
  },
];
