import requests
import sys

FAKE_EXTENSIONS = [".css", ".jpg", ".html", ".txt"]
COMMON_PATHS = ["/account", "/profile", "/dashboard", "/settings", "/user"]
HEADERS = {"User-Agent": "Mozilla/5.0"}

def check_cache_deception(base_url):
    try:
        for path in COMMON_PATHS:
            for ext in FAKE_EXTENSIONS:
                url = base_url.rstrip("/") + path + ext
                r = requests.get(url, headers=HEADERS, timeout=10)
                cache_control = r.headers.get("Cache-Control", "").lower()

                if "public" in cache_control or "max-age" in cache_control:
                    print("🚨 Le site est vulnérable à Web Cache Deception")
                    return
    except Exception:
        print("Erreur : impossible de se connecter au site.")
        sys.exit(1)

    print("✅ Le site n'est pas vulnérable à Web Cache Deception")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Utilisation : python3 deception.py https://example.com")
        sys.exit(1)

    check_cache_deception(sys.argv[1])
