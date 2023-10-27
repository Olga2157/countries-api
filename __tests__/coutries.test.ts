import axios from 'axios';
import app from '../src/app';

describe("Application", (): void => {
  const port = 8888;
  const path = `http://localhost:${port}/`;

  beforeAll(async (): Promise<void> => {
      await app.start();
  });

  afterAll(async (): Promise<void> => {
      await app.stop();
  });

it("Swagger should be available", async (): Promise<void> => {
  const result = await axios.get(`${path}swagger/`);
  expect(result.status).toBe(200);
});

it("Should return a 404 error if endpoint does not exist", async (): Promise<void> => {
  await axios.get(`${path}/pagedoesnotexist`).catch((e) => expect(e.response.status).toBe(404))
});

  it('Country endpoint should return 200 status for correct country param', async (): Promise<void> => {
    const response = await axios.get(path + 'countries/Ireland');
    expect(response.status).toEqual(200);
});

it('Country endpoint should return data for correct country param', async (): Promise<void> => {
  const response = await axios.get(path + 'countries/Ireland');
  expect(response.status).toEqual(200);
  let data: any = response.data;
  expect(data?.area).toEqual(70273);
});

})
