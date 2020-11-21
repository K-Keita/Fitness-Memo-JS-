import React from 'react';
import {LinkContainer} from '../components/index';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import ListAltIcon from '@material-ui/icons/ListAlt';

const MinContainer = () => {

  return(
    <div>
      <LinkContainer 
        flexLine="l-flex"
        icons={<AddCircleOutlineIcon className="icons-align" />}
        label={'今日のトレーニングを登録'}
        link={'/regist'}
        arr={true}
      />
      <LinkContainer
        flexLine="l-flex"
        icons={<EditIcon className="icons-align" />}
        label={'メニューリストを編集する'}
        link={'/edit'}
        arr={true}
      />
      <LinkContainer
        flexLine="l-flex"
        icons={<ListAltIcon className="icons-align" />}
        label={"過去のトレーニング"}
        buttonLabel={"見る"}
        link={'/list'}
        arr={false}
      />
    </div>
  )
}

export default MinContainer;