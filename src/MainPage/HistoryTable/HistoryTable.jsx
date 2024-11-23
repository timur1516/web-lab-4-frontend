// eslint-disable-next-line no-unused-vars
import styles from "./HistoryTable.module.css";

function HistoryTable(props) {
    return (
        <table id="history-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Попадание</th>
                <th>Время запроса</th>
                <th>Время выполнения</th>
            </tr>
            </thead>
            <tbody>
            {props.history.map((entry, index) => (
                <tr key={index}>
                    <td>{entry.x.toFixed(2)}</td>
                    <td>{entry.y.toFixed(2)}</td>
                    <td>{entry.r.toFixed(2)}</td>
                    <td>{entry.hit ? 'Попал' : 'Промазал'}</td>
                    <td>{entry.reqTime}</td>
                    <td>{entry.procTime}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default HistoryTable;
