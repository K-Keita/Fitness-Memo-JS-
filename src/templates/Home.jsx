import React from 'react';
import {MinContainer, OnedayList, LinkContainerTop, TableBox} from '../components/index';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const d = new Date();
const year = d.getFullYear()
const month = d.getMonth() + 1;
const day = d.getDate();
const dateId = String(year) + String(month) + String(day);

const  Home = () => {
  return (
    <div className="container-width">
      <LinkContainerTop
        icons={<HomeOutlinedIcon fontSize="large" className="icons-align"/>}
        label={"Fitness-Memo"}
      />
      <div className='midium-space' />
      <div className="d-flex m-center">
        <div className="midium-width">
          <div className="d-none__block">
            <OnedayList title={'今日のトレーニング'} dateId={dateId}/>
          </div>
          <TableBox />
        </div>
        <div className="small-width__none m-center">
          <OnedayList title={'今日のトレーニング'} dateId={dateId}/>
        </div>
      </div>
      <MinContainer />
    </div>
  );
}

export default Home;