from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
async def read_root():
    return """
    <html>
        <head>
            <title>MoltBot App 1</title>
            <style>
                body { font-family: sans-serif; text-align: center; padding-top: 50px; background-color: #f0f2f5; }
                h1 { color: #333; }
                p { color: #666; }
                .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: inline-block; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>🚀 MoltBot App 1 is Live!</h1>
                <p>Hello World from <b>FastAPI</b> on your VPS.</p>
                <p>Built by Jarvis & Thanos.</p>
            </div>
        </body>
    </html>
    """

@app.get("/api/hello")
async def read_api():
    return {"message": "Hello World", "status": "Online", "owner": "Thanos"}
