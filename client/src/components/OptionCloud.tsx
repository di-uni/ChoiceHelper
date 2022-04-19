import React, { useCallback, useState } from 'react';
import './OptionCloud.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setText, deleteOption } from '../modules/Options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBan} from '@fortawesome/free-solid-svg-icons';
import {isMobile} from 'react-device-detect';
import { useLongPress } from 'use-long-press';
const imgPath = ["/clouds/1.png", "/clouds/2.png", "/clouds/3.png"];

export default function OptionCloud(props:any){
  const [newOption, setOption] = useState('');
  const [longPressed, setLongPressed] = useState(false);

  const { clouds} = useSelector((state: RootStateOrAny) => ({
    clouds: state.options.clouds,
  }));
  const dispatch = useDispatch();

  const onChange = (event:any) => {
    const {target: {value}} = event;
    setOption(value);
    dispatch(setText(props.id, value));
  }

  const onSubmit = (event:any) => {
    event.preventDefault();
  }

  const onClick = () => {
    dispatch(deleteOption(props.id));
  }

  const callback = useCallback(event =>{
    console.log('Long pressed!');
    setLongPressed(true);
  }, []);

  const bind = useLongPress(callback, {
    onMove: event => setLongPressed(false)
  });

  return(
    <form className='img-container' onSubmit={onSubmit} {...bind}>
      <img src={imgPath[props.color]} className='img-cloud'/>
      {newOption==='' 
        ? <textarea className='text-before-input' maxLength={30} onChange={onChange} placeholder='선택지를 입력해주세요' value={newOption}/>
        : <textarea className='text-after-input' maxLength={30} onChange={onChange} placeholder='선택지를 입력해주세요' value={newOption}/>
      }
      {isMobile
        ?<div className={`delete-cloud-mobile ${longPressed ? 'show-delete' : ''}`} onClick={onClick}>
          <FontAwesomeIcon icon={faBan} style={{color: 'red'}}/>
        </div>
        :<div className='delete-cloud-web' onClick={onClick}>
          <FontAwesomeIcon icon={faBan} style={{color: 'red'}}/>
        </div>
      }
      
    </form>
  )
}