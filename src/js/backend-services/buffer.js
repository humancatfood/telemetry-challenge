export default class MetaBuffer
{

  constructor (_windowSize=30)
  {
    this._windowSize = _windowSize;
    this._minRecord = Infinity;
    this._maxRecord = -Infinity;
    this._records = [];

  }

  update (record)
  {
    this._minRecord = Math.min(record, this._minRecord);
    this._maxRecord = Math.max(record, this._maxRecord);

    const now = Date.now();
    this._records.push({
      t: now,       // store a (t)imestamp ..
      d: record     // .. and a (d)atum
    });

    const cutoff = now - this._windowSize * 1000;

    const index = this._records.findIndex(record => record.t > cutoff);
    if (index !== -1)
    {
      this._records = this._records.slice(index);
    }

  }

  get min ()
  {
    return this._minRecord === Infinity ? null : this._minRecord;
  }

  get max ()
  {
    return this._maxRecord === -Infinity ? null : this._maxRecord;
  }

  get average ()
  {
    const l = this.length;
    if (l)
    {
      return this._records.reduce((result, record) => result + record.d, 0) / l;
    }
    else
    {
      return null;
    }
  }

  get length ()
  {
    return this._records.length;
  }

}
