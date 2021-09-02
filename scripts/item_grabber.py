import requests, time, json, io

'''
Grabs all the raw item data and writes it to
'''

base_url = 'https://commerce.teespring.com/v1/stores/products?slug=sodamerch&currency=USD&region=USA'

all_products = []

try:
  to_unicode = unicode
except NameError:
  to_unicode = str

def parse_product_pages(page_number, all_products):
  raw_response = requests.get(base_url + '&page=' + str(page_number))
  if raw_response:
    json_response = raw_response.json()

    all_products.extend(json_response['products'])
    if json_response['next']:
      time.sleep(1) # throttle so i dont get blocked (if they even have a limiter)
      parse_product_pages(page_number + 1, all_products)

parse_product_pages(1, all_products)

json_data = { 'all_products': all_products }
with open('products.json', 'w', encoding='utf-8') as outfile:
  str_ = json.dumps(json_data, indent=4, sort_keys=True, separators=(',', ': '), ensure_ascii=False)
  outfile.write(to_unicode(str_))
