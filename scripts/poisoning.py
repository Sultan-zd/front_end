import requests
import sys

HEADERS_TO_TEST = [
    {"X-Forwarded-Host": "evil.com"},
    {"X-Host": "evil.com"},
    {"X-Forwarded-Scheme": "http"},
    {"X-Original-URL": "/"},
]

def check_poisoning(target):
    try:
        base_response = requests.get(target, timeout=10)
    except Exception:
        print("Erreur : impossible de se connecter au site.")
        sys.exit(1)

    for header in HEADERS_TO_TEST:
        try:
            r = requests.get(target, headers=header, timeout=10)
            if r.status_code == 200 and r.text != base_response.text:
                print("🚨 Le site est vulnérable à Web Cache Poisoning")
                return
        except:
            continue

    print("✅ Le site n'est pas vulnérable à Web Cache Poisoning")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Utilisation : python3 poisoning.py https://example.com")
        sys.exit(1)

    check_poisoning(sys.argv[1])
