#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
EXPOSE 7054
EXPOSE 5108

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["BookRating/BookRating.csproj", "BookRating/"]
RUN dotnet restore "./BookRating/BookRating.csproj"

COPY . .
WORKDIR "/src/BookRating"
RUN dotnet build "./BookRating.csproj" -c $BUILD_CONFIGURATION -o /app/build
RUN dotnet run "./BookRating.csproj"

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./BookRating.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM build AS run
ARG BUILD_CONFIGURATION=Release
RUN dotnet run "./BookRating.csproj" -c $BUILD_CONFIGURATION -o /app/run /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookRating.dll"]