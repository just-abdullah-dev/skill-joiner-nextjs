import React, { useState } from 'react'
import PlaceOrder from './PlaceOrder';

export default function PricingOpt({packages}) {
  const [orderServiceID, setOrderServiceID] = useState('');
  
  return (
    <>
    {orderServiceID && 
    <PlaceOrder goBack={()=>{setOrderServiceID('')}} pkgId={orderServiceID} css={' absolute w-[800px] h-fit top-20 right-0'} />}
    <div className=" bg-white rounded-2xl p-6 grid gap-4">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className={` grid gap-8 px-4`}>
        {packages[0] && (
          packages.map((item) => {
            return (
                <div key={item?._id} className=' bg-gray-300 bg-opacity-80 p-6 rounded-xl grid gap-3'>
                   <h1 className=' text-xl font-semibold'>{item?.title}</h1>
                   <p className=' leading-8'>{item?.desc}</p>
                   <div className=' grid grid-cols-3 font-semibold'>
                    <p>{item?.time == '1'?item?.time+' day':item?.time+' days'}</p>
                    <p>{item?.price} PKR</p>
                    <button
                    onClick={()=>{
                      setOrderServiceID(item?._id);
                    }}
                    className=' actionButtonTag'>Order</button>
                   </div>
                </div>    
            );
          })
        )}
      </div>
    </div></>
  )
}
