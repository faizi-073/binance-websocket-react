import React, { FC } from 'react'
import { faArrowRight, faArrowTrendDown, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  condition: boolean | null
  currencyValue: string;
  quantityValue: string;
  name: string;
}

const CurrencyComparator: FC<Props> = ({ condition, currencyValue, name, quantityValue }) => {
  return (
    <div className='flex flex-col text-xl mt-16'>
      <div className='ml-1 -mb-1 text-xs font-light uppercase'>
        { name }
      </div>
      { condition === null ? (
        <div className="text-gray-400 ">
          { currencyValue }
          <FontAwesomeIcon className='w-8 ml-2' icon={faArrowRight}/> 
        </div>
      ) : condition ? (
        <div className="text-green-400">
          { currencyValue }
          <FontAwesomeIcon className='w-8 ml-2' icon={faArrowTrendUp}/> 
        </div>
      ) : (
        <div className="text-red-400">
          { currencyValue }
          <FontAwesomeIcon className='w-8 ml-2' icon={faArrowTrendDown}/> 
        </div>
      ) }
      <div className='ml-1 text-sm font-thin'>
        { quantityValue }
      </div>
    </div>
  )
}

export default CurrencyComparator;