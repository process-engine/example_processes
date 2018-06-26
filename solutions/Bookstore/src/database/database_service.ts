import {Client, QueryResult} from 'pg';

export class DatabaseService {

  private _pgClient: Client;

  public async initialize(): Promise<void> {

    this._pgClient = new Client({
      user: 'admin',
      host: 'localhost',
      database: 'bookstore',
      password: 'admin',
      port: 5433,
    });

    await this._pgClient.connect();
  }

  public async query(query: string): Promise<any> {

    const result: QueryResult = await this._pgClient.query(query);
    return result.rows;
  }

}
