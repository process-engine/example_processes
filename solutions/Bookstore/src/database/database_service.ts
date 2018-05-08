import {Client, QueryResult} from 'pg';

export class DatabaseService {

  private pgClient: Client;

  public async initialize(): Promise<void> {

    this.pgClient = new Client({
      user: 'admin',
      host: 'localhost',
      database: 'bookstore',
      password: 'admin',
      port: 5433,
    });

    await this.pgClient.connect();
  }

  public async query(query: string): Promise<any> {

    const result: QueryResult = await this.pgClient.query(query);
    return result.rows;
  }

}
