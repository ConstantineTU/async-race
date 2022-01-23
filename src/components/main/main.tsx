import * as React from 'react';
import { Dispatch, useState, SetStateAction, useEffect } from 'react';
import './main.scss';
import { carDataType, stringReactType, numberReactType } from '../../type'

import Home from './components/home/home';
import Garage from './components/garage/garage';
import Winners from './components/winners/winners';

type Props = {
  activePage: stringReactType
  carData: {
    value: carDataType;
    setValue: React.Dispatch<React.SetStateAction<carDataType>>;
  }
  fetchCars: () => void
  carCount: stringReactType
  pageCount: numberReactType
  page: numberReactType
};


export default function Main(props: Props) {




  const pages = ['home', 'garage', 'winners'];
  return (
    <main className="main" id="main">
      {props.activePage.value === pages[0] && <Home activePage={props.activePage} />}
      {props.activePage.value === pages[1] && (<Garage
        carData={props.carData}
        fetchCars={props.fetchCars}
        carCount={props.carCount}
        pageCount={props.pageCount}
        page={props.page}
      />)}
      {props.activePage.value === pages[2] && (<Winners />)}
    </main>
  );
}
