import { useEffect, useRef, useState } from 'react';
import { CurrencyEnum, CurrencyPayload } from '../../utils/types';
import { getConversion } from './currencyConverterApi';

export type CurrencyConverterResponse = {
  data: CurrencyPayload|null,
  isError: boolean,
  convertCurrency: (base: CurrencyEnum) => void
}

/**
 * A custom hook used to retrieve the currency conversion rates of various currencies
 * based on a base currency input.
 * @returns {CurrencyConverterResponse}
 */
const useCurrencyConverter = () : CurrencyConverterResponse => {
  const initialRender = useRef(true);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyEnum|null>(null);
  const [data, setData] = useState<CurrencyPayload|null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    (async () => {
      if (!initialRender.current && baseCurrency !== null) {
        try {
          const response = await getConversion({ base_currency: baseCurrency.toString() });
          if (response) {
            if (response.status === 200) {
              // To correct for the api not returning USD if it is the base
              if (baseCurrency === CurrencyEnum.USD) response.data.data[CurrencyEnum.USD] = 1;
              if (isMounted) setData(response.data);
            } else {
              if (isMounted) setIsError(true);
            }
          }
        }
        catch (err) {
          if (isMounted) setIsError(true);
        }
      }
      initialRender.current = false;
    })();

    return () => {
      isMounted = false;
    };
  }, [baseCurrency]);

  return { 
    data, 
    isError, 
    convertCurrency: setBaseCurrency 
  };
};

export { useCurrencyConverter };