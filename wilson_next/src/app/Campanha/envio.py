import firebase_admin
from firebase_admin import credentials, db
import requests
from datetime import datetime

# Inicializar o Firebase
cred = credentials.Certificate("path/to/your/firebase-credentials.json")  # Certificado do Firebase
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://base-de-dados-wilson.firebaseio.com/"
})

WHATSAPP_URL = "https://web.whatsapp.com/send?phone={}&text={}"
MAX_DAILY_MESSAGES = 50
daily_sent_count = 0  # Contador de mensagens diárias


def send_whatsapp_message(phone, message):
    global daily_sent_count
    if daily_sent_count >= MAX_DAILY_MESSAGES:
        print("Limite diário de mensagens atingido.")
        return False

    url = WHATSAPP_URL.format(phone, message)
    print(f"Enviando mensagem para: {phone} - URL: {url}")
    daily_sent_count += 1
    return True


def get_recipients(campaign_type):
    ref = db.reference("/")
    data = ref.get()

    today = datetime.now().date()
    recipients = []

    if data:
        for user_id, user_data in data.items():
            if campaign_type == "aniversario":
                birth_date = datetime.strptime(user_data["dataNascimento"], "%Y-%m-%d").date()
                if birth_date.day == today.day and birth_date.month == today.month:
                    recipients.append(user_data)
            elif campaign_type == "natal":
                recipients.append(user_data)  # Todos recebem no Natal
            elif campaign_type == "pascoa":
                recipients.append(user_data)  # Todos recebem na Páscoa
            # Adicione outros tipos de campanha aqui

    return recipients


def send_campaign(campaign_type, message_template):
    recipients = get_recipients(campaign_type)
    for user in recipients:
        phone = user.get("telefone")
        name = user.get("nome")
        message = message_template.format(name=name)

        if not send_whatsapp_message(phone, message):
            break


# Exemplo de execução
if __name__ == "__main__":
    # Envio de campanha de aniversário
    send_campaign("aniversario", "Feliz Aniversário, {name}! 🎉 Desejamos muitas felicidades!")
    
    # Envio de campanha de Natal
    send_campaign("natal", "Feliz Natal, {name}! Que você tenha um ótimo dia com muita paz e alegria!")
