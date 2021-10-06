import { AxiosResponse } from 'axios';
import axios from '../../utils/axios';
import { CurrencyPayload } from '../../utils/types';

export type ConversionProps = {
  base_currency: string
}

/**
 * Gets a conversion for the base currency measured at 1 unit.
 * @param params 
 * @returns 
 */
export const getConversion = (params: ConversionProps) : Promise<AxiosResponse<CurrencyPayload>> => {
  return axios.get('latest', { params });
};
