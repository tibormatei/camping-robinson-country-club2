import uvicorn

from robinson.config.loader import get_config

from argparse import ArgumentParser



if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-m", "--mode", default="DEVELOPMENT", dest="mode", help="Mode of the application [DEVELOPMENT, PRODUCTION].")
    args = parser.parse_args()

    # Get configuration from config
    app_config = get_config().boot.app
    api_config = app_config.api

    if args.mode == "PRODUCTION":
        print('Camping Robinson Country Club is running in production mode!')
        uvicorn.run(
            app_config.app,
            host=api_config.host,
            port=api_config.port,
            log_level=app_config.log_level,
            workers=api_config.threads
        )
    else:
        print('Camping Robinson Country Club is running in development mode! No workers, auto reload.')
        uvicorn.run(
            app_config.app,
            host=api_config.host,
            port=api_config.port,
            log_level=app_config.log_level,
            reload=True
        )
