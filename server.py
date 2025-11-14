from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from crawl import crawl

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # hoặc domain cụ thể
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HoverData(BaseModel):
    href: str

@app.post("/hover")
def receive_hover(data: HoverData):
    print("User hovered:", data.href)
    print("Crawling data...")
    crawled_data = crawl(data.href)
    print("Crawled data:", crawled_data)
    return {crawled_data}
    # return {"received": data.href}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 