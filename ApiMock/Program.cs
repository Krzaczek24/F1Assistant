using ApiMock.Middlewares;
using ApiMock.Settings;

namespace ApiMock
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers(options => options.Conventions.AddSnakeCaseNamingPolicy());
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();
            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(options => options.WithOrigins("http://127.0.0.1:4200", "http://localhost:4200"));
            }
            app.MapControllers();
            app.UseRewriteMiddleware();
            app.Run();
        }
    }
}
