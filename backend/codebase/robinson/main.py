from argparse import ArgumentParser

import uvicorn


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-m", "--mode", default="DEVELOPMENT", dest="mode", help="Mode of the application [DEVELOPMENT, PRODUCTION].")
    args = parser.parse_args()

    if args.mode == "PRODUCTION":
        print('Camping Robinson Country Club is running in production mode!')
        # uvicorn.run(settings.app, host=settings.host, port=settings.port, log_level=settings.log_level, workers=settings.workers)
    else:
        print('Camping Robinson Country Club is running in development mode! No workers, auto reload.')
        # uvicorn.run("app.main:app", host=settings.host, port=settings.port, log_level=settings.log_level, reload=True)
