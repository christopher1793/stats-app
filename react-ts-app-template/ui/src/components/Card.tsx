import { useState } from 'react'
import { fetchNui } from "../utils/fetchNui";
import CardType from 'src/types/Card';
const resourceName = "react-ts-app-template";
const Card = (props) => {

    return (
            <div className="w-[90%] h-[10%] outline-2 outline-red flex-col text-[#C9CFDB]">
            <div className="flex flex-row justify-between w-[100%] items-end h-[50%]">
                <div className="text-lg uppercase font-bold">
                    {props.data.label}
                </div>
                <div>
                    <span className="text-[#B12032]"> {props.data.value} </span> / {props.data.max}
                </div>
            </div>
            <div className="w-full h-[20%] bg-[#3d3e3f] rounded-lg mt-1">
                <div 
                    className={`w-[${((props.data.value) / 10)}%] h-[100%] bg-[#B12032] rounded-lg`} 
                    style={{ width: `${props.data.value / 10}%`, height: '100%' }}
                />
            </div>
        </div>
    )
}

export default Card;