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
  value: RankValue;
  type: RankType;
};

export const ranks: Rank[] = [
  {
    value: new RankValue(2),
    type: 'Two',
  },
  {
    value: new RankValue(3),
    type: 'Three',
  },
  {
    value: new RankValue(4),
    type: 'Four',
  },
  {
    value: new RankValue(5),
    type: 'Five',
  },
  {
    value: new RankValue(6),
    type: 'Six',
  },
  {
    value: new RankValue(7),
    type: 'Seven',
  },
  {
    value: new RankValue(8),
    type: 'Eight',
  },
  {
    value: new RankValue(9),
    type: 'Nine',
  },
  {
    value: new RankValue(10),
    type: 'Ten',
  },
  {
    value: new RankValue(11),
    type: 'Jack',
  },
  {
    value: new RankValue(12),
    type: 'Queen',
  },
  {
    value: new RankValue(13),
    type: 'King',
  },
  {
    value: new RankValue(14),
    type: 'Ace',
  },
];
