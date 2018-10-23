﻿namespace ExternalTaskWorkerSample
{
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using Foundation.IAM.Contracts;
    using Newtonsoft.Json;
    using ProcessEngine.ExternalTaskAPI.Client;
    using ProcessEngine.ExternalTaskAPI.Contracts;

    class Program
    {
        static void Main(string[] args)
        {
            RunWorker().GetAwaiter().GetResult();
        }

        private static async Task RunWorker()
        {
            IIdentity identity = new TestIdentity();
            var client = new HttpClient();

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.BaseAddress = new Uri("http://localhost:8000");

            IExternalTaskAPI externalTaskApi = new ExternalTaskApiClientService(client);
            ExternalTaskWorker testObject = new ExternalTaskWorker(externalTaskApi);

            await testObject.WaitForHandle<TestPayload>(identity, "TestTopic", 10, 10000, async (externalTask) =>
            {
                Console.WriteLine(JsonConvert.SerializeObject(externalTask));

                await Task.Delay(40000);

                return new ExternalTaskFinished<TestResult>(externalTask.Id, new TestResult());
            });
        }

        private class TestIdentity : IIdentity
        {
            public override string ToString()
            {
                return "ZHVtbXlfdG9rZW4=";
            }
        }

        private class TestPayload
        {
            public string Prop { get; set; }
        }

        private class TestResult
        {
            public string TestProperty { get; } = "Fertig";
        }
    }


}
