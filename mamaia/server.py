from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def do_GET(self):
        print(f"Requested path: {self.path}")
        print(f"Current directory: {os.getcwd()}")
        print(f"Directory contents: {os.listdir('.')}")
        if self.path.startswith('/images/'):
            print(f"Image directory contents: {os.listdir('images')}")
        return super().do_GET()

# Ensure we're serving from the directory containing the script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

port = 8000
print(f"Server starting on http://localhost:{port}")
print(f"Serving from directory: {os.getcwd()}")
print(f"Directory contents: {os.listdir('.')}")

httpd = HTTPServer(('localhost', port), CORSRequestHandler)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down server...")
    sys.exit(0) 