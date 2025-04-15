import requests
from bs4 import BeautifulSoup
import sys

def test_html_injection(url):
    payloads = [
        "<h1>Test Injection</h1>",
        "<script>alert('XSS')</script>",
        "<img src='x' onerror='alert(1)' />",
        "<svg/onload=alert(1)>",
        "<iframe src='javascript:alert(1)'></iframe>",
        "<body onload=alert(1)>",
        "<a href='javascript:alert(1)'>Click me</a>",
        "<div onmouseover='alert(1)'>Test XSS</div>",
        "<input type='text' value='<script>alert(1)</script>' />",
        "<style>body{background-image:url('javascript:alert(1)');}</style>"
    ]

    try:
        for payload in payloads:
            test_url = f"{url}?q={payload}"
            response = requests.get(test_url, timeout=5)
            if payload in response.text:
                return True

        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, 'html.parser')
        forms = soup.find_all('form')
        for form in forms:
            action = form.get('action') or ''
            method = form.get('method', 'get').lower()
            inputs = form.find_all(['input', 'textarea', 'select', 'button'])

            if not inputs:
                continue

            form_data = {}
            for input_field in inputs:
                name = input_field.get('name')
                if name:
                    form_data[name] = payloads[0]

            if method == 'post':
                post_url = url + action if action.startswith('/') else action
                post_response = requests.post(post_url, data=form_data, timeout=5)
                if payloads[0] in post_response.text:
                    return True
    except:
        pass

    return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(1)

    url = sys.argv[1]

    if test_html_injection(url):
        print("🚨 Le site est vulnérable à l'injection HTML.")
    else:
        print("✅ Le site n'est pas vulnérable à l'injection HTML.")
