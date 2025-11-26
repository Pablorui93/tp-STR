#app
from flask import Flask, request
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Carga las variables del archivo .env

app = Flask(__name__)

# ⚙️ Configuración del bot de Telegram
TOKEN = os.getenv("TOKEN")
CHAT_ID = os.getenv("CHAT_ID")

def enviar_alerta(mensaje):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": mensaje}
    requests.post(url, json=payload)

@app.route('/')
def home():
    return "Servidor de alertas activo ✅"

@app.route('/alert', methods=['POST'])
def alert():
    # Si querés recibir datos desde otra app
    data = request.get_json(force=True, silent=True) or {}
    mensaje = data.get("mensaje", "🚨 Alerta de gas")

    enviar_alerta(mensaje)
    return {"status": "ok", "mensaje_enviado": mensaje}, 200

if __name__ == '__main__':
    app.run(debug=True)