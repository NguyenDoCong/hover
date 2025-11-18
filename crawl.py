from bs4 import BeautifulSoup
import requests
from dotenv import load_dotenv
import os
from google import genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def crawl(url):
    r = requests.get(url)
    html_doc = r.text
    soup = BeautifulSoup(html_doc, 'html.parser')

    text=soup.get_text(strip=True)
    # The client gets the API key from the environment variable `GEMINI_API_KEY`.
    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=f"Tóm tắt thông tin sau trong 50 từ: {text}"
    )
    return(response.text)


