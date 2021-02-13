import React from 'react';
import HistoryRow from './HistoryRow.jsx';
import { Table } from 'react-bootstrap';

const History = ({ history }) => {

  return (
    <div id='history-block'>
      <div id='history-title'>History</div>
      <Table striped hover bordered responsive variant='dark'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mood</th>
            <th>Energy</th>
          </tr>
        </thead>
        <tbody>
          {history.map(data => <HistoryRow data={data} />)}
        </tbody>
      </Table>
    </div>
  )
}

export default History;