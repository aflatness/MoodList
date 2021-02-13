import React from 'react';
import Moment from 'moment';

const HistoryRow = ({ data }) => (
  <tr>
    <td>{Moment(new Date(data.date)).format('MM/DD/YYYY')} @  {Moment(new Date(data.date)).format('h:mm A')}</td>
    <td>{data.mood}</td>
    <td>{data.energy}</td>
  </tr>
)

export default HistoryRow;