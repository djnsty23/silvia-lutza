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
        
        # Check if we're in the right directory
        if not os.path.exists('images') and os.path.exists('mamaia/images'):
            os.chdir('mamaia')
            print(f"Changed to directory: {os.getcwd()}")
            print(f"New directory contents: {os.listdir('.')}")
        
        if self.path.startswith('/images/'):
            try:
                print(f"Image directory contents: {os.listdir('images')}")
            except FileNotFoundError:
                print("Images directory not found!")
        return super().do_GET()

port = 8000
print(f"Server starting on http://localhost:{port}")
print(f"Initial directory: {os.getcwd()}")
print(f"Directory contents: {os.listdir('.')}")

httpd = HTTPServer(('localhost', port), CORSRequestHandler)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down server...")
    sys.exit(0) 