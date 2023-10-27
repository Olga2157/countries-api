import {Request, Response, Router} from 'express';
import {Country} from '../model/country-response';
import axios from 'axios';

const router: Router = Router();


router.get('/:country', (req: Request, res: Response) => {
    requestCountryDetails(req.params.country)
        .then(countryAPiResponse => {
            res.json(countryAPiResponse[0]);
        }).catch((err) => {
            res.status(err.response.status).send(new Error(`error during getting info about country: ${err.response.statusText}`))
    })
});

export const requestCountryDetails = async (countryName: string) => {
    const {data} = await axios.request<Country[]>({
        baseURL: `https://restcountries.com/v3.1/name/${countryName}?fullText=true`,
        method: 'GET',
    })
    return data
}

export default router;
