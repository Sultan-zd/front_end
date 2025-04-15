import sys
import requests
from bs4 import BeautifulSoup
import time

brute_force_payload = {
    "username": "admin",
    "password": "password123"
}

def test_login_form(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        forms = soup.find_all('form')

        for form in forms:
            action = form.get('action', '')
            method = form.get('method', 'get').lower()
            form_data = {}
            inputs = form.find_all('input')
            for input_field in inputs:
                name = input_field.get('name')
                if name == 'username':
                    form_data['username'] = brute_force_payload['username']
                elif name == 'password':
                    form_data['password'] = brute_force_payload['password']
                elif name:
                    form_data[name] = ""

            action_url = url + action if action else url

            if method == 'post':
                response = requests.post(action_url, data=form_data)
            else:
                response = requests.get(action_url, params=form_data)

            if "incorrect password" in response.text or "invalid credentials" in response.text:
                return True
    except requests.RequestException:
        return False
    return False

def test_rate_limiting(url):
    try:
        for _ in range(5):
            response = requests.post(url, data=brute_force_payload)
            if "too many requests" in response.text or response.status_code == 429:
                return True
            time.sleep(1)
    except requests.RequestException:
        return False
    return False

def test_account_lock(url):
    try:
        for _ in range(5):
            response = requests.post(url, data={"username": "wrong", "password": "wrong"})
            if "account locked" in response.text or "Too many failed attempts" in response.text:
                return True
            time.sleep(1)
    except requests.RequestException:
        return False
    return False

def test_captcha(url):
    try:
        response = requests.get(url)
        if "captcha" in response.text or "recaptcha" in response.text or "g-recaptcha" in response.text:
            return True
    except requests.RequestException:
        return False
    return False

def test_ip_protection(url):
    try:
        for _ in range(10):
            response = requests.post(url, data=brute_force_payload)
            if response.status_code == 403 or "blocked" in response.text:
                return True
            time.sleep(1)
    except requests.RequestException:
        return False
    return False

def test_session_protection(url):
    try:
        session = requests.Session()
        for _ in range(5):
            response = session.post(url, data=brute_force_payload)
            if "session expired" in response.text or "Please log in again" in response.text:
                return True
            time.sleep(1)
    except requests.RequestException:
        return False
    return False

def test_http_headers(url):
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers)
        if "X-Content-Type-Options" in response.headers or "Strict-Transport-Security" in response.headers:
            return True
    except requests.RequestException:
        return False
    return False

def test_brute_force(url):
    protections = [
        test_rate_limiting(url),
        test_account_lock(url),
        test_captcha(url),
        test_ip_protection(url),
        test_session_protection(url),
        test_http_headers(url)
    ]
    vulnerable = test_login_form(url) and not any(protections)
    return vulnerable

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage : python3 brute-force.py <url>")
        sys.exit(1)

    target_url = sys.argv[1]
    is_vulnerable = test_brute_force(target_url)

    if is_vulnerable:
        print("🚨 Le site est vulnérable aux attaques par force brute.")
    else:
        print("✅ Le site n'est pas vulnérable aux attaques par force brute.")
