import { RESTDataSource } from "apollo-datasource-rest";
import DataSource from "../TmbApiDataSource";

const mockGet = jest
  .spyOn(RESTDataSource.prototype as any, "get")
  .mockResolvedValueOnce(null);

const mockedData = {
  path: "test",
  app_id: "test id",
  app_key: "test key",
};

process.env = {
  TMB_API_APP_ID: mockedData.app_id,
  TMB_API_APP_KEY: mockedData.app_key,
};

describe("TmbApiDataSource", () => {
  const apiDataSource = new DataSource();

  test("adds the authorization parameters to the get call", async () => {
    const { path, app_id, app_key } = mockedData;

    await apiDataSource.get(path);
    expect(mockGet).toHaveBeenCalledWith(
      path,
      {
        app_id,
        app_key,
      },
      {}
    );
  });
});
