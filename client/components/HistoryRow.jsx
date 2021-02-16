import React from 'react';
import Moment from 'moment';

const HistoryRow = ({ data, num }) => (
  <tr>
    <td>{Moment(new Date(data.date)).format('MM/DD/YYYY')} @  {Moment(new Date(data.date)).format('h:mm A')}</td>
    <td>{data.mood}</td>
    <td>{data.energy}</td>
    <td>{data.playlist !== 'N/A' ? <a href={data.playlist} target='_blank' >MoodList {num}</a> : 'N/A'}</td>
  </tr>
)

export default HistoryRow;