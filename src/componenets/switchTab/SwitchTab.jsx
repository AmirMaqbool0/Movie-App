import React from 'react';
import './style.scss';
import { useState } from 'react';
const SwitchTab = ({data,onTabChange}) => {
    const [slectedTab,setSlectedTab]=useState(0);
    const [left,setLeft]=useState(0);
    const activeTab=(tab,index)=>{
      setLeft(index *100);
      setTimeout(()=>{
        setSlectedTab(index)  
      },300)
      onTabChange(tab,index);
    }
  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {
                data.map((tab,index)=>(
                <span key={index} className={`tabItem ${slectedTab=== index ? "active" : ""}`}
                onClick={()=>activeTab(tab,index)}
                >
                    {tab}
                </span>

                ))
            }
            <span className='movingBg' style={{left}}></span>
        </div>
    </div>
  )
}

export default SwitchTab;