import { useEffect, useState } from 'react';
import { CurrencyEnum, CurrencyPayload } from '../../utils/types';
import { getConversion } from './currencyConverterApi';

const useCurrencyConverter = (base: CurrencyEnum) : CurrencyPayload|null => {
  const [conversions, setConversions] = useState<CurrencyPayload|null>(null);

  useEffect(() => {
    (async () => {
      const conversions = await getConversion({ base_currency: base.toString() });

      const payload = conversions.data;

      // To correct for the api not returning USD if it is the base
      if (base === CurrencyEnum.USD) payload.data[CurrencyEnum.USD] = 1;

      // Check for errors first
      setConversions(payload);
    })();
  }, [base]);

  return conversions;
};

export { useCurrencyConverter };