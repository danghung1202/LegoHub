using System.IO;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using BricksetService;
using Microsoft.AspNetCore.Diagnostics;
using MyBrickset.Data.Repositories;
using MyBrickset.Data.Config;
using Microsoft.AspNetCore.Http;
using MyBrickset.WebApi.Helper;

namespace MyBrickset.WebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsEnvironment("Development"))
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.Configure<IISOptions>(options =>
            {

            });

            services.Configure<BricksetConfig>(Configuration.GetSection("Brickset"));
            services.Configure<StorageConfig>(Configuration.GetSection("Storage"));
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddMvc();

            services.AddSingleton<BricksetAPIv2Soap>(new BricksetAPIv2SoapClient(BricksetAPIv2SoapClient.EndpointConfiguration.BricksetAPIv2Soap));
            services.AddSingleton<IBricksetRepository, BricksetRepository>();
            services.AddSingleton<IFileProcessor, FileProcessor>();
            services.AddSingleton<IStoragePathResolver, StoragePathResolver>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();
            app.UseApplicationInsightsExceptionTelemetry();

            //http://www.talkingdotnet.com/global-exception-handling-in-aspnet-core-webapi/
            app.UseExceptionHandler(
                        options =>
                        {
                            options.Run(
                                async context =>
                                {
                                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                                    context.Response.ContentType = "application/json"; //  "text/html"; 
                                    var ex = context.Features.Get<IExceptionHandlerFeature>();
                                    if (ex != null)
                                    {
                                        var err = $"<h1>Error: {ex.Error.Message}</h1>{ex.Error.StackTrace}";
                                        await context.Response.WriteAsync(err).ConfigureAwait(false);
                                    }
                                });
                        }
                    );

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
