/**
 * This class describes a rudimentary buffer that can be updated with data and keeps
 * 1) a the lowest value it's seen so far
 * 2) a the highest value it's seen so far
 * 3) a rolling average of values seen over a certain time frame
 *
 * So far it only accepts numerical values!
 */


export default class MetaBuffer
{

  /**
   * @param _windowSize the time-window in milliseconds over which the average should be calculated
   */
  constructor (windowSize=30000)
  {
    this._windowSize = windowSize;
    this._minRecord = Infinity;
    this._maxRecord = -Infinity;
    this._records = [];
  }

  /**
   * Adds a new record to the buffer
   * @param record a number to be added
   */
  update (record)
  {
    this._minRecord = Math.min(record, this._minRecord);
    this._maxRecord = Math.max(record, this._maxRecord);

    const now = Date.now();
    this._records.push({
      t: now,       // store a (t)imestamp ..
      d: record     // .. and a (d)atum
    });

    const cutoff = now - this._windowSize;

    const index = this._records.findIndex(record => record.t > cutoff);
    if (index !== -1)
    {
      this._records = this._records.slice(index);
    }

  }

  /**
   * @returns {number|null} the smallest value seen so far or null if nothing's been added to the buffer yet
   */
  get min ()
  {
    return this._minRecord === Infinity ? null : this._minRecord;
  }


  /**
   * @returns {number|null} the largest value seen so far or null if nothing's been added to the buffer yet
   */
  get max ()
  {
    return this._maxRecord === -Infinity ? null : this._maxRecord;
  }


  /**
   * @returns {number|null} the average value in the last <windowSize> milliseconds or null if the buffer is empty
   */
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


  /**
   * @returns {number} the buffer's length
   */
  get length ()
  {
    return this._records.length;
  }

}
