using System;
using System.IO;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft​.AspNetCore​.Authentication​.Cookies;

using LegoHub.Data.Repositories;
using LegoHub.Data.Config;
using LegoHub.Data.Helper;
using LegoHub.Data.Storage;
using LegoHub.Data.Constants;
using BricksetService;

namespace LegoHub.WebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsEnvironment("Development"))
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.Configure<IISOptions>(options =>
            {

            });

            AddConfigures(services);
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);
            // Add authentication middleware and inform .NET Core MVC what scheme we'll be using
            services.AddAuthentication(options => options.SignInScheme = MiddlewareInstance.AuthenticationScheme);
            
            services.AddMvc();

            AddServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // app.UseApplicationInsightsRequestTelemetry();
            // app.UseApplicationInsightsExceptionTelemetry();

            UseCookieAuthentication(app);
            UseGlobalExceptionHandler(app);

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }

            UseRedirectToAngular2RouterHandler(app);

            app.UseStaticFiles();

            app.UseMvc();
        }


        private void AddServices(IServiceCollection services)
        {
            services.AddSingleton<BricksetAPIv2Soap>(new BricksetAPIv2SoapClient(BricksetAPIv2SoapClient.EndpointConfiguration.BricksetAPIv2Soap));
            services.AddSingleton<IBricksetRepository, BricksetRepository>();
            services.AddSingleton<IFileProcessor, FileProcessor>();
            services.AddSingleton<IStringSerializer, StringSerializer>();
            services.AddSingleton<IStoragePathResolver, StoragePathResolver>();
            services.AddSingleton<IVerifyToken, VerifyToken>();
            //Add customize configures
            services.AddSingleton<IConfigs<YoutubeConfig>, Configs<YoutubeConfig>>();
            services.AddSingleton<IConfigs<PinterestConfig>, Configs<PinterestConfig>>();
        }

        private void AddConfigures(IServiceCollection services)
        {
            services.Configure<AppConfig>(Configuration.GetSection("App"));
            services.Configure<BricksetConfig>(Configuration.GetSection("Brickset"));
            services.Configure<StorageConfig>(Configuration.GetSection("Storage"));
        }

        private void UseCookieAuthentication(IApplicationBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationScheme = MiddlewareInstance.AuthenticationScheme,
                LoginPath = new PathString("/Account/Login/"),
                AccessDeniedPath = new PathString("/Account/Forbidden/"),
                AutomaticAuthenticate = true,
                AutomaticChallenge = false
            });
        }
        private void UseGlobalExceptionHandler(IApplicationBuilder app)
        {
            //http://www.talkingdotnet.com/global-exception-handling-in-aspnet-core-webapi/
            app.UseExceptionHandler(options =>
            {
                options.Run(
                    async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "application/json"; // or  "text/html"; 
                        var ex = context.Features.Get<IExceptionHandlerFeature>();
                        if (ex != null)
                        {
                            var err = $"<h1>Error: {ex.Error.Message}</h1>{ex.Error.StackTrace}";
                            await context.Response.WriteAsync(err).ConfigureAwait(false);
                        }
                    });
            });
        }

        private void UseRedirectToAngular2RouterHandler(IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });
        }
    }
}
