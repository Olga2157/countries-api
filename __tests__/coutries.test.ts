import axios from 'axios';
import app from '../src/app';

describe("Application", (): void => {
  const port = 8002;
  const path = `http://localhost:${port}/countries/`;

  beforeAll(async (): Promise<void> => {
      await app.start(port);
  });

  afterAll(async (): Promise<void> => {
      await app.stop();
  });

  it('Country endpoint should return 200 status for correct country param', async (): Promise<void> => {
    const response = await axios.get(path + 'Ireland');
    expect(response.status).toEqual(200);
});

it('Country endpoint should return data for correct country param', async (): Promise<void> => {
  const response = await axios.get(path + 'Ireland');
  expect(response.status).toEqual(200);
  let data: any = response.data;
  expect(data?.area).toEqual(70273);
});
})
