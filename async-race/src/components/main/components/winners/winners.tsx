import * as React from 'react';
import { useState, FC } from 'react';
import './winners.scss';
import { CarDataType, StringReactType, NumberReactType, WinnersType } from '../../../../type';
import TableLine from './components/table-line';

type Props = {
  fetchWinners: (sortDefault?: string, orderDefault?: string) => void;
  carCountWinners: StringReactType;
  pageWinners: StringReactType;
  pageCountWinners: NumberReactType;
  carDataWinners: {
    value: WinnersType[];
    setValue: React.Dispatch<React.SetStateAction<WinnersType[]>>;
  };
  carData: {
    value: CarDataType;
    setValue: React.Dispatch<React.SetStateAction<CarDataType>>;
  };
};

const Winners: FC<Props> = (props: Props) => {
  const [id, setId] = useState<boolean | null>(null);
  const [wins, setWins] = useState<boolean | null>(null);
  const [time, settime] = useState<boolean | null>(null);

  const handleChange = (prop: string) => {
    if (prop === 'id') {
      if (id) {
        setId(false);
        setWins(null);
        settime(null);
      } else {
        setId(true);
        setWins(null);
        settime(null);
      }
    } else if (prop === 'wins') {
      if (wins) {
        setWins(false);
        settime(null);
        setId(null);
      } else {
        setWins(true);
        settime(null);
        setId(null);
      }
    } else if (prop === 'time') {
      if (time) {
        settime(false);
        setId(null);
        setWins(null);
      } else {
        settime(true);
        setId(null);
        setWins(null);
      }
    }

    if (id || wins || time) {
      props.fetchWinners(prop, 'DESC');
    } else if (!id && !wins && !time) props.fetchWinners(prop, 'ASC');
  };
  const nextPage = () => {
    if (props.pageCountWinners.value > Number(props.pageWinners.value)) {
      props.pageWinners.setValue(String(Number(props.pageWinners.value) + 1));
    }
  };
  const prevPage = () => {
    if (Number(props.pageWinners.value) > 1) {
      props.pageWinners.setValue(String(Number(props.pageWinners.value) - 1));
    }
  };
  return (
    <div className="winners" id="winners">
      <div className="winners-table-wrap">
        <h2 className="winners-title">
          Winners ({' '}
          <span id="winners-count" className="winners-count">
            {props.carCountWinners.value}
          </span>{' '}
          )
        </h2>
        <div className="winners-top">
          <div className="winners-title-wrap">
            <h3 className="winners-subtitle">
              Page #
              <span id="winners-page" className="winners-page">
                {props.pageWinners.value}
              </span>
            </h3>
          </div>
          <div className="winners-button-wrap">
            <div>
              <button disabled={false} onClick={prevPage} className="btn-small btn-prev">
                Prev page
              </button>
            </div>
            <div>
              <button disabled={false} onClick={nextPage} className="btn-small btn-next">
                Next page
              </button>
            </div>
          </div>
        </div>
        <table className="winners-table">
          <thead>
            <tr>
              <th>№</th>
              <th className="winners-sort-button" onClick={() => handleChange('id')}>
                ID {id ? '↓' : false}
                {id === false ? '↑' : false}
              </th>
              <th>CAR</th>
              <th>NAME</th>
              <th className="winners-sort-button" onClick={() => handleChange('wins')}>
                WINS {wins ? '↓' : false}
                {wins === false ? '↑' : false}
              </th>
              <th className="winners-sort-button" onClick={() => handleChange('time')}>
                BEST TIME {time ? '↓' : false}
                {time === false ? '↑' : false}
              </th>
            </tr>
          </thead>
          <tbody>
            {props.carDataWinners.value.map((el, i) => (
              <TableLine
                key={i}
                el={el}
                i={i}
                fetchWinners={props.fetchWinners}
                carCountWinners={props.carCountWinners}
                pageWinners={props.pageWinners}
                pageCountWinners={props.pageCountWinners}
                carData={props.carData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Winners;
